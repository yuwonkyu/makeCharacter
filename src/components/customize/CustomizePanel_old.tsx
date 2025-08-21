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

const TEXT = {
  // 카테고리 라벨 번역
  categories: {
    머리: {
      ko: "머리",
      en: "Head",
      jp: "頭",
    },
    몸통: {
      ko: "몸통",
      en: "Body",
      jp: "胴体",
    },
    다리: {
      ko: "다리",
      en: "Legs",
      jp: "脚",
    },
    신발: {
      ko: "신발",
      en: "Shoes",
      jp: "靴",
    },
    체력: {
      ko: "체력",
      en: "Health",
      jp: "体力",
    },
    마력: {
      ko: "마력",
      en: "Mana",
      jp: "魔力",
    },
    무게: {
      ko: "무게",
      en: "Weight",
      jp: "体重",
    },
    키: {
      ko: "키",
      en: "Height",
      jp: "身長",
    },
    IQ: {
      ko: "IQ",
      en: "IQ",
      jp: "IQ",
    },
    MBTI: {
      ko: "MBTI",
      en: "MBTI",
      jp: "MBTI",
    },
  },
  // 파츠 옵션 번역
  options: {
    // 기본 옵션
    기본: {
      ko: "기본",
      en: "Default",
      jp: "デフォルト",
    },
    // 머리 옵션들
    머리1: {
      ko: "머리1",
      en: "Head 1",
      jp: "頭1",
    },
    머리2: {
      ko: "머리2",
      en: "Head 2",
      jp: "頭2",
    },
    머리3: {
      ko: "머리3",
      en: "Head 3",
      jp: "頭3",
    },
    머리4: {
      ko: "머리4",
      en: "Head 4",
      jp: "頭4",
    },
    // 상의 옵션들
    상의1: {
      ko: "상의1",
      en: "Top 1",
      jp: "上着1",
    },
    상의2: {
      ko: "상의2",
      en: "Top 2",
      jp: "上着2",
    },
    상의3: {
      ko: "상의3",
      en: "Top 3",
      jp: "上着3",
    },
    상의4: {
      ko: "상의4",
      en: "Top 4",
      jp: "上着4",
    },
    // 하의 옵션들
    하의1: {
      ko: "하의1",
      en: "Bottom 1",
      jp: "下着1",
    },
    하의2: {
      ko: "하의2",
      en: "Bottom 2",
      jp: "下着2",
    },
    하의3: {
      ko: "하의3",
      en: "Bottom 3",
      jp: "下着3",
    },
    하의4: {
      ko: "하의4",
      en: "Bottom 4",
      jp: "下着4",
    },
    // 신발 옵션들
    신발1: {
      ko: "신발1",
      en: "Shoes 1",
      jp: "靴1",
    },
    신발2: {
      ko: "신발2",
      en: "Shoes 2",
      jp: "靴2",
    },
    신발3: {
      ko: "신발3",
      en: "Shoes 3",
      jp: "靴3",
    },
    신발4: {
      ko: "신발4",
      en: "Shoes 4",
      jp: "靴4",
    },
  },
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
                {customizeTranslations.categories[cat.label as keyof typeof customizeTranslations.categories]?.[
                  language
                ] || cat.label}
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
                        customizeTranslations.options[option as keyof typeof customizeTranslations.options]?.[
                          language
                        ] || option,
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
