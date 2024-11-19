"use client";

import { useRef } from "react";
import { ReactNode } from "react";

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children: ReactNode;
  action: (formData: FormData) => Promise<void | boolean>;
  className?: string;
  onCustomSubmit?: () => void; // Renamed to avoid conflict with native onSubmit
}

const Form = ({ children, action, className, onCustomSubmit, ...rest }: FormProps) => {
  const ref = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(ref.current!);
    const success = await action(formData);

    if (success !== false) {
      ref.current?.reset();
    }
    onCustomSubmit?.(); // Call additional custom logic if provided
  };

  return (
    <form ref={ref} className={className} onSubmit={handleSubmit} {...rest}>
      {children}
    </form>
  );
};

export default Form;
