'use client';

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Loader } from "lucide-react";
import { useProducts } from "@/hooks/products"; 
import { useAppDispatch } from "@/redux/hooks"; 
import { addToCart } from "@/redux/cartSlice";
import { getUserOrders, OrderResponse } from "@/services/orders";

const UserPage = () => {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const dispatch = useAppDispatch();

  // Fetch products (use "All" for all categories)
  const { data: products, isLoading: productsLoading } = useProducts("All");

  // Recent orders state
  const [orders, setOrders] = useState<OrderResponse[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);

  // Redirect to login if not signed in
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user, router]);

  // Fetch recent orders
  useEffect(() => {
    if (user) {
      const fetchOrders = async () => {
        try {
          const data = await getUserOrders();
          setOrders(data.slice(0, 3)); // show 3 most recent
        } catch (err) {
          console.error("Failed to fetch orders", err);
        } finally {
          setOrdersLoading(false);
        }
      };
      fetchOrders();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader className="animate-spin w-8 h-8 text-indigo-600" />
      </div>
    );
  }

  // Add product to cart
  const handleAddToCart = (productId: number) => {
    dispatch(addToCart({ productId, quantity: 1 }));
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Top Header */}
      <div className="bg-indigo-600 py-6 px-8 flex justify-between items-center shadow-md">
        <h1 className="text-3xl font-bold text-white">MyShop Dashboard</h1>
        <button
          onClick={logout}
          className="bg-white text-indigo-600 px-4 py-2 rounded-md font-semibold hover:bg-indigo-50 transition"
        >
          Logout
        </button>
      </div>

      <div className="container mx-auto px-6 py-10">
        {/* Profile Section */}
        <div className="bg-white rounded-xl shadow-md p-6 flex items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-indigo-500 text-white flex items-center justify-center text-4xl font-bold">
            {user?.username.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Hello, <span className="text-indigo-600">{user?.username || "User"}</span> 👋
            </h2>
            <p className="text-gray-600 mt-1">
              Role: <span className="font-semibold">{user?.role}</span>
            </p>
            <p className="text-gray-500 text-sm mt-1">Member since: Jan 2025</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          <div
            onClick={() => router.push("/orders")}
            className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg shadow cursor-pointer p-6 text-center transition transform hover:scale-105 hover:shadow-xl"
          >
            <h3 className="text-xl font-bold text-indigo-700 mb-2">📦 Your Orders</h3>
            <p className="text-gray-700">Track, return, or buy again</p>
          </div>
          <div
            onClick={() => router.push("/products")}
            className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-lg shadow cursor-pointer p-6 text-center transition transform hover:scale-105 hover:shadow-xl"
          >
            <h3 className="text-xl font-bold text-teal-700 mb-2">🛒 Shop More</h3>
            <p className="text-gray-700">Explore similar products</p>
          </div>
          <div
            onClick={() => router.push("/settings")}
            className="bg-gradient-to-br from-rose-50 to-rose-100 rounded-lg shadow cursor-pointer p-6 text-center transition transform hover:scale-105 hover:shadow-xl"
          >
            <h3 className="text-xl font-bold text-rose-700 mb-2">⚙️ Account Settings</h3>
            <p className="text-gray-700">Manage profile & security</p>
          </div>
        </div>

        {/* Recent Orders Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Your Recent Orders</h2>
          <div className="bg-white rounded-lg shadow p-6">
            {ordersLoading ? (
              <div className="flex justify-center">
                <Loader className="animate-spin w-6 h-6 text-indigo-600" />
              </div>
            ) : orders.length === 0 ? (
              <p className="text-gray-600">You haven't placed any orders yet.</p>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order.orderId}
                    className="flex justify-between items-center border-b last:border-none pb-2"
                  >
                    <div>
                      <p className="font-semibold text-gray-800">Order #{order.orderId}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-600">
                        {order.items.map((i) => i.productName).join(", ")}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-800">
                        ${order.totalAmount.toFixed(2)}
                      </p>
                      <span
                        className={`text-xs font-semibold px-2 py-1 rounded ${
                          order.status === "Delivered"
                            ? "bg-green-100 text-green-700"
                            : order.status === "Processing"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Recommended Products Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Recommended For You</h2>
          {productsLoading ? (
            <div className="flex justify-center py-6">
              <Loader className="animate-spin w-6 h-6 text-indigo-600" />
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {products?.slice(0, 4).map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow hover:shadow-lg p-4 transition transform hover:scale-105"
                >
                  <div
                    className="h-32 bg-gray-200 rounded mb-4 overflow-hidden flex items-center justify-center cursor-pointer"
                    onClick={() => router.push(`/products/${product.id}`)}
                  >
                    {product.imageUrl ? (
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="object-cover h-full w-full"
                      />
                    ) : (
                      <span className="text-gray-500">No Image</span>
                    )}
                  </div>
                  <h3
                    onClick={() => router.push(`/products/${product.id}`)}
                    className="font-semibold text-sm text-gray-800 truncate cursor-pointer"
                  >
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm">${product.price}</p>
                  
                  <button
                    onClick={() => handleAddToCart(product.id)}
                    className="mt-2 w-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm py-1 rounded transition"
                  >
                    ➕ Add to Cart
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserPage;
