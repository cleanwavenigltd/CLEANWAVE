import React, { useState } from "react";
import { AlertCircle, Loader } from "lucide-react";
import { login } from "../../services/authservice";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

import fav from "../../assets/logo.png";
import Input from "../user/layouts/Input";

import { FiEye, FiEyeOff } from "react-icons/fi";
import { startTokenTimer } from "../../utils/tokenManager";

export default function Login({ onSwitch }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await login(form);
      if (response.success) {
        const role = response.role;
        console.log("Login Error:: ", role);

        // Navigation based on role
        switch (role) {
          case "waste":
            navigate("/waste-bank");
            break;
          case "agent":
            navigate("/agent");
            break;
          case "user":
            navigate("/home");
            break;
          case "aggregator":
            navigate("/aggregator");
            break;
          default:
            navigate("/");
            break;
        }
      } else {
        setError(response);
        console.log(response);
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white rounded-2xl p-8 w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img src={fav} alt="Cleanwave Logo" className="w-20 h-24" />
        </div>

        {/* Heading */}
        <h1 className="text-xl sm:text-2xl font-bold text-[#8CA566] mb-6 text-center">
          Cleanwave Recycling Nigeria Limited
        </h1>

        {/* Error Message */}
        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-3 flex gap-2">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <div className="relative">
            <Input
              label="Password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />

            <button
              type="button"
              aria-label="Toggle password visibility"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={
              loading
                ? "w-full cursor-not-allowed bg-gray-300 text-white py-2 rounded-md"
                : "w-full bg-[#8CA566] text-white py-2 rounded-md hover:bg-[#4C862D]"
            }
          >
            {loading ? (
              <>
                {" "}
                <Loader size={18} className="inline-block mr-2 animate-spin" />
                Logging in...{" "}
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>

        {/* Bottom Actions */}
        <div className="mt-4 flex justify-between gap-2">
          <button
            type="button"
            onClick={() => onSwitch("register")}
            className="bg-[#8CA566] text-white py-2 rounded-md w-1/2 hover:bg-[#4C862D]"
          >
            Signup
          </button>

          <button
            type="button"
            onClick={() => onSwitch("forgot")}
            className="bg-red-600 text-white py-2 rounded-md w-1/2 hover:bg-red-700"
          >
            Forgot
          </button>
        </div>

        {/* Footer */}
        <div className="mt-10 text-center text-gray-500 text-xs">
          &copy; {new Date().getFullYear()} Cleanwave Recycling Nigeria Limited.
          All rights reserved.
        </div>
      </div>
    </div>
  );
}
