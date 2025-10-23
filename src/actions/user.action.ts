
const baseUrl = "https://3legant-backend-five.vercel.app/api/v1";

// user sign up
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
//user log in
export const userLogin = async (email: string, password: string) => {
  try {
    const res = await fetch(`${baseUrl}/auth/login`, {
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
