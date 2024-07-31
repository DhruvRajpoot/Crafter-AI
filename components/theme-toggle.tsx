"use client";

import { Sun, Moon, Computer, Check } from "lucide-react";
import { useAppContext } from "@/context/appContext";
import { cn } from "@/lib/utils";

const ThemeToggle = () => {
  const { theme, setTheme } = useAppContext();

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
  };

  return (
    <div className="flex flex-col space-y-4 p-4">
      {["system", "light", "dark"].map((currentTheme) => (
        <div
          key={currentTheme}
          className={cn(
            "flex items-center p-4 rounded-lg cursor-pointer transition-colors duration-300 ease-in-out",
            theme === currentTheme
              ? "bg-gray-900 text-gray-100 shadow-lg"
              : "bg-gray-200 dark:bg-gray-800 border border-transparent dark:border-gray-600 hover:bg-gray-300 dark:hover:bg-gray-700"
          )}
          onClick={() => handleThemeChange(currentTheme)}
        >
          <span className="w-6 h-6 flex items-center justify-center mr-4">
            {currentTheme === "system" ? (
              <Computer className="text-gray-600 dark:text-gray-400" />
            ) : currentTheme === "light" ? (
              <Sun className="text-yellow-500 dark:text-yellow-400" />
            ) : (
              <Moon className="text-blue-500 dark:text-blue-400" />
            )}
          </span>
          <span className="flex-1 text-sm font-medium">
            {currentTheme.charAt(0).toUpperCase() + currentTheme.slice(1)}
          </span>
          {theme === currentTheme && (
            <span className="text-green-500">
              <Check />
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default ThemeToggle;
