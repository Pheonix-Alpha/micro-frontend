import { useState } from "react";
import {authAPI} from "../api.js";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setform] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setform({ ...form, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await authAPI.post("/register", form);

      setMessage(res.data.message || "✅ Registered successfully");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      setMessage(error.response?.data?.message || "Error");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-200">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm">
        <h2 className="text-xl front-bold mb-6 text-center">Register</h2>
        <form onSubmit={handleRegister} className="flex flex-col">
          <label htmlFor="name" className="mb-2 front-semibold px-2">
            Name
          </label>
          <input
            name="name"
            type="text"
            className="border p-2 w-full mb-2"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <label htmlFor="email" className="mb-2 front-semibold px-2">
            Email
          </label>
          <input
            name="email"
            type="email"
            className="border p-2 w-full mb-2"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <label htmlFor="password" className="mb-1 ">
            Password
          </label>
          <input
            name="password"
            type="password"
            className="border p-2 w-full mb-2"
            placeholder="password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className="bg-gray-800 text-white px-4 py-2 rounded"
          >
            Register
          </button>
        </form>
        {message && (
          <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded shadow-md z-50">
            {message}
            <button
              onClick={() => setMessage("")}
              className="ml-2 font-bold hover:text-gray-200"
            >
              ×
            </button>
          </div>
        )}
        <p className="mt-4 text-center text-sm">
          Already have an account?
          <Link
            to="/login"
            className="text-blue-600 text-center hover:underline font-semibold"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
