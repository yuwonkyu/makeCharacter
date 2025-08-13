"use client";

import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCharacterStore } from "@/store/characterStore";
import Input from "@/components/common/Input";
import CustomSelect from "./CustomSelect";

const categoryList = [
  { label: "머리", type: "select", options: ["기본"] },
  { label: "몸통", type: "select", options: ["기본"] },
  { label: "다리", type: "select", options: ["기본"] },
  { label: "신발", type: "select", options: ["기본"] },
  { label: "체력", type: "input" },
  { label: "마력", type: "input" },
  { label: "무게", type: "input" },
  { label: "키", type: "input" },
  { label: "IQ", type: "input" },
  {
    label: "MBTI",
    type: "select",
    options: [
      "INTJ",
      "INTP",
      "ENTJ",
      "ENTP",
      "INFJ",
      "INFP",
      "ENFJ",
      "ENFP",
      "ISTJ",
      "ISFJ",
      "ESTJ",
      "ESFJ",
      "ISTP",
      "ISFP",
      "ESTP",
      "ESFP",
    ],
  },
];

const TEXT = {
  placeholder: {
    체력: {
      ko: "1~100중에 적어주세요.",
      en: "Please enter a value between 1 and 100.",
      jp: "1~100の間で入力してください。",
    },
    마력: {
      ko: "1~100중에 적어주세요.",
      en: "Please enter a value between 1 and 100.",
      jp: "1~100の間で入力してください。",
    },
    무게: {
      ko: "몸무게를 입력해주세요.",
      en: "Please enter your weight.",
      jp: "体重を入力してください。",
    },
    키: {
      ko: "키를 입력해주세요.",
      en: "Please enter your height.",
      jp: "身長を入力してください。",
    },
    IQ: {
      ko: "IQ를 입력해주세요.",
      en: "Please enter your IQ.",
      jp: "IQを入力してください。",
    },
  },
  header: {
    en: "Customizing",
    ko: "커스터마이징",
    jp: "カスタマイズ",
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
  select: {
    en: "Select",
    ko: "선택",
    jp: "選択",
  },
};

export default function CustomizePanel({
  onClose,
  onSave,
  onReset,
}: {
  onClose: () => void;
  onSave: () => void;
  onReset: () => void;
}) {
  const { language } = useLanguage();
  const { form, updateField } = useCharacterStore();
  const handleChange = (key: keyof typeof form, value: string) => {
    updateField(key, value);
  };
  return (
    <div className="relative z-10 w-[1000px] max-w-full rounded-xl border border-blue-3 shadow-2xl mx-auto flex flex-col bg-gradient-blue-custom">
      {/* 헤더 */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-blue-3 rounded-t-xl bg-gradient-blue-custom relative">
        <span className="text-xl font-bold text-gray-1 mx-auto">
          {TEXT.header[language]}
        </span>
        <button
          className="absolute right-3 top-3 size-6 flex items-center justify-center bg-transparent"
          style={{ border: "none", boxShadow: "none" }}
          onClick={onClose}
          aria-label="닫기"
          type="button"
        >
          <Image
            src="/icon/cancel.svg"
            alt="닫기"
            width={24}
            height={24}
            className="size-6 cursor-pointer"
          />
        </button>
      </div>
      {/* 본문 */}
      <div className="flex flex-row w-full h-[480px] bg-white py-70">
        {/* 왼쪽: 아바타 */}
        <div className="flex-1 flex items-center justify-center">
          <Image
            src="/img/npc1.png"
            alt="아바타"
            width={220}
            height={220}
            className="object-contain"
            priority
          />
        </div>
        {/* 오른쪽: 카테고리/입력 */}
        <div className="flex-1 flex flex-col justify-center gap-3 px-8 py-6">
          {categoryList.map((cat) => (
            <div key={cat.label} className="flex items-center gap-3 mb-1">
              <span className="w-20 text-gray-1 text-base font-semibold text-right mr-2">
                {cat.label}
              </span>
              {cat.type === "select" ? (
                <CustomSelect
                  value={form[cat.label as keyof typeof form]}
                  onChange={(v: string) =>
                    handleChange(cat.label as keyof typeof form, v)
                  }
                  options={cat.options || []}
                  selectText={TEXT.select[language]}
                />
              ) : (
                <Input
                  value={form[cat.label as keyof typeof form]}
                  onChange={(v: string) =>
                    handleChange(cat.label as keyof typeof form, v)
                  }
                  placeholder={
                    TEXT.placeholder[
                      cat.label as keyof typeof TEXT.placeholder
                    ]?.[language]
                  }
                />
              )}
            </div>
          ))}
        </div>
      </div>
      {/* 하단 버튼 */}
      <div className="flex justify-center gap-6 px-8 py-4 rounded-b-xl border-t border-blue-3 bg-gradient-blue-custom">
        <button
          className="w-32 py-2 rounded bg-gradient-blue-custom text-gray-1 font-bold border border-blue-3 shadow"
          onClick={onSave}
        >
          {TEXT.save[language]}
        </button>
        <button
          className="w-32 py-2 rounded bg-gradient-blue-custom text-gray-1 font-bold border border-blue-3 shadow"
          onClick={onReset}
        >
          {TEXT.reset[language]}
        </button>
      </div>
    </div>
  );
}
