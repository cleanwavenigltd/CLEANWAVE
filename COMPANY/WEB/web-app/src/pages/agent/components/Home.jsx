import React, { useState, useEffect } from "react";
import { walletBalance } from "../../../services/authservice";
import { getPendingPickups } from "../../../services/pickupService";
// import { getWasteBank } from "../../../services/wasteservice";
import { useDispatch } from "react-redux";
import { setActiveTab } from "../../../store/uiSlice";
import { getConWasteBank } from "../../../services/wasteservice";

const HomePage = () => {
  const dispatch = useDispatch();
  const [balance, setBalance] = useState(0);
  const [PickupsCount, setPickupsCount] = useState(0);
  const [wasteBanksCount, setWasteBanksCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const handleTabChange = (tabId) => {
    dispatch(setActiveTab(tabId));
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [pickupRes, walletRes, connWasteResp] = await Promise.all([
          getPendingPickups(),
          // getWasteBank(),
          walletBalance(),
          getConWasteBank(),
        ]);

        if (pickupRes.success) {
          console.log("PickupRes Data: ", pickupRes.data);
          setPickupsCount(pickupRes.data.data.length);
        }
        // if (wasteRes.success) {
        //   setWasteBanksCount(wasteRes.wasteBanks.wasteBanks.length);
        // }
        if (walletRes.success) {
          setBalance(walletRes.balance);
        }
        if (connWasteResp.success) {
          console.log("ConnWaste: ", connWasteResp.data.conWasteBanks.count);
          // alert(connWasteResp.data)
          setWasteBanksCount(connWasteResp.data.conWasteBanks.count);
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
    <div className="mt-1 mb-[95px] rounded-lg min-h-screen bg-gray-50 p-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Agent Dashboard</h1>
        <p className="text-gray-500 mt-1">
          Manage waste pickups and deliver to waste banks
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          label="Active Pickups"
          value={PickupsCount}
          loading={loading}
          icon="📦"
        />
        <StatCard
          label="Connected Waste Banks"
          value={wasteBanksCount}
          loading={loading}
          icon="🏢"
        />
        <StatCard
          label="Wallet Balance"
          value={`₦${balance.toLocaleString()}`}
          loading={loading}
          icon="💰"
        />
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <ActionButton
            label="View Pickups"
            onClick={() => handleTabChange("pickups")}
            icon="📍"
          />
          <ActionButton
            label="My Wallet"
            onClick={() => handleTabChange("wallet")}
            icon="💳"
          />
          <ActionButton
            label="My Profile"
            onClick={() => handleTabChange("profile")}
            icon="👤"
          />
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-white rounded-lg shadow-sm p-6 ">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          How It Works
        </h2>
        <div className="space-y-4">
          <WorkflowStep
            step="1"
            title="Receive Notification"
            description="Get notified when a user requests a waste pickup"
          />
          <WorkflowStep
            step="2"
            title="Accept Pickup"
            description="Accept the pickup request and collect waste from the user"
          />
          <WorkflowStep
            step="3"
            title="Deliver to Waste Bank"
            description="Transport and deliver waste to a connected waste bank"
          />
          <WorkflowStep
            step="4"
            title="Earn Rewards"
            description="Receive payment once delivery is confirmed"
          />
        </div>
      </div>

      {/* Recent Activity */}
      {/* <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
        <div className="space-y-3">
          <ActivityItem label="Pickup Delivered" amount="+₦500" type="success" />
          <ActivityItem label="Wallet Withdrawal" amount="-₦1,000" type="error" />
          <ActivityItem label="Pickup Pending" amount="In Progress" type="pending" />
        </div>
      </div> */}
    </div>
  );
};

const StatCard = ({ label, value, loading, icon }) => (
  <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-[#8CA566]">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-600 font-medium">{label}</p>
        <p className="text-2xl font-bold text-gray-900 mt-2">
          {loading ? "..." : value}
        </p>
      </div>
      <span className="text-3xl">{icon}</span>
    </div>
  </div>
);

const ActionButton = ({ label, onClick, icon }) => (
  <button
    onClick={onClick}
    className="flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium bg-[#8CA566] text-white hover:bg-[#7a9156] transition-all"
  >
    <span>{icon}</span>
    {label}
  </button>
);

const WorkflowStep = ({ step, title, description }) => (
  <div className="flex gap-4">
    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#8CA566] text-white font-bold text-sm flex-shrink-0">
      {step}
    </div>
    <div>
      <h3 className="font-semibold text-gray-900">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  </div>
);

const ActivityItem = ({ label, amount, type }) => {
  const colorMap = {
    success: "text-green-600",
    error: "text-red-600",
    pending: "text-yellow-600",
  };
  return (
    <div className="flex justify-between items-center border-b pb-3 last:border-b-0">
      <span className="text-sm text-gray-700">{label}</span>
      <span className={`text-sm font-medium ${colorMap[type]}`}>{amount}</span>
    </div>
  );
};

export default HomePage;
