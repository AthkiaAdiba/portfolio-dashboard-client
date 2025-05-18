"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";
import Link from "next/link";

const LoginButton = () => {
  const { user } = useUser();

  return (
    <div>
      {!user && (
        <Link href="/login">
          <Button className="text-2xl px-4 py-6 cursor-pointer">Login</Button>
        </Link>
      )}
    </div>
  );
};

export default LoginButton;
