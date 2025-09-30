import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import Alert from "../components/Alert";
import ThemedButton from "../components/ThemedButton";

const API_URL = import.meta.env.VITE_API_URL;

export default function LoginPage() {
  const [form, setForm] = useState({ emailOrUsername: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();
  const { login } = useUser();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/api/auth/login`, form);
      login(res.data.user, res.data.token);
      setAlert({ type: "success", message: "Login successful!" });
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch {
      setAlert({ type: "error", message: "Login failed. Try again." });
    }
    setLoading(false);
  }

  return (
    <div className="max-w-md mx-auto p-8 bg-white rounded-xl shadow-2xl mt-8">
      <h1 className="text-3xl font-extrabold mb-6 text-blue-700 text-center">
        Login
      </h1>
      {alert && <Alert type={alert.type} message={alert.message} />}
      <form onSubmit={handleLogin}>
        <input
          name="emailOrUsername"
          value={form.emailOrUsername}
          onChange={handleChange}
          placeholder="Email or Username"
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
          {loading ? "Logging in..." : "Login"}
        </ThemedButton>
      </form>
    </div>
  );
}