// import React, { useState, useEffect, useContext } from "react";
// import { walletBalance } from "../../../services/authservice";
// import { getAgent } from "../../../services/aggregatorservice";
// import { getWasteBank } from "../../../services/wasteservice";
// import { PageContext } from "../../../contexts/PageContext";
// // import { getPickupsCount } from "../../../services/pickupService";
// // import Pickups from "./";

// const HomePage = () => {
//   const [balance, setBalance] = useState();
//   const [AgentsCount, setAgentsCount] = useState();
//   const [WasteBanks, setWasteBanks] = useState();

//   useEffect(() => {
//     const fetchPickups = async () => {
//       const [res, wasteResp] = await Promise.all([getAgent(), getWasteBank()]);
//       setWasteBanks(wasteResp.data.wasteBanks.wasteBanks.length);
//       console.log("Home Page res", wasteResp);

//       if (res.success) {
//         // console.log("Pickups Count", pickupsCount);
//         setAgentsCount(res.data.agent.agents.length);
//       } else {
//         console.error(res.message);
//       }
//     };

//     fetchPickups();
//   }, []);

//   useEffect(() => {
//     const fetchWallet = async () => {
//       const res = await walletBalance();

//       if (res.success) {
//         setBalance(res.data.balance);
//       } else {
//         console.error(res.message);
//       }
//     };

//     fetchWallet();
//   }, []);
//   const { setActiveTab } = useContext(PageContext);
//   return (
//     <div className="p-6 space-y-4">
//       <h1 className="text-xl font-bold text-[#8CA566]">Dashboard Overview</h1>

//       {/* Stats */}
//       <div className="grid grid-cols-2 gap-4">
//         <div className="bg-white rounded-xl shadow-md p-4 text-center">
//           <p className="text-sm text-gray-500">Agents</p>
//           <p className="text-2xl font-bold text-[#8CA566]">
//             {AgentsCount || 0}
//           </p>
//         </div>

//         <div className="bg-white rounded-xl shadow-md p-4 text-center">
//           <p className="text-sm text-gray-500">WasteBanks</p>
//           <p className="text-2xl font-bold text-[#8CA566]">{WasteBanks || 0}</p>
//         </div>
//       </div>

//       {/* Quick Actions */}
//       <div className="bg-white rounded-xl shadow-md p-4">
//         <h2 className="text-lg font-semibold mb-3">Quick Actions</h2>
//         <div className="grid grid-cols-2 gap-3">
//           <button
//             onClick={() => setActiveTab && setActiveTab("community")}
//             className="bg-[#8CA566] text-white py-2 rounded-lg shadow hover:opacity-90"
//           >
//             Add Agent
//           </button>

//           <button
//             onClick={() => setActiveTab && setActiveTab("community")}
//             className="bg-[#8CA566] text-white py-2 rounded-lg shadow hover:opacity-90"
//           >
//             Add WasteBank
//           </button>

//           <button
//             onClick={() => setActiveTab && setActiveTab("wallet")}
//             className="bg-gray-200 text-gray-700 py-2 rounded-lg shadow hover:bg-gray-300 col-span-2"
//           >
//             Buy Airtime / Data
//           </button>
//         </div>
//       </div>

//       {/* Recent Activity */}
//       <div className="bg-white rounded-xl shadow-md p-4">
//         <h2 className="text-lg font-semibold mb-3">Recent Activity</h2>

//         <div className="space-y-2">
//           <div className="flex justify-between text-sm border-b pb-2">
//             <span>Pickup Completed</span>
//             <span className="text-[#8CA566]">+₦500</span>
//           </div>

//           <div className="flex justify-between text-sm border-b pb-2">
//             <span>Wallet Withdrawal</span>
//             <span className="text-red-500">-₦1,000</span>
//           </div>

//           <div className="flex justify-between text-sm border-b pb-2">
//             <span>Pickup Scheduled</span>
//             <span className="text-gray-400">Pending</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HomePage;

import React, { useState, useEffect, useContext } from "react";
import { walletBalance } from "../../../services/authservice";
import { getAgent } from "../../../services/aggregatorservice";
import { getWasteBank } from "../../../services/wasteservice";
import { PageContext } from "../../../contexts/PageContext";

const HomePage = () => {
  const [balance, setBalance] = useState(0);
  const [agentsCount, setAgentsCount] = useState(0);
  const [wasteBanksCount, setWasteBanksCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const { setActiveTab } = useContext(PageContext);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [agentRes, wasteRes, walletRes] = await Promise.all([
          getAgent(),
          getWasteBank(),
          walletBalance(),
        ]);
        console.log("This is the Wallet resp ::",agentRes.agents)

        if (agentRes.success) {
          setAgentsCount(agentRes.agents.count);
        }
        if (wasteRes.success) {
          setWasteBanksCount(wasteRes.data.wasteBanks.wasteBanks.count);
        }
        if (walletRes.success) {
           console.log("Balance",balance)
          setBalance(walletRes.balance);
        }
      } catch (error) {
        console.error("Dashboard data fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="rounded-lg mt-[10px] mb-[100px] min-h-screen bg-gray-50 p-16">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">
          Welcome back to your management hub
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard label="Active Agents" value={agentsCount} loading={loading} />
        <StatCard
          label="Waste Banks"
          value={wasteBanksCount}
          loading={loading}
        />
        <StatCard
          label="Wallet Balance"
          value={`₦${balance.toLocaleString()}`}
          loading={loading}
        />
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <ActionButton
            label="Add Agent"
            onClick={() => setActiveTab("community")}
          />
          <ActionButton
            label="Add Waste Bank"
            onClick={() => setActiveTab("community")}
          />
          {/* <ActionButton
            label="View Pickups"
            onClick={() => setActiveTab("pickups")}
          /> */}
          <ActionButton
            label="Top Up Wallet"
            onClick={() => setActiveTab("wallet")}
            variant="secondary"
          />
        </div>
      </div>

      {/* Recent Activity */}
      {/* <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Recent Activity
        </h2> */}
      {/* <div className="space-y-3">
          <ActivityItem
            label="Pickup Completed"
            amount="+₦500"
            type="success"
          />
          <ActivityItem
            label="Wallet Withdrawal"
            amount="-₦1,000"
            type="error"
          />
          <ActivityItem
            label="Pickup Scheduled"
            amount="Pending"
            type="pending"
          /> */}
      {/* </div> */}
      {/* </div> */}
    </div>
  );
};

const StatCard = ({ label, value, loading }) => (
  <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-[#8CA566]">
    <p className="text-sm text-gray-600 font-medium">{label}</p>
    <p className="text-2xl font-bold text-gray-900 mt-2">
      {loading ? "..." : value}
    </p>
  </div>
);

const ActionButton = ({ label, onClick, variant = "primary" }) => (
  <button
    onClick={onClick}
    className={`py-3 px-4 rounded-lg font-medium transition-all ${
      variant === "primary"
        ? "bg-[#8CA566] text-white hover:bg-[#7a9156]"
        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
    }`}
  >
    {label}
  </button>
);

// const ActivityItem = ({ label, amount, type }) => {
//   const colorMap = {
//     success: "text-green-600",
//     error: "text-red-600",
//     pending: "text-yellow-600",
//   };
//   return (
//     <div className="flex justify-between items-center border-b pb-3 last:border-b-0">
//       <span className="text-sm text-gray-700">{label}</span>
//       <span className={`text-sm font-medium ${colorMap[type]}`}>{amount}</span>
//     </div>
//   );
// };

export default HomePage;
