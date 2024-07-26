"use client";

import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import TypewriterComponent from "typewriter-effect";
import { Button } from "./ui/button";

const LandingHero = () => {
  const { isSignedIn } = useAuth();

  return (
    <div className="text-white font-bold pt-36 pb-16 text-center space-y-5">
      <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
        <h1>The best AI tool for </h1>
        <div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 pb-2 h-12 sm:h-14 md:h-16">
          <TypewriterComponent
            options={{
              strings: [
                "Conversation",
                "Code Generation",
                "Image Generation",
                "Video Generation",
                "Music Generation",
              ],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
      </div>
      <div className="text-sm md:text-xl font-light text-zinc-400">
        All-in-one AI tool for your creative needs. Get started now!
      </div>

      <div>
        <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
          <Button
            variant={"premium"}
            className="md:text-lg p-4 md:p-6 rounded-full font-semibold"
          >
            Try for free
          </Button>
        </Link>
      </div>

      <div className="text-zinc-400 text-xs md:text-sm font-normal">
        No credit card required. Cancel anytime.
      </div>
    </div>
  );
};

export default LandingHero;
