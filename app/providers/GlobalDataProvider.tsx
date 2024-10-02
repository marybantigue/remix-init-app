import { createContext, useContext, ReactNode } from "react";

interface GlobalDataContextProps {
  appName: string;
}

const GlobalDataContext = createContext<GlobalDataContextProps | undefined>(
  undefined
);

export const GlobalDataProvider = ({
  children,
  appName,
}: {
  children: ReactNode;
  appName: string;
}) => {
  return (
    <GlobalDataContext.Provider value={{ appName }}>
      {children}
    </GlobalDataContext.Provider>
  );
};

export const useGlobalData = () => {
  const context = useContext(GlobalDataContext);
  if (!context) {
    throw new Error("useGlobalData must be used within a GlobalDataProvider");
  }
  return context;
};
