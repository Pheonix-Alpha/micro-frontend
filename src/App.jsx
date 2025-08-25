import { useState } from "react";
import API from "./api";

export default function App() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const register = async () => {
    try {
      const res = await API.post("/register", form);
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || "Error");
    }
  };

  const login = async () => {
    try {
      const res = await API.post("/login", {
        email: form.email,
        password: form.password,
      });
      setToken(res.data.token);
      localStorage.setItem("token", res.data.token);
      setMessage("Login successful");
      console.log("Stored token:", localStorage.getItem("token"));

    } catch (err) {
      setMessage(err.response?.data?.message || "Error");
    }
  };

  const profile = async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await API.get("/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setMessage(`Welcome ${res.data.user.id}`);
  } catch (err) {
    setMessage(err.response?.data?.message || "Error");
  }
};


  return (
    <div style={{ padding: "2rem" }}>
      <h1>Auth Service Frontend</h1>
      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
      />
      <br />
      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />
      <br />
      <input
        name="password"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
      />
      <br />
      <button onClick={register}>Register</button>
      <button onClick={login}>Login</button>
      <button onClick={profile}>Get Profile</button>

      <p>{message}</p>
    </div>
  );
}
