import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const BotAvatar = () => {
  return (
    <Avatar className="w-[1.6rem] h-6 sm:h-8 sm:w-[2.2rem]">
      <AvatarImage src="/logo.png" />
      <AvatarFallback className="border border-gray-300">🤖</AvatarFallback>
    </Avatar>
  );
};

export default BotAvatar;
