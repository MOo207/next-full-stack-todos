"use client";

import { signOut } from "next-auth/react";
import { FiLogOut } from "react-icons/fi";

interface SignOutButtonProps {
  locale: string; // Pass locale for redirecting to the appropriate language login page
}

const SignOutButton = ({ locale }: SignOutButtonProps) => {
  const handleSignOut = async () => {
    await signOut({ callbackUrl: `/${locale}/auth/login` });
  };

  return (
    <button
      onClick={handleSignOut}
      className="flex items-center justify-center w-10 h-10 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 active:scale-90 transition-all"
      aria-label="Sign Out"
    >
      <FiLogOut size={20} />
    </button>
  );
};

export default SignOutButton;
