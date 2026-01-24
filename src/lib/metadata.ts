import type { Metadata } from "next";

const PRODUCTION_URL = "https://www.roseandsugar.com";

export const getMetadataBase = () => {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (envUrl) {
    return new URL(envUrl);
  }

  return process.env.NODE_ENV === "development"
    ? new URL("http://localhost:3000")
    : new URL(PRODUCTION_URL);
};

const ensureLeadingSlash = (path: string) => {
  if (!path) {
    return "/";
  }
  return path.startsWith("/") ? path : `/${path}`;
};

export const buildCanonicalUrl = (
  path: string,
  metadataBase: URL = getMetadataBase(),
) => {
  return new URL(ensureLeadingSlash(path), metadataBase).toString();
};

export const buildOgImageUrl = (
  imagePath: string,
  metadataBase: URL = getMetadataBase(),
) => {
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }

  return new URL(ensureLeadingSlash(imagePath), metadataBase).toString();
};

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  imagePath?: string;
  type?: "website" | "article";
};

export const buildPageMetadata = ({
  title,
  description,
  path,
  imagePath = "/singleCookie.webp",
  type = "website",
}: PageMetadataOptions): Metadata => {
  const metadataBase = getMetadataBase();
  const canonical = buildCanonicalUrl(path, metadataBase);
  const image = buildOgImageUrl(imagePath, metadataBase);

  return {
    metadataBase,
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
};
