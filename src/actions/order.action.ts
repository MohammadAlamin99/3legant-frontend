const baseUrl = "https://3legant-backend-zeta.vercel.app/api/v1";
let token = "";
if (typeof window !== "undefined") {
  token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
}
interface CartItem {
  productId: string;
  variantId: string;
  quantity: number;
}

interface ShippingAddress {
  name: string;
  address: string;
}

interface Contact {
  email: string;
  phone: string;
}

interface Payment {
  method: string;
}

export const createOrder = async (
  items: CartItem[],
  shippingAddress: ShippingAddress,
  contact: Contact,
  payment: Payment,
  notes: string
) => {
  try {
    const res = await fetch(`${baseUrl}/order`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        token: token,
      },
      body: JSON.stringify({
        items,
        shippingAddress,
        contact,
        payment,
        notes,
      }),
    });
    const data = await res.json();
    return data;
  } catch (e) {
    return e;
  }
};


// order get
export const getOrder = async (id: string, token: string) => {
  try {
    const res = await fetch(`${baseUrl}/order/${id}`, {
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
