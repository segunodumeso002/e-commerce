import { useCart } from "../context/CartContext";
import { useUser } from "../context/UserContext";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ThemedButton from "../components/ThemedButton";
import Alert from "../components/Alert";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const { user } = useUser();
  const [shippingType, setShippingType] = useState("delivery");
  const [shipping, setShipping] = useState({ address: "" });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();

  function handleChange(e) {
    setShipping({ ...shipping, [e.target.name]: e.target.value });
  }

  async function handleOrder(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/api/orders",
        {
          items: cart,
          shipping: { ...shipping, type: shippingType },
          userId: user?.id,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      clearCart();
      setAlert({ type: "success", message: "Order placed successfully!" });
      setTimeout(() => navigate("/orders"), 1200);
    } catch {
      setAlert({ type: "error", message: "Order failed. Try again." });
    }
    setLoading(false);
  }

  return (
    <div className="max-w-lg mx-auto p-8 bg-white rounded-xl shadow-2xl mt-8">
      <h1 className="text-3xl font-extrabold mb-6 text-blue-700 text-center">
        Checkout
      </h1>
      {alert && <Alert type={alert.type} message={alert.message} />}
      <form onSubmit={handleOrder}>
        <div className="mb-4">
          <label className="font-semibold mr-4">Choose:</label>
          <label className="mr-4">
            <input
              type="radio"
              name="shippingType"
              value="delivery"
              checked={shippingType === "delivery"}
              onChange={() => setShippingType("delivery")}
              className="mr-2"
            />
            Delivery
          </label>
          <label>
            <input
              type="radio"
              name="shippingType"
              value="pickup"
              checked={shippingType === "pickup"}
              onChange={() => setShippingType("pickup")}
              className="mr-2"
            />
            Pickup
          </label>
        </div>
        {shippingType === "delivery" && (
          <input
            name="address"
            value={shipping.address}
            onChange={handleChange}
            placeholder="Full Billing Address"
            className="mb-4 w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
            required
          />
        )}
        <ThemedButton className="w-full" disabled={loading}>
          {loading ? "Placing Order..." : "Place Order"}
        </ThemedButton>
        <ThemedButton
          className="w-full mt-2 bg-gray-400 hover:bg-gray-500"
          type="button"
          onClick={() => navigate("/")}
        >
          Cancel
        </ThemedButton>
      </form>
    </div>
  );
}