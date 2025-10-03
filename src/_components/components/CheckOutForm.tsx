
"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader, X } from "lucide-react";
import Loading from "@/app/loading";
import toast from "react-hot-toast";
import { IShippingAddress } from "../interFaces/UserOrdersInterface";
import { cashChekOut, visaChekOut } from "./_actions/CartAndProduct";

type CheckoutDialogProps = {
  open: boolean;
  onClose: () => void;
  cartId?: string | null;
};

export default function CheckoutDialog({
  open,
  onClose,
  cartId,
}: CheckoutDialogProps) {
  const cityRef = useRef<HTMLInputElement | null>(null);
  const phoneRef = useRef<HTMLInputElement | null>(null);
  const detailsRef = useRef<HTMLTextAreaElement | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 🔹 validate inputs
  function validate(shippingAddress: IShippingAddress): boolean {
    if (!/^[A-Za-z\s]{2,50}$/.test(shippingAddress.city)) {
      setError("City invalid — أدخل اسم مدينة صحيح.");
      return false;
    }
    if (!/^\+?[0-9\s\-()]{7,20}$/.test(shippingAddress.phone)) {
      setError("Phone invalid — أدخل رقم تليفون صحيح.");
      return false;
    }
    if (shippingAddress.details.length < 5) {
      setError("Address/details too short.");
      return false;
    }
    return true;
  }

  // 🔹 common function
  async function handleCheckout(
    e: React.FormEvent,
    method: "card" | "cash"
  ) {
    e.preventDefault();
    setError(null);

    const shippingAddress: IShippingAddress = {
      city: cityRef.current?.value.trim() ?? "",
      phone: phoneRef.current?.value.trim() ?? "",
      details: detailsRef.current?.value.trim() ?? "",
    };

    if (!validate(shippingAddress)) return;

    setLoading(true);

    try {
      let data;

      if (method === "card") {
        // Visa / Online payment
       data = await visaChekOut(cartId!,shippingAddress)
      } else {
        // Cash on Delivery
        data = await cashChekOut(cartId!,shippingAddress)
}
   

      if (method === "card" && data.status === "success") {
        location.href = data.session.url;
      } else if (method === "cash" && data.status === "success") {
        toast.success("Order placed successfully (Cash on Delivery)!");
        onClose();
      } else {
        setError(data.message || "Something went wrong!");
      }
    } catch (err) {
      console.error(err);
      setError("Error while processing order");
    } finally {
      setLoading(false);
    }
  }

  return loading ? (
    <Loading />
  ) : (
    <AnimatePresence>
      {open && (
        <motion.div
          key="backdrop"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            key="dialog"
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ duration: 0.28 }}
            className="w-full max-w-lg bg-gray-900 rounded-2xl shadow-xl p-6 relative"
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
            >
              <X size={20} />
            </button>

            <h3 className="text-center text-amber-500 text-2xl font-semibold mb-4">
              Proceed to Checkout
            </h3>

            <form className="space-y-4">
              <div>
                <label className="block text-sm text-gray-300 mb-1">
                  Country / City
                </label>
                <input
                  ref={cityRef}
                  type="text"
                  placeholder="Cairo"
                  className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-1">Phone</label>
                <input
                  ref={phoneRef}
                  type="tel"
                  placeholder="+20 1XXXXXXXXX"
                  className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-1">
                  Address / Details
                </label>
                <textarea
                  ref={detailsRef}
                  rows={3}
                  placeholder="Street, building, floor..."
                  className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                />
              </div>

              {error && <div className="text-sm text-red-400">{error}</div>}

              <div className="flex flex-col sm:flex-row justify-between gap-4 mt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600 transition"
                  disabled={loading}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  onClick={(e) => handleCheckout(e, "cash")}
                  disabled={loading}
                  className="flex-1 px-5 py-2 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition shadow-md disabled:opacity-60 inline-flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <Loader className="animate-spin" />
                  ) : (
                    "Cash on Delivery"
                  )}
                </button>

                <button
                  type="submit"
                  onClick={(e) => handleCheckout(e, "card")}
                  disabled={loading}
                  className="flex-1 px-5 py-2 rounded-lg bg-amber-600 text-black font-semibold hover:bg-amber-700 transition shadow-md disabled:opacity-60 inline-flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <Loader className="animate-spin" />
                  ) : (
                    "Pay with Card"
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
