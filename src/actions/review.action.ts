const baseUrl = "https://3legant-backend-five.vercel.app/api/v1";

export const createReview = async (
  token: string,
  userId: string,
  productId: string,
  rating: number,
  comment: string
) => {
  try {
    const res = await fetch(`${baseUrl}/review`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        token: token,
      },
      body: JSON.stringify({
        userId,
        productId,
        rating,
        comment,
      }),
    });
    const data = await res.json();
    return data;
  } catch (e) {
    return e;
  }
};

// get review by product id

export const getReviewByProductId = async (
  productId: string,
  page: number,
  limit: number
) => {
  try {
    const res = await fetch(
      `${baseUrl}/review?productId=${productId}&page=${page}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (e) {
    return e;
  }
};
