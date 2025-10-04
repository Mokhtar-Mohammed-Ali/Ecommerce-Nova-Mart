
// import { cartResponse } from "@/_components/interFaces/CartInterFace";
// import { IShippingAddress } from "@/_components/interFaces/UserOrdersInterface";
// import { getUserToken } from "@/helpers/getUserToken";

// // add to card
// export async function addToCartAction(productId: string) {
//   const token = await getUserToken();
//   const response = await fetch(`https://ecommerce.routemisr.com/api/v1/cart`, {
//     method: "POST",
//     body: JSON.stringify({ productId }),
//     headers: {
//       token: token + "",
//       "Content-Type": "application/json",
//     },
//   });
//   const data = await response.json();
//   return data;
// }

// // Add To WishList
// export async function addToWishListAction(productId: string) {
//   const token = await getUserToken();
//   const res = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
//     method: "POST",
//     headers: {
//       token: token + "",
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ productId }),
//   });
//   const data = await res.json();
//   return data;
// }

// // remove favoriye item
// export async function removeFromWishListAction(productId: string) {
//   const token = await getUserToken();
//   const res = await fetch(
//     `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
//     {
//       method: "DELETE",
//       headers: {
//         token: token + "",
//       },
//     }
//   );
//   const data = await res.json();
//   return data;
// }

// // add adress
// export async function addAdress(
//   name: string,
//   details: string,
//   phone: string,
//   city: string
// ) {
//   const token = await getUserToken();
//   const res = await fetch(`https://ecommerce.routemisr.com/api/v1/addresses`, {
//     method: "POST",
//     headers: {
//       token: token + "",
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ name, details, phone, city }),
//   });
//   return res.json();
// }

// // remove adress
// export async function removeAdress(id: string) {
//   const token = await getUserToken();
//   const res = await fetch(
//     `https://ecommerce.routemisr.com/api/v1/addresses/${id}`,
//     {
//       method: "DELETE",
//       headers: {
//         token: token + "",
//       },
//     }
//   );
//   const data = await res.json();
//   return data;
// }

// // chek out visa
// export async function visaChekOut(cartId: string, shippingAddress: IShippingAddress) {
//   const token = await getUserToken();
//   const response = await fetch(
//     `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,
//     {
//       method: "POST",
//       body: JSON.stringify({ shippingAddress }),
//       headers: {
//         token: token + "",
//         "Content-Type": "application/json",
//       },
//     }
//   );
//   const data = await response.json();
//   return data;
// }

// // chek out cash on delevry
// export async function cashChekOut(cartId: string, shippingAddress: IShippingAddress) {
//   const token = await getUserToken();
//   const response = await fetch(
//     `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
//     {
//       method: "POST",
//       body: JSON.stringify({ shippingAddress }),
//       headers: {
//         token: token + "",
//         "Content-Type": "application/json",
//       },
//     }
//   );
//   const data = await response.json();
//   return data;
// }

// //remove from cart
// export async function removeFromCart(productId: string) {
//   const token = await getUserToken();
//   const response = await fetch(
//     `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
//     {
//       method: "DELETE",
//       headers: {
//         token: token + "",
//       },
//     }
//   );
//   const data: cartResponse = await response.json();
//   return data;
// }

// //update number of items in cart
// export async function updateQuantayyCart(productId: string, count: number) {
//   const token = await getUserToken();
//   const response = await fetch(
//     `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
//     {
//       method: "PUT",
//       body: JSON.stringify({ count }),
//       headers: {
//         token: token + "",
//         "Content-Type": "application/json",
//       },
//     }
//   );
//   const data: cartResponse = await response.json();
//   return data;
// }

// // clear cart
// export async function clearCartItems() {
//   const token = await getUserToken();
//   const response = await fetch(`https://ecommerce.routemisr.com/api/v1/cart`, {
//     method: "DELETE",
//     headers: {
//       token: token + "",
//       "Content-Type": "application/json",
//     },
//   });
//   const data = await response.json();
//   return data;
// }


// app/_actions/CartAndProduct.ts
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
export async function visaChekOut(cartId: string, shippingAddress: IShippingAddress) {
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
export async function cashChekOut(cartId: string, shippingAddress: IShippingAddress) {
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
export async function addAddress(name: string, details: string, phone: string, city: string) {
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
