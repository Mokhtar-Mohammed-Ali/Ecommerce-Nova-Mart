
"use client";

import { useEffect, useContext, useState } from "react";
import { CartContext } from "@/_components/components/context/CartContext";
import Loading from "@/app/loading";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import formatCurrency from "@/helpers/formatCurrency";
import { motion } from "framer-motion";
import { Trash2, Plus, Minus, Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { Button as Button1 } from "@/_components/ui/moving-border";
import CheckoutDialog from "@/_components/components/CheckOutForm";
import {
  removeFromCart,
  updateQuantayyCart,
  clearCartItems,
} from "@/_components/components/_actions/CartAndProduct";

export default function CartPage() {
  const [removeId, setRemoveId] = useState<string | null>(null);
  const [updatedId, setUpdatedId] = useState<string | null>(null);
  const [clearCart, setClearCart] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const { cartData, loading, getCartPrduct, setCartData } =
    useContext(CartContext);

  // ✅ استدعاء الداتا عند أول تحميل أو لو الـ products فيها IDs بس
  useEffect(() => {
    if (
      cartData?.data?.products &&
      cartData.data.products.length > 0 &&
      typeof cartData.data.products[0].product === "string"
    ) {
      getCartPrduct();
    }
  }, [cartData, getCartPrduct]);

  // ✅ حذف منتج من الكارت
  async function RemoveProduct(productId: string) {
    setRemoveId(productId);
    try {
      const data = await removeFromCart(productId);
      setCartData(data);
      if (data.status === "success") toast.success("Product removed");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setRemoveId(null);
    }
  }

  // ✅ تعديل عدد المنتج
  async function UpdateProductCount(productId: string, count: number) {
    setUpdatedId(productId);
    try {
      const data = await updateQuantayyCart(productId, count);
      setCartData(data);
      if (data.status === "success") toast.success("Quantity updated");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setUpdatedId(null);
    }
  }

  // ✅ مسح الكارت بالكامل
  async function ClearCart() {
    setClearCart(true);
    try {
      const data = await clearCartItems();
      if (data.message === "success") {
        await getCartPrduct();
        toast.success("Cart cleared");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setClearCart(false);
    }
  }

  // ✅ واجهة العرض
  return (
    <>
      {loading ||
      !cartData?.data?.products ||
      (cartData.data.products.length > 0 &&
        typeof cartData.data.products[0].product === "string") ? (
        <Loading />
      ) : (cartData?.data?.products?.length ?? 0) > 0 ? (
        <div className="min-h-screen dark:bg-black py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col mb-6 gap-1.5">
              <motion.h1
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="text-3xl font-bold dark:text-amber-700"
              >
                Your Cart
              </motion.h1>

              <motion.p
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="font-bold dark:text-amber-300"
              >
                ({cartData?.numOfCartItems}) items in your cart
              </motion.p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 min-h-screen">
              {/* 🧩 الجزء الأيسر - المنتجات */}
              <div className="md:col-span-2 space-y-4">
                {cartData?.data.products.map((item) => (
                  <motion.div
                    key={item._id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Card className="flex flex-col sm:flex-row items-center gap-4 p-4 shadow-sm hover:shadow-md transition bg-gray-100 dark:bg-gray-900">
                      <Image
                        src={item.product.imageCover}
                        alt={item.product.title}
                        width={120}
                        height={120}
                        className="rounded-lg object-cover"
                      />
                      <CardContent className="flex-1 space-y-2">
                        <h2 className="font-semibold text-lg text-gray-900 dark:text-emerald-300">
                          {item.product.title}
                        </h2>
                        <p className="text-sm text-blue-950 dark:text-amber-300">
                          {item.product.brand.name} / {item.product.category.name}
                        </p>
                        <p className="font-bold text-red-500 dark:text-amber-600">
                          {formatCurrency(Number(item.price))}
                        </p>

                        <div className="flex items-center gap-3">
                          <Button
                            disabled={item.count == 1}
                            onClick={() =>
                              UpdateProductCount(item.product._id, item.count - 1)
                            }
                            size="icon"
                            variant="ghost"
                            className="cursor-pointer rounded-full text-emerald-600 font-bold border-1"
                          >
                            <Minus size={14} />
                          </Button>

                          <span className="font-medium text-amber-400">
                            {updatedId == item.product.id ? (
                              <Loader className="animate-spin" />
                            ) : (
                              item.count
                            )}
                          </span>

                          <Button
                            onClick={() =>
                              UpdateProductCount(item.product._id, item.count + 1)
                            }
                            size="icon"
                            variant="ghost"
                            className="cursor-pointer rounded-full text-amber-600 font-bold border-1"
                          >
                            <Plus size={14} />
                          </Button>
                        </div>
                      </CardContent>

                      <Button1
                        onClick={() => RemoveProduct(item.product.id)}
                        variant="ghost"
                        className="text-red-400 bg-gray-900 cursor-pointer hover:bg-red-700 hover:text-gray-900 text-xl transition"
                      >
                        {removeId == item.product.id ? (
                          <Loader className="animate-spin text-red-500" />
                        ) : (
                          <>
                            <Trash2 className="mr-1 h-4 w-4" /> Remove
                          </>
                        )}
                      </Button1>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* 🧾 الجزء الأيمن - الملخص */}
              <motion.div
                initial={{ x: 30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                <Card className="p-6 shadow-md bg-gray-100 dark:bg-gray-900">
                  <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-amber-300">
                    Order Summary
                  </h2>

                  <div className="flex justify-between mb-2">
                    <span className="dark:text-emerald-300">
                      Subtotal ({cartData?.numOfCartItems}) items
                    </span>
                    <span className="font-medium text-gray-800 dark:text-amber-300">
                      {formatCurrency(Number(cartData?.data.totalCartPrice))}
                    </span>
                  </div>

                  <div className="flex justify-between mb-2">
                    <span className="text-gray-900 dark:text-amber-300">
                      Shipping
                    </span>
                    <span className="text-gray-900 dark:text-emerald-300">
                      Free
                    </span>
                  </div>

                  <hr className="my-3" />

                  <div className="flex justify-between text-lg font-bold mb-4">
                    <span className="text-gray-900 dark:text-emerald-500">
                      Total
                    </span>
                    <span className="text-gray-900 dark:text-emerald-300">
                      {formatCurrency(Number(cartData?.data.totalCartPrice))}
                    </span>
                  </div>

                  <div className="flex flex-col lg:flex-row gap-4 z-10">
                    <Link href="/products">
                      <Button1 className="text-xl capitalize cursor-pointer text-amber-300 hover:bg-amber-400 hover:text-emerald-900 transition">
                        Products
                      </Button1>
                    </Link>

                    <Button1
                      onClick={() => setOpenDialog(true)}
                      className="text-xl capitalize cursor-pointer text-emerald-300 hover:bg-emerald-500 hover:text-white transition"
                    >
                      Checkout
                    </Button1>
                  </div>
                </Card>

                {/* 🗑 زرار مسح الكارت كله */}
                <div className="flex items-center justify-center mt-3">
                  <Button1
                    onClick={ClearCart}
                    className="text-red-400 cursor-pointer hover:bg-red-600 hover:text-white duration-100 text-xl"
                  >
                    {clearCart ? (
                      <Loader className="animate-spin" />
                    ) : (
                      <>
                        <Trash2 className="mr-2 h-4 w-4" /> Clear All
                      </>
                    )}
                  </Button1>
                </div>

                <CheckoutDialog
                  open={openDialog}
                  onClose={() => setOpenDialog(false)}
                  cartId={cartData?.cartId}
                />
              </motion.div>
            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-screen flex items-center justify-center">
          <h2 className="capitalize text-3xl dark:text-orange-700">
            No items found
          </h2>
        </div>
      )}
    </>
  );
}
