import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setActiveTab } from "../store/uiSlice";
import Header from "./Header";

const DashboardLayout = ({ menu, screens, bgColor = "bg-gray-100" }) => {
  const dispatch = useDispatch();
  const { isLoading, userData, role } = useSelector((state) => state.auth);
  const activeTab = useSelector((state) => state.ui.activeTab);

  if (isLoading)
    return (
      <div className="flex h-screen items-center justify-center">
        Loading Cleanwave...
      </div>
    );

  const handleTabChange = (tabId) => dispatch(setActiveTab(tabId));

  return (
    <div className={`min-h-screen ${bgColor} flex flex-col`}>
      <Header userName={userData?.name} role={role} />

      <main className="flex-1 pb-24">
        {" "}
        {/* pb-24 ensures content isn't hidden by nav */}
        <div className="flex-1 w-full px-2 sm:px-6 max-w-3xl mx-auto mt-4">
          {screens[activeTab] || screens["home"]}
        </div>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t-4 border-gray-200 h-20 flex justify-around items-center">
        {menu.map((item) => (
          <button
            key={item.id}
            onClick={() => handleTabChange(item.id)}
            className={`flex flex-col items-center transition-colors ${
              activeTab === item.id ? "text-[#8CA566]" : "text-gray-400"
            }`}
          >
            {item.icon}
            <span className="text-[10px] mt-1 font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default DashboardLayout;
