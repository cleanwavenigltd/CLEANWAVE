import BottomNav from "./layouts/BottomNav";
import UserLayout from "../../layouts/userLayout";
import { useState } from "react";
import History from "./components/History";
const Home = () => {
  const [view, setView] = useState("home");

  return (
    // <div className="w-full max-w-4xl mx-auto px-2 sm:px-6 py-4 flex flex-col items-start">
    <div>{view === "home" && <UserLayout onSwitch={setView} />}
    {view === "history"  && <History onSwitch={setView}/>}
    </div>
    // <UserLayout />
    // {/* </div> */}
  );
};
export default Home;
