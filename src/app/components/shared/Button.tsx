"use client";

import clsx from "clsx";
import { ReactNode } from "react";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  text: string | ReactNode;
  onClick?: () => void;
  actionButton?: boolean;
  ariaLabel?: string; // For accessibility
}

const Button = ({
  type = "button", // Default type
  text,
  onClick,
  actionButton = false, // Default to false
  ariaLabel,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      type={type}
      aria-label={ariaLabel}
      className={clsx(
        actionButton
          ? "bg-orange-700 rounded-full p-2 text-white"
          : "bg-orange-700 px-2 text-white"
      )}
    >
      {text}
    </button>
  );
};

export default Button;
