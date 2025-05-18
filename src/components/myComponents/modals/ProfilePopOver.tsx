import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import Link from "next/link";
import { RxDashboard } from "react-icons/rx";
import { IoIosLogOut } from "react-icons/io";
import { useUser } from "@/context/UserContext";
import { usePathname, useRouter } from "next/navigation";
import { protectedRoutes } from "@/constants";
import { logout } from "@/services/AuthService";

const ProfilePopOver = () => {
  const { user, setIsLoading } = useUser();
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    logout(); // JWT logout
    setIsLoading(true);
    if (protectedRoutes.some((route) => pathname.match(route))) {
      router.push("/");
    }
  };

  return (
    <Popover>
      <PopoverTrigger>
        <div>
          <Image
            src={
              user?.image ||
              "https://res.cloudinary.com/dv6fgvj2c/image/upload/v1738848037/aw31zjonlmq96og1bm3k.png"
            }
            alt="user image"
            width={50}
            height={50}
            className="rounded-full bg-white"
          />
        </div>
      </PopoverTrigger>
      <PopoverContent className="bg-[#22252c] text-white w-44 text-base font-normal space-y-2">
        <p className="hover:text-[#00d7bb]">{user?.name}</p>
        {user && (
          <Link
            href="/dashboard/admin"
            className="flex items-center gap-2 hover:text-[#00d7bb]"
          >
            <RxDashboard /> Dashboard
          </Link>
        )}
        <h1
          onClick={handleLogout}
          className="flex items-center gap-2 hover:text-[#00d7bb] cursor-pointer"
        >
          <IoIosLogOut /> Log Out
        </h1>
      </PopoverContent>
    </Popover>
  );
};

export default ProfilePopOver;
