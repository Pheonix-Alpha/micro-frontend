// src/pages/Cart.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  // fetch cart
  useEffect(() => {
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

  const updateQty = async (productId, qty) => {
    try {
      const res = await api.patch(`/cart/item/${productId}`, { qty });
      setCart(res.data.items || []);
    } catch (err) {
      console.error("Error updating qty:", err);
    }
  };

  const removeItem = async (productId) => {
    try {
      const res = await api.delete(`/cart/item/${productId}`);
      setCart(res.data.items || []);
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };

  const clearCart = async () => {
    try {
      const res = await api.delete("/cart");
      setCart(res.data.items || []);
    } catch (err) {
      console.error("Error clearing cart:", err);
    }
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">🛒 Your Cart</h2>

        {cart.length === 0 ? (
          <p className="text-gray-600">Your cart is empty.</p>
        ) : (
          <>
            <ul className="divide-y">
              {cart.map((item) => (
                <li key={item.productId} className="py-4 flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-gray-600">${item.price}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQty(item.productId, item.qty - 1)}
                      className="px-3 py-1 bg-red-500 text-white rounded"
                    >
                      -
                    </button>
                    <span className="font-semibold">{item.qty}</span>
                    <button
                      onClick={() => updateQty(item.productId, item.qty + 1)}
                      className="px-3 py-1 bg-green-500 text-white rounded"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeItem(item.productId)}
                      className="ml-3 px-3 py-1 bg-gray-700 text-white rounded"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex justify-between items-center">
              <h3 className="text-xl font-bold">Total: ${total.toFixed(2)}</h3>
              <div className="flex gap-3">
                <button
                  onClick={clearCart}
                  className="bg-red-600 text-white px-4 py-2 rounded"
                >
                  Clear Cart
                </button>
                <button
                  onClick={() => navigate("/checkout", { state: { user, cart } })}
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Checkout
                </button>
              </div>
            </div>
          </>
        )}

        <button
          onClick={() => navigate("/dashboard")}
          className="mt-6 text-blue-600 underline"
        >
          ← Back to Dashboard
        </button>
      </div>
    </div>
  );
}
