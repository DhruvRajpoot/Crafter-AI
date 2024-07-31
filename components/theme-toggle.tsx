"use client";

import { Sun, Moon, Computer, Check } from "lucide-react";
import { useAppContext } from "@/context/appContext";
import { cn } from "@/lib/utils";

const ThemeToggle = () => {
  const { theme, setTheme } = useAppContext();

  return (
    <div className="flex items-center space-x-4">
      {["system", "light", "dark"].map((currentTheme) => (
        <button
          key={currentTheme}
          onClick={() => setTheme(currentTheme)}
          className={cn(
            "flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300",
            theme === currentTheme && "bg-gray-300 dark:bg-gray-600"
          )}
        >
          {currentTheme === "system" ? (
            <Computer className="text-gray-600 dark:text-gray-400" />
          ) : currentTheme === "light" ? (
            <Sun className="text-yellow-500 dark:text-yellow-400" />
          ) : (
            <Moon className="text-blue-500 dark:text-blue-400" />
          )}
          <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
            {currentTheme.charAt(0).toUpperCase() + currentTheme.slice(1)}
          </span>
        </button>
      ))}
    </div>
  );
};

export default ThemeToggle;
