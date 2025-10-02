import React from "react";
import Image from "next/image";
import type { Language, OptionPanelProps } from "./settings.d";

const TEXT = {
  option: {
    en: "Option",
    ko: "옵션",
    jp: "オプション",
  },
  language: {
    en: "Language",
    ko: "언어",
    jp: "言語",
  },
  save: {
    en: "Save",
    ko: "저장",
    jp: "保存",
  },
  reset: {
    en: "Reset",
    ko: "초기화",
    jp: "リセット",
  },
};

const LANGUAGES = [
  { label: "English", value: "en" },
  { label: "한국어", value: "ko" },
  { label: "日本語", value: "jp" },
];

export default function OptionPanel({
  language,
  setLanguage,
  onSave,
  onReset,
  onClose,
}: OptionPanelProps) {
  return (
    <div className="w-[350px] rounded-[8px] shadow-lg border border-accent-1 px-[5px] py-[8px] relative bg-gradient-blue-custom">
      {/* 헤더 */}
      <div className="flex items-center justify-between rounded-[4px] px-4 py-2 border-1 border-black/50 relative bg-gradient-blue-custom">
        <span className="text-[24px] font-bold mx-auto text-gray-1">
          {TEXT.option[language]}
        </span>
        {onClose && (
          <button
            className="absolute right-3 top-3 size-6 flex items-center justify-center  bg-transparent "
            style={{ border: "none", boxShadow: "none" }}
            onClick={onClose}
            aria-label="닫기"
          >
            <Image
              src="/icon/cancel.svg"
              alt="닫기"
              width={24}
              height={24}
              className="size-6 cursor-pointer"
            />
          </button>
        )}
      </div>
      {/* 내용 */}
      <div className="px-2 py-8 rounded-[4px] border-[2px] border-blue-3 bg-white">
        <div className="flex flex-col items-center space-y-6">
          {/* 언어 설정 */}
          <div className="w-full max-w-[200px]">
            <div className="text-center mb-4">
              <span className="text-xl font-bold text-gray-2 border-b border-dashed border-gray-4 pb-2">
                {TEXT.language[language]}
              </span>
            </div>
            <div className="relative">
              <select
                className="
                w-full py-1 rounded-[2px] border-blue-3 bg-blue-6 
                font-medium text-center text-gray-3 
                focus:outline-none cursor-pointer appearance-none inset-dropdown"
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
                className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 size-5"
              />
            </div>
          </div>
        </div>
      </div>
      {/* 하단 버튼 */}
      <div className="flex gap-6 px-8 py-6 rounded-b-2xl bg-gradient-blue-custom">
        <button
          className="flex-1 py-2 rounded-[4px] text-[20px] font-bold bg-gradient-blue-custom"
          onClick={onSave}
        >
          {TEXT.save[language]}
        </button>
        <button
          className="flex-1 py-2 rounded-[4px] text-[20px] font-bold bg-gradient-blue-custom"
          onClick={onReset}
        >
          {TEXT.reset[language]}
        </button>
      </div>
    </div>
  );
}
