'use server'

import { PrismaClient } from '@prisma/client'
import { revalidatePath } from 'next/cache'

const globalForPrisma = global as unknown as { prisma: PrismaClient }
const prisma = globalForPrisma.prisma || new PrismaClient()
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

/* ==========================================================================
   TOURNAMENTS
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
    levels: formData.get('levels') as string,        // <--- ADDED THIS (Stringified JSON)
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
    status: formData.get('status') as any,
    categories: formData.get('categories') as string,
    levels: formData.get('levels') as string,        // <--- ADDED THIS
    regulations: formData.get('regulations') as string,
  }
  
  if (bannerImage) dataToUpdate.bannerImage = bannerImage

  await prisma.tournament.update({ where: { id }, data: dataToUpdate })
  revalidatePath('/tournaments')
  revalidatePath('/admin/tournaments')
}

export async function getTournaments() {
  return await prisma.tournament.findMany({ 
    include: { registrations: { orderBy: { createdAt: 'desc' } } }, 
    orderBy: { startDate: 'desc' } 
  });
}

export async function deleteTournament(id: number) {
  await prisma.tournament.delete({ where: { id } })
  revalidatePath('/tournaments')
  revalidatePath('/admin/tournaments')
}
/* ==========================================================================
   BLOGS
   ========================================================================== */

export async function addBlogPost(formData: FormData) {
  const title = formData.get('title') as string
  const data = {
    title,
    excerpt: formData.get('excerpt') as string,
    content: formData.get('content') as string,
    category: formData.get('category') as string,
    readTime: formData.get('readTime') as string,
    image: formData.get('image') as string,
    slug: title.toLowerCase().replace(/ /g, '-'),
  }

  await prisma.blogPost.create({ data })
  revalidatePath('/blog')
}

export async function editBlogPost(id: number, formData: FormData) {
  const image = formData.get('image') as string
  const data: any = {
    title: formData.get('title') as string,
    excerpt: formData.get('excerpt') as string,
    category: formData.get('category') as string,
    readTime: formData.get('readTime') as string,
    content: formData.get('content') as string,
  }
  if (image) data.image = image

  await prisma.blogPost.update({ where: { id }, data })
  revalidatePath('/blog')
}

export async function getBlogPosts() {
  return await prisma.blogPost.findMany({ orderBy: { date: 'desc' } })
}

export async function deleteBlogPost(id: number) {
  await prisma.blogPost.delete({ where: { id } })
  revalidatePath('/blog')
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

  try {
    await prisma.album.create({
      data: {
        title,
        category,
        description,
        images: {
          // This maps the array of URLs into the AlbumImage records automatically
          create: imageUrls.map((url) => ({ src: url })),
        },
      },
    });

    revalidatePath("/gallery");
    revalidatePath("/admin/gallery"); // Revalidate admin path too
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
    await prisma.album.update({
      where: { id },
      data: {
        title,
        category,
        description,
        images: {
          // This appends new images to the existing album
          create: newImageUrls.map((url) => ({ src: url })),
        },
      },
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
 * Note: Because of 'onDelete: Cascade' in schema, all images are deleted automatically
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
 * Delete a single image from an album without deleting the whole album
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