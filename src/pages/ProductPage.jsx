import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";

const API_URL = import.meta.env.VITE_API_URL;

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    axios
      .get(`${API_URL}/api/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found.</div>;

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white rounded shadow">
      <Link
        to="/"
        className="text-blue-600 hover:underline mb-4 inline-block"
      >
        &larr; Back to Home
      </Link>
      <img
        src={product.image || "https://placehold.co/300x300?text=Product"}
        alt={product.name}
        className="mb-4 rounded w-full h-64 object-cover"
      />
      <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
      <p className="mb-2 text-gray-700">{product.description}</p>
      <p className="mb-2 font-semibold text-blue-600">${product.price}</p>
      <button
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={() => addToCart(product)}
      >
        Add to Cart
      </button>
    </div>
  );
}