"use client";

import clsx from "clsx";
import { ReactNode } from "react";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  text: string | ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  className?: string;
  disabled?: boolean;
}

const Button = ({
  type = "button",
  text,
  onClick,
  variant = "primary",
  className,
  disabled
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={clsx(
        "button-base",
        {
          "button-primary": variant === "primary",
          "button-secondary": variant === "secondary",
        },
        className
      )}
    >
      {text}
    </button>
  );
};

export default Button;
