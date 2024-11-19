"use client";

import { useRef, ReactNode } from "react";

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children: ReactNode;
  action: (formData: FormData) => Promise<void | boolean>;
  onSuccess?: () => void;
}

const Form = ({ children, action, onSuccess, ...rest }: FormProps) => {
  const ref = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(ref.current!);
    const success = await action(formData);

    if (success !== false) {
      ref.current?.reset();
      onSuccess?.();
    }
  };

  return (
    <form ref={ref} className="form-base" onSubmit={handleSubmit} {...rest}>
      {children}
    </form>
  );
};

export default Form;
