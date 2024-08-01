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

  const systemPrefersDark =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return theme === "dark" || (theme === "system" && systemPrefersDark);
  });

  useEffect(() => {
    const newIsDarkMode =
      theme === "dark" || (theme === "system" && systemPrefersDark);

    setIsDarkMode(newIsDarkMode);
    applyTheme(newIsDarkMode);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const applyTheme = (isDarkMode: boolean) => {
    document.documentElement.classList.toggle("dark", isDarkMode);
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
        isDarkMode,
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
