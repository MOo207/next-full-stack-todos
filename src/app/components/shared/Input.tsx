"use client";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  type: string;
  label?: string; // Optional label
  error?: string; // Optional error message
}

const Input = ({ name, type, placeholder, value, onChange, label, error, className, ...rest }: InputProps) => {
  return (
    <div>
      {label && <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className={`w-full p-2 border-gray-200 border ${className}`}
        {...rest}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default Input;
