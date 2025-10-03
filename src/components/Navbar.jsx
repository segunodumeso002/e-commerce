import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useUser } from "../context/UserContext";
import { useState } from "react";

export default function Navbar() {
  const { cart } = useCart();
  const { user, logout } = useUser();
  const [open, setOpen] = useState(false);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-blue-700 via-pink-500 to-yellow-400 text-white shadow-lg">
      <div className="container mx-auto flex justify-between items-center py-4 px-2">
        <Link to="/" className="font-extrabold text-3xl tracking-wide drop-shadow-lg hover:scale-105 transition-transform duration-200">MyStore</Link>
        <button className="md:hidden modern-btn" onClick={() => setOpen(!open)}>
          <span className="material-icons">menu</span>
        </button>
        <div className={`flex-col md:flex-row gap-6 items-center md:flex ${open ? "flex" : "hidden"} md:static absolute top-full left-0 w-full md:w-auto glass-card md:bg-none`}>
          <Link to="/cart" className="relative font-semibold modern-btn hover:scale-105 transition-transform duration-200">
            Cart
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-4 bg-red-600 text-white text-xs rounded-full px-2">{cartCount}</span>
            )}
          </Link>
          <Link to="/orders" className="modern-btn hover:scale-105 transition-transform duration-200">My Orders</Link>
          {user?.is_admin && (
            <Link to="/admin" className="modern-btn font-bold hover:scale-105 transition-transform duration-200">Admin Dashboard</Link>
          )}
          {user ? (
            <>
              <Link to="/profile" className="modern-btn hover:scale-105 transition-transform duration-200">Profile</Link>
              <span className="font-semibold hidden sm:inline text-pink-600">Welcome, {user.firstname}</span>
              <button
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                className="modern-btn bg-red-600 hover:bg-red-700"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="modern-btn hover:scale-105 transition-transform duration-200">Login</Link>
              <Link to="/register" className="modern-btn hover:scale-105 transition-transform duration-200">Register</Link>
            </>
          )}
          <Link to="/contact" className="modern-btn hover:scale-105 transition-transform duration-200">Contact Us</Link>
        </div>
      </div>
    </nav>
  );
}
