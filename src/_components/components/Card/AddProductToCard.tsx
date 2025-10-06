
"use client";

import { CardFooter } from "@/components/ui/card";
import { HeartMinus, HeartPlus, Loader, ShoppingCartIcon } from "lucide-react";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { CartContext } from "../context/CartContext";
import { Button as Button1 } from "@/_components/ui/moving-border";
import { IProduct } from "@/_components/interFaces/productsInterFace";
import { useWishlist } from "../context/WishListContext";
import {
  addToCartAction,
  addToWishListAction,
  removeFromWishListAction,
} from "../_actions/CartAndProduct";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AddProductToCard({ product }: { product: IProduct }) {
  const [loadingCart, setLoadingCart] = useState(false);
  const [loadingWishlist, setLoadingWishlist] = useState(false);

  const { setCartData } = useContext(CartContext);
  const { isInWishlist, getWishlist } = useWishlist(); // ✅ استخدم getWishlist بدل setWishlist
  const session = useSession();
  const router = useRouter();

  const inWishlist = isInWishlist(product._id);

  // Add product to cart
  async function handleAddToCart() {
    if (session.status !== "authenticated") {
      router.push("/login");
      return;
    }

    try {
      setLoadingCart(true);
      const data = await addToCartAction(product._id);
      setCartData(data);
      if (data.status === "success") toast.success(data.message);
      else toast.error(data.message || "Failed to add to cart");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setLoadingCart(false);
    }
  }

  // Add or remove from wishlist
  async function handleWishlist() {
    if (session.status !== "authenticated") {
      router.push("/login");
      return;
    }

    try {
      setLoadingWishlist(true);
      if (inWishlist) {
        const data = await removeFromWishListAction(product._id);
        if (data.status === "success") {
          toast.success("Removed from wishlist ❤️‍🔥");
          await getWishlist(); // ✅ تحديث البيانات من السيرفر
        } else toast.error(data.message || "Failed to remove from wishlist");
      } else {
        const data = await addToWishListAction(product._id);
        if (data.status === "success") {
          toast.success("Added to wishlist 💖");
          await getWishlist(); // ✅ تحديث البيانات من السيرفر
        } else toast.error(data.message || "Failed to add to wishlist");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setLoadingWishlist(false);
    }
  }

  return (
    <CardFooter className="relative">
      <div className="flex w-full justify-between gap-3 items-center">
        {/*  Add to Cart Button */}
        <Button1
          disabled={loadingCart}
          onClick={handleAddToCart}
          className="relative text-amber-200 hover:text-amber-500 cursor-pointer bg-black transition-colors duration-300"
        >
          {loadingCart ? (
            <Loader className="animate-spin" />
          ) : (
            <ShoppingCartIcon className="mr-2 h-4 w-4" />
          )}
          Add To Cart
        </Button1>

        {/* ❤️ Wishlist Button */}
        <button
          onClick={handleWishlist}
          disabled={loadingWishlist}
          className={`relative cursor-pointer transition-all duration-300 inline-flex items-center justify-center w-10 h-10 rounded-full ${
            inWishlist ? "bg-red-500" : "bg-transparent hover:bg-red-500"
          }`}
        >
          {loadingWishlist ? (
            <Loader className="animate-spin w-6 h-6 text-white" />
          ) : inWishlist ? (
            <HeartMinus className="w-6 h-6 text-white transition-colors duration-300" />
          ) : (
            <HeartPlus className="w-6 h-6 text-gray-500 transition-colors duration-300 hover:text-white" />
          )}
        </button>
      </div>
    </CardFooter>
  );
}

