import type { MetadataRoute } from "next";
import { PAGE_META, absoluteUrl, type PublicPath } from "@/lib/seo";

// Date of the last substantive content change per route. Update the entry when a
// page's content changes; do not stamp every request with "now".
const CONTENT_UPDATED = "2026-09-28";
const LAST_MODIFIED: Partial<Record<PublicPath, string>> = {};

export default function sitemap(): MetadataRoute.Sitemap {
  return (Object.keys(PAGE_META) as PublicPath[]).map((path) => ({
    url: absoluteUrl(path),
    lastModified: LAST_MODIFIED[path] ?? CONTENT_UPDATED,
  }));
}
