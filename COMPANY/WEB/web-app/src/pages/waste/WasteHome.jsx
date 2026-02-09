// import WasteLayout from "../../layouts/WasteLayout";
// import Pickups from "./components/Pickups";
// import { useState } from "react";
// export default function WasteHome() {
//   const [view, setView] = useState("Pickups");
//   return (
//     <div>
//       {view === "home" && <WasteLayout onSwitch={setView} />}
//       {view === "Pickups" && <Pickups onSwitch={setView} />}
//     </div>
//   );
// }

import React from "react";
import {
  Home as HomeIcon,
  Truck as PickupsIcon,
  Wallet,
  User,
} from "lucide-react";
import DashboardLayout from "../../layouts/DashboardLayout";

// Components na User
import HomePage from "./components/Home"; // Wannan shine babban Home na User
import Pickups from "./components/Pickups";
import History from "./components/History";
import WalletPage from "../../components/Wallet"; // Shared Wallet
import Profile from "../../components/Profile"; // Shared Profile

const WasteHome = () => {
  // 1. Menu na User (shi ba shi da 'Pickups' ko 'Community' a nan)
  const menu = [
    { id: "home", label: "Home", icon: <HomeIcon size={24} /> },
    { id: "Pickups", label: "Pickups", icon: <PickupsIcon size={24} /> },
    { id: "wallet", label: "Wallet", icon: <Wallet size={24} /> },
    { id: "profile", label: "Profile", icon: <User size={24} /> },
  ];

  // 2. Screens din da User zai iya gani
  const screens = {
    home: <HomePage />,
    Pickups: <Pickups />,
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

export default WasteHome;
