// src/contexts/UserContext.js
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useDispatch } from "react-redux";
import { clearAuth } from "../store/authSlice";
// Import the API service functions you provided earlier
import { login, logout, getProfile } from "../services/authservice"; // Adjust path if necessary

const UserContext = createContext(null);

// Custom hook to easily access the user context throughout your app
export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Tracks if initial check is done
  const dispatch = useDispatch();

  const clearUser = () => {
    setUser(null);
    setRole(null);
  };

  // Function to load the profile using the cookie
  const loadUserProfile = useCallback(async () => {
    try {
      const profileData = await getProfile();
      console.log("UserContext loadUserProfile response:", profileData);
      if (profileData.success && profileData.user) {
        setUser(profileData.user);
        setRole(profileData.user.role);
        return profileData.user;
      } else {
        clearUser();
      }
    } catch (error) {
      console.error("Failed to load profile:", error);
      clearUser();
    }
  }, []);

  const handleLogin = async (credentials) => {
    const response = await login(credentials);
    if (response.success) {
      // CRITICAL STEP: Immediately fetch the new user profile after login
      await loadUserProfile();
      return true;
    }
    return false;
  };

  const handleLogout = async () => {
    dispatch(clearAuth());
    await logout();
    clearUser();
  };

  // Check login status on application load/refresh
  useEffect(() => {
    const initializeApp = async () => {
      setIsLoading(true);
      // Check if token exists in sessionStorage
      const token = sessionStorage.getItem("token");
      if (token) {
        // Try to get profile to verify token is still valid
        try {
          const profileData = await getProfile();
          if (profileData.success && profileData.user) {
            setUser(profileData.user);
            setRole(profileData.user.role);
          } else {
            // Token is invalid, clear it
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("role");
          }
        } catch (error) {
          // Token is invalid or expired, clear it
          console.error("Token validation failed:", error);
          sessionStorage.removeItem("token");
          sessionStorage.removeItem("role");
        }
      }
      setIsLoading(false);
    };
    initializeApp();
  }, []);

  const contextValue = {
    user,
    role,
    isLoading,
    handleLogin,
    handleLogout,
    loadUserProfile,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
