
const baseUrl = "https://3legant-backend-zeta.vercel.app/api/v1";

// get product by tag
export const userSignUp = async (email: string, password: string) => {
  try {
    const res = await fetch(`${baseUrl}/auth/register`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
               email,
               password,
            }),
        });
    const data = await res.json();
    return data;
  } catch (e) {
    return e;
  }
};
