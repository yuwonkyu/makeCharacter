import Image from "next/image";
import React from "react";

interface CustomSelectProps {
  value: string;
  onChange: (v: string) => void;
  options: string[];
  selectText?: string;
}

export default function CustomSelect({
  value,
  onChange,
  options,
  selectText,
}: CustomSelectProps) {
  return (
    <div className="relative w-full">
      <select
        className="w-full rounded border border-blue-3 bg-blue-4 text-gray-1 px-2 py-1 text-center font-semibold focus:outline-none appearance-none pr-8 inset-dropdown transition-colors"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="" disabled>
          {selectText || "선택"}
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt} className="text-center">
            {opt}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 flex items-center">
        <Image src="/icon/dropdown.svg" alt="드롭다운" width={20} height={18} />
      </span>
    </div>
  );
}
