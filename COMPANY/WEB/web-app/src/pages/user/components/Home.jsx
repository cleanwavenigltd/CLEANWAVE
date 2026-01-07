import React from "react";
import { useState, useEffect, useContext } from "react";
import { walletBalance } from "../../../services/authservice";
import { getPickupsCount } from "../../../services/pickupService";
// import PageContext from "../../../contexts/PageContext";
import Pickups from "./Pickups";
import { logout } from "../../../utils/auth";

const HomePage = ({ onSwitch }) => {
  const [balance, setBalance] = useState(0);
  const [pickupsCount, setPickupsCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPickups, setShowPickups] = useState(true);
  // const {setActiveTab}= useContext(PageContext)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [pickupsRes, walletRes] = await Promise.all([
          getPickupsCount(),
          walletBalance(),
        ]);

        if (pickupsRes || walletRes) {
          console.log(pickupsRes);
          if (pickupsRes.success) {
            setPickupsCount(pickupsRes.data.data);
          }
          if (walletRes.success) {
            setBalance(walletRes.balance);
          }
        }
      } catch (err) {
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div>
        <h1 className="text-3xl font-bold text-[#8CA566]">
          Dashboard Overview
        </h1>
        <p className="text-gray-500 mt-1">Welcome back! Here's your summary</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
          <p className="text-sm text-gray-600 font-medium">Total Pickups</p>
          <p className="text-3xl font-bold text-[#8CA566] mt-2">
            {loading ? "-" : pickupsCount}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
          <p className="text-sm text-gray-600 font-medium">Wallet Balance</p>
          <p className="text-3xl font-bold text-[#8CA566] mt-2">
            {loading ? "-" : `₦${balance.toLocaleString()}`}
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
            onClick={() => setShowPickups(!showPickups)}
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

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">
          Recent Activity
        </h2>
        <div className="space-y-3">
          <div className="flex justify-between items-center text-sm border-b pb-3">
            <span className="text-gray-700">Pickup Completed</span>
            <span className="text-[#8CA566] font-semibold">+₦500</span>
          </div>
          <div className="flex justify-between items-center text-sm border-b pb-3">
            <span className="text-gray-700">Wallet Withdrawal</span>
            <span className="text-red-500 font-semibold">-₦1,000</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-700">Pickup Scheduled</span>
            <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
              Pending
            </span>
          </div>
        </div>
      </div>

      {showPickups && <Pickups onClose={() => setShowPickups(false)} />}
    </div>
  );
};

export default HomePage;
