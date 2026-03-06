// app/sitemap.xml/route.ts
import { type NextRequest } from "next/server";
import { getMetadataBase } from "@/lib/metadata";
import { shopifyFetch } from "@/lib/shopify";
import {
  dynamicTemplateLastmod,
  staticSitemapEntries,
} from "./generated-entries";

export const runtime = "edge";
export const revalidate = 3600;

const COOKIE_QUERY = `
  query PredesignedCollectionSitemap($handle: String!, $first: Int!) {
    collection(handle: $handle) {
      products(first: $first) {
        edges {
          node {
            handle
            updatedAt
          }
        }
      }
    }
  }
`;

const CLASSES_QUERY = `
  query ClassesCollectionSitemap($handle: String!, $first: Int!) {
    collection(handle: $handle) {
      products(first: $first) {
        edges {
          node {
            handle
            updatedAt
          }
        }
      }
    }
  }
`;

const buildEntry = ({
  loc,
  lastmod,
  priority,
  changefreq = "monthly",
}: {
  loc: string;
  lastmod?: string | null;
  priority: string;
  changefreq?: string;
}) => {
  const lastmodTag = lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : "";

  return `
  <url>
    <loc>${loc}</loc>
    ${lastmodTag}
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
};

export async function GET(_req: NextRequest) {
  const baseUrl = getMetadataBase().toString().replace(/\/$/, "");

  const staticEntries = staticSitemapEntries
    .map((entry) =>
      buildEntry({
        loc: `${baseUrl}${entry.path}`,
        lastmod: entry.lastmod,
        changefreq: entry.changefreq,
        priority: entry.priority,
      }),
    )
    .join("");

  let cookieEntries = "";
  let classEntries = "";
  try {
    const data = await shopifyFetch<{
      collection: {
        products: {
          edges: {
            node: { handle: string | null; updatedAt?: string | null };
          }[];
        };
      } | null;
    }>(COOKIE_QUERY, {
      handle: "pre-designed",
      first: 250,
    });

    const productEdges = data.collection?.products?.edges || [];
    cookieEntries = productEdges
      .map((edge) => {
        const handle = edge.node.handle;
        if (!handle) return "";
        const updatedAt = edge.node.updatedAt
          ? edge.node.updatedAt.split("T")[0]
          : dynamicTemplateLastmod.cookiesProduct;
        return buildEntry({
          loc: `${baseUrl}/cookies/signature-sugar-cookie-sets/${encodeURIComponent(handle)}`,
          lastmod: updatedAt,
          changefreq: "monthly",
          priority: "0.8",
        });
      })
      .join("");
  } catch (error) {
    console.error("[SITEMAP_COOKIE_ERROR]", error);
  }

  try {
    const data = await shopifyFetch<{
      collection: {
        products: {
          edges: {
            node: { handle: string | null; updatedAt?: string | null };
          }[];
        };
      } | null;
    }>(CLASSES_QUERY, {
      handle: "classes",
      first: 250,
    });

    const classEdges = data.collection?.products?.edges || [];
    classEntries = classEdges
      .map((edge) => {
        const handle = edge.node.handle;
        if (!handle) return "";
        const updatedAt = edge.node.updatedAt
          ? edge.node.updatedAt.split("T")[0]
          : dynamicTemplateLastmod.classProduct;
        return buildEntry({
          loc: `${baseUrl}/classes/${encodeURIComponent(handle)}`,
          lastmod: updatedAt,
          changefreq: "weekly",
          priority: "0.8",
        });
      })
      .join("");
  } catch (error) {
    console.error("[SITEMAP_CLASSES_ERROR]", error);
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${staticEntries}
    ${cookieEntries}
    ${classEntries}
  </urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
