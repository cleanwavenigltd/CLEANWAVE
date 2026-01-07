import { useState } from "react";
import { Home, Wallet, User, Truck } from "lucide-react";
import HomePage from "../pages/user/components/Home";
import Pickups from "../pages/user/components/Pickups";
import { PageProvider } from "../contexts/PageContext";
import WalletPage from "../components/Wallet";
import Profile from "../components/Profile";
import Header from "./Header";
export default function UserLayout({ onSwitch }) {
  const [activeTab, setActiveTab] = useState("home");

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
            <HomePage onSwitch={onSwitch} />
          </div>
        );
      case "pickups":
        return <Pickups />;
      case "wallet":
        return (
          <div className="flex-1 w-full px-2 sm:px-6 max-w-3xl mx-auto items-start">
            <WalletPage />
          </div>
        );
      case "profile":
        return (
          <div className="flex-1 w-full px-2 sm:px-6 max-w-3xl mx-auto items-start">
            <Profile />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <PageProvider value={{ activeTab, setActiveTab }}>
        <Header />

        <div className="flex-1">{renderScreen()}</div>

        <nav className="h-[10%] border-t-4 border-gray-200 fixed bottom-0 left-0 right-0 z-50 bg-white flex justify-around">
          {/* <div className="w-full max-w-md bg-white border-t flex justify-around  shadow-md rounded-xl pointer-events-auto mx-4 px-6 py-2"> */}
          {menu.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
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
      </PageProvider>
    </div>
  );
}
