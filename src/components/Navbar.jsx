import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useUser } from "../context/UserContext";
import { useState } from "react";

  const { cart } = useCart();
  const { user, logout } = useUser();
  const [open, setOpen] = useState(false);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-blue-700 via-pink-500 to-yellow-400 text-white shadow-lg">
      <div className="container mx-auto flex justify-between items-center py-4 px-2">
        <Link to="/" className="font-extrabold text-2xl tracking-wide hover:text-yellow-200 transition">MyStore</Link>
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          <span className="material-icons">menu</span>
        </button>
        <div className={`flex-col md:flex-row gap-6 items-center md:flex ${open ? "flex" : "hidden"} md:static absolute top-full left-0 w-full md:w-auto bg-gradient-to-r from-blue-700 via-pink-500 to-yellow-400 md:bg-none`}>
          <Link to="/cart" className="relative font-semibold hover:text-yellow-200 transition">
            Cart
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-4 bg-red-600 text-white text-xs rounded-full px-2">{cartCount}</span>
            )}
          </Link>
          <Link to="/orders" className="hover:text-yellow-200 transition">My Orders</Link>
          {user?.is_admin && (
            <Link to="/admin" className="hover:text-yellow-200 font-bold transition">Admin Dashboard</Link>
          )}
          {user ? (
            <>
              <Link to="/profile" className="hover:text-yellow-200 transition">Profile</Link>
              <span className="font-semibold hidden sm:inline">Welcome, {user.firstname}</span>
              <button
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                className="bg-red-600 px-3 py-1 rounded hover:bg-red-700 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-yellow-200 transition">Login</Link>
              <Link to="/register" className="hover:text-yellow-200 transition">Register</Link>
            </>
          )}
          <Link to="/contact" className="hover:text-yellow-200 transition">Contact Us</Link>
        </div>
      </div>
    </nav>
  );
}