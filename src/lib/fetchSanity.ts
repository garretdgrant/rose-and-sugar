import { Design } from "@/components/PreDesignedClient";
import { urlFor } from "./sanityImage";

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
  category?: string;
  image: {
    _type: "image";
    asset: {
      _ref: string;
      _type: "reference";
    };
  };
}

export interface FetchedSweetBake {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  _type: "sweetBake";
  name: string;
  description: string;
  price: string;
  category: string;
  servings: string;
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
  image?: {
    _type: "image";
    asset: {
      _ref: string;
      _type: "reference";
    };
  };
  seatsLeft: number;
}

const token = process.env.SANITY_READ_TOKEN!;
const DEFAULT_COOKIE_CATEGORY = "General Baked Cookies";

const sanityFetch = async <T>(groqQuery: string): Promise<T> => {
  const encodedQuery = encodeURIComponent(groqQuery);
  const url = `https://p984b1z5.api.sanity.io/v2024-06-01/data/query/production?query=${encodedQuery}`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    // ✅ Enable ISR (revalidate every 60 seconds)
    next: { revalidate: 60 },
  });

  const json = await res.json();
  return json.result;
};

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
    image,
    seatsLeft,
    _createdAt,
    _updatedAt
  }`;
  return sanityFetch<FetchedClass[]>(query);
};

export const getPredesigns = async (): Promise<FetchedDesign[]> => {
  const query = `*[_type == "predesign"] | order(orderRank) {
    _id,
    _type,
    name,
    description,
    price,
    slug,
    category,
    image,
    _createdAt,
    _updatedAt
  }`;
  return sanityFetch<FetchedDesign[]>(query);
};

export const getSweetBakes = async (): Promise<FetchedSweetBake[]> => {
  const query = `*[_type == "sweetBake"] | order(orderRank) {
    _id,
    _type,
    name,
    description,
    price,
    category,
    servings,
    slug,
    image,
    _createdAt,
    _updatedAt
  }`;
  return sanityFetch<FetchedSweetBake[]>(query);
};

export const transformToDesign = (item: FetchedDesign): Design => ({
  id: item.slug.current,
  name: item.name,
  description: item.description,
  image: urlFor(item.image).width(600).url(),
  price: item.price,
  category: item.category ?? DEFAULT_COOKIE_CATEGORY,
  quantity: 0,
});

export const transformToSweetBake = (item: FetchedSweetBake): Design => ({
  id: item.slug.current,
  name: item.name,
  description: item.description,
  image: urlFor(item.image).width(600).url(),
  price: item.price,
  category: item.category ?? DEFAULT_COOKIE_CATEGORY,
  quantity: 0,
});
