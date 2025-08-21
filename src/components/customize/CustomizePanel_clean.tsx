"use client";

import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCharacterStore } from "@/store/characterStore";
import Input from "@/components/common/Input";
import CustomSelect from "./CustomSelect";
import { customizeTranslations } from "./translations";

const categoryList = [
  {
    label: "머리",
    type: "select",
    options: ["기본", "머리1", "머리2", "머리3", "머리4"],
  },
  {
    label: "몸통",
    type: "select",
    options: ["기본", "상의1", "상의2", "상의3", "상의4"],
  },
  {
    label: "다리",
    type: "select",
    options: ["기본", "하의1", "하의2", "하의3", "하의4"],
  },
  {
    label: "신발",
    type: "select",
    options: ["기본", "신발1", "신발2", "신발3", "신발4"],
  },
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
          {customizeTranslations.ui.header[language]}
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
        {/* 왼쪽: 캐릭터 미리보기 */}
        <div className="flex-1 flex items-center justify-center">
          <div className="relative size-[220px]">
            {/* 베이스 캐릭터 */}
            <Image
              src="/img/base.png"
              alt="베이스 캐릭터"
              fill
              className="absolute inset-0 object-contain"
              priority
            />

            {/* 머리 파츠 */}
            {form.머리 && form.머리 !== "기본" && (
              <Image
                src={`/img/parts/head/${form.머리}.png`}
                alt="머리 파츠"
                width={220}
                height={220}
                className="absolute inset-0 object-contain"
                onError={(e) => {
                  // 이미지 로드 실패 시 숨김
                  e.currentTarget.style.display = "none";
                }}
              />
            )}

            {/* 몸통 파츠 */}
            {form.몸통 && form.몸통 !== "기본" && (
              <Image
                src={`/img/parts/body/${form.몸통}.png`}
                alt="몸통 파츠"
                width={220}
                height={220}
                className="absolute inset-0 object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            )}

            {/* 다리 파츠 */}
            {form.다리 && form.다리 !== "기본" && (
              <Image
                src={`/img/parts/legs/${form.다리}.png`}
                alt="다리 파츠"
                width={220}
                height={220}
                className="absolute inset-0 object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            )}

            {/* 신발 파츠 */}
            {form.신발 && form.신발 !== "기본" && (
              <Image
                src={`/img/parts/shoes/${form.신발}.png`}
                alt="신발 파츠"
                width={220}
                height={220}
                className="absolute inset-0 object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            )}
          </div>
        </div>

        {/* 오른쪽: 카테고리/입력 */}
        <div className="flex-1 flex flex-col justify-center gap-3 px-8 py-6">
          {categoryList.map((cat) => (
            <div key={cat.label} className="flex items-center gap-3 mb-1">
              <span className="w-20 text-gray-1 text-base font-semibold text-right mr-2">
                {customizeTranslations.categories[
                  cat.label as keyof typeof customizeTranslations.categories
                ]?.[language] || cat.label}
              </span>
              {cat.type === "select" ? (
                <CustomSelect
                  value={form[cat.label as keyof typeof form]}
                  onChange={(v: string) =>
                    handleChange(cat.label as keyof typeof form, v)
                  }
                  options={
                    cat.options?.map((option: string) => ({
                      value: option,
                      label:
                        customizeTranslations.options[
                          option as keyof typeof customizeTranslations.options
                        ]?.[language] || option,
                    })) || []
                  }
                  selectText={customizeTranslations.ui.select[language]}
                />
              ) : (
                <Input
                  value={form[cat.label as keyof typeof form]}
                  onChange={(v: string) =>
                    handleChange(cat.label as keyof typeof form, v)
                  }
                  placeholder={
                    customizeTranslations.placeholder[
                      cat.label as keyof typeof customizeTranslations.placeholder
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
          {customizeTranslations.ui.save[language]}
        </button>
        <button
          className="w-32 py-2 rounded bg-gradient-blue-custom text-gray-1 font-bold border border-blue-3 shadow"
          onClick={onReset}
        >
          {customizeTranslations.ui.reset[language]}
        </button>
      </div>
    </div>
  );
}
