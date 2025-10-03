"use client";

import CardContainer from "@/_components/components/Card/CardContainer";
import { useWishlist } from "@/_components/components/context/WishListContext";

export default function WishlistPage() {
  const { wishlist } = useWishlist();

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-amber-400 md:py-8">
        My Wishlist
      </h1>

      {wishlist.length === 0 ? (
        <p className="text-center text-gray-500">Your wishlist is empty.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {wishlist.map((product) => (
            <CardContainer key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
