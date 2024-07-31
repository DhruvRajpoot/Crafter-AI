import Navbar from "@/components/navbar";
import ProModal from "@/components/pro-modal";
import Sidebar from "@/components/sidebar";
import { getApiLimitCount } from "@/lib/api-limit";
import { auth } from "@clerk/nextjs/server";
import React from "react";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const { userId } = auth();

  const apiLimitCount = await getApiLimitCount(userId as string);

  return (
    <div className="h-full relative dashboardpage">
      <div className="hidden h-full md:flex md:flex-col md:w-72 md:fixed md:inset-y-0 bg-gray-900 dark:bg-gray-800">
        <Sidebar apiLimitCount={apiLimitCount} />
      </div>

      <main className="md:pl-72">
        <Navbar />
        <div className="min-h-[calc(100svh-64px)] h-[calc(100dvh-64px)] flex flex-col gap-4 justify-between pb-[4px] px-3 sm:px-4 lg:px-8">
          {children}
        </div>
      </main>

      <ProModal />
    </div>
  );
};

export default DashboardLayout;
