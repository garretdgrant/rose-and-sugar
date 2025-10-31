import PreDesignedBakesClient from "@/components/PreDesignedBakesClient";
import { getSweetBakes } from "@/lib/fetchSanity";

const SweetBakesPreDesignedPage = async () => {
  const sweetBakes = await getSweetBakes();
  return <PreDesignedBakesClient sweetBakes={sweetBakes} />;
};

export default SweetBakesPreDesignedPage;
