'use server'

import { unstable_noStore as noStore } from 'next/cache';
import { PrismaClient } from '@prisma/client'
import { revalidatePath } from 'next/cache'

const globalForPrisma = global as unknown as { prisma: PrismaClient }
const prisma = globalForPrisma.prisma || new PrismaClient()
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma


/* ==========================================================================
   REGISTRATIONS (NEW - EDIT & MOVE)
   ========================================================================== */

export async function updateRegistration(id: string, formData: FormData) {
  const data = {
    playerName: formData.get('playerName') as string,
    email: formData.get('email') as string,
    phone: formData.get('phone') as string,
    dob: new Date(formData.get('dob') as string),
    gender: formData.get('gender') as string,
    studentCategory: formData.get('studentCategory') as string,
    rating: formData.get('rating') as string,
    fideId: formData.get('fideId') as string,
    onlineUsername: formData.get('onlineUsername') as string,
    status: formData.get('status') as any, // Expecting PENDING, COMPLETED, or CANCELLED
    tournamentId: parseInt(formData.get('tournamentId') as string),
  }

  try {
    await prisma.registration.update({
      where: { id },
      data
    })

    revalidatePath('/admin/tournaments')
    return { success: true }
  } catch (error) {
    console.error("Failed to update registration:", error)
    throw new Error("Could not update player registration")
  }
}

/* ==========================================================================
   TOURNAMENTs
   ========================================================================== */

export async function addTournament(formData: FormData) {
  const data = {
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    entryFee: parseInt(formData.get('entryFee') as string),
    maxPlayers: parseInt(formData.get('maxPlayers') as string),
    startDate: new Date(formData.get('startDate') as string),
    endDate: new Date(formData.get('endDate') as string),
    location: formData.get('location') as string,
    bannerImage: formData.get('bannerImage') as string,
    status: (formData.get('status') as any) || "OPEN",
    categories: formData.get('categories') as string, // Stringified JSON
    levels: formData.get('levels') as string,        // Stringified JSON
    regulations: formData.get('regulations') as string, 
  }

  await prisma.tournament.create({ data })
  revalidatePath('/tournaments')
  revalidatePath('/admin/tournaments')
}

export async function editTournament(id: number, formData: FormData) {
  const bannerImage = formData.get('bannerImage') as string
  const dataToUpdate: any = {
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    entryFee: parseInt(formData.get('entryFee') as string),
    maxPlayers: parseInt(formData.get('maxPlayers') as string),
    startDate: new Date(formData.get('startDate') as string),
    endDate: new Date(formData.get('endDate') as string),
    location: formData.get('location') as string,
    categories: formData.get('categories') as string,
    levels: formData.get('levels') as string,        
    regulations: formData.get('regulations') as string,
  }
  
  if (bannerImage) dataToUpdate.bannerImage = bannerImage
  const status = formData.get('status') as string;
  if (status) dataToUpdate.status = status;

  await prisma.tournament.update({ where: { id }, data: dataToUpdate })
  revalidatePath('/tournaments')
  revalidatePath('/admin/tournaments')
}

export async function getTournaments() {
  noStore();
  return await prisma.tournament.findMany({ 
    include: { registrations: { orderBy: { createdAt: 'desc' } } }, 
    orderBy: { startDate: 'desc' } 
  });
}

export async function getTournamentById(id: number) {
  noStore();
  return await prisma.tournament.findUnique({
    where: { id },
    include: { registrations: { orderBy: { createdAt: 'desc' } } },
  });
}

export async function deleteTournament(id: number) {
  await prisma.tournament.delete({ where: { id } })
  revalidatePath('/tournaments')
  revalidatePath('/admin/tournaments')
}

export async function updateTournamentStatus(id: number) {
    const tournament = await prisma.tournament.findUnique({
        where: { id }
    });

    return prisma.tournament.update({
        where: { id },
        data: {
            isActive: !tournament?.isActive
        }
    });
}
/* ==========================================================================
   BLOGS
   ========================================================================== */

/**
 * Formats any string into a clean, URL-safe slug preserving Chinese (CJK)
 * characters, letters, numbers, hyphens, and underscores.
 */
function formatSlug(input: string): string {
  if (!input) return "";
  return input
    .trim()
    .toLowerCase()
    // Replace whitespace and common separators with hyphens
    .replace(/[\s\t\n]+/g, "-")
    // Keep letters (any language including Chinese \p{L}), numbers (\p{N}), hyphens (-), and underscores (_)
    // Remove characters that are unsafe or awkward in URLs:
    .replace(/[^\p{L}\p{N}\-_]+/gu, "-")
    // Collapse consecutive hyphens
    .replace(/-+/g, "-")
    // Trim hyphens from beginning and end
    .replace(/^-+|-+$/g, "");
}

/**
 * Ensures slug uniqueness by appending -1, -2, etc. if a matching slug
 * is already taken by another blog post.
 */
