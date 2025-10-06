"use client";

import Image from "next/image";
import React, { useCallback, useMemo, useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCharacterStore } from "@/store/characterStore";
import type { CharacterForm } from "@/store/characterStore";
import Input from "@/components/common/Input";
import CustomSelect from "./CustomSelect";
import { customizeTranslations } from "./translations";
import CharacterRenderer from "@/components/character/CharacterRenderer";
import {
  getAllPartOptions,
  getDefaultPartOptions,
  type PartCategory,
  type PartItem,
} from "@/utils/partUtils";

type Category = {
  label: string;
  type: "select" | "input";
  inputType?: "text" | "number";
  min?: number;
  max?: number;
  decimalPlaces?: number; // 소수점 자릿수 제한
  options?: string[];
  partCategory?: PartCategory; // 파츠 카테고리 추가
};

// 파츠 옵션을 관리하는 커스텀 훅
function usePartOptions() {
  const [partOptions, setPartOptions] = useState<
    Record<PartCategory, PartItem[]>
  >({
    head: getDefaultPartOptions("head"),
    body: getDefaultPartOptions("body"),
    legs: getDefaultPartOptions("legs"),
    shoes: getDefaultPartOptions("shoes"),
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadPartOptions = async () => {
      try {
        const options = await getAllPartOptions();
        if (isMounted) {
          setPartOptions(options);
        }
      } catch (error) {
        console.error("Failed to load part options:", error);
        // 폴백 옵션은 이미 state에 설정되어 있음
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadPartOptions();

    return () => {
      isMounted = false;
    };
  }, []);

  return { partOptions, loading };
}

// 카테고리 목록 (파츠 카테고리는 동적으로 로드됨)
const createCategoryList = (
  partOptions: Record<PartCategory, PartItem[]>
): Category[] => [
  {
    label: "머리",
    type: "select",
    partCategory: "head",
    options: partOptions.head.map((option) => option.label),
  },
  {
    label: "몸통",
    type: "select",
    partCategory: "body",
    options: partOptions.body.map((option) => option.label),
  },
  {
    label: "다리",
    type: "select",
    partCategory: "legs",
    options: partOptions.legs.map((option) => option.label),
  },
  {
    label: "신발",
    type: "select",
    partCategory: "shoes",
    options: partOptions.shoes.map((option) => option.label),
  },
  {
    label: "체력",
    type: "input",
    inputType: "number",
    min: 1,
    max: 100,
    decimalPlaces: 0, // 정수만
  },
  {
    label: "마력",
    type: "input",
    inputType: "number",
    min: 1,
    max: 100,
    decimalPlaces: 0, // 정수만
  },
  {
    label: "무게",
    type: "input",
    inputType: "number",
    min: 1,
    max: 999,
    decimalPlaces: 2, // 소수점 2자리까지
  },
  {
    label: "키",
    type: "input",
    inputType: "number",
    min: 1,
    max: 300,
    decimalPlaces: 2, // 소수점 2자리까지
  },
  {
    label: "IQ",
    type: "input",
    inputType: "number",
    min: 1,
    max: 300,
    decimalPlaces: 2, // 소수점 2자리까지
  },
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

// 각 카테고리 행을 별도 컴포넌트로 분리하여 리렌더 최소화
const CategoryRow = React.memo(function CategoryRow({
  cat,
  language,
  partOptions,
}: {
  cat: Category;
  language: "en" | "ko" | "jp";
  partOptions: Record<PartCategory, PartItem[]>;
}) {
  // 해당 라벨의 값만 구독하여 불필요한 전체 리렌더 방지
  const value = useCharacterStore(
    (s) => s.form[cat.label as keyof CharacterForm] as string
  );
  const updateField = useCharacterStore((s) => s.updateField);

  const onChange = useCallback(
    (v: string) => updateField(cat.label as keyof CharacterForm, v),
    [updateField, cat.label]
  );

  const translatedLabel = useMemo(
    () =>
      customizeTranslations.categories[
        cat.label as keyof typeof customizeTranslations.categories
      ]?.[language] || cat.label,
    [language, cat.label]
  );

  const translatedOptions = useMemo(() => {
    if (cat.type !== "select")
      return [] as { value: string; label: string; imagePath?: string }[];

    // 파츠 카테고리인 경우 이미지 경로도 포함하여 옵션 생성
    if (cat.partCategory) {
      const categoryPartOptions = partOptions[cat.partCategory] || [];
      return categoryPartOptions.map((partOption) => ({
        value: partOption.value,
        label:
          customizeTranslations.options[
            partOption.label as keyof typeof customizeTranslations.options
          ]?.[language] || partOption.label,
        imagePath: partOption.imagePath,
      }));
    }

    // 일반 카테고리인 경우 기존 방식 유지
    return (
      cat.options?.map((option: string) => ({
        value: option,
        label:
          customizeTranslations.options[
            option as keyof typeof customizeTranslations.options
          ]?.[language] || option,
      })) || []
    );
  }, [cat.type, cat.options, cat.partCategory, language, partOptions]);

  const placeholder = useMemo(
    () =>
      customizeTranslations.placeholder[
        cat.label as keyof typeof customizeTranslations.placeholder
      ]?.[language],
    [language, cat.label]
  );

  return (
    <div className="flex items-center gap-3 mb-1">
      <span className="w-20 text-gray-1 text-base font-semibold text-right mr-2">
        {translatedLabel}
      </span>
      {cat.type === "select" ? (
        <CustomSelect
          value={value}
          onChange={onChange}
          options={translatedOptions}
          selectText={customizeTranslations.ui.select[language]}
          showImages={!!cat.partCategory} // 파츠 카테고리인 경우에만 이미지 표시
        />
      ) : (
        <Input
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          type={cat.inputType || "text"}
          min={cat.min}
          max={cat.max}
          decimalPlaces={cat.decimalPlaces}
        />
      )}
    </div>
  );
});

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
  const { partOptions } = usePartOptions();

  // 카테고리 목록을 partOptions 기반으로 생성
  const categoryList = useMemo(
    () => createCategoryList(partOptions),
    [partOptions]
  );

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
            <CharacterRenderer
              width={220}
              height={220}
              className="w-full h-full"
              priority
              showBase={true}
            />
          </div>
        </div>

        {/* 오른쪽: 카테고리/입력 */}
        <div className="flex-1 flex flex-col justify-center gap-3 px-8 py-6">
          {categoryList.map((cat) => (
            <CategoryRow
              key={cat.label}
              cat={cat}
              language={language}
              partOptions={partOptions}
            />
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
