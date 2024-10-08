import { useUser } from "@clerk/nextjs";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const UserAvatar = () => {
  const { user } = useUser();

  return (
    <Avatar className="w-6 h-6 sm:h-8 sm:w-8">
      <AvatarImage src={user?.imageUrl} alt="user image" />
      <AvatarFallback>
        {user?.firstName?.charAt(0)}
        {user?.lastName?.charAt(0)}
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
