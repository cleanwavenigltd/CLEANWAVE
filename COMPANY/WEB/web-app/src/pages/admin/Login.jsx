import React, { useState } from "react";
import { adminLogin } from "../../services/adminService";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuth } from "../../store/authSlice";
import { startTokenTimer } from "../../utils/tokenManager";
import fav from "../../assets/logo.png";
import Input from "../user/layouts/Input";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Lock, Mail } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("mmdmuazu@gmail.com");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("1234");
  // const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      // assume login returns a Promise
      const res = await adminLogin({ email: email.trim(), password: password });
      console.log("Admin Login Response:", res);
      if (res && res.success) {
        const { token, role } = res;
        console.log("Admin Login success: ", role);

        //Save to Redux and sessionStorage
        dispatch(setAuth({ token, role }));

        // Start token timer
        startTokenTimer(token);

        navigate(`${res.redirect || "/dashboard"}`);
        // optionally persist token if "remember" checked
        // if (remember && res.token) {
        //   localStorage.setItem("authToken", res.token);
        // }
      } else {
        setError(res || "Invalid credentials. Please try again.");
      }
    } catch (err) {
      setError(err?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <img src={fav} alt="Cleanwave Logo" className="w-12 h-12" />
              <div>
                <h1 className="text-lg font-semibold text-gray-800">
                  Cleanwave Recycling
                </h1>
                <p className="text-xs text-gray-500">Admin Portal</p>
              </div>
            </div>
            <span className="text-xs bg-[#8CA566] text-white px-3 py-1 rounded-full">
              Admin
            </span>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-1">Sign in</h2>
          <p className="text-sm text-gray-500 mb-4">
            Enter your admin credentials to access the dashboard.
          </p>

          {error && (
            <div
              role="alert"
              className="text-sm text-red-600 bg-red-50 border border-red-100 rounded p-2 mb-4"
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              Email
              <div className="relative w-full mb-6">
                <Mail className="absolute left-3 top-5 text-gray-400 w-5 h-5" />
                <Input
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 w-full border px-3 py-2 rounded-md focus:ring-2 focus:ring-[#8CA566] focus:outline-none"
                  required
                  aria-label="Email"
                  disabled={loading}
                />
              </div>
            </label>

            <label className="block text-sm font-medium text-gray-700 relative">
              Password
              <div className="relative mt-1">
                <div>
                  <Lock className="absolute left-3 top-5 text-gray-400 w-5 h-5" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border px-3 py-2 rounded-md pr-10 focus:ring-2 focus:ring-[#8CA566] focus:outline-none"
                    required
                    aria-label="Password"
                    disabled={loading}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  tabIndex={0}
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
            </label>

            {/* <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="h-4 w-4 text-[#8CA566] border-gray-300 rounded"
                />
                <span className="text-gray-600">Remember me</span>
              </label>
            </div> */}

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-3 bg-[#8CA566] text-white py-2 rounded-md hover:bg-[#6f9c45] disabled:opacity-60"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-gray-400">
            &copy; {new Date().getFullYear()} Cleanwave Recycling Nigeria
            Limited. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
}
