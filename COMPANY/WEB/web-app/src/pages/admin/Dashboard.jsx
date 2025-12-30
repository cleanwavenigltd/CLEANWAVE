import React, { useState } from "react";
import {
  Settings,
  Bell,
  LogOut,
  Menu,
  X,
  Home,
  User,
  Users,
  Truck,
  RecycleIcon,
  Archive,
  Box,
  CreditCard,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearAuth } from "../../store/authSlice";
import { adminLogout } from "../../services/adminService";

import Agents from "./components/ManageAgents";
import UsersPage from "./components/ManageUsers";
import Transactions from "./components/Transactions";
import WasteBank from "./components/ManageWasteBank";
import AdminDashboard from "./components/AdminPage";
import Aggregator from "./components/ManageAggregator";
import Waste from "./components/ManageWaste";

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: <Home size={18} /> },
  { id: "waste", label: "Waste Management", icon: <RecycleIcon size={18} /> },
  { id: "profile", label: "Profile", icon: <User size={18} /> },
  { id: "users", label: "Users", icon: <Users size={18} /> },
  { id: "agents", label: "Agents", icon: <Truck size={18} /> },
  { id: "waste-bank", label: "Waste Bank", icon: <Archive size={18} /> },
  { id: "aggregator", label: "Aggregator", icon: <Box size={18} /> },
  { id: "transactions", label: "Transactions", icon: <CreditCard size={18} /> },
];

export default function Dashboard() {
  const [route, setRoute] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const url = import.meta.env.VITE_ADMIN_LOGIN;

  const handleLogout = async () => {
    try {
      dispatch(clearAuth());
      await adminLogout();
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      navigate(`/${url}`);
    }
  };

  const renderPage = () => {
    switch (route) {
      case "waste":
        return <Waste />;
      case "profile":
        return "Profile";
      case "users":
        return <UsersPage />;
      case "agents":
        return <Agents />;
      case "waste-bank":
        return <WasteBank />;
      case "aggregator":
        return <Aggregator />;
      case "transactions":
        return <Transactions />;
      case "dashboard":
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100">
      <Sidebar
        route={route}
        setRoute={setRoute}
        sidebarOpen={sidebarOpen}
        onLogout={handleLogout}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />
        <main className="flex-1 overflow-auto bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
          <div className="max-w-7xl mx-auto">{renderPage()}</div>
        </main>
      </div>
    </div>
  );
}

function Sidebar({ route, setRoute, sidebarOpen, onLogout }) {
  return (
    <aside
      className={`${
        sidebarOpen ? "w-64" : "w-20"
      } bg-gray-950 border-r border-gray-700 transition-all duration-300 flex flex-col`}
      aria-label="Sidebar"
    >
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#4C862D] to-[#8CA566] flex items-center justify-center text-white font-bold text-lg">
            CW
          </div>
          {sidebarOpen && (
            <div>
              <h1 className="text-lg font-bold text-white">CleanWave</h1>
              <p className="text-xs text-gray-400">Admin Panel</p>
            </div>
          )}
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2" aria-label="Main navigation">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => setRoute(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-left ${
              route === item.id
                ? "bg-gradient-to-r from-[#4C862D] to-[#8CA566] text-white shadow-lg"
                : "text-gray-400 hover:bg-gray-800/50"
            }`}
            aria-current={route === item.id ? "page" : undefined}
          >
            <span className="text-xl opacity-90">{item.icon}</span>
            {sidebarOpen && <span className="font-medium">{item.label}</span>}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-700">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-red-400 rounded-lg transition-all"
          aria-label="Logout"
        >
          <LogOut size={18} />
          {sidebarOpen && <span className="text-sm">Logout</span>}
        </button>
      </div>
    </aside>
  );
}

function Header({ setSidebarOpen, sidebarOpen }) {
  return (
    <header className="bg-gray-950 border-b border-gray-700 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="p-2 hover:bg-gray-800 rounded-lg transition-all"
        aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
      >
        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <div className="flex items-center gap-4">
        <button
          className="p-2 hover:bg-gray-800 rounded-lg transition-all relative"
          aria-label="Notifications"
        >
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <button
          className="p-2 hover:bg-gray-800 rounded-lg transition-all"
          aria-label="Settings"
        >
          <Settings size={20} />
        </button>
        <div className="flex items-center gap-3 pl-4 border-l border-gray-700">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#4C862D] to-[#8CA566]" />
          <div className="text-sm">
            <p className="font-medium">Admin</p>
            <p className="text-xs text-gray-400">Super Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export function MetricCard({ title, value, variant, trend, icon }) {
  return (
    <div
      className={`bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg border border-gray-700 p-6 hover:border-gray-600 transition-all ${
        variant === "subtle" ? "shadow-lg" : ""
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="text-sm text-gray-400">{title}</div>
          <div className="mt-3 text-3xl font-bold text-white">{value}</div>
          {trend !== undefined && (
            <div
              className={`text-xs mt-2 ${
                trend > 0 ? "text-green-400" : "text-red-400"
              }`}
            >
              {trend > 0 ? "↑" : "↓"} {Math.abs(trend)}% from last month
            </div>
          )}
        </div>
        {icon && <div className="text-3xl opacity-10">{icon}</div>}
      </div>
    </div>
  );
}

export function formatCurrency(n) {
  if (typeof n !== "number") return n;
  return "₦" + n.toLocaleString(undefined, { maximumFractionDigits: 0 });
}
