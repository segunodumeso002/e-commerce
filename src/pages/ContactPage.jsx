import ThemedButton from "../components/ThemedButton";
import Alert from "../components/Alert";
import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [alert, setAlert] = useState(null);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setAlert({ type: "success", message: "Thank you for contacting us! We'll reply soon." });
    setForm({ name: "", email: "", message: "" });
  }

  return (
    <div className="max-w-lg mx-auto p-8 bg-white rounded-xl shadow-2xl mt-8">
      <h1 className="text-3xl font-extrabold mb-6 text-blue-700 text-center">Contact Us</h1>
      {alert && <Alert type={alert.type} message={alert.message} />}
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Your Name"
          className="mb-4 w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
          required
        />
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Your Email"
          className="mb-4 w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
          required
        />
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Your Message"
          className="mb-4 w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
          rows={4}
          required
        />
        <ThemedButton className="w-full">Send Message</ThemedButton>
      </form>
    </div>
  );
}