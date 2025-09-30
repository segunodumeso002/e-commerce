import { useUser } from "../context/UserContext";
import { useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export default function ProfilePage() {
  const { user, setUser } = useUser();
  const [form, setForm] = useState({
    firstname: user?.firstname || "",
    lastname: user?.lastname || "",
    username: user?.username || "",
    email: user?.email || "",
  });
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleUpdate(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `${API_URL}/api/auth/profile`,
        form,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUser(res.data.user);
      alert("Profile updated!");
    } catch {
      alert("Update failed.");
    }
    setLoading(false);
  }

  async function handlePasswordChange(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${API_URL}/api/auth/change-password`,
        { password },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Password changed!");
      setPassword("");
    } catch {
      alert("Password change failed.");
    }
    setLoading(false);
  }

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">My Profile</h1>
      <form onSubmit={handleUpdate}>
        <input
          name="firstname"
          value={form.firstname}
          onChange={handleChange}
          placeholder="First Name"
          className="mb-2 w-full px-3 py-2 border rounded"
          required
        />
        <input
          name="lastname"
          value={form.lastname}
          onChange={handleChange}
          placeholder="Last Name"
          className="mb-2 w-full px-3 py-2 border rounded"
          required
        />
        <input
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="Username"
          className="mb-2 w-full px-3 py-2 border rounded"
          required
        />
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="mb-2 w-full px-3 py-2 border rounded"
          required
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>
      <form onSubmit={handlePasswordChange} className="mt-6">
        <input
          name="password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="New Password"
          className="mb-2 w-full px-3 py-2 border rounded"
          required
        />
        <button
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full"
          disabled={loading}
        >
          {loading ? "Changing..." : "Change Password"}
        </button>
      </form>
    </div>
  );
}