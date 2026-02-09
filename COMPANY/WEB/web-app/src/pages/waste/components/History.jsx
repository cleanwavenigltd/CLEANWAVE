// import { ArrowLeft } from "lucide-react";
// import { useState, useMemo, useEffect, useCallback } from "react";
// import { PickupCard } from "../../user/components/History";
// import { getAllWasteData } from "../../../services/adminService";
// import { useDispatch, useSelector } from "react-redux";
// import { setActiveTab } from "../../../store/uiSlice";

// export default function History() {
//   const dispatch = useDispatch();
//   const { isLoading, userData, role, wasteData } = useSelector(
//     (state) => state.auth,
//   );
//   console.log("Waste data: ", wasteData);
//   const [tab, setTab] = useState("pickups");
//   const [activePickupStatus, setActivePickupStatus] = useState("pending");
//   const [loading, setLoading] = useState(false);
//   // const [wasteData, setWasteData] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");

//   // Sample Data
//   const [pickupList] = useState([]);

//   const [records] = useState([]);

//   // const fetchData = useCallback(async () => {
//   //   setLoading(true);
//   //   try {
//   //     const resp = await getAllWasteData();
//   //     console.log("This is redponse for :", resp);
//   //     if (resp && resp.data) {
//   //       setWasteData(resp.data);
//   //     }
//   //   } catch (err) {
//   //     console.log(err);
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // }, []);

//   // useState(() => {
//   //   fetchData();
//   // }, [fetchData]);

//   const filteredData = wasteData.filter((item) => {
//     const matchesTab =
//       activePickupStatus === "all" ? true : item.status === activePickupStatus;
//     const matchesSearch =
//       item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       item.info.toLowerCase().includes(searchQuery.toLowerCase());
//     return matchesTab && matchesSearch;
//   });

//   // Filter pickups based on the active status tab
//   const filteredPickups = useMemo(() => {
//     return pickupList.filter((p) => p.status === activePickupStatus);
//   }, [pickupList, activePickupStatus]);

//   return (
//     <div className="min-h-screen bg-gray-50 p-4 md:p-8">
//       {/* Professional Header Section */}
//       <header className="mb-6 flex items-center justify-between">
//         <button
//           onClick={() => dispatch(setActiveTab("home"))}
//           className="group flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-[#8CA566] transition-all"
//         >
//           <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
//           Back to Home
//         </button>
//         <h1 className="text-xl font-bold text-gray-800">History</h1>
//       </header>

//       <main>
//         {/* Main Navigation Tabs */}
//         <div className="flex mb-6 bg-white rounded-lg border overflow-hidden">
//           {["pickups", "records"].map((t) => (
//             <button
//               key={t}
//               onClick={() => setTab(t)}
//               className={`w-full px-4 py-3 font-semibold transition-colors ${
//                 tab === t
//                   ? "bg-[#8CA566] text-white"
//                   : "bg-white text-gray-600 hover:bg-gray-50"
//               }`}
//             >
//               {t.charAt(0).toUpperCase() + t.slice(1)}
//             </button>
//           ))}
//         </div>

//         <div className="p-2">
//           {tab === "pickups" && (
//             <div className="mt-1 mb-[95px] rounded-lg">
//               {/* Pickup Status Sub-tabs */}
//               <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
//                 {["pending", "accepted", "delivered"].map((status) => (
//                   <button
//                     key={status}
//                     onClick={() => setActivePickupStatus(status)}
//                     className={`whitespace-nowrap px-6 py-2 rounded-full text-sm font-semibold transition-all border ${
//                       activePickupStatus === status
//                         ? "bg-[#8CA566] border-[#8CA566] text-white shadow-md"
//                         : "bg-white text-gray-600 border-gray-200 hover:border-[#8CA566]"
//                     }`}
//                   >
//                     {status.charAt(0).toUpperCase() + status.slice(1)}
//                   </button>
//                 ))}
//               </div>

//               {loading ? (
//                 <p className="text-center py-10 text-gray-500">Loading...</p>
//               ) : filteredData.length === 0 ? (
//                 <div className="text-center py-10 bg-white rounded-xl border border-dashed border-gray-300">
//                   <p className="text-gray-500">
//                     No {activePickupStatus} pickups found.
//                   </p>
//                 </div>
//               ) : (
//                 <div className="grid gap-4">
//                   {filteredData.map((pickup) => (
//                     <PickupCard
//                       key={pickup.id}
//                       data={pickup}
//                       // onAccept={() => handleAccept(pickup.id)}
//                     />
//                   ))}
//                 </div>
//               )}
//             </div>
//           )}

