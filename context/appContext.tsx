"use client";

import { createContext, useContext, useState, ReactNode } from "react";

const AppContext = createContext<any>(undefined);

export function AppContextProvider({ children }: { children: ReactNode }) {
  const [isProModalOpen, setIsProModalOpen] = useState<boolean>(false);

  const handleProModal = () => {
    setIsProModalOpen((prev) => !prev);
  };

  return (
    <AppContext.Provider value={{ isProModalOpen, handleProModal }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppContextProvider");
  }
  return context;
}
