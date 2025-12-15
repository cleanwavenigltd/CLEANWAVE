import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { requestWastePickup } from "../../../services/pickupService";
import { getWasteCategories } from "../../../services/wasteservice";

export default function Pickups() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  const [form, setForm] = useState({
    category: "",
    subcategory: "",
    kg: "",
    note: "",
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

    setLoading(true);
    try {
      const pickupData = {
        category: form.category,
        subcategory: form.subcategory || null,
        kg: form.kg,
        note: form.note,
      };
      const response = await requestWastePickup(pickupData);
      if (response.success) {
        setSuccess("Pickup request submitted successfully");
        setForm({ category: "", subcategory: "", kg: "", note: "" });
        setSubcategories([]);
      } else {
        setError(response.message || "Failed to submit pickup request");
      }
    } catch (err) {
      setError("Server error. Please try again later");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 space-y-6 pb-24">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-3 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search nearby agents"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border rounded-xl h-12 pl-10 text-sm focus:ring-2 focus:ring-[#8CA566] focus:border-transparent"
        />
      </div>

      {/* Error/Success Messages */}
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}
      {success && (
        <div className="p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm">
          {success}
        </div>
      )}

      {/* Pickup Request Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="p-4 bg-white border rounded-xl shadow-sm space-y-4">
          {/* Category Select */}
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

          {/* Weight Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Estimated Weight (KG) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="kg"
              value={form.kg}
              onChange={handleChange}
              placeholder="Enter weight in kilograms"
              className="w-full h-12 border rounded-lg px-3 text-sm focus:ring-2 focus:ring-[#8CA566] focus:border-transparent"
              min="0"
              step="0.1"
              required
            />
          </div>

          {/* Additional Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Notes
            </label>
            <textarea
              name="note"
              value={form.note}
              onChange={handleChange}
              placeholder="Any special instructions or details..."
              rows="3"
              className="w-full p-3 border rounded-lg text-sm focus:ring-2 focus:ring-[#8CA566] focus:border-transparent resize-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-[#8CA566] text-white rounded-lg font-semibold hover:bg-[#7a9556] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? "Submitting..." : "Request Pickup"}
          </button>
        </div>
      </form>
    </div>
  );
}
