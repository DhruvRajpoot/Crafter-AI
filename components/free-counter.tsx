"use client";

import { MAX_FREE_COUNTS } from "@/constants";
import { Card, CardContent } from "./ui/card";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";
import { Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { useAppContext } from "@/context/appContext";

interface FreeCounterProps {
  apiLimitCount: number;
}

const FreeCounter = ({ apiLimitCount = 0 }: FreeCounterProps) => {
  const { handleProModal } = useAppContext();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="px-3">
      <Card className="bg-white/10 border-0">
        <CardContent className="flex flex-col gap-4 py-6">
          <div className="text-center text-sm text-white space-y-2">
            <p>
              {apiLimitCount} / {MAX_FREE_COUNTS} Free Generations
            </p>
            <Progress
              className="h-3"
              value={(apiLimitCount / MAX_FREE_COUNTS) * 100}
            />
          </div>

          <Button
            className="w-full"
            variant={"premium"}
            onClick={handleProModal}
          >
            Upgrade to Pro
            <Zap className="w-4 h-4 ml-2 text-yellow-400 fill-yellow-400 animate-pulse" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default FreeCounter;
