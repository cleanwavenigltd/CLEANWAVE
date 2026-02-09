import React, { memo, useCallback } from "react";
import { logoutUser, getCurrentUser } from "../utils/auth";
import { useNavigate } from "react-router-dom";

/**
 * Optimized Navbar Component
 * PERFORMANCE:
 * - Memoized to prevent re-renders on parent state changes
 * - useCallback for logout handler to maintain referential equality
 * - Minimal DOM operations
 */
const Navbar = memo(() => {
  const navigate = useNavigate();
  const user = getCurrentUser();

  // PERFORMANCE: Memoize logout handler to prevent recreation on each render
  const handleLogout = useCallback(() => {
    logoutUser();
    navigate("/login");
  }, [navigate]);

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <div className="text-sky-700 font-bold text-xl">CleanWave</div>
      {user && (
        <div className="flex items-center gap-4">
          <span className="text-gray-600">{user.name}</span>
          <button
            onClick={handleLogout}
            className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            aria-label="Logout"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
});

Navbar.displayName = "Navbar";

export default Navbar;
