"use client";

import {
  Check,
  Monitor,
  Moon,
  Settings,
  Sun,
  TicketCheck,
  Trash2,
  User,
  Zap,
} from "lucide-react";
import Heading from "../../heading";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import DeleteAccountModal from "./delete-account-modal";
import { useAppContext } from "@/context/appContext";
import ThemeToggle from "@/components/theme-toggle";

const SettingsPage = () => {
  const { user } = useUser();
  const { handleProModal } = useAppContext();

  const [subscriptionPlan, setSubscriptionPlan] = useState("free");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleManageSubscription = () => {};

  return (
    <div>
      <Heading
        title="Settings"
        description="Customize your account settings here."
        icon={Settings}
        iconColor="text-gray-600 dark:text-gray-400"
        bgColor="bg-gray-200 dark:bg-gray-800"
      />

      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-8 lg:flex-row md:gap-8">
          <section className="bg-white dark:bg-gray-800 shadow-md rounded-lg border border-gray-100 dark:border-gray-700 p-6 flex-1">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              Manage Subscription
            </h2>
            <div className="flex flex-col gap-4">
              {subscriptionPlan === "free" ? (
                <>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    You are currently on the Free Plan.
                  </p>
                  <Button
                    variant="default"
                    className="w-fit"
                    onClick={handleProModal}
                  >
                    Upgrade to Pro
                    <Zap className="ml-2 w-4 h-4 animate-pulse text-yellow-400 fill-yellow-400" />
                  </Button>
                </>
              ) : (
                <>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    You are currently on the Pro Plan.
                  </p>
                  <Button
                    variant="outline"
                    className="w-full text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500"
                    onClick={handleManageSubscription}
                  >
                    Manage Subscription
                  </Button>
                </>
              )}
            </div>
          </section>

          <section className="bg-white dark:bg-gray-800 shadow-md rounded-lg border border-gray-100 dark:border-gray-700 p-6 flex-1">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              User Profile
            </h2>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <Avatar className="w-16 h-16 mx-auto sm:mx-0">
                {user?.imageUrl ? (
                  <AvatarImage src={user.imageUrl} alt="User Profile Image" />
                ) : (
                  <AvatarFallback>
                    <User className="w-8 h-8 text-gray-400 dark:text-gray-600" />
                  </AvatarFallback>
                )}
              </Avatar>

              <div className="flex flex-col gap-2">
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Name
                  </label>
                  <p className="text-base font-semibold text-gray-800 dark:text-gray-200">
                    {user?.fullName || "John Doe"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email
                  </label>
                  <p className="text-base font-semibold text-gray-800 dark:text-gray-200 break-all">
                    {user?.emailAddresses[0]?.emailAddress ||
                      "johndoe@gmail.com"}
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>

        <section className="bg-white dark:bg-gray-800 shadow-md rounded-lg border border-gray-100 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
            Theme
          </h2>
          <div className="flex flex-col gap-4">
            <ThemeToggle />
          </div>
        </section>

        <section className="bg-white dark:bg-gray-800 shadow-md rounded-lg border border-gray-100 dark:border-gray-700 p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
            Delete Account
          </h2>
          <Button
            variant="destructive"
            onClick={() => setIsDeleteModalOpen(true)}
            className="flex items-center gap-2"
          >
            <Trash2 className="mr-2" /> Delete Account
          </Button>
        </section>
      </div>

      <DeleteAccountModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      />
    </div>
  );
};

export default SettingsPage;
