"use client";

import { useAppContext } from "@/context/appContext";
import { UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

const UserButtonClerk = () => {
  const { isDarkMode } = useAppContext();
  const baseTheme = isDarkMode ? dark : undefined;

  return (
    <div>
      <UserButton
        afterSwitchSessionUrl="/"
        showName
        appearance={{
          baseTheme,
        }}
      />
    </div>
  );
};

export default UserButtonClerk;
