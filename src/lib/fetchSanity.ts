import { Design } from "@/components/PreDesignedClient"; // or wherever your Design type lives
import { urlFor } from "./sanityImage";
import { sanityClient } from "./sanityClient";

export interface FetchedDesign {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  _type: "predesign";
  name: string;
  description: string;
  price: string;
  quantity: string;
  slug: {
    current: string;
    _type: "slug";
  };
  image: {
    _type: "image";
    asset: {
      _ref: string;
      _type: "reference";
    };
  };
}

export interface FetchedClass {
  _id: string;
  _type: "class";
  title: string;
  month: string;
  day: string;
  time: string;
  address: string;
  description: string;
  price: string;
  _createdAt: string;
  _updatedAt: string;
}

export const getClasses = async (): Promise<FetchedClass[]> => {
  const query = `*[_type == "class"]{
    _id,
    _type,
    title,
    month,
    day,
    time,
    address,
    description,
    price,
    link,
    _createdAt,
    _updatedAt
  }`;

  return await sanityClient.fetch(query);
};

export const getPredesigns = async (): Promise<FetchedDesign[]> => {
  const query = `*[_type == "predesign"] | order(orderRank) {
    _id,
    _type,
    name,
    description,
    price,
    slug,
    image,
    _createdAt,
    _updatedAt
  }`;

  return await sanityClient.fetch(query);
};

export const transformToDesign = (item: FetchedDesign): Design => ({
  id: item.slug.current,
  name: item.name,
  description: item.description,
  image: urlFor(item.image).width(600).url(),
  price: item.price,
  quantity: 0,
});
