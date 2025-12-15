import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertCircle, CheckCircle, Loader } from "lucide-react";
import Input from "../user/layouts/Input";
import fav from "../../assets/logo.png";
import { register } from "../../services/authservice";

export default function Register({ onSwitch }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirm: "",
    gender: "",
  });

  const [error, setError] = useState("");
  const [Loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const validateForm = (data) => {
    if (!data.name || !data.name.trim()) return "Name is required.";
    if (!data.email || !/^\S+@\S+\.\S+$/.test(data.email))
      return "A valid email is required.";
    if (!data.phone || !/^\+?[0-9]{7,15}$/.test(data.phone))
      return "A valid phone number is required.";
    if (!data.password || data.password.length < 8)
      return "Password must be at least 8 characters.";
    if (data.password != data.confirm) {
      return "Password Mismatch.";
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    const validationError = validateForm(form);

    if (validationError) {
      setError(validationError);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const res = await register(form);

      setLoading(false);

      if (res.success) {
        setSuccess(
          res.message || "Registration successful. Please verify your email."
        );
        setTimeout(() => navigate("/"), 1000);
      } else {
        setError(res.message || "Registration failed");
      }
    } catch (err) {
      setLoading(false);
      setError("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-2xl w-full max-w-md shadow-lg">
        <div className="flex justify-center mb-4">
          <img src={fav} alt="Logo" className="w-20 h-24" />
        </div>

        <h1 className="text-xl sm:text-2xl font-bold text-[#8CA566] mb-6 text-center">
          Cleanwave Recycling Nigeria Limited
        </h1>

        {error && (
          <div className="p-4 mb-4 bg-red-50 border border-red-200 rounded-lg flex gap-2 text-red-600 ">
            <AlertCircle className="w-5 flex  " />
            <p className="text-sm text-red-700">{error}</p>
            {/* {error} */}
          </div>
        )}
        {success && (
          <div className="mb-4 bg-green-50 border border-green-200 rounded-lg p-3 flex gap-2">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
            <p className="text-sm text-green-700">{success}</p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <Input
            label="Full Name"
            name="name"
            value={form.name}
            onChange={handleChange}
          />

          <Input
            label="Email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
          <Input
            label="Phone"
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
          />

          {/* Gender Select */}
          <div className="relative w-full mb-6">
            <label className="block text-gray-500 text-[10px] mb-1">
              Gender
            </label>
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              required
              className="h-12 w-full border border-gray-300 rounded-md px-3 text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#8CA566] focus:border-[#8CA566] text-[14px]"
            >
              <option value="" disabled>
                Select your gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <Input
            label="Password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
          />

          <Input
            label="Confirm Password"
            type="password"
            name="confirm"
            value={form.confirm}
            onChange={handleChange}
          />

          <button
            type="submit"
            disabled={Loading}
            className={
              Loading
                ? "cursor-not-allowed w-full bg-gray-300 text-white py-2 rounded-md  mt-4"
                : "w-full bg-[#8CA566] text-white py-2 rounded-md hover:bg-[#4C862D] mt-4"
            }
          >
            {Loading ? (
              <>
                <Loader size={18} className="inline-block mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              "Register"
            )}
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-600">
          <span>OR</span>
          <button
            type="button"
            onClick={() => onSwitch("login")}
            className="block w-full mt-2 bg-[#8CA566] text-white py-2 rounded-md hover:bg-[#4C862D]"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
