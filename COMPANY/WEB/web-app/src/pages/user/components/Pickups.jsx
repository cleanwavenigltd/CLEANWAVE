import React, { useState, useEffect } from "react";
import { Search, CheckCircle, AlertCircle, Loader } from "lucide-react";
import { requestPickup } from "../../../services/pickupService";
import { getWasteCategories } from "../../../services/wasteservice";

export default function Pickups() {
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  const [form, setForm] = useState({
    category: "",
    subcategory: "",
    kg: "",
    date: "",
    time: "",
    location: "",
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getWasteCategories();
        if (
          res &&
          res.success &&
          res.data &&
          Array.isArray(res.data.categories)
        ) {
          setCategories(res.data.categories);
        }
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };
    fetchCategories();
  }, []);
  // const handleChange = (e) =>
  // setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (name === "category") {
      const selectedCat = categories.find((cat) => cat.name === value);
      if (
        selectedCat &&
        selectedCat.subcategories &&
        selectedCat.subcategories.length > 0
      ) {
        setSubcategories(selectedCat.subcategories);
        setForm((prev) => ({ ...prev, subcategory: "" })); // reset subcategory
      } else {
        setSubcategories([]);
        setForm((prev) => ({ ...prev, subcategory: "" }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    if (!form.category || !form.kg) {
      setError("Please fill in all required fields");
      return;
    }

    const selectedCat = categories.find((cat) => cat.name === form.category);
    if (
      selectedCat &&
      selectedCat.subcategories &&
      selectedCat.subcategories.length > 0 &&
      !form.subcategory
    ) {
      setError("Please select a subcategory");
      return;
    }

    try {
      const resp = await requestPickup(form);
      if (resp.success) {
        setSuccess("✓ Pickup request received successfully!");
        setForm({ category: "", kg: "", date: "", time: "", location: "" });
        setTimeout(() => setSuccess(""), 4000);
      } else {
        setError(resp.message || "Cannot request pickup");
      }
    } catch (err) {
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f9f3] to-[#e8f2e0] p-4 pb-24">
      {/* Header */}
      <div className="mb-8 mt-4">
        <h1 className="text-3xl font-bold text-[#2d5016] mb-2">
          Request Pickup
        </h1>
        <p className="text-gray-600 text-sm">
          Schedule your waste collection effortlessly
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6 group">
        <Search
          className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-[#8CA566] transition"
          size={20}
        />
        <input
          type="text"
          placeholder="Search nearby agents..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border-2 border-gray-200 rounded-xl h-12 pl-12 text-sm focus:outline-none focus:border-[#8CA566] focus:ring-4 focus:ring-[#8CA566]/10 transition"
        />
      </div>

      {/* Alert Messages */}
      {error && (
        <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg flex items-start gap-3 animate-slideIn">
          <AlertCircle
            size={20}
            className="text-red-600 flex-shrink-0 mt-0.5"
          />
          <p className="text-red-700 text-sm font-medium">{error}</p>
        </div>
      )}
      {success && (
        <div className="mb-4 p-4 bg-green-50 border-l-4 border-green-500 rounded-lg flex items-start gap-3 animate-slideIn">
          <CheckCircle
            size={20}
            className="text-green-600 flex-shrink-0 mt-0.5"
          />
          <p className="text-green-700 text-sm font-medium">{success}</p>
        </div>
      )}

      {/* Form Card */}
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition">
          <div className="p-6 space-y-5">
            {/* Waste Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Waste Category <span className="text-red-500">*</span>
              </label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full h-12 border rounded-lg px-3 text-sm focus:ring-2 focus:ring-[#8CA566] focus:border-transparent"
                required
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat.id || cat.name} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Subcategory Select */}
            {subcategories.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subcategory <span className="text-red-500">*</span>
                </label>
                <select
                  name="subcategory"
                  value={form.subcategory}
                  onChange={handleChange}
                  className="w-full h-12 border rounded-lg px-3 text-sm focus:ring-2 focus:ring-[#8CA566] focus:border-transparent"
                  required
                >
                  <option value="">Select a subcategory</option>
                  {subcategories.map((sub) => (
                    <option key={sub.id || sub.name} value={sub.name}>
                      {sub.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Weight */}
            <div className="group">
              <label className="text-sm font-semibold text-gray-700 block mb-2">
                Estimated Weight (KG) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="kg"
                value={form.kg}
                onChange={handleChange}
                placeholder="e.g., 25"
                className="w-full h-12 border-2 border-gray-200 rounded-lg px-4 text-sm focus:outline-none focus:border-[#8CA566] focus:ring-4 focus:ring-[#8CA566]/10 transition"
                required
              />
            </div>

            {/* Date & Time Row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="group">
                <label className="text-sm font-semibold text-gray-700 block mb-2">
                  Pickup Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  className="w-full h-12 border-2 border-gray-200 rounded-lg px-4 text-sm focus:outline-none focus:border-[#8CA566] focus:ring-4 focus:ring-[#8CA566]/10 transition"
                />
              </div>

              <div className="group">
                <label className="text-sm font-semibold text-gray-700 block mb-2">
                  Pickup Time
                </label>
                <input
                  type="time"
                  name="time"
                  value={form.time}
                  onChange={handleChange}
                  className="w-full h-12 border-2 border-gray-200 rounded-lg px-4 text-sm focus:outline-none focus:border-[#8CA566] focus:ring-4 focus:ring-[#8CA566]/10 transition"
                />
              </div>
            </div>

            {/* Location */}
            <div className="group">
              <label className="text-sm font-semibold text-gray-700 block mb-2">
                Pickup Location <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="Enter your pickup address"
                className="w-full h-12 border-2 border-gray-200 rounded-lg px-4 text-sm focus:outline-none focus:border-[#8CA566] focus:ring-4 focus:ring-[#8CA566]/10 transition"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-gradient-to-r from-[#8CA566] to-[#7a9453] text-white rounded-lg font-semibold mt-6 hover:shadow-lg hover:from-[#7a9453] hover:to-[#6d8248] disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader size={18} className="animate-spin" />
                  Processing...
                </>
              ) : (
                "Request Pickup"
              )}
            </button>
          </div>
        </div>
      </form>

      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
