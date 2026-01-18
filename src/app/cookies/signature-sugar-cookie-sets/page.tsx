import ShopifyPreDesignedClient from "@/components/ShopifyPreDesignedClient";
import { buildPageMetadata } from "@/lib/metadata";

export async function generateMetadata() {
  return buildPageMetadata({
    title: "Signature Cookie Sets | Rose & Sugar",
    description:
      "Order signature cookie sets from Rose & Sugar in Folsom, CA. Easy gifting and celebration-ready designs with handcrafted detail.",
    path: "/cookies/signature-sugar-cookie-sets",
  });
}

const PreDesignedPage = async () => {
  return <ShopifyPreDesignedClient />;
};

export default PreDesignedPage;
