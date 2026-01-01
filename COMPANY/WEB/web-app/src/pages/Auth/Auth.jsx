import React, { useState } from "react";
// import Lottie from 'lottie-react';
// import recycleAnimation from '../../../assets/recycle.json';
import Login from "./Login";
import Register from "./Register";
import ForgotPassword from './ForgotPassword'; // You can add this later

const AuthScreen = () => {
  const [view, setView] = useState("login"); // 'login' | 'register' | 'forgot'

  return (
    <div className="min-h-screen bg-gray-50 ">
      {/* <div className="flex flex-col md:flex-row overflow-hidden max-w-4xl w-full mx-2"> */}
        {/* Auth Form Side */}
        <div className="">
          {view === "login" && <Login onSwitch={setView} />}
          {view === "register" && <Register onSwitch={setView} />}
          {view === 'forgot' && <ForgotPassword onSwitch={setView} />}
        {/* </div> */}
      </div>
    </div>
  );
};

export default AuthScreen;
