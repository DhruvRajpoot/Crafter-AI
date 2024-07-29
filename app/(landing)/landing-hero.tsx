"use client";

import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import TypewriterComponent from "typewriter-effect";
import { Button } from "@/components/ui/button";

const LandingHero = () => {
  const { isSignedIn } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center text-white px-2 pt-20 sm:pt-36 pb-10 space-y-5 md:space-y-7 text-center">
      <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
        <h1 className="mb-4 lg:mb-10">Discover the Power of</h1>
        <div className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-500  h-12 sm:h-14 md:h-16 lg:h-20">
          <TypewriterComponent
            options={{
              strings: [
                "AI Conversations",
                "Code Generation",
                "Image Creation",
                "Video Production",
                "Music Composition",
              ],
              autoStart: true,
              loop: true,
              delay: 75,
              cursor: "|",
            }}
          />
        </div>
      </div>

      <p className="text-base md:text-lg font-light text-gray-300">
        Revolutionize your creative process with our all-in-one AI tool. Get
        started today!
      </p>

      <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
        <Button
          variant={"premium"}
          className="md:text-lg p-4 md:p-6 rounded-full font-semibold"
        >
          Try for free
        </Button>
      </Link>

      <p className="text-xs md:text-sm font-normal text-gray-400">
        No credit card required. Cancel anytime.
      </p>
    </div>
  );
};

export default LandingHero;
