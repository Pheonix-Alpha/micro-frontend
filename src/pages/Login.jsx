import { useState } from "react";
import API from "../api.js";
import { Link } from "react-router-dom";

export default function Login(){
    const[form,setform] = useState({email:"", password:""});
    const[message,setMessage] = useState("");
    

    const handleChange = (e) => setform({ ...form, [e.target.name]:e.target.value});

    const handlelogin = async (e) =>{
        e.preventDefault();
        try {
            const res = await API.post("/login",form);
            localStorage.setItem("token",res.data.token);
            setMessage("login success");
            console.log("stored token", res.data.token);
            
        } catch (error) {
            setMessage(error.response?.data?.message || "Error");
            
        }
    }
    






    return(
        <div className="h-screen flex items-center justify-center bg-gray-200">
        <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm">
            <h2 className="text-xl font-bold mb-6 text-center">Login</h2>
            <form onSubmit={handlelogin} className="flex flex-col">
               <label htmlFor="email" className="mb-2 font-semibold px-2">Email</label>
                <input 
                name="email"
                type="email" 
                className="border p-2 w-full mb-2"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
                 />
                 <label htmlFor="password" className="mb-1 ">Password</label>
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
                 className="bg-gray-800 text-white px-4 py-2 rounded"> Login</button>
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
        <p className="mt-4 text-center text-sm">Don't have an account?
        <Link 
        to="/register"
        className="text-blue-600 hover:underline text-center font-semibold"
        >Register yourself</Link>
        </p>

        </div>
        </div>
    );
}