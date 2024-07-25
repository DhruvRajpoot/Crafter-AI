import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { getApiLimitCount } from "@/lib/api-limit";
import { auth } from "@clerk/nextjs/server";
import React from "react";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const { userId } = auth();

  const apiLimitCount = await getApiLimitCount(userId as string);

  return (
    <div
      className="h-full relative overflow-y-scroll"
      style={{
        scrollbarWidth: "thin",
        scrollbarColor: "#111827 #9ca3af",
      }}
    >
      <div className="hidden h-full md:flex md:flex-col md:w-72 md:fixed md:inset-y-0 z-[80] bg-gray-900">
        <Sidebar apiLimitCount={apiLimitCount}/>
      </div>

      <main className="md:pl-72 pb-4">
        <Navbar />
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
