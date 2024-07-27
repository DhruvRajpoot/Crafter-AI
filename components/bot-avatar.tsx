import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const BotAvatar = () => {
  return (
    <Avatar className="h-8 w-[2.2rem]">
      <AvatarImage src="/logo.png" />
      <AvatarFallback className="border border-gray-300">🤖</AvatarFallback>
    </Avatar>
  );
};

export default BotAvatar;
