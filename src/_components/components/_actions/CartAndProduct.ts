"use client";
import { IShippingAddress } from "@/_components/interFaces/UserOrdersInterface";
import { getUserToken } from "@/helpers/getUserToken";
export async function addToCartAction(productId: string) {
  const res = await fetch("/api/cart/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productId }),
  });
  return res.json();
}

export async function removeFromCart(productId: string) {
  const res = await fetch("/api/cart/remove", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productId }),
  });
  return res.json();
}

export async function updateQuantityCart(productId: string, count: number) {
  const res = await fetch("/api/cart/update", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productId, count }),
  });
  return res.json();
}

export async function clearCartItems() {
  const res = await fetch("/api/cart/clear", {
    method: "DELETE",
  });
  return res.json();
}

export async function addToWishListAction(productId: string) {
  const res = await fetch("/api/wishlist/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productId }),
  });
  return res.json();
}

export async function removeFromWishListAction(productId: string) {
  const res = await fetch("/api/wishlist/remove", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productId }),
  });
  return res.json();
}

// chek out visa
export async function visaChekOut(
  cartId: string,
  shippingAddress: IShippingAddress
) {
  const token = await getUserToken();
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${process.env.NEXT_PUBLIC_BASE_URL}`,
    {
      method: "POST",
      body: JSON.stringify({ shippingAddress }),
      headers: {
        token: token + "",
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  return data;
}

// chek out cash on delevry
export async function cashChekOut(
  cartId: string,
  shippingAddress: IShippingAddress
) {
  const token = await getUserToken();
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
    {
      method: "POST",
      body: JSON.stringify({ shippingAddress }),
      headers: {
        token: token + "",
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  return data;
}
export async function addAddress(
  name: string,
  details: string,
  phone: string,
  city: string
) {
  const res = await fetch("/api/addresse/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, details, phone, city }),
  });
  return res.json();
}

export async function removeAddress(id: string) {
  const res = await fetch(`/api/addresse/remove`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });
  return res.json();
}
