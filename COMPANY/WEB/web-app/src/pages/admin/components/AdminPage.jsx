import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearAuth } from "../../../store/authSlice";
import { MetricCard } from "../Dashboard";
import { getAllInfo, adminLogout } from "../../../services/adminService";
// import { getAggregators } from "../../../services/aggregatorservice";
import {
  // getWasteBanks,
  getWasteCategories,
  createWasteCategory,
} from "../../../services/wasteservice";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    male: 0,
    female: 0,
    waste: 0,
    agents: 0,
    aggregator: 0,
    total: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  // Waste category form state
  const [customCategory, setCustomCategory] = useState("");
  const [categoryPrice, setCategoryPrice] = useState(""); // price for the main category
  const [subcategories, setSubcategories] = useState([]); // array of {name, price}
  const [subName, setSubName] = useState("");
  const [subPrice, setSubPrice] = useState("");
  const [categories, setCategories] = useState([]);
  const [formMessage, setFormMessage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const info = await getAllInfo();
        if (info && info.success) {
          setStats({
            male: info.data.users.male,
            female: info.data.users.female,
            waste: info.data.overview.wasteBanks,
            agents: info.data.overview.agents,
            aggregator: info.data.overview.aggregators,
            total: info.data.users.total,
          });
        } else {
          // dispatch(clearAuth());
          adminLogout();
        }
      } catch (err) {
        setError("Failed to load dashboard data");
        console.error("AdminPage Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    fetchCategories(); // load existing categories on mount
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await getWasteCategories();
      console.log("Fetched categories:", res);
      if (
        res &&
        res.success &&
        res.data &&
        Array.isArray(res.data.categories)
      ) {
        setCategories(res.data.categories);
      } else {
        // if API returns different shape, adapt accordingly
        console.warn("Could not load categories", res);
      }
    } catch (err) {
      console.error("Failed fetching categories:", err);
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;

  // use real API call to persist categories
  const addWasteCategory = async (categoryObj) => {
    // call the service that hits your backend
    return await createWasteCategory(categoryObj);
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    setFormMessage(null);

    const name = customCategory.trim();

    if (!name) {
      setFormMessage({
        type: "error",
        text: "Please enter a category name.",
      });
      return;
    }

    const parsedCategoryPrice =
      categoryPrice !== "" ? parseFloat(categoryPrice) : null;

    const newCategory = {
      name,
      price: parsedCategoryPrice,
      subcategory: subcategories.map((sub) => ({
        name: sub.name,
        price: sub.price !== "" ? parseFloat(sub.price) : null,
      })),
    };

    try {
      const res = await addWasteCategory(newCategory);
      console.log("Create category response:", res);
      if (res && res.success) {
        // Refetch categories after successful creation
        await fetchCategories();
        // reset form
        setCustomCategory("");
        setCategoryPrice("");
        setSubcategories([]);
        setSubName("");
        setSubPrice("");
        setFormMessage({
          type: "success",
          text: res.message || "Category created successfully.",
        });
      } else {
        setFormMessage({
          type: "error",
          text: res.message || "Failed to create category.",
        });
      }
    } catch (err) {
      console.error("Create category error:", err);
      setFormMessage({ type: "error", text: "An error occurred." });
    }
  };

  return (
    <div className="text-black p-8 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">Overview of your platform metrics</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-10">
        <MetricCard title="Total Users" value={stats.total} icon="👥" />
        <MetricCard title="Male Users" value={stats.male} icon="♂️" />
        <MetricCard title="Female Users" value={stats.female} icon="♀️" />
        <MetricCard title="Aggregators" value={stats.aggregator} icon="📇" />
        <MetricCard title="Active Agents" value={stats.agents} icon="🚀" />
        <MetricCard title="Waste Banks" value={stats.waste} icon="🏦" />
      </div>

      <div className="text-black mb-8 bg-white shadow rounded p-6">
        <h2 className="text-2xl font-semibold mb-4">Add Waste Category</h2>
        <form onSubmit={handleAddCategory} className="space-y-4">
          <div className="flex items-center space-x-4">
            <label className="text-sm text-gray-700 w-40">Category Name</label>
            <input
              className="border rounded p-2 flex-1"
              value={customCategory}
              onChange={(e) => setCustomCategory(e.target.value)}
              placeholder="e.g. Plastic, Metal, Organic"
              required
            />
          </div>

          {/* Category price */}
          <div className="flex items-center space-x-4">
            <label className="text-sm text-gray-700 w-40">Category Price</label>
            <input
              type="number"
              min="0"
              step="0.01"
              className="border rounded p-2 flex-1"
              value={categoryPrice}
              onChange={(e) => setCategoryPrice(e.target.value)}
              placeholder="e.g. 0.50 (price per unit)"
            />
          </div>

          {/* Subcategories */}
          <div className="flex items-start space-x-4">
            <label className="text-sm text-gray-700 w-40 pt-1">
              Subcategories (optional)
            </label>
            <div className="flex-1 space-y-2">
              <div className="flex space-x-2">
                <input
                  type="text"
                  className="border rounded p-2 flex-1"
                  value={subName}
                  onChange={(e) => setSubName(e.target.value)}
                  placeholder="Subcategory name"
                />
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  className="border rounded p-2 w-24"
                  value={subPrice}
                  onChange={(e) => setSubPrice(e.target.value)}
                  placeholder="price"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (subName.trim()) {
                      setSubcategories((prev) => [
                        ...prev,
                        { name: subName.trim(), price: subPrice },
                      ]);
                      setSubName("");
                      setSubPrice("");
                    }
                  }}
                  className="bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700"
                >
                  Add
                </button>
              </div>
              {subcategories.length > 0 && (
                <ul className="space-y-1">
                  {subcategories.map((sub, idx) => (
                    <li
                      key={idx}
                      className="flex items-center justify-between bg-gray-100 p-2 rounded"
                    >
                      <span>
                        {sub.name} {sub.price && `(₦${sub.price})`}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          setSubcategories((prev) =>
                            prev.filter((_, i) => i !== idx)
                          )
                        }
                        className="text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="w-40" />
            <div className="flex items-center space-x-2">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Add Category
              </button>
              <button
                type="button"
                onClick={() => {
                  setCustomCategory("");
                  setCategoryPrice("");
                  setSubcategories([]);
                  setSubName("");
                  setSubPrice("");
                  setFormMessage(null);
                }}
                className="px-4 py-2 border rounded"
              >
                Reset
              </button>
            </div>
          </div>

          {formMessage && (
            <div
              role="alert"
              className={`text-sm ${
                formMessage.type === "error"
                  ? "text-red-600 bg-red-50 border border-red-100"
                  : "text-green-700 bg-green-50 border border-green-100"
              } rounded p-3`}
            >
              {formMessage.text}
            </div>
          )}
        </form>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-3">Current Categories</h3>
        {categories.length === 0 ? (
          <p className="text-gray-600">No categories added yet.</p>
        ) : (
          <ul className="space-y-3">
            {categories.map((cat, idx) => (
              <li
                key={cat._id ?? idx}
                className="bg-white p-3 rounded shadow-sm"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">
                      {cat.name}
                      {cat.prize_per_kg != null && (
                        <span className="text-sm text-gray-500 ml-2">
                          (₦{Number(cat.prize_per_kg).toFixed(2)})
                        </span>
                      )}
                    </div>
                    {cat.subcategories && cat.subcategories.length > 0 && (
                      <div className="text-sm text-gray-600 mt-1">
                        Children:{" "}
                        {cat.subcategories
                          .map(
                            (c) =>
                              `${c.name}${
                                c.prize_per_kg != null
                                  ? ` (₦${Number(c.prize_per_kg).toFixed(2)})`
                                  : ""
                              }`
                          )
                          .join(", ")}
                      </div>
                    )}
                  </div>
                  <div className="text-xs text-gray-500">
                    {cat.createdAt ? (
                      new Date(cat.createdAt).toLocaleString()
                    ) : (
                      <h1 className="font-bold text-lg">{cat.kg}kg</h1>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {error && (
        <div
          role="alert"
          className="text-sm text-red-600 bg-red-50 border border-red-100 rounded p-4"
        >
          {error}
        </div>
      )}
    </div>
  );
}
