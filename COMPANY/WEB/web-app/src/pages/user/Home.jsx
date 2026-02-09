// import BottomNav from "./layouts/BottomNav";
// import UserLayout from "../../layouts/userLayout";
// import { useState } from "react";
// import History from "./components/History";
// const Home = () => {
//   const [view, setView] = useState("home");

//   return (
//     // <div className="w-full max-w-4xl mx-auto px-2 sm:px-6 py-4 flex flex-col items-start">
//     <div>
//       {view === "home" && <UserLayout onSwitch={setView} />}
//       {view === "history" && <History onSwitch={setView} />}
//     </div>
//     // <UserLayout />
//     // {/* </div> */}
//   );
// };
// export default Home;

import React from "react";
import {
  Home as HomeIcon,
  History as HistoryIcon,
  Wallet,
  User,
} from "lucide-react";
import DashboardLayout from "../../layouts/DashboardLayout";

// Components na User
import HomePage from "./components/Home"; // Wannan shine babban Home na User
import History from "./components/History";
import WalletPage from "../../components/Wallet"; // Shared Wallet
import Profile from "../../components/Profile"; // Shared Profile

const Home = () => {
  // 1. Menu na User (shi ba shi da 'Pickups' ko 'Community' a nan)
  const menu = [
    { id: "home", label: "Home", icon: <HomeIcon size={24} /> },
    { id: "history", label: "History", icon: <HistoryIcon size={24} /> },
    { id: "wallet", label: "Wallet", icon: <Wallet size={24} /> },
    { id: "profile", label: "Profile", icon: <User size={24} /> },
  ];

  // 2. Screens din da User zai iya gani
  const screens = {
    home: <HomePage />,
    history: <History />,
    wallet: <WalletPage />,
    profile: <Profile />,
  };

  return (
    <DashboardLayout
      menu={menu}
      screens={screens}
      bgColor="bg-white" // Zaka iya canza kalar background din anan
    />
  );
};

export default Home;
