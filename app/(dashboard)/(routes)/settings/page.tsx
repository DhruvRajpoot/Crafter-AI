"use client";

import { Check, Settings, TicketCheck, Trash2, User, Zap } from "lucide-react";
import Heading from "../../heading";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import DeleteAccountModal from "./delete-account-modal";
import { useAppContext } from "@/context/appContext";

const SettingsPage = () => {
  const { user } = useUser();
  const { handleProModal } = useAppContext();

  const [theme, setTheme] = useState("system");
  const [subscriptionPlan, setSubscriptionPlan] = useState("free");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleThemeChange = (newTheme: any) => {
    setTheme(newTheme);
  };

  const handleManageSubscription = () => {};

  return (
    <div>
      <Heading
        title="Settings"
        description="Customize your account settings here."
        icon={Settings}
        iconColor="text-gray-600"
        bgColor="bg-gray-200"
      />

      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-8 lg:flex-row md:gap-8">
          <section className="bg-white shadow-md rounded-lg p-6 flex-1">
            <h2 className="text-xl font-semibold mb-4">Manage Subscription</h2>
            <div className="flex flex-col gap-4">
              {subscriptionPlan === "free" ? (
                <>
                  <p className="text-gray-700 mb-4">
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
                  <p className="text-gray-700 mb-4">
                    You are currently on the Pro Plan.
                  </p>
                  <Button
                    variant="outline"
                    className="w-full text-gray-700 border-gray-300 hover:border-gray-400"
                    onClick={handleManageSubscription}
                  >
                    Manage Subscription
                  </Button>
                </>
              )}
            </div>
          </section>

          <section className="bg-white shadow-md rounded-lg p-6 flex-1">
            <h2 className="text-xl font-semibold mb-4">User Profile</h2>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <Avatar className="w-16 h-16 mx-auto sm:mx-0">
                {user?.imageUrl ? (
                  <AvatarImage src={user.imageUrl} alt="User Profile Image" />
                ) : (
                  <AvatarFallback>
                    <User className="w-8 h-8 text-gray-400" />
                  </AvatarFallback>
                )}
              </Avatar>

              <div className="flex flex-col gap-2">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <p className="text-base font-semibold text-gray-800">
                    {user?.fullName || "John Doe"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <p className="text-base font-semibold text-gray-800 break-all">
                    {user?.emailAddresses[0]?.emailAddress ||
                      "johndoe@gmail.com"}
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>

        <section className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Theme</h2>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              {["system", "light", "dark"].map((currentTheme) => (
                <div
                  key={currentTheme}
                  className={`flex items-center p-4 rounded-lg cursor-pointer transition-colors duration-200 ${
                    theme === currentTheme
                      ? "bg-gray-100 text-gray-900 shadow-md"
                      : "bg-gray-50 hover:bg-gray-100"
                  }`}
                  onClick={() => handleThemeChange(currentTheme)}
                >
                  <span className="flex-1">
                    {currentTheme.charAt(0).toUpperCase() +
                      currentTheme.slice(1)}
                  </span>
                  {theme === currentTheme && (
                    <span className="text-green-500">
                      <Check />
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Delete Account</h2>
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
