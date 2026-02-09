

import React, { useState } from "react";
import Pickups from "./Pickups";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setActiveTab } from "../../../store/uiSlice";

const HomePage = () => {
  const dispatch = useDispatch();
  const onSwitch = (tabId) => dispatch(setActiveTab(tabId));
  const [showPickups, setShowPickups] = useState(false);

  // 1. Pull data from Redux store
  const { userData, wallet, pickups, isLoading, error } = useSelector(
    (state) => state.auth,
  );
  console.log(pickups.length);

  // 2. Handle Loading State
  if (isLoading && !userData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#8CA566]"></div>
        <p className="ml-3">Fetching your dashboard...</p>
      </div>
    );
  }

  // 3. Handle Error State
  if (error) return <div className="p-6 text-red-600">Error: {error}</div>;

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div>
        <h1 className="text-3xl font-bold text-[#8CA566]">
          Dashboard Overview
        </h1>
        <p className="text-gray-500 mt-1">
          Welcome back, {userData?.name || "User"}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
          <p className="text-sm text-gray-600 font-medium">Total Pickups</p>
          <p className="text-3xl font-bold text-[#8CA566] mt-2">
            {/* Replace with actual pickup count from Redux if available */}
            {pickups.length || 0}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
          <p className="text-sm text-gray-600 font-medium">Wallet Balance</p>
          <p className="text-3xl font-bold text-[#8CA566] mt-2">
            {/* Use wallet balance from Redux */}₦
            {wallet?.balance?.toLocaleString() || "0"}
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setShowPickups(true)}
            className="bg-[#8CA566] text-white py-3 rounded-lg font-medium hover:bg-[#7a9256] transition shadow"
          >
            Request Pickup
          </button>
          <button
            onClick={() => onSwitch("history")}
            className="bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition"
          >
            View History
          </button>
        </div>
      </div>

      {/* Recent Activity (Static Placeholder) */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">
          Recent Activity
        </h2>
        <div className="space-y-3">
          <div className="flex justify-between items-center text-sm border-b pb-3">
            <span className="text-gray-700">Pickup Completed</span>
            <span className="text-[#8CA566] font-semibold">+₦500</span>
          </div>
          {/* ... other activities */}
        </div>
      </div>

      {showPickups && <Pickups onClose={() => setShowPickups(false)} />}
    </div>
  );
};

export default HomePage;
