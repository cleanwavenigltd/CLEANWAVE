import { useState } from "react";
import Input from "./input";
// import { reg, get } from "../../../services/aggregatorservice";
// import { on } from "../../../../../../BACK-END/db/knex";

function UserModal({
  user,
  title,
  onClose,
  verify, // prop used to decide whether to show verification control
  reg,
}) {
  const [form, setForm] = useState({
    name: user?.name || "",
    password: "",
    email: user?.email || "",
    phone: user?.phone || "",
    role: user?.role || "",
    location: user?.location || "",
    // capacity: user?.capacity || "",
    age: user?.age || "",
    gender: user?.gender || "",
    // ensure boolean
    is_verified: user?.is_verified || false,
  });
  console.log("UserModal user::", user);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // const capacity = input || "capacity";

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setForm((prev) => ({ ...prev, [name]: newValue }));
  };

  // const showCapacity = () => {
  //   if (show) {
  //     return (
  //       <Input
  //         type="number"
  //         label={capacity}
  //         name={capacity}
  //         value={form.capacity}
  //         onChange={handleChange}
  //       />
  //     );
  //   }
  //   return null;
  // };

  const showVerify = () => {
    if (verify !== undefined) {
      return (
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2">
            <input
              name="is_verified"
              type="checkbox"
              checked={form.is_verified}
              onChange={handleChange}
              className="h-4 w-4 text-[#8CA566] border-gray-300 rounded"
            />
            <span className="text-gray-600">verified</span>
          </label>
        </div>
      );
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      // include id if updating so reg can distinguish create vs update
      const payload = { ...form };
      if (user?.id) payload.id = user.id;

      const resp = await reg(payload);
      console.log("UserModal::", resp);

      if (resp.success) {
        setSuccess(
          resp.message ||
            (user ? "User updated successfully." : "User created successfully.")
        );

        // refresh list if get provided
        // if (get) {
        //   const updatedResp = await get();
        //   // handle updatedResp as needed
        // }

        setForm({
          name: "",
          password: "",
          email: "",
          phone: "",
          role: "",
          location: "",
          capacity: "",
          age: "",
          gender: "",
          is_verified: false,
        });
        // onClose && onClose();
      } else {
        console.log(resp);
        setError(resp.message || resp || "Unable to create/update user.");
      }
    } catch (err) {
      console.log(err);
      setError(err?.message || "Server error.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <h2 className="text-black text-lg font-semibold mb-4">
          {user ? `Edit ${title}` : `Add New ${title}`}
        </h2>

        {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
        {success && <p className="text-green-600 text-sm mb-2">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Full Name"
            name="name"
            value={form.name}
            placeholder="Name"
            onChange={handleChange}
          />
          <Input
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
          />
          <Input
            label="Email Address"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
          />

          <Select
            label="Gender"
            name="gender"
            value={form.gender}
            onChange={handleChange}
            options={[
              { value: "", label: "Select gender", disabled: true },
              { value: "male", label: "Male" },
              { value: "female", label: "Female" },
            ]}
          />

          <Input
            label="Phone Number"
            name="phone"
            value={form.phone}
            onChange={handleChange}
          />
          {/* {showCapacity()} */}
          {user?.age && (
            <Input
              label="Age"
              name="age"
              type="number"
              value={form.age}
              onChange={handleChange}
            />
          )}

          {user?.location ||
            (title == "Aggregator" && (
              <Input
                label="Location"
                name="location"
                value={form.location}
                onChange={handleChange}
              />
            ))}
          {verify !== undefined && showVerify()}

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="text-black px-4 py-2 border rounded-md"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function Select({ label, name, value, onChange, options }) {
  return (
    <div>
      <label className="block text-sm mb-1">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        required
        className="text-black w-full border px-3 py-2 rounded-md"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value} disabled={o.disabled}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default UserModal;
