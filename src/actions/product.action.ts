// get product
export const getProduct = async () => {
  const res = await fetch(
    "https://3legant-backend-zeta.vercel.app/api/v1/products",
    {
      method: "GET",
      headers: {
        content: "application/json",
      },
      next: { revalidate: 60 },
    }
  );
  const data = await res.json();
  return data.products;
};
