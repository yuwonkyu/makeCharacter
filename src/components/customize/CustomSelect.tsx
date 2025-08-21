import Image from "next/image";
import React from "react";

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  value: string;
  onChange: (v: string) => void;
  options: string[] | Option[];
  selectText?: string;
}

export default function CustomSelect({
  value,
  onChange,
  options,
  selectText,
}: CustomSelectProps) {
  // options가 string[] 인지 Option[] 인지 확인
  const isStringArray = options.length > 0 && typeof options[0] === "string";

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
        {isStringArray
          ? (options as string[]).map((opt) => (
              <option key={opt} value={opt} className="text-center">
                {opt}
              </option>
            ))
          : (options as Option[]).map((opt) => (
              <option key={opt.value} value={opt.value} className="text-center">
                {opt.label}
              </option>
            ))}
      </select>
      <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 flex items-center">
        <Image src="/icon/dropdown.svg" alt="드롭다운" width={20} height={18} />
      </span>
    </div>
  );
}
