import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      // 1. Cloudinary (For your course/gallery images)
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      
      // 2. UploadThing (For PDF icons or if you store images there later)
      { protocol: 'https', hostname: 'utfs.io' },
      
      // 3. Unsplash (CRITICAL: Your mock data uses this. Without it, the app crashes)
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
  experimental: {
    serverActions: {
      // Allows uploading files up to 10MB via Server Actions
      bodySizeLimit: '10mb', 
    },
  },
};

export default withNextIntl(nextConfig);