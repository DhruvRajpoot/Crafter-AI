"use client";

import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import Sidebar from "./sidebar";
import { Button } from "./ui/button";
import { useState } from "react";

interface MobileSidebarProps {
  apiLimitCount: number;
  isProUser: boolean;
}

const MobileSidebar = ({ apiLimitCount, isProUser }: MobileSidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant={"ghost"} size={"icon"} className="md:hidden">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"} className="p-0 text-white">
        <Sidebar
          apiLimitCount={apiLimitCount}
          onLinkClick={handleClose}
          isProUser={isProUser}
        />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
