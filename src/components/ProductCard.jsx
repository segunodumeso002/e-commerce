import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import ThemedButton from "./ThemedButton";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  return (
  <div className="glass-card flex flex-col items-center justify-between hover:scale-105 hover:shadow-2xl transition-transform duration-200" style={{ width: '270px', height: '340px', fontFamily: 'Poppins, sans-serif' }}>
      <img
        src={product.image || "https://placehold.co/250x250?text=Product"}
        alt={product.name}
        className="mb-2 rounded-xl object-cover w-40 h-40 shadow-lg hover:scale-110 transition-transform duration-200"
        onClick={() => navigate(`/product/${product.id}`)}
        style={{ cursor: "pointer" }}
      />
      <h3 className="font-bold text-lg text-indigo-700 mb-1 text-center truncate w-full" style={{ fontFamily: 'Poppins, sans-serif' }}>{product.name}</h3>
      {product.category && (
        <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-pink-100 text-pink-600 mb-2">{product.category}</span>
      )}
      <p className="text-gray-700 mb-2 text-lg font-semibold">${product.price}</p>
      <ThemedButton onClick={() => addToCart(product)} className="mt-2 modern-btn" style={{ width: '70%' }}>
        Add to Cart
      </ThemedButton>
    </div>
  );
}