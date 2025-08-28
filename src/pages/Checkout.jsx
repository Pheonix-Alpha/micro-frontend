import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";

export default function Checkout() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setForm((prev) => ({
        ...prev,
        name: storedUser.name || "",
        email: storedUser.email || "",
         phone: storedUser.phone || "",
      address: storedUser.address || "",
      }));
    }
    // Fetch cart items
    const fetchCart = async () => {
      try {
        const res = await api.get("/cart");
        setCart(res.data.items || []);
      } catch (err) {
        console.error("Error fetching cart:", err);
      }
    };
    fetchCart();
  }, []);

    const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    // Update localStorage if phone or address changes
    if (name === "phone" || name === "address") {
      const storedUser = JSON.parse(localStorage.getItem("user")) || {};
      storedUser[name] = value;
      localStorage.setItem("user", JSON.stringify(storedUser));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.phone || !form.address) return alert("Fill phone & address");
    if (!cart.length) return alert("Cart is empty");

    try {
      const res = await api.post("/booking", {
        items: cart, // send cart items
        phone: form.phone,
        address: form.address,
      });
      alert(res.data.message);

      // Optionally, clear cart
      await api.delete("/cart");
      navigate("/dashboard"); // redirect after order
    } catch (err) {
      console.error("Error placing order:", err);
      alert("Failed to place order");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Checkout</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            value={form.name}
            readOnly
            className="border p-2 rounded"
          />
          <input
            type="email"
            name="email"
            value={form.email}
            readOnly
            className="border p-2 rounded"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone number"
            value={form.phone}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <textarea
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
}
