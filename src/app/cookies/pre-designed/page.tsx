import PreDesignedClient from "@/components/PreDesignedClient";
import { getPredesigns } from "@/lib/fetchSanity";

const PreDesignedPage = async () => {
  const predesigns = await getPredesigns();

  return <PreDesignedClient predesigns={predesigns} />;
};

export default PreDesignedPage;