//           {tab === "records" && (
//             <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
//               <div className="p-6 border-b border-gray-200">
//                 <h3 className="text-lg font-bold text-gray-900">
//                   Collection Records
//                 </h3>
//               </div>
//               <div className="overflow-x-auto">
//                 <table className="w-full text-sm">
//                   <thead className="bg-gray-50 border-b border-gray-200">
//                     <tr>
//                       <th className="px-6 py-4 text-left font-semibold text-gray-700">
//                         Agent
//                       </th>
//                       <th className="px-6 py-4 text-left font-semibold text-gray-700">
//                         Category
//                       </th>
//                       <th className="px-6 py-4 text-left font-semibold text-gray-700">
//                         Weight
//                       </th>
//                       <th className="px-6 py-4 text-left font-semibold text-gray-700">
//                         Date
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y divide-gray-100">
//                     {filteredData.length > 0 ? (
//                       filteredData.map((record) => (
//                         <tr
//                           key={record.id}
//                           className="hover:bg-gray-50 transition"
//                         >
//                           <td className="px-6 py-4 text-gray-900 font-medium">
//                             {record.agent}
//                           </td>
//                           <td className="px-6 py-4">
//                             <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs">
//                               {record.category}
//                             </span>
//                           </td>
//                           <td className="px-6 py-4 text-gray-900 font-bold">
//                             {record.kg} kg
//                           </td>
//                           <td className="px-6 py-4 text-gray-500">
//                             {record.created_at}
//                           </td>
//                         </tr>
//                       ))
//                     ) : (
//                       <tr>
//                         <td
//                           colSpan="4"
//                           className="px-6 py-10 text-center text-gray-500"
//                         >
//                           No records available yet.
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// }

// import { ArrowLeft } from "lucide-react";
// import { useState, useMemo } from "react";
// import { PickupCard } from "../../user/components/History";
// import { useDispatch, useSelector } from "react-redux";
// import { setActiveTab } from "../../../store/uiSlice";

// export default function History() {
//   const dispatch = useDispatch();
//   // Extracting data from Redux
//   const { isLoading, wasteData = [] } = useSelector((state) => state.auth);

//   const [tab, setTab] = useState("pickups"); // "pickups" or "records"
//   const [activePickupStatus, setActivePickupStatus] = useState("pending");
//   const [searchQuery, setSearchQuery] = useState("");

//   // Memoized filter logic to keep UI snappy
//   const filteredData = useMemo(() => {
//     return wasteData.filter((item) => {
//       // 1. Logic for Pickups: filter by specific status
//       // 2. Logic for Records: typically show 'delivered' or 'all' finished tasks
//       const matchesTab = tab === "pickups"
//         ? item.status === activePickupStatus
//         : item.status === "delivered"; // Records usually shows completed items

//       const matchesSearch =
//         item.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         item.info?.toLowerCase().includes(searchQuery.toLowerCase());

//       return matchesTab && matchesSearch;
//     });
//   }, [wasteData, tab, activePickupStatus, searchQuery]);

//   return (
//     <div className="min-h-screen bg-gray-50 p-4 md:p-8">
//       <header className="mb-6 flex items-center justify-between">
//         <button
//           onClick={() => dispatch(setActiveTab("home"))}
//           className="group flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-[#8CA566] transition-all"
//         >
//           <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
//           Back to Home
//         </button>
//         <h1 className="text-xl font-bold text-gray-800">History</h1>
//       </header>

//       <main>
//         {/* Main Navigation Tabs */}
//         <div className="flex mb-6 bg-white rounded-lg border overflow-hidden shadow-sm">
//           {["pickups", "records"].map((t) => (
//             <button
//               key={t}
//               onClick={() => setTab(t)}
//               className={`w-full px-4 py-3 font-semibold transition-colors ${
//                 tab === t ? "bg-[#8CA566] text-white" : "bg-white text-gray-600 hover:bg-gray-50"
//               }`}
//             >
//               {t.charAt(0).toUpperCase() + t.slice(1)}
//             </button>
//           ))}
//         </div>

//         <div className="p-2">
//           {tab === "pickups" && (
//             <div className="mt-1 mb-[95px] rounded-lg">
//               {/* Pickup Status Sub-tabs */}
//               <div className="flex gap-3 mb-6 overflow-x-auto pb-2 scrollbar-hide">
//                 {["pending", "accepted", "delivered"].map((status) => (
//                   <button
//                     key={status}
//                     onClick={() => setActivePickupStatus(status)}
//                     className={`whitespace-nowrap px-6 py-2 rounded-full text-sm font-semibold transition-all border ${
//                       activePickupStatus === status
//                         ? "bg-[#8CA566] border-[#8CA566] text-white shadow-md"
//                         : "bg-white text-gray-600 border-gray-200 hover:border-[#8CA566]"
//                     }`}
//                   >
//                     {status.charAt(0).toUpperCase() + status.slice(1)}
//                   </button>
//                 ))}
//               </div>

//               {isLoading ? (
//                 <p className="text-center py-10 text-gray-500">Loading...</p>
//               ) : filteredData.length === 0 ? (
//                 <div className="text-center py-10 bg-white rounded-xl border border-dashed border-gray-300">
//                   <p className="text-gray-500">No {activePickupStatus} pickups found.</p>
//                 </div>
//               ) : (
//                 <div className="grid gap-4">
//                   {filteredData.map((pickup) => (
//                     <PickupCard key={pickup.id} data={pickup} />
//                   ))}
//                 </div>
//               )}
//             </div>
//           )}

