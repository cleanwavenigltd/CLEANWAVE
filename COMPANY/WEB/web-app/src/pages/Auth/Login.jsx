// import React, { useState } from "react";
// import { AlertCircle, Loader, Eye, Mail, Lock } from "lucide-react";
// import { login } from "../../services/authservice";
// import { jwtDecode } from "jwt-decode";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { setAuth } from "../../store/authSlice";

// import fav from "../../assets/logo.png";
// import Input from "../user/layouts/Input";

// import { FiEye, FiEyeOff } from "react-icons/fi";
// import { startTokenTimer } from "../../utils/tokenManager";

// export default function Login({ onSwitch }) {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const [form, setForm] = useState({ email: "", password: "" });
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       const response = await login(form);
//       if (response.success) {
//         const { token, role } = response;
//         console.log("Login success: ", role);

//         // Save to Redux and sessionStorage
//         dispatch(setAuth({ token, role }));

//         // Start token timer
//         startTokenTimer(token);

//         // Navigation based on role
//         switch (role) {
//           case "waste":
//             navigate("/waste-bank");
//             break;
//           case "agent":
//             navigate("/agent");
//             break;
//           case "user":
//             navigate("/home");
//             break;
//           case "aggregator":
//             navigate("/aggregator");
//             break;
//           default:
//             navigate("/");
//             break;
//         }
//       } else {
//         setError(response);
//         console.log(response);
//       }
//     } catch (err) {
//       setError("Something went wrong. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen  flex items-center justify-center bg-gray-50 px-2">
//       <div className="bg-white p-4 rounded-2xl w-full max-w-md shadow-lg">
//         {/* Logo */}
//         <div className="flex justify-center mb-4">
//           <img src={fav} alt="Cleanwave Logo" className="w-20 h-24" />
//         </div>

//         {/* Heading */}
//         <h1 className="text-xl sm:text-2xl font-bold text-[#8CA566] mb-6 text-center">
//           Cleanwave Recycling Nigeria Limited
//         </h1>

//         {/* Error Message */}
//         {error && (
//           <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-3 flex gap-2">
//             <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
//             <p className="text-sm text-red-700">{error}</p>
//           </div>
//         )}

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="relative">
//             <Mail className=" absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />

//             <Input
//               label="Email"
//               type="email"
//               name="email"
//               value={form.email}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="relative">
//             <Lock className=" absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//             <Input
//               label="Password"
//               type={showPassword ? "text" : "password"}
//               name="password"
//               value={form.password}
//               // className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
//               onChange={handleChange}
//               required
//             />

//             <button
//               type="button"
//               aria-label="Toggle password visibility"
//               onClick={() => setShowPassword((prev) => !prev)}
//               className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
//             >
//               {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
//             </button>
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className={
//               loading
//                 ? "w-full  cursor-not-allowed bg-gray-300 text-white py-3 rounded-md"
//                 : "w-full bg-[#8CA566]  text-white py-3 rounded-md hover:bg-[#4C862D]"
//             }
//           >
//             {loading ? (
//               <>
//                 {" "}
//                 <Loader size={18} className="inline-block mr-2 animate-spin" />
//                 Logging in...{" "}
//               </>
//             ) : (
//               "Login"
//             )}
//           </button>
//         </form>

//         {/* Bottom Actions */}
//         <div className="mt-4 flex justify-between gap-2">
//           <button
//             type="button"
//             onClick={() => onSwitch("register")}
//             className="border border-[2px] border-[#8CA566] text-[#8CA566] py-3 rounded-md w-1/2 hover:bg-green-20"
//           >
//             Signup
//           </button>

//           <button
//             type="button"
//             onClick={() => onSwitch("forgot")}
//             className="text-red-600 bg-red-200 py-2 rounded-md w-1/2"
//           >
//             Forgot
//           </button>
//         </div>

//         {/* Footer */}
//         <div className="mt-10 text-center text-gray-500 text-xs">
//           &copy; {new Date().getFullYear()} Cleanwave Recycling Nigeria Limited.
//           All rights reserved.
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import { AlertCircle, Loader2, Mail, Lock, ArrowRight } from "lucide-react";
import { login } from "../../services/authservice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuth } from "../../store/authSlice";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { startTokenTimer } from "../../utils/tokenManager";

import fav from "../../assets/logo.png";
import Input from "../user/layouts/Input";

export default function Login({ onSwitch }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
      if (response && response.success) {
        const { token, role } = response;
        dispatch(setAuth({ token, role }));
        startTokenTimer(token);

        const routes = {
          waste: "/waste-bank",
          agent: "/agent",
          user: "/home",
          aggregator: "/aggregator",
        };
        navigate(routes[role] || "/");
      } else {
        console.log(response);
        setError(response || "Invalid email or password.");
      }
    } catch (err) {
      setError("Connection error. Please check your internet.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9FAFB] px-2">
      <div className="w-full max-w-2xl">
        {/* Card Container */}
        <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-4 sm:p-10">
          {/* Header Section */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center mb-4 transition-transform hover:scale-105 duration-300">
              <img src={fav} alt="Logo" className="w-14 h-14 object-contain" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight text-center">
              Welcome Back
            </h1>
            <p className="text-gray-500 text-sm mt-1 text-center">
              Cleanwave Recycling Nigeria Limited
            </p>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="mb-6 flex items-center gap-3 bg-red-50 border border-red-100 text-red-600 p-4 rounded-xl animate-in fade-in slide-in-from-top-2 duration-300">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <Mail className="absolute left-3 top-5 text-gray-400 w-5 h-5" />
              <Input
                label="Email Address"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-[18px] text-gray-400 w-5 h-5 z-10 pointer-events-none" />
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
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-[18px] text-gray-400 hover:text-[#8CA566] transition-colors z-10 focus:outline-none"
              >
                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full bg-[#8CA566] text-white py-4 rounded-xl font-semibold transition-all duration-200 hover:bg-[#7a9255] hover:shadow-lg hover:shadow-green-100 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <span className="flex items-center justify-center gap-2">
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </span>
            </button>
          </form>

          {/* Secondary Actions */}
          <div className="mt-8 grid grid-cols-2 gap-4">
            <button
              onClick={() => onSwitch("register")}
              className="flex items-center justify-center py-3 px-4 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all"
            >
              Create Account
            </button>
            <button
              onClick={() => onSwitch("forgot")}
              className="flex items-center justify-center py-3 px-4 rounded-xl text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 transition-all"
            >
              Reset Access
            </button>
          </div>
        </div>

        {/* Minimalist Footer */}
        <p className="mt-8 text-center text-gray-400 text-[11px] uppercase tracking-widest">
          &copy; {new Date().getFullYear()} Cleanwave Recycling • Secure Portal
        </p>
      </div>
    </div>
  );
}
