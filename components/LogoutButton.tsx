"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("accessKey");
    router.push("/");
  };

  return (
    <button onClick={handleLogout} className="flex gap-2 text-red-500 hover:text-red-400 transition-all font-semibold">
        Logout
    </button>
  );
};
