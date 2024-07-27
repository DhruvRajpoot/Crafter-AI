import { UserButton } from "@clerk/nextjs";
import MobileSidebar from "./mobile-sidebar";
import { getApiLimitCount } from "@/lib/api-limit";
import { auth } from "@clerk/nextjs/server";

const Navbar = async () => {
  const { userId } = auth();
  const apiLimitCount = await getApiLimitCount(userId as string);

  return (
    <div className="flex items-center p-3 sm:p-4 h-[60px]">
      <MobileSidebar apiLimitCount={apiLimitCount} />

      <div className="flex w-full justify-end">
        <UserButton afterSwitchSessionUrl="/" showName />
      </div>
    </div>
  );
};

export default Navbar;
