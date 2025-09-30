import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import ThemedButton from "../components/ThemedButton";

export default function CartPage() {
  const { cart, addToCart, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  function decreaseQuantity(item) {
    if (item.quantity > 1) {
      removeFromCart(item.id, true);
    }
  }

  function proceedToCheckout() {
    navigate("/checkout");
  }

  function goBackHome() {
    navigate("/");
  }

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded-xl shadow-2xl mt-8">
      <h1 className="text-3xl font-extrabold mb-6 text-blue-700 text-center">Shopping Cart</h1>
      {cart.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is currently empty.</p>
      ) : (
        <div>
          <ul className="divide-y">
            {cart.map(item => (
              <li key={item.id} className="flex items-center justify-between py-6">
                <div className="flex items-center gap-6">
                  <div className="overflow-hidden rounded-lg">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-lg transition-transform duration-200 ease-in-out hover:scale-125"
                      style={{ cursor: "zoom-in" }}
                    />
                  </div>
                  <div>
                    <div className="font-semibold text-lg">{item.name}</div>
                    <div className="text-gray-600">${item.price}</div>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        className="px-2 py-1 bg-gray-200 rounded"
                        onClick={() => decreaseQuantity(item)}
                        disabled={item.quantity === 1}
                      >-</button>
                      <span>{item.quantity}</span>
                      <button
                        className="px-2 py-1 bg-gray-200 rounded"
                        onClick={() => addToCart(item)}
                      >+</button>
                    </div>
                  </div>
                </div>
                <button
                  className="text-red-600 hover:underline"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-col md:flex-row justify-between items-center gap-4">
            <span className="font-bold text-xl">Total: ${total.toFixed(2)}</span>
            <div className="flex flex-col md:flex-row gap-4 justify-end">
              <ThemedButton className="bg-red-600 hover:bg-red-700" onClick={clearCart}>
                Clear Cart
              </ThemedButton>
              <ThemedButton className="bg-green-600 hover:bg-green-700" onClick={proceedToCheckout}>
                Proceed to Checkout
              </ThemedButton>
              <ThemedButton className="bg-gray-600 hover:bg-gray-700" onClick={goBackHome}>
                Back to Home
              </ThemedButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}