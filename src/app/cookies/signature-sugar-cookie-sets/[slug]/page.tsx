import PredesignedCookieDetailClient from "@/components/PredesignedCookieDetailClient";
import { buildPageMetadata } from "@/lib/metadata";
import { fetchPredesignedByHandle } from "@/lib/predesignedCookies";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const product = await fetchPredesignedByHandle(slug);
  const title =
    product?.seo?.title ||
    (product ? `${product.title} | Rose & Sugar` : "Product");
  const description =
    product?.seo?.description ||
    product?.description ||
    "Discover Rose & Sugar's signature cookie sets and seasonal designs.";

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
