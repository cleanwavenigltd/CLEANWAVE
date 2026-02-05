import { Home, Wallet, User, Users, Truck } from "lucide-react";
import HomePage from "../pages/agent/components/Home";
import Pickups from "../pages/agent/components/Pickups";
import WalletPage from "../components/Wallet";
import Profile from "../components/Profile";
import { useSelector, useDispatch } from "react-redux";
import { setActiveTab } from "../store/uiSlice";
import Header from "./Header";

export default function Agent() {
  const dispatch = useDispatch();
  const { isLoading, userData, role } = useSelector((state) => state.auth);
  const activeTab = useSelector((state) => state.ui.activeTab);

  const handleTabChange = (tabId) => {
    dispatch(setActiveTab(tabId));
  };
  if (isLoading) {
    return <div>Loading...</div>; // Show a loader while authentication is checked
  }

  const menu = [
    { id: "home", label: "Home", icon: <Home size={25} /> },
    { id: "pickups", label: "Pickups", icon: <Truck size={25} /> },
    { id: "wallet", label: "Wallet", icon: <Wallet size={25} /> },
    { id: "profile", label: "Profile", icon: <User size={25} /> },
  ];

  const renderScreen = () => {
    switch (activeTab) {
      case "home":
        return (
          <div className="flex-1 w-full px-2 sm:px-6 max-w-3xl mx-auto items-start">
            <HomePage />
          </div>
          //   <div className="p-6">
          //     <h1 className="text-xl font-semibold mb-4">Welcome to Cleanwave</h1>
          //     <p className="text-gray-600 text-sm">Track your recycling activity and earnings.</p>
          //   </div>
        );
      case "pickups":
        return (
          <div className="flex-1 w-full px-2 sm:px-6 max-w-3xl mx-auto items-start">
            <Pickups />
          </div>
          //   <div className="p-6">
          //     <h1 className="text-xl font-semibold mb-4">Your Pickups</h1>
          //     <p className="text-gray-600 text-sm">Request and monitor waste Pickups.</p>
          //   </div>
        );
      case "wallet":
        return (
          <div className="flex-1 w-full px-2 sm:px-6 max-w-3xl mx-auto items-start">
            <WalletPage />
          </div>
          //   <div className="p-6">
          //     <h1 className="text-xl font-semibold mb-4">Wallet</h1>
          //     <p className="text-gray-600 text-sm">View your earnings and withdraw funds.</p>
          //   </div>
        );
      case "profile":
        return (
          <div className="flex-1 w-full px-2 sm:px-6 max-w-3xl mx-auto items-start">
            <Profile />
          </div>

          // <div className="p-6">
          //   <h1 className="text-xl font-semibold mb-4">Profile</h1>
          //   <p className="text-gray-600 text-sm">Manage your personal information.</p>
          // </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-300 flex flex-col">
      <Header userName={userData?.name || "agent"} role={role || "guest"} />
      <div className="flex-1">{renderScreen()}</div>

      <nav className="h-[10%]  border-t-4 border-gray-200 fixed bottom-0 left-0 right-0 z-50 bg-white flex justify-around">
        {/* <div className="w-full max-w-md bg-white border-t flex justify-around  shadow-md rounded-xl pointer-events-auto mx-4 px-6 py-2"> */}
        {menu.map((item) => (
          <button
            key={item.id}
            onClick={() => handleTabChange(item.id)}
            className={`mt-5 flex flex-col items-center text-xs ${
              activeTab === item.id ? "text-[#8CA566] " : "text-gray-500"
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
        {/* </div> */}
      </nav>
    </div>
  );
}
