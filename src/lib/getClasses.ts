export const getClasses = async () => {
  const res = await fetch(
    "https://p984b1z5.api.sanity.io/v2024-06-01/data/query/production?query=*[_type=='class']",
    {
      headers: {
        Authorization: `Bearer ${process.env.SANITY_READ_TOKEN}`,
      },
      next: { revalidate: 60 }, // Optional caching
    },
  );

  const data = await res.json();
  return data.result;
};
