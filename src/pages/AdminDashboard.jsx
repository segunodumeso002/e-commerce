import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

export default function AdminDashboard() {
  const { user } = useUser();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [tab, setTab] = useState("products");
  const [form, setForm] = useState({ name: "", price: "", description: "", image: "", category: "" });
  const [editingId, setEditingId] = useState(null);
  const [editingUserId, setEditingUserId] = useState(null);
  const [userForm, setUserForm] = useState({ firstname: "", lastname: "", username: "", email: "", is_admin: false });

  useEffect(() => {
    // Redirect to home if not logged in or not admin
    if (!user || !user.is_admin) {
      navigate("/");
      return;
    }
    // Fetch products
    axios.get(`${API_URL}/api/products`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }).then(res => setProducts(Array.isArray(res.data) ? res.data : []));

    // Fetch orders
    axios.get(`${API_URL}/api/orders`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }).then(res => setOrders(Array.isArray(res.data) ? res.data : []));

    // Fetch users
    axios.get(`${API_URL}/api/users`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }).then(res => setUsers(Array.isArray(res.data) ? res.data : []));
  }, [user, navigate]);

  async function fetchProducts() {
    const token = localStorage.getItem("token");
    const res = await axios.get(`${API_URL}/api/products`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setProducts(res.data);
  }

  async function handleAddProduct(e) {
    e.preventDefault();
    const token = localStorage.getItem("token");
    await axios.post(`${API_URL}/api/products`, form, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setForm({ name: "", price: "", description: "" });
    fetchProducts();
  }

  async function handleEditProduct(e) {
    e.preventDefault();
    const token = localStorage.getItem("token");
    await axios.put(`${API_URL}/api/products/${editingId}`, form, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setEditingId(null);
    setForm({ name: "", price: "", description: "" });
    fetchProducts();
  }

  async function handleDeleteProduct(id) {
    const token = localStorage.getItem("token");
    await axios.delete(`${API_URL}/api/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchProducts();
  }

  async function handleShipOrder(id) {
    const token = localStorage.getItem("token");
    await axios.put(`${API_URL}/api/orders/${id}`, { status: "shipped" }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    // Refresh orders
    const res = await axios.get(`${API_URL}/api/orders`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setOrders(res.data);
  }

  function startEdit(product) {
    setEditingId(product.id);
    setForm({ name: product.name, price: product.price, description: product.description });
  }

  function startEditUser(user) {
    setEditingUserId(user.id);
    setUserForm({
      firstname: user.firstname,
      lastname: user.lastname,
      username: user.username,
      email: user.email,
      is_admin: user.is_admin
    });
  }

  async function handleEditUser(e) {
    e.preventDefault();
    const token = localStorage.getItem("token");
    await axios.put(`${API_URL}/api/users/${editingUserId}`, userForm, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setEditingUserId(null);
    setUserForm({ firstname: "", lastname: "", username: "", email: "", is_admin: false });
    // Refresh users
    const res = await axios.get(`${API_URL}/api/users`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setUsers(res.data);
  }

  async function handleDeleteUser(id) {
    const token = localStorage.getItem("token");
    await axios.delete(`${API_URL}/api/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    // Refresh users
    const res = await axios.get(`${API_URL}/api/users`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setUsers(res.data);
  }

  return (
  <div className="max-w-4xl mx-auto p-4 glass-card">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="flex gap-4 mb-6">
        <button onClick={() => setTab("products")} className={tab === "products" ? "font-bold text-blue-600" : ""}>Products</button>
        <button onClick={() => setTab("orders")} className={tab === "orders" ? "font-bold text-blue-600" : ""}>Orders</button>
        <button onClick={() => setTab("users")} className={tab === "users" ? "font-bold text-blue-600" : ""}>Users</button>
      </div>
      {tab === "products" && (
        <div>
          <h2 className="font-semibold mb-2">Manage Products</h2>
          <form onSubmit={editingId ? handleEditProduct : handleAddProduct} className="mb-4 flex flex-wrap gap-2">
            <input
              name="name"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              placeholder="Product Name"
              className="px-2 py-1 border rounded"
              required
            />
            <input
              name="price"
              type="number"
              value={form.price}
              onChange={e => setForm({ ...form, price: e.target.value })}
              placeholder="Price"
              className="px-2 py-1 border rounded"
              required
            />
            <input
              name="description"
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
              placeholder="Description"
              className="px-2 py-1 border rounded"
            />
            <input
              name="image"
              value={form.image}
              onChange={e => setForm({ ...form, image: e.target.value })}
              placeholder="Image URL"
              className="px-2 py-1 border rounded"
              required
            />
            <select
              name="category"
              value={form.category}
              onChange={e => setForm({ ...form, category: e.target.value })}
              className="px-2 py-1 border rounded"
              required
            >
              <option value="">Select Category</option>
              <option value="Electronics">Electronics</option>
              <option value="Fashion">Fashion</option>
              <option value="Books">Books</option>
              <option value="Home">Home</option>
              <option value="Other">Other</option>
            </select>
            <button className="bg-blue-600 text-white px-4 py-1 rounded" type="submit">
              {editingId ? "Update" : "Add"}
            </button>
            {editingId && (
              <button className="bg-gray-400 text-white px-4 py-1 rounded" type="button" onClick={() => { setEditingId(null); setForm({ name: "", price: "", description: "", image: "", category: "" }); }}>
                Cancel
              </button>
            )}
          </form>
          <ul>
            {products.map(product => (
              <li key={product.id} className="mb-2 flex justify-between items-center border-b pb-2">
                <span>
                  <strong>{product.name}</strong> - ${product.price} <br />
                  <span className="text-gray-600">{product.description}</span>
                </span>
                <span>
                  <button className="bg-yellow-500 text-white px-2 py-1 rounded mr-2" onClick={() => startEdit(product)}>Edit</button>
                  <button className="bg-red-600 text-white px-2 py-1 rounded" onClick={() => handleDeleteProduct(product.id)}>Delete</button>
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {tab === "orders" && (
        <div>
          <h2 className="font-semibold mb-2">Orders</h2>
          <ul>
            {orders.map(order => (
              <li key={order.id} className="mb-2 flex justify-between items-center border-b pb-2">
                <span>
                  Order #{order.id} - <strong>{order.status}</strong>
                  <br />
                  {order.items && (
                    <span>
                      Items:
                      <ul>
                        {(order.items || []).map((item, idx) => (
                          <li key={idx}>{item.name} x {item.quantity}</li>
                        ))}
                      </ul>
                    </span>
                  )}
                  <br />
                  Shipping: {order.shipping?.address}
                </span>
                {order.status !== "shipped" && (
                  <button
                    className="bg-green-600 text-white px-2 py-1 rounded"
                    onClick={() => handleShipOrder(order.id)}
                  >
                    Mark as Shipped
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
      {tab === "users" && (
        <div>
          <h2 className="font-semibold mb-2">Users</h2>
          {editingUserId ? (
            <form onSubmit={handleEditUser} className="mb-4 flex gap-2">
              <input name="firstname" value={userForm.firstname} onChange={e => setUserForm({ ...userForm, firstname: e.target.value })} placeholder="First Name" className="px-2 py-1 border rounded" required />
              <input name="lastname" value={userForm.lastname} onChange={e => setUserForm({ ...userForm, lastname: e.target.value })} placeholder="Last Name" className="px-2 py-1 border rounded" required />
              <input name="username" value={userForm.username} onChange={e => setUserForm({ ...userForm, username: e.target.value })} placeholder="Username" className="px-2 py-1 border rounded" required />
              <input name="email" value={userForm.email} onChange={e => setUserForm({ ...userForm, email: e.target.value })} placeholder="Email" className="px-2 py-1 border rounded" required />
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={userForm.is_admin} onChange={e => setUserForm({ ...userForm, is_admin: e.target.checked })} />
                Admin
              </label>
              <button className="bg-blue-600 text-white px-4 py-1 rounded" type="submit">Update</button>
              <button className="bg-gray-400 text-white px-4 py-1 rounded" type="button" onClick={() => { setEditingUserId(null); setUserForm({ firstname: "", lastname: "", username: "", email: "", is_admin: false }); }}>Cancel</button>
            </form>
          ) : null}
          <ul>
            {users.map(user => (
              <li key={user.id} className="mb-2 flex justify-between items-center border-b pb-2">
                <span>
                  <strong>{user.firstname} {user.lastname}</strong> ({user.username})<br />
                  {user.email} {user.is_admin && <span className="text-yellow-600 font-bold">[Admin]</span>}
                </span>
                <span>
                  <button className="bg-yellow-500 text-white px-2 py-1 rounded mr-2" onClick={() => startEditUser(user)}>Edit</button>
                  <button className="bg-red-600 text-white px-2 py-1 rounded" onClick={() => handleDeleteUser(user.id)}>Delete</button>
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}