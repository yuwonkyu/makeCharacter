import React from "react";
import Image from "next/image";

type OptionPanelProps = {
  language: string;
  setLanguage: (lang: string) => void;
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
    <div className="w-[340px] rounded-2xl shadow-lg border border-[#aec5f0] bg-[#fcfbfa] p-0 relative">
      {/* 헤더 */}
      <div className="flex items-center justify-between rounded-t-2xl bg-gradient-to-b from-[#d5e6f7] to-[#aec5f0] px-4 py-2 border-b border-[#aec5f0] relative">
        <span className="text-2xl font-bold text-[#406485] mx-auto">Option</span>
        {onClose && (
          <button
            className="absolute right-3 top-2 w-7 h-7 flex items-center justify-center rounded hover:bg-[#e4e0dd]"
            onClick={onClose}
            aria-label="닫기"
          >
            <Image src="/icon/cancel.svg" alt="닫기" width={20} height={20} className="w-5 h-5" />
          </button>
        )}
      </div>
      {/* 내용 */}
      <div className="px-0 py-0">
        <div className="grid grid-cols-2 border-t border-[#e4e0dd] border-b divide-x divide-[#e4e0dd]">
          <div className="flex flex-col gap-8 py-8 pl-8 pr-4">
            <span className="text-xl font-bold text-[#8d8985]">language</span>
            <span className="text-xl font-bold text-[#8d8985]">Color</span>
          </div>
          <div className="flex flex-col gap-8 py-8 pl-4 pr-8">
            {/* 언어 드롭다운 */}
            <div className="relative">
              <select
                className="w-full rounded border border-[#aec5f0] bg-[#d5e6f7] px-3 py-1 text-[#406485] font-semibold focus:outline-none appearance-none pr-8"
                value={language}
                onChange={e => setLanguage(e.target.value)}
              >
                {LANGUAGES.map(l => (
                  <option key={l.value} value={l.value}>{l.label}</option>
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
                className="w-full rounded border border-[#aec5f0] bg-[#d5e6f7] px-3 py-1 text-[#406485] font-semibold focus:outline-none appearance-none pr-8"
                value={color}
                onChange={e => setColor(e.target.value)}
              >
                {COLORS.map(c => (
                  <option key={c.value} value={c.value}>{c.label}</option>
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
      <div className="flex gap-6 px-8 py-6 bg-gradient-to-t from-[#d5e6f7] to-[#e4e0dd] rounded-b-2xl">
        <button
          className="flex-1 py-2 rounded border border-[#aec5f0] bg-gradient-to-b from-[#e4e0dd] to-[#aec5f0] text-[#406485] font-bold shadow"
          onClick={onSave}
        >
          Save
        </button>
        <button
          className="flex-1 py-2 rounded border border-[#aec5f0] bg-gradient-to-b from-[#e4e0dd] to-[#aec5f0] text-[#406485] font-bold shadow"
          onClick={onReset}
        >
          Reset
        </button>
      </div>
    </div>
  );
}