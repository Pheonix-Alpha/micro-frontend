import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      // Simulating fetching user profile
      const storedUser = JSON.parse(localStorage.getItem("user"));
      setUser(storedUser);
    }
  }, [navigate]);

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-2 rounded-xl shadow-md w-full text-center">
        {user ? (
          <>
            <h2 className="text-xl font-bold mb-4">
              Welcome, {user.name}! 🎉
            </h2>
            <p className="mb-4">Your email: {user.email}</p>

            {/* Future bookings list */}
            <h3 className="font-semibold">Your Bookings:</h3>
            <ul className="list-disc pl-6 text-gray-600">
              <li>No bookings yet</li>
            </ul>

           
           
          </>
        ) : (
          <p>Loading...</p>
        )}
        
      </div>
      <div className="absolute top-0 right-0">
         <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
              Edit Profile
            </button>
      </div>
      
      
    </div>
  );
}
