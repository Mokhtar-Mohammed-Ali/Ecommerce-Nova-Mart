
"use client";

import { IProduct } from "@/_components/interFaces/productsInterFace";
import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";
import { useSession } from "next-auth/react";

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

  const getWishlist = useCallback(async () => {
    if (session.status !== "authenticated") {
      setWishlist([]);
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/wishlist");
      if (!res.ok) throw new Error("Failed to fetch wishlist");

      const data = await res.json();
      setWishlist(data.data || []);
    } catch (err) {
      console.error("Error fetching wishlist:", err);
      setWishlist([]);
    } finally {
      setLoading(false);
    }
  }, [session.status]);

  const isInWishlist = (productId: string) => wishlist.some((item) => item._id === productId);

  useEffect(() => {
    if (session.status === "authenticated") {
      getWishlist();
    } else if (session.status === "unauthenticated") {
      setWishlist([]);
    }
  }, [session.status, getWishlist]);

  return (
    <WishlistContext.Provider value={{ wishlist, loading, getWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) throw new Error("useWishlist must be used within WishlistProvider");
  return context;
}
