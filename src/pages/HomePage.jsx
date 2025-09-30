import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";

const categories = ["All", "Electronics", "Books", "Fashion"];

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/products`)
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  const filtered = products.filter(
    p =>
      (selectedCategory === "All" || p.category === selectedCategory) &&
      p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col md:flex-row gap-8 max-w-7xl mx-auto py-8">
      {/* Sidebar */}
      <aside className="md:w-1/4 w-full bg-white rounded-xl shadow-lg p-6 mb-6 md:mb-0">
        <h2 className="font-bold mb-4 text-xl text-blue-700">Categories</h2>
        <ul className="space-y-2">
          {categories.map(cat => (
            <li key={cat}>
              <button
                className={`w-full text-left px-2 py-1 rounded hover:bg-blue-50 hover:text-blue-600 transition ${selectedCategory === cat ? "font-bold text-blue-600 bg-blue-100" : ""}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            </li>
          ))}
        </ul>
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="mt-6 w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
      </aside>
      {/* Product Grid */}
      <div className="flex-1">
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            <div className="col-span-full text-center text-lg text-gray-500">Loading...</div>
          ) : filtered.length === 0 ? (
            <div className="col-span-full text-center text-lg text-gray-500">No products found.</div>
          ) : (
            filtered.map(product => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </section>
      </div>
    </div>
  );
}