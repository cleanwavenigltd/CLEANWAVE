import React, { useState, useEffect } from "react";
import { walletBalance } from "../../../services/authservice";
import { getAgent } from "../../../services/aggregatorservice";
import { getWasteBank } from "../../../services/wasteservice";
import { useDispatch } from "react-redux";
import { setActiveTab } from "../../../store/uiSlice";

const HomePage = () => {
  const dispatch = useDispatch();
  const [balance, setBalance] = useState(0);
  const [agentsCount, setAgentsCount] = useState(0);
  const [wasteBanksCount, setWasteBanksCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const handleTabChange = (tabId) => {
    dispatch(setActiveTab(tabId));
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [agentRes, wasteRes, walletRes] = await Promise.all([
          getAgent(),
          getWasteBank(),
          walletBalance(),
        ]);
        console.log("This is the Wallet resp ::", agentRes.agents);

        if (agentRes.success) {
          setAgentsCount(agentRes.agents.count);
        }
        if (wasteRes.success) {
          setWasteBanksCount(wasteRes.data.wasteBanks.wasteBanks.count);
        }
        if (walletRes.success) {
          console.log("Balance", walletRes.balance);
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
            onClick={() => handleTabChange("community")}
          />
          <ActionButton
            label="Add Waste Bank"
            onClick={() => handleTabChange("community")}
          />
          {/* <ActionButton
            label="View Pickups"
            onClick={() => handleTabChange("pickups")}
          /> */}
          <ActionButton
            label="Top Up Wallet"
            onClick={() => handleTabChange("wallet")}
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
