import imageUrlBuilder from "@sanity/image-url";
import { sanityClient } from "./sanityClient";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

const builder = imageUrlBuilder(sanityClient);
export const urlFor = (source: SanityImageSource) => builder.image(source);
