"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Badge } from "./ui/badge";
import {
  Check,
  Code,
  ImageIcon,
  MessageSquare,
  Music,
  VideoIcon,
  Zap,
} from "lucide-react";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { useAppContext } from "@/context/appContext";

const tools = [
  {
    label: "Conversation",
    icon: MessageSquare,
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
  },
  {
    label: "Code Generation",
    icon: Code,
    color: "text-green-700",
    bgColor: "bg-green-700/10",
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    label: "Video Generation",
    icon: VideoIcon,
    color: "text-orange-700",
    bgColor: "bg-orange-700/10",
  },
  {
    label: "Music Generation",
    icon: Music,
    color: "text-pink-500",
    bgColor: "bg-pink-500/10",
  },
];

const ProModal = () => {
  const { isProModalOpen, handleProModal } = useAppContext();

  return (
    <Dialog open={isProModalOpen} onOpenChange={handleProModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex justify-center items-center gap-x-2 font-bold">
            Upgrade to Pro
            <Badge variant={"premium"} className="text-sm py-1">
              PRO
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="text-center pt-2 space-y-2 text-zinc-900 font-medium">
          {tools.map((tool, index) => (
            <Card
              key={index}
              className="flex items-center justify-between p-3 border-black/5"
            >
              <div className="flex items-center gap-x-4">
                <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                  <tool.icon className={cn("w-6 h-6", tool.color)} />
                </div>
                <div className="font-semibold text-sm">{tool.label}</div>
              </div>

              <Check className="text-primary w-5 h-5" />
            </Card>
          ))}
        </div>

        <DialogFooter>
          <Button size={"lg"} variant={"premium"} className="w-full">
            Upgrade to Pro
            <Zap className="w-4 h-4 ml-2 text-yellow-400 fill-yellow-400 animate-pulse" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProModal;
