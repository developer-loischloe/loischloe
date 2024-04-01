import Link from "next/link";
import User from "@/assets/User";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LogIn, LogOut, UserRoundPlus } from "lucide-react";

const UserBtn = () => {
  return (
    <Popover>
      <PopoverTrigger>
        <User />
      </PopoverTrigger>
      <PopoverContent>
        <div className="space-y-4">
          <div className="flex items-center gap-5 hover:text-brand_primary transition-all cursor-pointer">
            <LogIn />
            <Link href="/login">Login</Link>
          </div>

          <div className="flex items-center gap-5 hover:text-brand_primary transition-all cursor-pointer">
            <UserRoundPlus /> <Link href="/signup">Signup</Link>
          </div>

          <div className="flex items-center gap-5 hover:text-brand_primary transition-all cursor-pointer">
            <LogOut /> <Link href="/logout">Logout</Link>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default UserBtn;
