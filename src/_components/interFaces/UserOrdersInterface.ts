import { IProduct } from "./productsInterFace";
export type PaymentMethodType = "card" | "cash";

export interface IOrder {
  _id: string;
  id: number;
  user: IUser;
  cartItems: ICartItem[];
  shippingAddress: IShippingAddress;
  shippingPrice: number;
  taxPrice: number;
  totalOrderPrice: number;
  isPaid: boolean;
  paidAt?: string; 
  isDelivered: boolean;
  paymentMethodType: PaymentMethodType;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  phone: string;
}

export interface IShippingAddress {
  details: string;
  city: string;
  phone: string;
}

export interface ICartItem {
  _id: string;
  count: number;
  price: number;
  product: IProduct; 
}


