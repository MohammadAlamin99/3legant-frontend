const baseUrl = "https://3legant-backend-five.vercel.app/api/v1";

export const addToWishlist = async (
  token: string,
  userId: string,
  productId: string
) => {
  try {
    const res = await fetch(`${baseUrl}/wishlist`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        token: token,
      },
      body: JSON.stringify({
        userId,
        productId,
      }),
    });
    const data = await res.json();
    return data;
  } catch (e) {
    return e;
  }
};

// wishlist get
export const getWishlist = async (token: string, userId: string) => {
  try {
    const result = await fetch(`${baseUrl}/wishlist?userId=${userId}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        token: token,
      },
    });
    const data = await result.json();
    return data;
  } catch (err) {
    return err;
  }
};
