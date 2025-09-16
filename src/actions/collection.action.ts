const baseUrl = "https://3legant-backend-zeta.vercel.app/api/v1";

// get collection
export const getCollection = async (section:string) => {
  const res = await fetch(
    `${baseUrl}/collection?section=${section}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        revalidate: 300,
      },
    }
  );
  const data = await res.json();
  return data.data;
};
