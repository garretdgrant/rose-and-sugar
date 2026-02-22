import PredesignedCookieDetailClient from "@/components/PredesignedCookieDetailClient";
import { buildPageMetadata } from "@/lib/metadata";
import { fetchPredesignedByHandle } from "@/lib/predesignedCookies";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const product = await fetchPredesignedByHandle(slug);
  const fallbackTitle = product
    ? `${product.title} Signature Sugar Cookies | Rose & Sugar`
    : "Signature Sugar Cookie Set | Rose & Sugar";
  const fallbackDescription = product
    ? `Order the ${product.title} signature sugar cookie set from Rose & Sugar in Folsom, CA. Hand-decorated cookies for gifting, parties, and special events.`
    : "Order handcrafted signature sugar cookie sets from Rose & Sugar in Folsom, CA for gifting, parties, and celebrations.";
  const title = product?.seo?.title || fallbackTitle;
  const description =
    product?.seo?.description || product?.description || fallbackDescription;

  return buildPageMetadata({
    title,
    description,
    path: `/cookies/signature-sugar-cookie-sets/${slug}`,
    imagePath: product?.image?.url,
  });
}

const Page = async ({ params }: Props) => {
  const { slug } = await params;
  return <PredesignedCookieDetailClient handle={slug} />;
};

export default Page;