//           {tab === "records" && (
//             <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
//               <div className="p-6 border-b border-gray-200">
//                 <h3 className="text-lg font-bold text-gray-900">Collection Records</h3>
//               </div>
//               <div className="overflow-x-auto">
//                 <table className="w-full text-sm text-left">
//                   <thead className="bg-gray-50 border-b border-gray-200">
//                     <tr>
//                       <th className="px-6 py-4 font-semibold text-gray-700">Agent</th>
//                       <th className="px-6 py-4 font-semibold text-gray-700">Category</th>
//                       <th className="px-6 py-4 font-semibold text-gray-700">Weight</th>
//                       <th className="px-6 py-4 font-semibold text-gray-700">Date</th>
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y divide-gray-100">
//                     {filteredData.length > 0 ? (
//                       filteredData.map((record) => (
//                         <tr key={record.id} className="hover:bg-gray-50 transition">
//                           <td className="px-6 py-4 text-gray-900 font-medium">{record.agent || "N/A"}</td>
//                           <td className="px-6 py-4">
//                             <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs">
//                               {record.category}
//                             </span>
//                           </td>
//                           <td className="px-6 py-4 text-gray-900 font-bold">{record.kg || 0} kg</td>
//                           <td className="px-6 py-4 text-gray-500">
//                             {new Date(record.created_at).toLocaleDateString()}
//                           </td>
//                         </tr>
//                       ))
//                     ) : (
//                       <tr>
//                         <td colSpan="4" className="px-6 py-10 text-center text-gray-500">
//                           No completed records available.
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// }

import { ArrowLeft, Search } from "lucide-react"; // Added Search icon
import { useState, useMemo } from "react";
import { PickupCard } from "../../user/components/History";
import { useDispatch, useSelector } from "react-redux";
import { setActiveTab } from "../../../store/uiSlice";

export default function History() {
  const dispatch = useDispatch();
  const { isLoading, wasteData = [] } = useSelector((state) => state.auth);

  const [tab, setTab] = useState("pickups");
  const [activePickupStatus, setActivePickupStatus] = useState("pending");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = useMemo(() => {
    return wasteData.filter((item) => {
      // 1. Tab-specific filtering
      const matchesTab =
        tab === "pickups"
          ? item.status === activePickupStatus
          : item.status === "delivered";

      // 2. Global search filtering (checks multiple fields)
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        item.category?.toLowerCase().includes(query) ||
        item.info?.toLowerCase().includes(query) ||
        item.agent?.toLowerCase().includes(query); // Added agent search for records

      return matchesTab && matchesSearch;
    });
  }, [wasteData, tab, activePickupStatus, searchQuery]);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <header className="mb-6 flex items-center justify-between">
        <button
          onClick={() => dispatch(setActiveTab("home"))}
          className="group flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-[#8CA566] transition-all"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to Home
        </button>
        <h1 className="text-xl font-bold text-gray-800">History</h1>
      </header>

      <main>
        {/* New Search Bar Section */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder={`Search ${tab === "pickups" ? "categories..." : "records by agent or category..."}`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8CA566] focus:border-transparent transition-all shadow-sm"
          />
        </div>

        {/* Main Navigation Tabs */}
        <div className="flex mb-6 bg-white rounded-lg border overflow-hidden shadow-sm">
          {["pickups", "records"].map((t) => (
            <button
              key={t}
              onClick={() => {
                setTab(t);
                // Optional: Clear search when switching tabs
                // setSearchQuery("");
              }}
              className={`w-full px-4 py-3 font-semibold transition-colors ${
                tab === t
                  ? "bg-[#8CA566] text-white"
                  : "bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {/* List Content */}
        <div className="p-2">
          {tab === "pickups" ? (
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
                  <p className="text-gray-500">
                    No results found for "{searchQuery}".
                  </p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {filteredData.map((pickup) => (
                    <PickupCard key={pickup.id} data={pickup} />
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              {/* ... Table View Code ... */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 font-semibold text-gray-700">
                        Agent
                      </th>
                      <th className="px-6 py-4 font-semibold text-gray-700">
                        Category
                      </th>
                      <th className="px-6 py-4 font-semibold text-gray-700">
                        Weight
                      </th>
                      <th className="px-6 py-4 font-semibold text-gray-700">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredData.length > 0 ? (
                      filteredData.map((record) => (
                        <tr
                          key={record.id}
                          className="hover:bg-gray-50 transition"
                        >
                          <td className="px-6 py-4 text-gray-900 font-medium">
                            {record.agent || "N/A"}
                          </td>
                          <td className="px-6 py-4">
                            <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs">
                              {record.category}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-gray-900 font-bold">
                            {record.kg || 0} kg
                          </td>
                          <td className="px-6 py-4 text-gray-500">
                            {new Date(record.created_at).toLocaleDateString()}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="4"
                          className="px-6 py-10 text-center text-gray-500"
                        >
                          No records match your search.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
