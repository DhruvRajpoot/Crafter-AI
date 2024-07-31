"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

const AppContext = createContext<any>(undefined);

export function AppContextProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<string>(() => {
    return localStorage.getItem("theme") || "system";
  });

  useEffect(() => {
    applyTheme(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const applyTheme = (theme: string) => {
    if (theme === "system") {
      const systemPrefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      document.documentElement.classList.toggle("dark", systemPrefersDark);
    } else {
      document.documentElement.classList.toggle("dark", theme === "dark");
    }
  };

  const [isProModalOpen, setIsProModalOpen] = useState<boolean>(false);

  const handleProModal = () => {
    setIsProModalOpen((prev) => !prev);
  };

  return (
    <AppContext.Provider
      value={{
        isProModalOpen,
        handleProModal,
        theme,
        setTheme,
      }}
    >
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
