const baseUrl = "https://3legant-backend-five.vercel.app/api/v1";

// get product by tag
export const createContact = async (
  name: string,
  email: string,
  subject: string,
  message: string
) => {
  try {
    const res = await fetch(`${baseUrl}/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        subject,
        message,
      }),
    });
    const data = await res.json();
    return data;
  } catch (e) {
    return e;
  }
};
