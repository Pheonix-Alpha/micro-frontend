// src/components/BookingForm.jsx
import { useState } from "react";
//import { NORAPI } from "../api";

export default function BookingForm({ productName, onBookingSuccess }) {
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleBooking = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setMessage("⚠️ Please login to book a product.");
        setLoading(false);
        return;
      }

      const res = await NORAPI.post(
        "/booking",
        { product: productName, phone },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage("✅ Booking successful!");
      setPhone("");

      if (onBookingSuccess) onBookingSuccess(res.data.booking);
    } catch (err) {
      setMessage(err.response?.data?.message || "❌ Booking failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 p-4 rounded-xl shadow-md">
      <h3 className="font-semibold mb-3">Book {productName}</h3>
      <form onSubmit={handleBooking} className="flex flex-col gap-3">
        <input
          type="tel"
          placeholder="Enter phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          className="border p-2 rounded focus:ring focus:ring-blue-300"
        />
        <button
          type="submit"
          disabled={loading}
          className={`px-4 py-2 rounded text-white ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Booking..." : `Book ${productName}`}
        </button>
      </form>

      {message && (
        <p
          className={`mt-2 text-sm text-center ${
            message.includes("✅")
              ? "text-green-600"
              : message.includes("⚠️")
              ? "text-yellow-600"
              : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
