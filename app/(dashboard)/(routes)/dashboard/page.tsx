import { UserButton } from "@clerk/nextjs";
import React from "react";

const DashboardPage = () => {
  return (
    <div>
      DashboardPage
      <div>
        <UserButton afterSwitchSessionUrl="/sign" />
      </div>
    </div>
  );
};

export default DashboardPage;
