import { createClient } from "@sanity/client";

export const sanityClient = createClient({
  projectId: "p984b1z5",
  dataset: "production",
  apiVersion: "2024-06-01",
  useCdn: false,
  token: process.env.SANITY_READ_TOKEN,
});
