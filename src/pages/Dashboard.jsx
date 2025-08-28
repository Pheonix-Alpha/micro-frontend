import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
    const [editingProfile, setEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({ name: "",
    email: "",
    phone: "",
    address: "",});
  const [cart, setCart] = useState([]);
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      setUser(storedUser);
       if (storedUser) {
        setUser(storedUser);
        setProfileForm({
          name: storedUser.name || "",
          email: storedUser.email || "",
          phone: storedUser.phone || "",
          address: storedUser.address || "",
        });
      }
    
    }
  }, [navigate]);

  // fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/products");
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []);

  // fetch cart on mount
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await api.get("/cart");
        console.log("Fetched cart:", res.data);
        setCart(res.data.items || []);
      } catch (err) {
        console.error("Error fetching cart:", err);
      }
    };
    fetchCart();
  }, []);

  const addToCart = async (productId) => {
    try {
      console.log("👉 Sending productId:", productId);
      const res = await api.post("/cart/add", { productId });

      setCart(res.data.items || []);
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

  const updateQty = async (productId, qty) => {
    try {
      const res = await api.patch(`/cart/item/${productId}`, { qty });
      setCart(res.data.items || []);
    } catch (err) {
      console.error("Error updating qty:", err);
    }
  };

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await api.get("/bookings");
        setBookings(res.data || []);
      } catch (err) {
        console.error("Error fetching bookings:", err);
      }
    };
    fetchBookings();
  }, []);

  const getQty = (productId) => {
    const item = cart.find((i) => i.productId === productId);
    return item ? item.qty : 0;
  };

 const handleProfileSave = async () => {
    try {
      const res = await api.patch("/user/profile", {
        name: profileForm.name,
        phone: profileForm.phone,
        address: profileForm.address,
      });
      alert("Profile updated!");
      setUser(res.data.user);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setEditingProfile(false);
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };


  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-4xl mx-auto">
        {user ? (
          <>
            <div className="flex justify-between items-center mb-4">
              {editingProfile ? (
                <div className="flex flex-col gap-2 w-full">
                  <input
                    type="text"
                    name="name"
                    value={profileForm.name}
                    onChange={(e) =>
                      setProfileForm({ ...profileForm, name: e.target.value })
                    }
                    className="border p-2 rounded"
                    placeholder="Name"
                  />
                  <input
                    type="email"
                    name="email"
                    value={profileForm.email}
                    readOnly
                    className="border p-2 rounded bg-gray-100"
                  />
                  <input
                    type="tel"
                    name="phone"
                    value={profileForm.phone}
                    onChange={(e) =>
                      setProfileForm({ ...profileForm, phone: e.target.value })
                    }
                    className="border p-2 rounded"
                    placeholder="Phone"
                  />
                  <input
                    type="text"
                    name="address"
                    value={profileForm.address}
                    onChange={(e) =>
                      setProfileForm({ ...profileForm, address: e.target.value })
                    }
                    className="border p-2 rounded"
                    placeholder="Address"
                  />
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={handleProfileSave}
                      className="bg-green-600 text-white px-3 py-1 rounded"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingProfile(false)}
                      className="bg-gray-400 text-white px-3 py-1 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <h2 className="text-2xl font-bold mb-2">
                    Welcome, {user.name}! 🎉
                  </h2>
                  <p className="mb-2 text-gray-700">{user.email}</p>
                  <button
                    onClick={() => setEditingProfile(true)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Edit Profile
                  </button>
                </div>
              )}

              <button
                onClick={() => navigate("/cart")}
                className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
              >
                Cart ({cart.reduce((sum, item) => sum + item.qty, 0)})
              </button>
            </div>

            <h3 className="text-xl font-semibold mb-2 mt-8">My Orders</h3>
            {bookings.length ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {bookings.map((b) => (
                  <div
                    key={b._id}
                    className="border mb-2.5 p-4 rounded-xl shadow-md bg-gray-50"
                  >
                    <p>
                      <span className="font-semibold">Order ID:</span> {b._id}
                    </p>
                    <p>
                      <span className="font-semibold">Phone:</span> {b.phone}
                    </p>
                    <p>
                      <span className="font-semibold">Address:</span>{" "}
                      {b.address}
                    </p>
                    <p>
                      <span className="font-semibold">Items:</span>{" "}
                      {b.items.map((i) => i.name + ` (x${i.qty})`).join(", ")}
                    </p>
                    <p>
                      <span className="font-semibold">Date:</span>{" "}
                      {new Date(b.createdAt).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 mt-2 pb-1">No orders placed yet.</p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {products.map((p) => {
                const qty = getQty(p._id);
                return (
                  <div key={p._id} className="border p-4 rounded-xl shadow-md">
                    <h2 className="font-semibold">{p.name}</h2>
                    <p>${p.price}</p>

                    {qty > 0 ? (
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => updateQty(p._id, qty - 1)}
                          className="px-3 py-1 bg-red-500 text-white rounded"
                        >
                          -
                        </button>
                        <span className="font-semibold">{qty}</span>
                        <button
                          onClick={() => updateQty(p._id, qty + 1)}
                          className="px-3 py-1 bg-green-500 text-white rounded"
                        >
                          +
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => addToCart(p._id)}
                        className="mt-2 bg-green-600 text-white px-3 py-1 rounded"
                      >
                        Add to Cart
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}
