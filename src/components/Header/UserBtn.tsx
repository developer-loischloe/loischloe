import Link from "next/link";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LogIn, LogOut, User2, UserRoundPlus } from "lucide-react";
import { useAuth } from "@/context/authContext";
import { toast } from "sonner";
import { appwriteAuthService } from "@/appwrite/appwriteAuthService";

const UserBtn = () => {
  const { user } = useAuth();

  const isLoggedIn = Boolean(user);

  const { logout } = appwriteAuthService;

  async function signOut() {
    const response = await logout();

    if (response) {
      toast("Signout complete");
      window.location.reload();
    } else {
      toast("Signout failed");
    }
  }

  return (
    <Popover>
      <PopoverTrigger title="Account">
        <User2 className="text-white hover:text-brand_primary transition-all" />
      </PopoverTrigger>
      <PopoverContent>
        <div className="space-y-4">
          {!isLoggedIn ? (
            <>
              <div className="flex items-center gap-5 hover:text-brand_primary transition-all cursor-pointer">
                <LogIn />
                <Link href="/signin">Login</Link>
              </div>
              <div className="flex items-center gap-5 hover:text-brand_primary transition-all cursor-pointer">
                <UserRoundPlus /> <Link href="/signup">Signup</Link>
              </div>
            </>
          ) : (
            <div
              onClick={signOut}
              className="flex items-center gap-5 hover:text-brand_primary transition-all cursor-pointer"
            >
              <LogOut /> <span>Logout</span>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default UserBtn;
