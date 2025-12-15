import { useState } from "react";
import { Select } from "../../admin/layouts/modals";
import { AlertCircle, CheckCircle, Loader } from "lucide-react";
import { registerAgent } from "../../../services/agentservice";
import { registerWaste } from "../../../services/wasteservice";

const Community = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    gender: "",
    age: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [mode, setMode] = useState("wastebank");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validateForm = (data) => {
    if (!data.name?.trim()) return "Name is required.";
    if (!/^\S+@\S+\.\S+$/.test(data.email)) return "Valid email required.";
    if (!/^\+?[0-9]{7,15}$/.test(data.phone)) return "Valid phone required.";
    if (data.password.length < 8)
      return "Password must be at least 8 characters.";
    if (mode === "agent" && (!data.age || Number(data.age) < 18))
      return "Agent must be 18+.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const validationError = validateForm(form);
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    try {
      const endpoint = mode === "wastebank" ? registerWaste : registerAgent;
      const payload =
        mode === "wastebank"
          ? {
              name: form.name,
              phone: form.phone,
              email: form.email,
              password: form.password,
              gender: form.gender,
            }
          : { ...form };

      const response = await endpoint(payload);
      console.log("Aggregator Page", response);

      if (!response.success) {
        setError(response?.message || `Failed to register. Please try again.`);
        return;
      }

      setSuccess(response.data.message);
      setForm({
        name: "",
        email: "",
        phone: "",
        password: "",
        gender: "",
        age: "",
      });
    } catch (err) {
      setError(err?.message || "Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">
          {mode === "agent" ? "Register Agent" : "Register WasteBank"}
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Fill in the details below
        </p>

        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Mode Toggle */}
          <div className="flex gap-3 mb-8">
            {["agent", "wastebank"].map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`flex-1 py-2.5 rounded-lg font-medium transition ${
                  mode === m
                    ? "bg-[#8CA566] text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {m === "agent" ? "Agent" : "WasteBank"}
              </button>
            ))}
          </div>

          {/* Alerts */}
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}
          {success && (
            <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <p className="text-green-800 text-sm">{success}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Full Name"
              type="text"
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
            <Input
              label="Password"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
            />

            <Select
              label="Gender"
              name="gender"
              value={form.gender}
              onChange={handleChange}
              options={[
                { value: "", label: "Select Gender", disabled: true },
                { value: "male", label: "Male" },
                { value: "female", label: "Female" },
              ]}
            />

            {mode === "agent" && (
              <Input
                label="Age"
                type="number"
                name="age"
                value={form.age}
                onChange={handleChange}
              />
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 mt-6 bg-[#8CA566] hover:bg-[#7a9557] disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium rounded-lg transition flex items-center justify-center gap-2"
            >
              {loading && <Loader className="w-4 h-4 animate-spin" />}
              {loading ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

function Input({ label, placeholder, name, type, value, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder || label}
        name={name}
        value={value}
        onChange={onChange}
        required
        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8CA566] focus:border-transparent transition"
      />
    </div>
  );
}

export default Community;
