"use client";

import { IOrder } from "@/_components/interFaces/UserOrdersInterface";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import Image from "next/image";

export default function AllOrdersPage() {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(true);

  async function getUserOrders() {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/orders/${userId}`);
      const data: IOrder[] = await response.json();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false); 
    }
  }

  useEffect(() => {
    getUserOrders();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center dark:text-amber-300">
        My Orders
      </h1>

      {loading ? (
        <p className="text-center text-gray-600">Loading your orders...</p> // 👈 يظهر الأول
      ) : orders.length === 0 ? (
        <p className="text-center text-gray-600">You have no orders yet.</p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {orders.map((order, index) => (
            <motion.div
              key={order._id}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              whileHover={{ scale: 1.03 }}
              className="cursor-pointer h-full"
            >
              <Card className="shadow-lg hover:shadow-2xl transition-shadow duration-300 rounded-2xl border border-gray-200 h-full flex flex-col">
                <CardHeader className="pb-2">
                  <CardTitle className="flex justify-between items-center">
                    <span className="font-bold text-lg">
                      Order #{order.id}
                    </span>
                    <span className="text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </span>
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4 flex-1 flex flex-col">
                  {/* User Info */}
                  <div>
                    <p className="text-sm text-gray-500">Customer</p>
                    <p className="font-semibold">
                      {order.user.name} ({order.user.email})
                    </p>
                  </div>

                  {/* Shipping */}
                  <div>
                    <p className="text-sm text-gray-500">Shipping</p>
                    <p className="font-medium">
                      {order.shippingAddress.details},{" "}
                      {order.shippingAddress.city}
                    </p>
                    <p className="text-sm text-gray-600">
                      Phone: {order.shippingAddress.phone}
                    </p>
                  </div>

                  {/* Total */}
                  <div className="flex justify-between items-center border-t pt-2">
                    <span className="font-semibold">Total:</span>
                    <span className="text-xl font-bold text-green-600">
                      ${order.totalOrderPrice}
                    </span>
                  </div>

                  {/* Status */}
                  <div className="flex justify-between items-center border-t pt-2 text-sm">
                    <span className="flex items-center gap-2">
                      Payment{" "}
                      {order.isPaid ? (
                        <Check className="text-green-600" />
                      ) : (
                        <X className="text-red-600" />
                      )}
                    </span>

                    <span className="flex items-center gap-2">
                      Delivered{" "}
                      {order.isDelivered ? (
                        <Check className="text-green-600" />
                      ) : (
                        <X className="text-red-600" />
                      )}
                    </span>
                  </div>

                  {/* Payment Method */}
                  <div className="mt-2 text-gray-600 text-sm">
                    Method:{" "}
                    <span className="font-medium capitalize">
                      {order.paymentMethodType}
                    </span>
                  </div>

                  {/* Cart Items */}
                  <div className="border-t pt-3 overflow-hidden flex-1 flex flex-col">
                    <p className="font-semibold mb-2">Items:</p>
                    <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                      {order.cartItems.map((item) => (
                        <motion.div
                          key={item._id}
                          whileHover={{ scale: 1.02 }}
                          className="flex items-center gap-3 p-2 border rounded-lg bg-gray-50"
                        >
                          <Image
                          width={300}
                          height={300}
                            src={item.product.imageCover}
                            alt={item.product.title}
                            className="w-14 h-14 rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <p className="font-medium text-sm">
                              {item.product.title}
                            </p>
                            <p className="text-xs text-gray-600">
                              {item.count} × ${item.price}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
