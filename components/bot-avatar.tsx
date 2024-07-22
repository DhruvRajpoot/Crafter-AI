import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const BotAvatar = () => {
  return (
    <Avatar className="h-8 w-8 border border-gray-300">
      <AvatarImage className="p-1" src="/logo.svg" />
      <AvatarFallback>🤖</AvatarFallback>
    </Avatar>
  );
};

export default BotAvatar;
