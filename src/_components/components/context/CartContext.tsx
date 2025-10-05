
// "use client";

// import { cartResponse } from "@/_components/interFaces/CartInterFace";
// import { useSession } from "next-auth/react";
// import { createContext, ReactNode, useEffect, useState } from "react";

// interface CartContextType {
//   cartData: cartResponse | null;
//   loading: boolean;
//   getCartPrduct: () => Promise<void>;
//   setCartData: (data: cartResponse | null) => void;
// }

// export const CartContext = createContext<CartContextType>({
//   cartData: null,
//   loading: true,
//   getCartPrduct: async () => {},
//   setCartData: () => {},
// });

// export default function CartContextProvider({ children }: { children: ReactNode }) {
//   const [cartData, setCartData] = useState<cartResponse | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);

//   const session = useSession();
// console.log(cartData)
//   // GET Cart
//   async function getCartPrduct() {
//     if (session.status !== "authenticated") {
//       setCartData(null);
//       setLoading(false);
//       return;
//     }

//     try {
//       setLoading(true);
//       const res = await fetch(`/api/get-cart`);
//       if (!res.ok) throw new Error("Failed to fetch cart");

//       const data: cartResponse = await res.json();
//       setCartData(data || null);
//     } catch (err) {
//       console.error("Error fetching cart:", err);
//       setCartData(null);
//     } finally {
//       setLoading(false);
//     }
//   }

//   useEffect(() => {
//     getCartPrduct();
//   }, [session.status]);

//   return (
//     <CartContext.Provider value={{ cartData, loading, getCartPrduct, setCartData }}>
//       {children}
//     </CartContext.Provider>
//   );
// }









"use client";

import { cartResponse } from "@/_components/interFaces/CartInterFace";
import { useSession } from "next-auth/react";
import { createContext, ReactNode, useEffect, useState, useCallback } from "react";

interface CartContextType {
  cartData: cartResponse | null;
  loading: boolean;
  getCartPrduct: () => Promise<void>; // نفس الاسم اللي عندك
  setCartData: (data: cartResponse | null) => void;
}

export const CartContext = createContext<CartContextType>({
  cartData: null,
  loading: true,
  getCartPrduct: async () => {},
  setCartData: () => {},
});

export default function CartContextProvider({ children }: { children: ReactNode }) {
  const [cartData, setCartData] = useState<cartResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const session = useSession();

  const getCartPrduct = useCallback(async () => {
    if (session.status !== "authenticated") {
      setCartData(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/get-cart");
      if (!res.ok) throw new Error("Failed to fetch cart");

      const data: cartResponse = await res.json();
      setCartData(data || null);
    } catch (err) {
      console.error("Error fetching cart:", err);
      setCartData(null);
    } finally {
      setLoading(false);
    }
  }, [session.status]);

  useEffect(() => {
    if (session.status === "authenticated") {
      getCartPrduct();
    } else if (session.status === "unauthenticated") {
      setCartData(null);
      setLoading(false);
    }
  }, [session.status, getCartPrduct]);

  return (
    <CartContext.Provider value={{ cartData, loading, getCartPrduct, setCartData }}>
      {children}
    </CartContext.Provider>
  );
}
