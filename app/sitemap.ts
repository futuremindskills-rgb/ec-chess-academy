import { MetadataRoute } from "next";
import { SEO_CONFIG, PageKey } from "@/config/seo";
import { getBlogPosts, getTournaments } from "@/app/actions/adminActions";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { site, pages } = SEO_CONFIG;
  const baseUrl = site.baseUrl;

  const entries: MetadataRoute.Sitemap = [];

  // Static pages from central SEO configuration
  (Object.keys(pages) as PageKey[]).forEach((pageKey) => {
    const page = pages[pageKey];
    for (const locale of site.locales) {
      entries.push({
        url: `${baseUrl}/${locale}${page.path}`,
        lastModified: new Date(site.lastUpdated),
        changeFrequency: pageKey === "home" ? "daily" : "weekly",
        priority: pageKey === "home" ? 1.0 : 0.8,
        alternates: {
          languages: {
            [site.hreflang.en]: `${baseUrl}/en${page.path}`,
            [site.hreflang.zh]: `${baseUrl}/zh${page.path}`,
            "x-default": `${baseUrl}/en${page.path}`,
          },
        },
      });
    }
  });

  // Dynamic blog posts
  try {
    const posts = await getBlogPosts();
    if (Array.isArray(posts)) {
      posts.forEach((post: any) => {
        if (!post?.slug) return;
        const encodedSlug = encodeURIComponent(post.slug);
        for (const locale of site.locales) {
          entries.push({
            url: `${baseUrl}/${locale}/blog/${encodedSlug}`,
            lastModified: post.updatedAt ? new Date(post.updatedAt) : new Date(),
            changeFrequency: "weekly",
            priority: 0.7,
            alternates: {
              languages: {
                [site.hreflang.en]: `${baseUrl}/en/blog/${encodedSlug}`,
                [site.hreflang.zh]: `${baseUrl}/zh/blog/${encodedSlug}`,
                "x-default": `${baseUrl}/en/blog/${encodedSlug}`,
              },
            },
          });
        }
      });
    }
  } catch (error) {
    console.error("Failed to load blog posts for sitemap", error);
  }

  // Dynamic tournaments
  try {
    const tournaments = await getTournaments();
    if (Array.isArray(tournaments)) {
      tournaments.forEach((tournament: any) => {
        if (!tournament?.id) return;
        for (const locale of site.locales) {
          entries.push({
            url: `${baseUrl}/${locale}/tournaments/${tournament.id}`,
            lastModified: tournament.updatedAt ? new Date(tournament.updatedAt) : new Date(),
            changeFrequency: "weekly",
            priority: 0.7,
            alternates: {
              languages: {
                [site.hreflang.en]: `${baseUrl}/en/tournaments/${tournament.id}`,
                [site.hreflang.zh]: `${baseUrl}/zh/tournaments/${tournament.id}`,
                "x-default": `${baseUrl}/en/tournaments/${tournament.id}`,
              },
            },
          });
        }
      });
    }
  } catch (error) {
    console.error("Failed to load tournaments for sitemap", error);
  }

  return entries;
}

