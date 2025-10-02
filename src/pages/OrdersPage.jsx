import { useEffect, useState } from "react";
import axios from "axios";
import ThemedButton from "../components/ThemedButton";
import Alert from "../components/Alert";

const API_URL = import.meta.env.VITE_API_URL;

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`${API_URL}/api/orders/my`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setOrders(Array.isArray(res.data) ? res.data : []);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setAlert({ type: "error", message: "Failed to load orders." });
      });
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-xl shadow-2xl mt-8">
      <h1 className="text-3xl font-extrabold mb-6 text-blue-700 text-center">
        My Orders
      </h1>
      {alert && orders.length > 0 && <Alert type={alert.type} message={alert.message} />}
      {loading ? (
        <div className="text-center text-blue-600 font-semibold">Loading...</div>
      ) : orders.length === 0 ? (
        <div className="text-center text-gray-500 text-lg">No orders found.</div>
      ) : (
        <ul className="space-y-6">
          {orders.map((order) => (
            <li
              key={order.id}
              className="border rounded-lg shadow p-4 bg-gradient-to-r from-blue-50 via-pink-50 to-yellow-50"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-lg text-blue-700">
                  Order #{order.id}
                </span>
                <span
                  className={`px-3 py-1 rounded-full font-semibold ${
                    order.status === "shipped"
                      ? "bg-green-200 text-green-800"
                      : "bg-yellow-200 text-yellow-800"
                  }`}
                >
                  {order.status}
                </span>
              </div>
              <div className="mb-2">
                <span className="font-semibold">Items:</span>
                <ul className="ml-4 list-disc">
                  {order.items.map((item, idx) => (
                    <li key={idx} className="text-gray-700">
                      {item.name}{" "}
                      <span className="font-bold">x {item.quantity}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mb-2">
                <span className="font-semibold">Shipping:</span>{" "}
                {order.shipping?.address}
              </div>
              {/* Example button for future actions */}
              {/* <div className="mt-4 text-right">
                <ThemedButton>Track Order</ThemedButton>
              </div> */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}