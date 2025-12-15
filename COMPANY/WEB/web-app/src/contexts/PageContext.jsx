import React, { createContext } from "react";

export const PageContext = createContext({
  activeTab: "home",
  setActiveTab: () => {},
});

export const PageProvider = ({ children, value }) => {
  return <PageContext.Provider value={value}>{children}</PageContext.Provider>;
};

export default PageContext;
