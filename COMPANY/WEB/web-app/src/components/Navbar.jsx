import React from "react";
import { logoutUser, getCurrentUser } from "../utils/auth";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const user = getCurrentUser();

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <div className="text-sky-700 font-bold text-xl">CleanWave</div>
      {user && (
        <div className="flex items-center gap-4">
          <span className="text-gray-600">{user.name}</span>
          <button
            onClick={handleLogout}
            className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
