import React from "react";

type InputProps = {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
};

const Input: React.FC<InputProps> = ({
  value,
  onChange,
  placeholder,
  type = "text",
}) => (
  <input
    className="w-full rounded border border-blue-3 bg-blue-4 text-gray-1 px-2 py-1 text-center font-semibold focus:outline-none transition-colors"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholder}
    type={type}
  />
);

export default Input;