async function generateUniqueSlug(baseSlug: string, currentId?: number): Promise<string> {
  const fallback = `blog-${Date.now()}`;
  const initial = baseSlug.trim() || fallback;
  let slug = initial;
  let counter = 1;

  while (true) {
    const existing = await prisma.blogPost.findUnique({
      where: { slug },
      select: { id: true, slug: true },
    });

    if (!existing || (currentId && existing.id === currentId)) {
      return slug;
    }

    slug = `${initial}-${counter}`;
    counter++;
  }
}

export async function addBlogPost(formData: FormData) {
  const title = (formData.get('title') as string) || '';
  const customSlug = (formData.get('slug') as string) || '';

  // Use provided custom slug (supports Chinese) or fallback to title
  const formattedSlug = formatSlug(customSlug) || formatSlug(title);
  const slug = await generateUniqueSlug(formattedSlug);

  const data = {
    title,
    excerpt: (formData.get('excerpt') as string) || '',
    content: (formData.get('content') as string) || '',
    category: (formData.get('category') as string) || 'Chess & Logic',
    readTime: (formData.get('readTime') as string) || '5 min read',
    image: (formData.get('image') as string) || '',
    slug,
    featured: formData.get('featured') === 'true',
  }

  const post = await prisma.blogPost.create({ data })
  revalidatePath('/blog')
  revalidatePath('/admin/blog')
  return post
}

export async function editBlogPost(id: number, formData: FormData) {
  const image = formData.get('image') as string
  const customSlug = formData.get('slug') as string | null

  const data: any = {
    title: formData.get('title') as string,
    excerpt: formData.get('excerpt') as string,
    category: formData.get('category') as string,
    readTime: formData.get('readTime') as string,
    content: formData.get('content') as string,
    featured: formData.get('featured') === 'true',
  }
  if (image) data.image = image

  if (customSlug !== null && customSlug !== undefined) {
    const formatted = formatSlug(customSlug) || formatSlug(data.title);
    data.slug = await generateUniqueSlug(formatted, id);
  }

  const updated = await prisma.blogPost.update({ where: { id }, data })
  revalidatePath('/blog')
  revalidatePath('/admin/blog')
  return updated
}

export async function getBlogPosts() {
  return await prisma.blogPost.findMany({ orderBy: { date: 'desc' } })
}

export async function deleteBlogPost(id: number) {
  await prisma.blogPost.delete({ where: { id } })
  revalidatePath('/blog')
  revalidatePath('/admin/blog')
}

/**
 * Fetch all albums including their nested images
 */
export async function getAlbums() {
  try {
    return await prisma.album.findMany({
      include: { 
        images: true 
      },
      orderBy: { 
        createdAt: 'desc' 
      }
    });
  } catch (error) {
    console.error("Error fetching albums:", error);
    return [];
  }
}

/**
 * Create a new album with multiple images at once
 */
export async function createAlbum(formData: FormData, imageUrls: string[]) {
  const title = formData.get("title") as string;
  const category = formData.get("category") as string;
  const description = formData.get("description") as string;

  if (!imageUrls || imageUrls.length === 0) {
    throw new Error("At least one image is required");
  }

  try {
    await prisma.album.create({
      data: {
        title,
        category,
        description,
        images: {
          create: imageUrls.map((url) => ({ src: url })),
        },
      },
    });

    revalidatePath("/gallery");
    revalidatePath("/admin/gallery");
  } catch (error) {
    console.error("Error creating album:", error);
    throw new Error("Failed to create album");
  }
}

/**
 * Update album details and optionally add more images
 */
export async function updateAlbum(id: number, formData: FormData, newImageUrls: string[]) {
  const title = formData.get("title") as string;
  const category = formData.get("category") as string;
  const description = formData.get("description") as string;

  try {
    const updateData: any = {
      title,
      category,
      description,
    };

    // Only add images if new ones are provided
    if (newImageUrls && newImageUrls.length > 0) {
      updateData.images = {
        create: newImageUrls.map((url) => ({ src: url })),
      };
    }

    await prisma.album.update({
      where: { id },
      data: updateData,
    });

    revalidatePath("/gallery");
    revalidatePath("/admin/gallery");
  } catch (error) {
    console.error("Error updating album:", error);
    throw new Error("Failed to update album");
  }
}

/**
 * Delete an entire album
 */
export async function deleteAlbum(id: number) {
  try {
    await prisma.album.delete({
      where: { id },
    });
    revalidatePath("/gallery");
    revalidatePath("/admin/gallery");
  } catch (error) {
    console.error("Error deleting album:", error);
    throw new Error("Failed to delete album");
  }
}

/**
 * Delete a single image from an album
 */
export async function deleteAlbumImage(imageId: number) {
  try {
    await prisma.albumImage.delete({
      where: { id: imageId },
    });
    revalidatePath("/gallery");
    revalidatePath("/admin/gallery");
  } catch (error) {
    console.error("Error deleting image:", error);
    throw new Error("Failed to delete image");
  }
}

