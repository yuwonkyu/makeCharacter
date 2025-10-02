import React from "react";

type InputProps = {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: "text" | "number";
  min?: number;
  max?: number;
};

const Input: React.FC<InputProps> = ({
  value,
  onChange,
  placeholder,
  type = "text",
  min,
  max,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;

    // 숫자 타입일 때 숫자만 허용
    if (type === "number") {
      // 숫자와 소수점만 허용 (정수 및 소수)
      newValue = newValue.replace(/[^0-9.]/g, "");

      // 소수점이 여러 개인 경우 첫 번째만 유지
      const parts = newValue.split(".");
      if (parts.length > 2) {
        newValue = parts[0] + "." + parts.slice(1).join("");
      }

      // min/max 범위 체크
      if (newValue && !isNaN(Number(newValue))) {
        const numValue = Number(newValue);
        if (min !== undefined && numValue < min) {
          newValue = min.toString();
        }
        if (max !== undefined && numValue > max) {
          newValue = max.toString();
        }
      }
    }

    onChange(newValue);
  };

  return (
    <input
      className="w-full rounded border border-blue-3 bg-blue-4 text-gray-1 px-2 py-1 text-center font-semibold focus:outline-none transition-colors"
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      type={type === "number" ? "text" : type} // 커스텀 숫자 검증을 위해 text 타입 사용
      inputMode={type === "number" ? "numeric" : undefined} // 모바일에서 숫자 키패드 표시
      min={min}
      max={max}
    />
  );
};

export default Input;
