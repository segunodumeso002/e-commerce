import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Alert from "../components/Alert";
import ThemedButton from "../components/ThemedButton";

export default function RegisterPage() {
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleRegister(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/auth/register", form);
      setAlert({ type: "success", message: "Registration successful! Please login." });
      setTimeout(() => navigate("/login"), 1200);
    } catch {
      setAlert({ type: "error", message: "Registration failed. Try again." });
    }
    setLoading(false);
  }

  return (
    <div className="max-w-md mx-auto p-8 bg-white rounded-xl shadow-2xl mt-8">
      <h1 className="text-3xl font-extrabold mb-6 text-blue-700 text-center">Register</h1>
      {alert && <Alert type={alert.type} message={alert.message} />}
      <form onSubmit={handleRegister}>
        <input
          name="firstname"
          value={form.firstname}
          onChange={handleChange}
          placeholder="First Name"
          className="mb-4 w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
          required
        />
        <input
          name="lastname"
          value={form.lastname}
          onChange={handleChange}
          placeholder="Last Name"
          className="mb-4 w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
          required
        />
        <input
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="Username"
          className="mb-4 w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
          required
        />
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="mb-4 w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
          required
        />
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          className="mb-6 w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
          required
        />
        <ThemedButton className="w-full" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </ThemedButton>
      </form>
    </div>
  );
}