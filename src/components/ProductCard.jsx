import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import ThemedButton from "./ThemedButton";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 flex flex-col items-center hover:shadow-2xl transition">
      <img
        src={product.image || "https://placehold.co/150x150?text=Product"}
        alt={product.name}
        className="mb-2 rounded h-32 object-cover w-full"
        onClick={() => navigate(`/product/${product.id}`)}
        style={{ cursor: "pointer" }}
      />
      <h3 className="font-semibold text-lg">{product.name}</h3>
      <p className="text-gray-600 mb-2">${product.price}</p>
      <ThemedButton onClick={() => addToCart(product)} className="w-full mt-2">
        Add to Cart
      </ThemedButton>
    </div>
  );
}