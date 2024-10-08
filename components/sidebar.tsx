"use client";

import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { cn } from "@/lib/utils";
import {
  Code,
  ImageIcon,
  LayoutDashboard,
  MessageSquare,
  MusicIcon,
  Settings,
  VideoIcon,
} from "lucide-react";
import { usePathname } from "next/navigation";
import FreeCounter from "./free-counter";

const montserrat = Montserrat({
  weight: "600",
  subsets: ["latin"],
});

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-sky-500",
  },
  {
    label: "Conversation",
    icon: MessageSquare,
    href: "/conversation",
    color: "text-violet-500",
  },
  {
    label: "Code Generation",
    icon: Code,
    href: "/code",
    color: "text-green-700",
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    href: "/image",
    color: "text-blue-500",
  },
  {
    label: "Video Generation",
    icon: VideoIcon,
    href: "/video",
    color: "text-orange-700",
  },
  {
    label: "Music Generation",
    icon: MusicIcon,
    href: "/music",
    color: "text-pink-500",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
    color: "text-gray-300",
  },
];

interface SidebarProps {
  apiLimitCount: number;
  isProUser: boolean;
  onLinkClick?: () => void;
}

const Sidebar = ({ apiLimitCount, isProUser, onLinkClick }: SidebarProps) => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full space-y-4 py-4 bg-[#111827] text-white">
      <div className="px-3 py-2 flex-1">
        <Link href="/" className="flex items-center pl-3 mb-14">
          <div className="relative w-9 h-8 mr-4">
            <Image fill alt="Logo" src={"/logo.png"} />
          </div>

          <h1 className={cn("text-2xl font-bold", montserrat.className)}>
            Crafter AI
          </h1>
        </Link>

        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              onClick={() => onLinkClick && onLinkClick()}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium rounded-lg transition cursor-pointer hover:text-white hover:bg-white/10",
                pathname === route.href
                  ? "bg-white/10 text-white"
                  : "text-zinc-400"
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("w-5 h-5 mr-3", route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>

      {!isProUser && <FreeCounter apiLimitCount={apiLimitCount} />}
    </div>
  );
};

export default Sidebar;
