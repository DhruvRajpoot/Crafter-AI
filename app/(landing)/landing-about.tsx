"use client";

import { cn } from "@/lib/utils";
import {
  Code,
  ImageIcon,
  MessageSquare,
  MusicIcon,
  VideoIcon,
} from "lucide-react";

const LandingAbout = () => {
  const features = [
    {
      icon: <MessageSquare />,
      color: "text-violet-500",
      title: "AI Conversations",
      description:
        "Engage in intelligent and context-aware dialogues with our AI, enhancing your interactions with a more human-like response.",
    },
    {
      icon: <Code />,
      color: "text-green-700",
      title: "Code Generation",
      description:
        "Effortlessly generate and refine code using our advanced AI tools, designed to boost your productivity and streamline development.",
    },
    {
      icon: <ImageIcon />,
      color: "text-blue-500",
      title: "Image Creation",
      description:
        "Create stunning visuals with AI-driven image generation, perfect for enhancing your creative projects and presentations.",
    },
    {
      icon: <VideoIcon />,
      color: "text-orange-700",
      title: "Video Production",
      description:
        "Produce high-quality videos with AI-assisted editing and creation, making video production more accessible and efficient.",
    },
    {
      icon: <MusicIcon />,
      color: "text-pink-500",
      title: "Music Composition",
      description:
        "Compose and generate music using our AI-powered composition tools, designed to help you create unique and professional soundtracks.",
    },
  ];

  return (
    <div className="bg-gray-900 py-8 sm:py-16 px-6">
      <div className="text-center">
        <h2 className="text-4xl sm:text-5xl font-bold text-white mb-8">
          About Us
        </h2>
        <p className="text-md sm:text-lg lg:text-xl text-gray-400 mb-16">
          Crafter AI is a cutting-edge web application built with Next.js,
          harnessing advanced AI technologies to generate text, audio, video,
          and images. We deliver a seamless and interactive platform that
          empowers users to create diverse content effortlessly.{" "}
        </p>
        <div className="flex flex-wrap justify-center gap-8">
          {features.map((feature, index) => (
            <div
              className="bg-gray-800 p-6 rounded-lg w-full max-w-sm border border-gray-700"
              key={index}
            >
              <div className="flex items-center justify-center mb-4">
                <div
                  className={cn("p-3 rounded-full bg-gray-700", feature.color)}
                >
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingAbout;
