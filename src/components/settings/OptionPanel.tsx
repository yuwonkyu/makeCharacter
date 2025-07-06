import React from "react";
import Image from "next/image";

type Language = "en" | "ko" | "jp";

type OptionPanelProps = {
  language: Language;
  setLanguage: (lang: Language) => void;
  color: string;
  setColor: (color: string) => void;
  onSave?: () => void;
  onReset?: () => void;
  onClose?: () => void;
};

const LANGUAGES = [
  { label: "English", value: "en" },
  { label: "한국어", value: "ko" },
  { label: "日本語", value: "jp" },
];

const COLORS = [
  { label: "Sky Blue", value: "sky" },
  { label: "Gray", value: "gray" },
  { label: "Black & White", value: "bw" },
];

export default function OptionPanel({
  language,
  setLanguage,
  color,
  setColor,
  onSave,
  onReset,
  onClose,
}: OptionPanelProps) {
  return (
    <div
      className="w-[340px] rounded-2xl shadow-lg border p-0 relative"
      style={{
        borderColor: "var(--blue-3)",
        background: "var(--accent-5)",
      }}
    >
      {/* 헤더 */}
      <div
        className="flex items-center justify-between rounded-t-2xl px-4 py-2 border-b relative"
        style={{
          background: "var(--gradient-blue)",
          borderColor: "var(--blue-3)",
        }}
      >
        <span
          className="text-2xl font-bold mx-auto"
          style={{ color: "var(--gray-1)" }}
        >
          Option
        </span>
        {onClose && (
          <button
            className="absolute right-3 top-2 w-7 h-7 flex items-center justify-center rounded hover:bg-[var(--blue-4)]"
            onClick={onClose}
            aria-label="닫기"
          >
            <Image
              src="/icon/cancel.svg"
              alt="닫기"
              width={20}
              height={20}
              className="w-5 h-5"
            />
          </button>
        )}
      </div>
      {/* 내용 */}
      <div className="px-0 py-0">
        <div
          className="grid grid-cols-2 border-t border-b divide-x"
          style={{
            borderColor: "var(--accent-6)",
          }}
        >
          <div className="flex flex-col gap-8 py-8 pl-8 pr-4">
            <span
              className="text-xl font-bold"
              style={{ color: "var(--gray-1)" }}
            >
              language
            </span>
            <span
              className="text-xl font-bold"
              style={{ color: "var(--gray-1)" }}
            >
              Color
            </span>
          </div>
          <div className="flex flex-col gap-8 py-8 pl-4 pr-8">
            {/* 언어 드롭다운 */}
            <div className="relative">
              <select
                className="w-full rounded border px-3 py-1 font-semibold focus:outline-none appearance-none pr-8"
                style={{
                  borderColor: "var(--blue-3)",
                  background: "var(--blue-4)",
                  color: "var(--gray-1)",
                }}
                value={language}
                onChange={(e) => setLanguage(e.target.value as Language)}
              >
                {LANGUAGES.map((l) => (
                  <option key={l.value} value={l.value}>
                    {l.label}
                  </option>
                ))}
              </select>
              <Image
                src="/icon/dropdown.svg"
                alt="드롭다운"
                width={20}
                height={20}
                className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5"
              />
            </div>
            {/* 컬러 드롭다운 */}
            <div className="relative">
              <select
                className="w-full rounded border px-3 py-1 font-semibold focus:outline-none appearance-none pr-8"
                style={{
                  borderColor: "var(--blue-3)",
                  background: "var(--blue-4)",
                  color: "var(--gray-1)",
                }}
                value={color}
                onChange={(e) => setColor(e.target.value)}
              >
                {COLORS.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
              <Image
                src="/icon/dropdown.svg"
                alt="드롭다운"
                width={20}
                height={20}
                className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5"
              />
            </div>
          </div>
        </div>
      </div>
      {/* 하단 버튼 */}
      <div
        className="flex gap-6 px-8 py-6 rounded-b-2xl"
        style={{
          background: "var(--gradient-blue)",
        }}
      >
        <button
          className="flex-1 py-2 rounded border font-bold shadow"
          style={{
            borderColor: "var(--blue-3)",
            background: "var(--blue-4)",
            color: "var(--gray-1)",
          }}
          onClick={onSave}
        >
          Save
        </button>
        <button
          className="flex-1 py-2 rounded border font-bold shadow"
          style={{
            borderColor: "var(--blue-3)",
            background: "var(--blue-4)",
            color: "var(--gray-1)",
          }}
          onClick={onReset}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
