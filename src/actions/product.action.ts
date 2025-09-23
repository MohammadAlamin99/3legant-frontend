
const baseUrl = "https://3legant-backend-zeta.vercel.app/api/v1";

// get product by tag
export const getProduct = async (tags: string, page: number, limit: number) => {
  try {
    const res = await fetch(
      `${baseUrl}/products?tags=${tags}&page=${page}&limit=${limit}`,
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
  } catch (e) {
    return e;
  }
};


// get product by id
export const getProductById = async (id: string) => {
  try {
    const res = await fetch(`${baseUrl}/product/${id}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
      cache: "no-store",
    });
    const data = await res.json();
    return data.message;
  } catch (e) {
    return e;
  }
};

// get product by price range
export const getProductbyPriceRange = async (minPrice: number, maxPrice: number, page: number, limit: number) => {
  try {
    const res = await fetch(
      `${baseUrl}/products/price?minPrice=${minPrice}&maxPrice=${maxPrice}&page=${page}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          content: "application/json",
        }
      }
    );
    const data = await res.json();
    return data;
  } catch (e) {
    return e;
  }
};

// get product by collection id
export const getProductByCollectionID = async (id: string, page: number, limit: number) => {
  try {
    const res = await fetch(`${baseUrl}/products/collection?id=${id}&page=${page}&limit=${limit}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    });
    const data = await res.json();
    return data;
  } catch (e) {
    return e;
  }
};

// get all product
export const getAllProduct = async (page: number, limit: number) => {
  try {
    const res = await fetch(
      `${baseUrl}/products?page=${page}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          content: "application/json",
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (e) {
    return e;
  }
};
