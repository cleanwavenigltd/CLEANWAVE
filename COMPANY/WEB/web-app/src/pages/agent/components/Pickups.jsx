// import React, { useState } from "react";
// import { Search } from "lucide-react";
// import { requestWastePickup } from "../../../services/pickupService";

// export default function Pickups() {
//   const [search, setSearch] = useState("");
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const [form, setForm] = useState({
//     category: "",
//     kg: "",
//     // date: "",
//     // time: "",
//     note: "",
//     // location: "",
//   });

//   const handleChange = (e) =>
//     setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

//   const handleSubmit = async (e) => {
//     e.preventDefault(); // FIXED

//     setError("");
//     setSuccess("");

//     try {
//       const resp = await requestWastePickup(form);
//       if (resp.success) {
//         setSuccess("Pickup Received");
//       } else {
//         console.log("PickUp Page reso", resp);
//         setError(resp.message || "Cannot request pickup");
//       }
//     } catch (err) {
//       setError("Server error");
//     }
//   };

//   return (
//     <div className="p-4 space-y-6 pb-24">
//       <div className="relative">
//         <Search className="absolute left-3 top-3 text-gray-400" size={18} />
//         <input
//           type="text"
//           placeholder="Search Nearby Agents"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="w-full border rounded-xl h-12 pl-10 text-sm"
//         />
//       </div>

//       {error && (
//         <div className="mb-4 text-red-600 text-sm text-center">{error}</div>
//       )}
//       {success && (
//         <div className="mb-4 text-green-600 text-sm text-center">{success}</div>
//       )}

//       <form onSubmit={handleSubmit}>
//         <div className="p-4 bg-white border rounded-xl shadow-sm space-y-4">
//           {/* Waste Type */}
//           <div>
//             <label className="text-sm">Waste Category</label>
//             <select
//               name="category"
//               value={form.category}
//               onChange={handleChange}
//               className="w-full h-12 border rounded-lg px-3 text-sm"
//               required
//             >
//               <option value="">Select Category</option>
//               <option value="Plastic">Plastic</option>
//               <option value="Metal">Metal</option>
//               <option value="Organic">Organic</option>
//               <option value="Paper">Paper</option>
//               <option value="Electronics">Electronics</option>
//             </select>
//           </div>

//           {/* Weight */}
//           <div>
//             <label className="text-sm">Estimated Weight (KG)</label>
//             <input
//               type="number"
//               name="kg"
//               value={form.kg}
//               onChange={handleChange}
//               placeholder="Enter KG"
//               className="w-full h-12 border rounded-lg px-3 text-sm"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-2">
//               Additional Note (optional)
//             </label>
//             <textarea
//               placeholder="Any additional details about this pickup?"
//               name="note"
//               value={form.note}
//               onChange={handleChange}
//               rows="3"
//               className="w-full p-3 border rounded focus:ring-2 focus:ring-primary focus:outline-none"
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full h-12 bg-[#8CA566] text-white rounded-xl font-semibold"
//           >
//             Request Pickup
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import {
  getPendingPickups,
  getAcceptedPickups,
  getDeliveredPickups,
  acceptPickup,
} from "../../../services/agentservice";

const Pickups = () => {
  const [tab, setTab] = useState("pending");
  const [pickupList, setPickupList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPickups = async () => {
    try {
      setLoading(true);

      let res =
        tab === "pending"
          ? await getPendingPickups()
          : tab === "accepted"
          ? await getAcceptedPickups()
          : await getDeliveredPickups();

      if (res?.success) {
        // Handle any data structure
        const data =
          res.data?.pickups || res.pickups || res.data || res.items || [];

        setPickupList(data);
      } else {
        setPickupList([]);
      }
    } catch (e) {
      console.error("Error loading pickups:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (id) => {
    try {
      const res = await acceptPickup(id);

      if (res?.success) {
        // Remove from UI instantly
        setPickupList((prev) => prev.filter((p) => p.id !== id));
      }
    } catch (error) {
      console.error("Error accepting pickup:", error);
    }
  };

  useEffect(() => {
    fetchPickups();
  }, [tab]);

  return (
    <div className="mt-1 mb-[95px] p-6 rounded-lg min-h-screen bg-gray-50">
      <h1 className="text-2xl font-semibold mb-6">Waste Pickups</h1>

      {/* Tabs */}
      <div className="flex gap-3 mb-6">
        {["pending", "accepted", "delivered"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-lg font-medium ${
              tab === t
                ? "bg-[#8CA566] text-white"
                : "bg-white text-gray-600 border"
            }`}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {/* Pickup List */}
      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : pickupList.length === 0 ? (
        <p className="text-gray-500">No pickups found.</p>
      ) : (
        <div className="grid gap-4">
          {pickupList.map((pickup) => (
            <PickupCard
              key={pickup.id}
              data={pickup}
              tab={tab}
              onAccept={() => handleAccept(pickup.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const PickupCard = ({ data, tab, onAccept }) => {
  const { id, waste_type, weight, user_name, location, status, created_at } =
    normalizePickup(data);

  return (
    <div className="bg-white shadow-sm rounded-lg p-4 border-l-4 border-[#8CA566]">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">Pickup #{id}</h2>
        <span
          className={`px-3 py-1 text-sm rounded-full ${
            status === "pending"
              ? "bg-yellow-100 text-yellow-700"
              : status === "accepted"
              ? "bg-blue-100 text-blue-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {status}
        </span>
      </div>

      <div className="mt-3 text-sm text-gray-700 space-y-1">
        <p>
          <strong>Waste:</strong> {waste_type || "Unknown"}
        </p>
        <p>
          <strong>Weight:</strong> {weight || "--"} kg
        </p>
        <p>
          <strong>Location:</strong> {location || "No location"}
        </p>
        <p>
          <strong>User:</strong> {user_name || "Unknown"}
        </p>
        <p>
          <strong>Requested:</strong> {formatDate(created_at)}
        </p>
      </div>

      {tab === "pending" && (
        <button
          onClick={onAccept}
          className="mt-4 w-full bg-[#8CA566] text-white py-2 rounded-lg font-medium hover:bg-[#7a9156]"
        >
          Accept Pickup
        </button>
      )}
    </div>
  );
};

// Normalize ANY backend structure
function normalizePickup(data) {
  return {
    id: data.id || data.pickup_id,
    waste_type: data.waste_type || data.type,
    weight: data.weight || data.kg,
    user_name: data.user_name || data.user,
    location: data.location || data.address,
    status: data.status,
    created_at: data.created_at || data.date,
  };
}

function formatDate(date) {
  if (!date) return "--";
  const d = new Date(date);
  return d.toLocaleDateString();
}

export default Pickups;
