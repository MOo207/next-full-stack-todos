"use client";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  type: string;
  label?: string; // Optional label
  error?: string; // Optional error message
}

const Input = ({ name, type, placeholder, label, error, className, ...rest }: InputProps) => {
  return (
    <div>
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className={`input-base ${className}`}
        {...rest}
      />
      {error && <p className="text-error mt-1">{error}</p>}
    </div>
  );
};

export default Input;
