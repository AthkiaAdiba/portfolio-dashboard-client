"use client";

import { useUser } from "@/context/UserContext";
import ProfilePopOver from "../../modals/ProfilePopOver";

const Navbar = () => {
  const { user } = useUser();

  return (
    <div>
      {user && (
        <div>
          <ProfilePopOver></ProfilePopOver>
        </div>
      )}
    </div>
  );
};

export default Navbar;
