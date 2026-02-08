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
  }
  
  if (bannerImage) dataToUpdate.bannerImage = bannerImage

  await prisma.tournament.update({ where: { id }, data: dataToUpdate })
  revalidatePath('/tournaments')
  revalidatePath('/admin/tournaments')
}

export async function getTournaments() {
  return await prisma.tournament.findMany({ 
    include: { 
      registrations: {
        orderBy: { createdAt: 'desc' }
      } 
    }, 
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

/* ==========================================================================
   GALLERY
   ========================================================================== */

export async function addGalleryImage(formData: FormData) {
  await prisma.galleryImage.create({
    data: {
      title: formData.get('title') as string,
      category: formData.get('category') as string,
      src: formData.get('src') as string,
      description: formData.get('description') as string,
    }
  })
  revalidatePath('/gallery')
}

export async function editGalleryImage(id: number, formData: FormData) {
  const src = formData.get('src') as string
  const data: any = {
    title: formData.get('title') as string,
    category: formData.get('category') as string,
    description: formData.get('description') as string,
  }
  if (src) data.src = src

  await prisma.galleryImage.update({ where: { id }, data })
  revalidatePath('/gallery')
}

export async function getGalleryImages() {
  return await prisma.galleryImage.findMany({ orderBy: { id: 'desc' } })
}

export async function deleteGalleryImage(id: number) {
  await prisma.galleryImage.delete({ where: { id } })
  revalidatePath('/gallery')
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