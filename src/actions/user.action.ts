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

// user profile
export const getProfile = async (token: string) => {
  try {
    const res = await fetch(`${baseUrl}/auth/user/profile`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        token: token,
      },
    });
    const data = await res.json();
    return data;
  } catch (e) {
    return e;
  }
};

// update user profile
export const updateProfile = async (
  token: string,
  name?: string,
  oldPassword?: string,
  password?: string,
  file?: File
) => {
  try {
    const formData = new FormData();

    if (name) formData.append("name", name);
    if (oldPassword) formData.append("oldPassword", oldPassword);
    if (password) formData.append("password", password);
    if (file) formData.append("photo", file);
    const res = await fetch(`${baseUrl}/auth/user/profile`, {
      method: "PUT",
      headers: {
        token: token,
      },
      body: formData,
    });
    const data = await res.json();
    return data;
  } catch (e) {
    return e;
  }
};
