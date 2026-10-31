import type { Metadata } from "next";
import { getPageMetadata } from "@/config/seo";

export const metadata: Metadata = getPageMetadata("bookDemo", "en");

export default function BookDemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

