// Example: src/pages/VerifyEmail.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams, useNavigate } from "react-router-dom";
axios.defaults.baseURL = import.meta.env.VITE_APP_BASE_URL;
axios.defaults.withCredentials = true;

export default function VerifyEmail() {
  const [message, setMessage] = useState("Verifying...");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) {
      setMessage("Invalid verification link.");
      return;
    }

    axios
      .get(`/auth/verify-email?token=${token}`)
      .then(() => {
        setMessage("Email verified successfully! Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000);
      })
      .catch((error) => {
        console.error(error);
        setMessage(error.response?.data || "Verification failed.");
      });
  }, [token, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      {message}
    </div>
  );
}
