export interface IOrderData {
  totals: {
    subtotal: number;
    discount: number;
    shipping: number;
    tax: number;
    grandTotal: number;
  };
  shippingAddress: {
    name: string;
    address: string;
  };
  contact: {
    email: string;
    phone: string;
  };
  payment: {
    method: string;
    status: string;
  };
  _id: string;
  orderNo: string;
  userId: string;
  items: {
    productId: string;
    variantId: string;
    title: string;
    variantTitle: string;
    price: number;
    quantity: number;
    image: string;
    _id: string;
  }[];
  status: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}