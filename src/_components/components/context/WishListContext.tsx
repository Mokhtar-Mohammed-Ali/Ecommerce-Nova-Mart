
"use client";

import { IProduct } from "@/_components/interFaces/productsInterFace";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface WishlistContextType {
  wishlist: IProduct[];
  
  loading: boolean;
  getWishlist: () => Promise<void>;
  isInWishlist: (productId: string) => boolean;
}

export const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const session = useSession();
  const router = useRouter();
console.log(wishlist)
  // GET wishlist
  async function getWishlist() {
    if (session.status !== "authenticated") return;

    try {
      setLoading(true);
      const res = await fetch(`/api/wishlist`);
      if (!res.ok) throw new Error("Failed to fetch wishlist");

      const data = await res.json();
      setWishlist(data.data || []);
    } catch (err) {
      console.error("Error fetching wishlist:", err);
      setWishlist([]);
    } finally {
      setLoading(false);
    }
  }

  function isInWishlist(productId: string) {
    return wishlist.some((item) => item._id === productId);
  }

  useEffect(() => {
    getWishlist();
  }, [session.status]);

  return (
    <WishlistContext.Provider
      value={{ wishlist, loading, getWishlist, isInWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) throw new Error("useWishlist must be used within WishlistProvider");
  return context;
}
