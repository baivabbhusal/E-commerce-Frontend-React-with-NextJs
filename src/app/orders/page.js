"use client";

import { getOrdersByUser } from "@/api/orders";
import { useEffect, useState } from "react";
import OrderCard from "./_components/Card";
import Spinner from "@/components/Spinner";
import {
  ORDER_STATUS_CONFIRMED,
  ORDER_STATUS_DELIVERED,
  ORDER_STATUS_PENDING,
  ORDER_STATUS_SHIPPED,
} from "@/constants/orderStatus";
import { useRouter, useSearchParams } from "next/navigation";
import { ORDER_ROUTE } from "@/constants/routes";
import { toast } from "react-toastify";

const orderStatuses = [
  ORDER_STATUS_PENDING,
  ORDER_STATUS_CONFIRMED,
  ORDER_STATUS_SHIPPED,
  ORDER_STATUS_DELIVERED,
];

const OrdersPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const statusParam =
    searchParams.get("status") || ORDER_STATUS_PENDING;

  const paymentStatus = searchParams.get("payment");

  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [isUpdated, setIsUpdated] = useState(true);

  // 🔁 Fetch orders
  const fetchOrders = () => {
    setLoading(true);

    getOrdersByUser(statusParam)
      .then((response) => setOrders(response.data))
      .catch(() => {
        toast.error("Failed to load orders");
      })
      .finally(() => {
        setLoading(false);
        setIsUpdated(false);
      });
  };

  // 🔁 React to URL changes
  useEffect(() => {
    fetchOrders();
  }, [statusParam]);

  // 🔁 External updates (payment confirmation)
  useEffect(() => {
    if (!isUpdated) return;
    fetchOrders();
  }, [isUpdated]);

  // ✅ Handle payment feedback
  useEffect(() => {
    if (paymentStatus === "success") {
      toast.success("Payment successful 🎉");
      router.replace(`${ORDER_ROUTE}?status=${ORDER_STATUS_CONFIRMED}`);
    }

    if (paymentStatus === "failed") {
      toast.error("Payment failed");
      router.replace(`${ORDER_ROUTE}?status=${ORDER_STATUS_PENDING}`);
    }
  }, [paymentStatus]);

  return (
    <section className="py-10">
      <h1 className="text-3xl font-semibold mb-5 dark:text-white">
        Order items
      </h1>

      {/* Status tabs */}
      <div className="grid grid-cols-4 my-4 border-b border-gray-200 dark:border-gray-700">
        {orderStatuses.map((orderStatus) => (
          <button
            key={orderStatus}
            className={
              orderStatus === statusParam
                ? "text-xs md:text-sm font-medium text-secondary py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
                : "text-xs md:text-sm font-medium dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
            }
            onClick={() =>
              router.push(`${ORDER_ROUTE}?status=${orderStatus}`)
            }
          >
            {orderStatus}
          </button>
        ))}
      </div>

      {/* Orders list */}
      <div className="grid grid-cols-1 gap-6">
        {loading ? (
          <div className="py-10 flex justify-center">
            <Spinner className="w-10 h-10 fill-secondary" />
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center">No order items.</div>
        ) : (
          orders.map((order) => (
            <OrderCard
              key={order._id}
              order={order}
              setIsUpdated={setIsUpdated}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default OrdersPage;
