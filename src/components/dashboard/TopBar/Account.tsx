import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import SignOutButton from "./SignOutButton";
import { useAuth } from "@/context/authContext";

const Account = () => {
  const { user } = useAuth();

  return (
    <Popover>
      <PopoverTrigger>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>
            {user?.name.split(" ")[0].slice(0, 2)}
          </AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent>
        <ul>
          <li>
            <SignOutButton />
          </li>
        </ul>
      </PopoverContent>
    </Popover>
  );
};

export default Account;
