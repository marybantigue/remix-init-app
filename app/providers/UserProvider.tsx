import React, { createContext, useContext } from "react";
import { User } from "~/services/auth.server";
interface UserContextType {
  user: User | null; // Adjust according to your user object
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{
  user: User | null;
  children: React.ReactNode;
}> = ({ user, children }) => {
  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
