import TournamentDetailPage from "@/app/tournaments/[id]/page";
import { getTournamentById } from "@/app/actions/adminActions";
import { getPageMetadata, SEO_CONFIG } from "@/config/seo";
import type { Metadata } from "next";

type Props = {
  params: { locale: string; id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, id } = params;
  const numId = parseInt(id, 10);
  const baseTournaments = getPageMetadata("tournaments", locale);

  if (isNaN(numId)) {
    return baseTournaments;
  }

  try {
    const tournament = await getTournamentById(numId);
    if (!tournament) return baseTournaments;

    const isZh = locale === "zh";
    const brand = isZh ? SEO_CONFIG.site.nameZh : SEO_CONFIG.site.name;
    const categoryName = isZh ? "比賽詳情" : "Tournaments";
    const title = `${tournament.title} | ${categoryName} | ${brand}`;
    const description = tournament.description?.slice(0, 160) || (baseTournaments.description as string);

    return {
      ...baseTournaments,
      title: { absolute: title },
      description,
      openGraph: {
        ...baseTournaments.openGraph,
        title,
        description,
        images: tournament.posterUrl ? [{ url: tournament.posterUrl }] : baseTournaments.openGraph?.images,
      },
    };
  } catch {
    return baseTournaments;
  }
}

export default TournamentDetailPage;
