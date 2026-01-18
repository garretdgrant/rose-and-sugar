// app/sitemap.xml/route.ts
import { type NextRequest } from "next/server";

export const runtime = "edge";

const baseUrl = "https://www.roseandsugar.com";

const staticPages = [
  "",
  "/corporate-team-building",
  "/cookies/signature-sugar-cookie-sets",
  "/cookies/order-custom-sugar-cookies",
  "/classes",
  "/classes/locations",
  "/classes/folsom-sugar-cookie-decorating-class",
  "/classes/loomis-sugar-cookie-decorating-class",
  "/classes/sacramento-sugar-cookie-decorating-class",
  "/classes/el-dorado-hills-sugar-cookie-decorating-class",
  "/classes/roseville-sugar-cookie-decorating-class",
  "/about",
  "/contact",
  "/privacy-policy",
];

const lastModDate = new Date().toISOString().split("T")[0];

export async function GET(_req: NextRequest) {
  const urls = staticPages
    .map(
      (path) => `
  <url>
    <loc>${baseUrl}${path}</loc>
    <lastmod>${lastModDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${path === "" ? "1.0" : "0.7"}</priority>
  </url>`,
    )
    .join("");

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls}
  </urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
