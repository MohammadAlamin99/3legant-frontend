const baseUrl = "https://3legant-backend-zeta.vercel.app/api/v1";
import unauth from "../utility/auth";
const verifyUser = localStorage.getItem("token");

export const createOrder = async (
  userId: string,
  items: [],
  shippingAddress: string,
  contact: string,
  payment: string,
  notes: string
) => {
  try {
    if (!verifyUser) {
      unauth("unathurized");
      return;
    }
    const res = await fetch(`${baseUrl}/order`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        token: verifyUser,
      },
      body: JSON.stringify({
        userId,
        items,
        shippingAddress,
        contact,
        payment,
        notes,
      }),
    });

    if (res.status === 401 || res.status === 403) {
      unauth("unathurized");
      return;
    }
    const data = await res.json();
    console.log(data);
    return data;
  } catch (e) {
    return e;
  }
};

// const baseUrl = "https://3legant-backend-zeta.vercel.app/api/v1";
// import unauth from "../utility/auth";

// export const createOrder = async (
//   userId: string,
//   items: [],
//   shippingAddress: string,
//   contact: string,
//   payment: string,
//   notes: string
// ) => {
//   try {
//     const token = localStorage.getItem("token"); // read token inside the function
//     if (!token) {
//       unauth("unauthorized");
//       return;
//     }

//     const res = await fetch(`${baseUrl}/order`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization": `${token}`, // send token to backend
//       },
//       body: JSON.stringify({
//         userId,
//         items,
//         shippingAddress,
//         contact,
//         payment,
//         notes,
//       }),
//     });

//     if (res.status === 401 || res.status === 403) {
//       unauth("unauthorized");
//       return;
//     }

//     const data = await res.json();
//     console.log(data);
//     return data;
//   } catch (e) {
//     console.error(e);
//     return e;
//   }
// };
