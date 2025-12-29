import PreDesignedClient from "@/components/PreDesignedClient";
import { getPredesigns } from "@/lib/fetchSanity";
import { buildPageMetadata } from "@/lib/metadata";

export async function generateMetadata() {
  return buildPageMetadata({
    title: "Pre-Designed Cookie Sets | Rose & Sugar",
    description:
      "Order pre-designed sugar cookie sets from Rose & Sugar in Folsom, CA. Easy gifting and celebration-ready designs with handcrafted detail.",
    path: "/cookies/pre-designed",
  });
}

const PreDesignedPage = async () => {
  const predesigns = await getPredesigns();

  return <PreDesignedClient predesigns={predesigns} />;
};

export default PreDesignedPage;
