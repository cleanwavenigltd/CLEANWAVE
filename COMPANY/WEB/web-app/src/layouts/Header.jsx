import { Bell, ImportIcon, LogOut, User } from "lucide-react";
// import { PageContext } from "../contexts/PageContext";
import { useState } from "react";
export default function Header() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications] = useState([
    { id: 1, message: "New pickup request available", time: "5m ago" },
    { id: 2, message: "Payment received", time: "1h ago" },
  ]);
  // const { setActiveTab } = useContext(PageContext);

  return (
    <header className="bg-white shadow-sm border-b-4 border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="text-xl font-bold text-[#8CA566]">Cleanwave</div>

          {/* Right Section */}
          <div className="flex items-center gap-6">
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
              >
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200">
                  <div className="p-4 border-b">
                    <h3 className="font-semibold text-gray-900">
                      Notifications
                    </h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.map((notif) => (
                      <div
                        key={notif.id}
                        className="p-3 border-b hover:bg-gray-50 cursor-pointer"
                      >
                        <p className="text-sm text-gray-800">{notif.message}</p>
                        <span className="text-xs text-gray-500">
                          {notif.time}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* User Avatar & Dropdown */}
            <div className="flex items-center gap-3">
              <button
                // onClick={() => setActiveTab("profile")}
                className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
              >
                <User className="w-7 h-7 rounded-full border-2 border-gray-200" />
              </button>
              {/* <img src={userAvatar} alt={userName} className="w-10 h-10 rounded-full border-2 border-gray-200" /> */}
              {/* <div className="">
                <p className="text-xs font-medium text-gray-900">{userName}</p>
                <p className="text-xs text-gray00">{role}</p>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