/* ==========================================================================
   ENQUIRIES
   ========================================================================== */

export async function submitEnquiry(formData: FormData) {
  await prisma.enquiry.create({
    data: {
      parentName: formData.get('parentName') as string,
      studentName: formData.get('studentName') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      subject: formData.get('subject') as string,
      message: formData.get('message') as string,
    }
  })
  revalidatePath('/admin/enquiries')
}

export async function getEnquiries() {
  return await prisma.enquiry.findMany({ orderBy: { createdAt: 'desc' } })
}

export async function updateEnquiryStatus(id: number, status: string, notes?: string) {
  await prisma.enquiry.update({
    where: { id },
    data: { status, notes }
  })
  revalidatePath('/admin/enquiries')
}

export async function deleteEnquiry(id: number) {
  await prisma.enquiry.delete({ where: { id } })
  revalidatePath('/admin/enquiries')
}

/* ==========================================================================
   ENQUIRIES - UPDATE ACTION
   ========================================================================== */

export async function updateEnquiry(id: number, formData: FormData) {
  // Extract values from the FormData object
  const status = formData.get('status') as string;
  const notes = formData.get('notes') as string;

  try {
    await prisma.enquiry.update({
      where: { id },
      data: { 
        status: status, 
        notes: notes 
      },
    });

    // Revalidate the admin path to show updated data immediately
    revalidatePath('/admin/enquiries');
  } catch (error) {
    console.error("Failed to update enquiry:", error);
    throw new Error("Could not update enquiry details.");
  }
}

/* ==========================================================================
   SITE BANNER (ANNOUNCEMENT)
   ========================================================================== */

/**
 * Fetch the current site banner settings
 */
export async function getSiteBanner() {
  try {
    return await prisma.siteBanner.findUnique({
      where: { id: 1 }
    });
  } catch (error) {
    console.error("Error fetching site banner:", error);
    return null;
  }
}

/**
 * Update or create the singleton site banner
 */
export async function updateSiteBanner(formData: FormData) {
  const imageUrl = formData.get('imageUrl') as string;
  const link = formData.get('link') as string;
  const isActive = formData.get('isActive') === 'true';

  try {
    await prisma.siteBanner.upsert({
      where: { id: 1 },
      update: {
        imageUrl,
        link,
        isActive,
      },
      create: {
        id: 1,
        imageUrl,
        link,
        isActive,
      },
    });

    // Revalidate the homepage where the Hero section lives
    revalidatePath('/');
    // Revalidate admin settings page
    revalidatePath('/admin/settings'); 
  } catch (error) {
    console.error("Failed to update site banner:", error);
    throw new Error("Could not update site banner settings.");
  }
}

/**
 * Delete the site banner record entirely
 */
export async function deleteSiteBanner() {
  try {
    await prisma.siteBanner.delete({
      where: { id: 1 },
    });

    // Revalidate paths to reflect the removal immediately
    revalidatePath('/');
    revalidatePath('/admin/settings');
  } catch (error) {
    // We catch the error in case the banner was already deleted 
    // to prevent the admin UI from crashing
    console.error("Failed to delete site banner:", error);
  }
}


/* ==========================================================================
   COUPONS (NEW)
   ========================================================================== */

export async function addCoupon(formData: FormData) {
  const code = (formData.get('code') as string).toUpperCase();
  const data = {
    code,
    discountType: formData.get('discountType') as string,
    discountValue: parseInt(formData.get('discountValue') as string),
    expiryDate: formData.get('expiryDate') ? new Date(formData.get('expiryDate') as string) : null,
    usageLimit: formData.get('usageLimit') ? parseInt(formData.get('usageLimit') as string) : null,
    tournamentId: formData.get('tournamentId') ? parseInt(formData.get('tournamentId') as string) : null,
  };

  await prisma.coupon.create({ data });
  revalidatePath('/admin/tournaments');
}

export async function getCoupons() {
  noStore();
  return await prisma.coupon.findMany({
    include: { tournament: true },
    orderBy: { createdAt: 'desc' }
  });
}

export async function deleteCoupon(id: number) {
  await prisma.coupon.delete({ where: { id } });
  revalidatePath('/admin/tournaments');
}

// Validation logic used by both Frontend (for UI) and Backend (for Payment)
export async function validateCouponAction(code: string, tournamentId: number) {
  const coupon = await prisma.coupon.findUnique({
    where: { code: code.toUpperCase() }
  });

  if (!coupon) return { valid: false, message: "Invalid code" };

  if (coupon.expiryDate && new Date() > coupon.expiryDate) {
    return { valid: false, message: "Coupon expired" };
  }

  if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
    return { valid: false, message: "Usage limit reached" };
  }

  if (coupon.tournamentId && coupon.tournamentId !== tournamentId) {
    return { valid: false, message: "Not valid for this tournament" };
  }

  return { 
    valid: true, 
    discountType: coupon.discountType, 
    discountValue: coupon.discountValue,
    couponId: coupon.id
  };
}