"use client";

import { cn } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const font = Montserrat({
  weight: "600",
  subsets: ["latin"],
});

const LandingNavbar = () => {
  const { isSignedIn } = useAuth();

  return (
    <nav className="p-4 bg-transparent flex items-center justify-between">
      <Link href={"/"} className="flex items-center">
        <div className="relative w-9 h-8 mr-2 sm:mr-4">
          <Image fill alt="Logo" src="/logo.png" />
        </div>

        <h1
          className={cn(
            "text-lg sm:text-2xl font-bold text-white",
            font.className
          )}
        >
          Crafter AI
        </h1>
      </Link>

      <div className="flex items-center gap-x-2">
        <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
          <Button
            variant={"outline"}
            className="rounded-full text-sm sm:text-base"
          >
            {isSignedIn ? "Dashboard" : "Get Started"}
          </Button>
        </Link>
      </div>
    </nav>
  );
};

export default LandingNavbar;
