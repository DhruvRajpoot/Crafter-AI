import MobileSidebar from "./mobile-sidebar";
import { getApiLimitCount, isPro } from "@/lib/api-limit";
import { auth } from "@clerk/nextjs/server";
import UserButtonClerk from "./user-button-clerk";

const Navbar = async () => {
  const { userId } = auth();
  const apiLimitCount = await getApiLimitCount(userId as string);
  const isProUser = await isPro(userId as string);

  return (
    <div className="flex items-center p-3 sm:p-4 h-[60px]">
      <MobileSidebar apiLimitCount={apiLimitCount} isProUser={isProUser} />

      <div className="flex w-full justify-end">
        <UserButtonClerk />
      </div>
    </div>
  );
};

export default Navbar;
