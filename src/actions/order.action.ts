const baseUrl = "https://3legant-backend-zeta.vercel.app/api/v1";
import unauth from "../utility/auth";
const verifyUser = localStorage.getItem("userToken");

export const createOrder = async (userId: number, items: [], shippingAddress: string, contact: string, payment: string, notes: string) => {
    try {
        if (!verifyUser) {
            unauth("unathurized");
            return;
        }

        const res = await fetch(`${baseUrl}/order`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
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
        return data;
    } catch (e) {
        return e;
    }
}