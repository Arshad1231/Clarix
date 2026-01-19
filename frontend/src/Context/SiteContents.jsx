import { createContext, useContext } from "react";
import { Assests } from "../SiteAssests/Assests.js";

const AssetsContext = createContext(null);

export const useAssets = () => useContext(AssetsContext);

export const AssetsProvider = ({ children }) => {
  

  return (
    <AssetsContext.Provider value={{Assests}}>
      {children}
    </AssetsContext.Provider>
  );
};
