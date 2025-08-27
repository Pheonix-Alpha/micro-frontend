import { Link } from "react-router-dom";

export default function Navbar() {
  return (
 <nav className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center">
      {/* Logo */}
      <div className="text-2xl font-bold">
        <Link to="/">🌾 RuralConnect</Link>
      </div>

      {/* Links */}
      <div className="space-x-6 hidden md:flex">
        <Link to="/" className="hover:text-yellow-400">Home</Link>
        <a href="#services" className="hover:text-yellow-400">Services</a>
        <a href="#products" className="hover:text-yellow-400">Products</a>
        <a href="#news" className="hover:text-yellow-400">News</a>
        <a href="#contact" className="hover:text-yellow-400">Contact</a>
      </div>

          <div className="space-x-4">
        <Link 
          to="/login" 
          className="px-4 py-2 bg-yellow-500 text-black rounded hover:bg-yellow-400"
        >
          Login
        </Link>
        <Link 
          to="/register" 
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-400"
        >
          Register
        </Link>
      </div>
      
    </nav>
  );
}
