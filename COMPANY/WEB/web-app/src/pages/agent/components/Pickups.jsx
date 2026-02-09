import React, { useEffect, useState } from "react";
import {
  getPendingPickups,
  getAcceptedPickups,
  getDeliveredPickups,
  acceptPickup,
} from "../../../services/pickupService";
// import { getAgentPickups } from "../../../services/pickupService";

const Pickups = () => {
  const [tab, setTab] = useState("pending");
  const [pickupList, setPickupList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPickups = async () => {
    try {
      setLoading(true);
      // const response = await getPendingPickups();
      // console.log("Pending Pickups Response:", response.data.data.length);
      // console.log(
      //   "Agent Pickups Response:",
      //   response.data.pickups.map((p) => p.status)
      // );

      let res =
        tab === "pending"
          ? await getPendingPickups()
          : tab === "accepted"
          ? await getAcceptedPickups()
          : await getDeliveredPickups();

      if (res?.success) {
        // Handle any data structure
        // console.log("Fetched Pickups:", res);
        // const data =
        // res.data?.pickups || res.pickups || res.data || res.items || [];

        // setPickupList(data);
        const rawData =
          res.data?.pickups ||
          res.data?.data ||
          res.pickups ||
          res.data ||
          res.items ||
          [];

        // 2. Filter to only include items where the status matches the active tab
        const filteredData = rawData.filter((pickup) => pickup.status === tab);

        // 3. Update your state with the filtered data
        setPickupList(filteredData);
        console.log("Filtered Pickups:", filteredData);
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
    <div className="mt-1 mb-[95px] p-2 rounded-lg min-h-screen bg-gray-50">
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
  const {
    id,
    category,
    subCategory,
    weight,
    user_name,
    location,
    status,
    created_at,
  } = normalizePickup(data);

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
          <strong>Waste:</strong> {category || "Unknown"}
        </p>
        <p>
          <strong>SubWaste:</strong> {subCategory || "Unknown"}
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

function normalizePickup(data) {
  return {
    id: data.id || data.pickup_id,
    category: data.category || data.type,
    subCategory: data.subcategory || data.subType,
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
