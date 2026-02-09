import React from "react";
import {
  Home as HomeIcon,
  Users as CommunityIcon,
  Wallet,
  User,
} from "lucide-react";
import DashboardLayout from "../../layouts/DashboardLayout";

// Components na User
import Home from "./components/Home"; // Wannan shine babban Home na User
import Community from "./components/Community";
import WalletPage from "../../components/Wallet"; // Shared Wallet
import Profile from "../../components/Profile"; // Shared Profile
// import Aggregator from "../admin/components/ManageAggregator";

const AggregatorHome = () => {
  // 1. Menu na User (shi ba shi da 'Pickups' ko 'Community' a nan)
  const menu = [
    { id: "home", label: "Home", icon: <HomeIcon size={24} /> },
    { id: "community", label: "Community", icon: <CommunityIcon size={24} /> },
    { id: "wallet", label: "Wallet", icon: <Wallet size={24} /> },
    { id: "profile", label: "Profile", icon: <User size={24} /> },
  ];

  // 2. Screens din da User zai iya gani
  const screens = {
    home: <Home />,
    community: <Community />,
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

export default AggregatorHome;
