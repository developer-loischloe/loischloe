import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import SignOutButton from "./SignOutButton";
import { useAuth } from "@/context/authContext";
import UpdateProfilePicture from "./UpdateProfilePicture";

const Account = () => {
  const { user } = useAuth();

  return (
    <Popover>
      <PopoverTrigger>
        <Avatar>
          <AvatarImage src={user?.prefs?.avatar} />
          <AvatarFallback>
            {user?.name.split(" ")[0].slice(0, 2)}
          </AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent className="space-y-5">
        <ul className="space-y-5">
          <li>
            <UpdateProfilePicture />
          </li>
        </ul>
        <div className="flex-col">
          <SignOutButton />
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default Account;
