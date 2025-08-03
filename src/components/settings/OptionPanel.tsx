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
  color: {
    en: "Color",
    ko: "색상",
    jp: "色",
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
        <div className="grid grid-cols-2 divide-x-2 divide-gray-4">
          {/* 왼쪽(라벨) */}
          <div className="flex flex-col space-y-10 text-center">
            <span className="text-xl font-bold text-gray-2 border-b border-dashed border-gray-4 w-full pb-6 mb-6">
              {TEXT.language[language]}
            </span>
            <span className="text-xl font-bold text-gray-2 w-full">
              {TEXT.color[language]}
            </span>
          </div>
          {/* 오른쪽(드롭다운) */}
          <div className="flex flex-col space-y-10 text-center px-5">
            <div className="w-full border-b border-dashed border-gray-4 pb-6 mb-6">
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
            <div className="w-full">
              <div className="relative">
                <select
                  className="
                  w-full py-1 rounded-[2px] border-blue-3 bg-blue-6 
                  font-medium text-center text-gray-3 
                  focus:outline-none cursor-pointer appearance-none inset-dropdown"
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
                  className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 size-5"
                />
              </div>
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
