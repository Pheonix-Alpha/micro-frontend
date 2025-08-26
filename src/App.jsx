import API from "./api";
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";


export default function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
  
     
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>} />
    
      </Routes>
    </Router>
  );
}
