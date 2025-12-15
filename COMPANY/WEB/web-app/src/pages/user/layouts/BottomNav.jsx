import { useState } from "react";
import { Home, Wallet, User, Truck } from "lucide-react";

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState("home");

  const menu = [
    { id: "home", label: "Home", icon: <Home size={18} /> },
    { id: "pickups", label: "Pickups", icon: <Truck size={18} /> },
    { id: "wallet", label: "Wallet", icon: <Wallet size={18} /> },
    { id: "profile", label: "Profile", icon: <User size={18} /> },
  ];

  const renderScreen = () => {
    switch (activeTab) {
      case "home":
        return (
          <div className="p-6">
            <h1 className="text-xl font-semibold mb-4">Welcome to Cleanwave</h1>
            <p className="text-gray-600 text-sm">Track your recycling activity and earnings.</p>
          </div>
        );
      case "pickups":
        return (
          <div className="p-6">
            <h1 className="text-xl font-semibold mb-4">Your Pickups</h1>
            <p className="text-gray-600 text-sm">Request and monitor waste pickups.</p>
          </div>
        );
      case "wallet":
        return (
          <div className="p-6">
            <h1 className="text-xl font-semibold mb-4">Wallet</h1>
            <p className="text-gray-600 text-sm">View your earnings and withdraw funds.</p>
          </div>
        );
      case "profile":
        return (
          <div className="p-6">
            <h1 className="text-xl font-semibold mb-4">Profile</h1>
            <p className="text-gray-600 text-sm">Manage your personal information.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="flex-1">{renderScreen()}</div>

      <nav className="h-16 bg-white border-t flex justify-around items-center shadow-md">
        {menu.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center text-xs ${
              activeTab === item.id ? "text-[#8CA566]" : "text-gray-500"
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
