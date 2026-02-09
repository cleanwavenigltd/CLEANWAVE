// import React, { useState } from "react";
// import { useSelector } from "react-redux";

// // import { ArrowLeft } from "lucide-react";
// // import {
// //   getPendingPickups,
// //   getAcceptedPickups,
// //   getDeliveredPickups,
// // } from "../../../services/pickupService";

// const Pickups = () => {
//   const { pickups } = useSelector((state) => state.auth);
//   console.log("Pickups: ", pickups);
//   const pickupList = pickups;
//   const [tab, setTab] = useState("pending");
//   // const [pickupList, setPickupList] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // const fetchPickups = async () => {
//   //   try {
//   //     setLoading(true);
//   //     // const response = await getPendingPickups();

//   //     let res =
//   //       tab === "pending"
//   //         ? await getPendingPickups()
//   //         : tab === "accepted"
//   //         ? await getAcceptedPickups()
//   //         : await getDeliveredPickups();

//   //     if (res?.success) {
//   //       const rawData =
//   //         res.data?.pickups ||
//   //         res.data?.data ||
//   //         res.pickups ||
//   //         res.data ||
//   //         res.items ||
//   //         [];

//   //       // 2. Filter to only include items where the status matches the active tab
//   //       const filteredData = rawData.filter((pickup) => pickup.status === tab);

//   //       // 3. Update your state with the filtered data
//   //       setPickupList(filteredData);
//   //     } else {
//   //       setPickupList([]);
//   //     }
//   //   } catch (e) {
//   //     console.error("Error loading pickups:", e);
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   //   const handleAccept = async (id) => {
//   //     try {
//   //       const res = await acceptPickup(id);

//   //       if (res?.success) {
//   //         // Remove from UI instantly
//   //         setPickupList((prev) => prev.filter((p) => p.id !== id));
//   //       }
//   //     } catch (error) {
//   //       console.error("Error accepting pickup:", error);
//   //     }
//   //   };

//   // useEffect(() => {
//   //   fetchPickups();
//   // }, [tab]);

//   return (
//     <div className="mt-1 mb-[95px] p-2 rounded-lg min-h-screen bg-gray-50">
//       <h1 className="text-2xl font-semibold mb-6">Waste Pickups</h1>

//       {/* Tabs */}
//       <div className="flex gap-3 mb-6">
//         {["pending", "accepted", "delivered"].map((t) => (
//           <button
//             key={t}
//             onClick={() => setTab(t)}
//             className={`px-2 py-2 rounded-lg font-medium ${
//               tab === t
//                 ? "bg-[#8CA566] text-white"
//                 : "bg-white text-gray-600 border"
//             }`}
//           >
//             {t.charAt(0).toUpperCase() + t.slice(1)}
//           </button>
//         ))}
//       </div>

//       {/* Pickup List */}
//       {loading ? (
//         <p className="text-gray-600">Loading...</p>
//       ) : pickupList.length === 0 ? (
//         <p className="text-gray-500">No pickups found.</p>
//       ) : (
//         <div className="grid gap-4">
//           {pickupList.map((pickup) => (
//             <PickupCard
//               key={pickup.id}
//               data={pickup}
//               tab={tab}
//               // onAccept={() => handleAccept(pickup.id)}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

export const PickupCard = ({ data }) => {
  const {
    id,
    category,
    subcategory,
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
          <strong>SubWaste:</strong> {subcategory || "Unknown"}
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

      {/* {tab === "pending" && (
        <button
          onClick={onAccept}
          className="mt-4 w-full bg-[#8CA566] text-white py-2 rounded-lg font-medium hover:bg-[#7a9156]"
        >
          Accept Pickup
        </button>
      )} */}
    </div>
  );
};

function normalizePickup(data) {
  return {
    id: data.id || data.pickup_id,
    category: data.category || data.type,
    subcategory: data.subcategory || data.subType,
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

// export default function History() {
//   return (
//     <div className="min-h-screen bg-gray-50 p-4 md:p-8">
//       {/* Professional Header Section */}
//       <header className="mb-6 flex items-center justify-between">
//         {/* <button
//           onClick={() => onSwitch("home")}
//           className="group flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-[#8CA566] transition-all"
//         >
//           <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
//           Back to Home
//         </button> */}
//         <h1 className="text-xl font-bold text-gray-800">My Deliveries</h1>
//       </header>

//       {/* Pickups Container */}
//       <main className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
//         <div className="p-4 border-b border-gray-50 bg-gray-50/50">
//           <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
//             Recent Pickup History
//           </p>
//         </div>
//         <div className="p-2">
//           <Pickups />
//         </div>
//       </main>
//     </div>

//     // <div className="min-h-screen p-1 space-y-6 bg-gray-50 ">
//     //   {/* Navigation Footer */}
//     //   <div className="mt-8 text-left">
//     //     <button
//     //       type="button"
//     //       onClick={() => onSwitch("home")}
//     //       className="text-sm font-semibold text-gray-600 hover:text-[#8CA566] transition-colors"
//     //     >
//     //       &larr; Back to Home
//     //     </button>
//     //     <Pickups />
//     //   </div>
//     // </div>
//   );
// }

import { Search } from "lucide-react"; // Added Search icon
import { useState, useMemo } from "react";
import { useSelector } from "react-redux";

export default function History() {
  const { isLoading, pickups = [] } = useSelector((state) => state.auth);

  const [activePickupStatus, setActivePickupStatus] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = useMemo(() => {
    return pickups.filter((item) => {
      // 1. Tab-specific filtering
     console.log(item)
      // 2. Global search filtering (checks multiple fields)
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        item.category?.toLowerCase().includes(query) ||
        item.info?.toLowerCase().includes(query) ||
        item.agent?.toLowerCase().includes(query); // Added agent search for records

      return activePickupStatus && matchesSearch;
    });
  }, [pickups, activePickupStatus, searchQuery]);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-800">History</h1>
      </header>

      <main>
        {/* New Search Bar Section */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder={`Search categories...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8CA566] focus:border-transparent transition-all shadow-sm"
          />
        </div>

        {/* List Content */}
        <div className="p-2">
          <div className="mt-1 mb-[95px] rounded-lg">
            {/* Pickup Status Sub-tabs */}
            <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
              {["pending", "accepted", "delivered"].map((status) => (
                <button
                  key={status}
                  onClick={() => setActivePickupStatus(status)}
                  className={`whitespace-nowrap px-6 py-2 rounded-full text-sm font-semibold transition-all border ${
                    activePickupStatus === status
                      ? "bg-[#8CA566] border-[#8CA566] text-white"
                      : "bg-white text-gray-600 border-gray-200 hover:border-[#8CA566]"
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>

            {isLoading ? (
              <p className="text-center py-10 text-gray-500">Loading...</p>
            ) : filteredData.length === 0 ? (
              <div className="text-center py-10 bg-white rounded-xl border border-dashed border-gray-300">
                <p className="text-gray-500">No results found {searchQuery}</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {filteredData.map((pickup) => (
                  <PickupCard key={pickup.id} data={pickup} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
