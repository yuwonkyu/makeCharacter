/**
 * CategoryRow 컴포넌트 - 최적화된 카테고리 행
 */

import React, { useCallback, useMemo } from "react";
import { useCharacterStore } from "@/store/characterStore";
import type { CharacterForm } from "@/store/characterStore";
import type { PartCategory, PartItem } from "@/utils/partUtils";
import type { CategoryConfig } from "@/constants/customize";
import { useTranslatedOptions } from "@/hooks/useTranslatedOptions";
import { customizeTranslations } from "./translations";
import Input from "@/components/common/Input";
import CustomSelect from "./CustomSelect";

interface CategoryRowProps {
  category: CategoryConfig;
  language: "en" | "ko" | "jp";
  partOptions: Record<PartCategory, PartItem[]>;
}

export const CategoryRow = React.memo<CategoryRowProps>(function CategoryRow({
  category,
  language,
  partOptions,
}) {
  // 해당 라벨의 값만 구독하여 불필요한 전체 리렌더 방지
  const value = useCharacterStore(
    (state) => state.form[category.label as keyof CharacterForm] as string
  );
  const updateField = useCharacterStore((state) => state.updateField);

  const handleChange = useCallback(
    (newValue: string) =>
      updateField(category.label as keyof CharacterForm, newValue),
    [updateField, category.label]
  );

  const translatedLabel = useMemo(
    () =>
      customizeTranslations.categories[
        category.label as keyof typeof customizeTranslations.categories
      ]?.[language] || category.label,
    [language, category.label]
  );

  const translatedOptions = useTranslatedOptions(
    category,
    language,
    partOptions
  );

  const placeholder = useMemo(
    () =>
      customizeTranslations.placeholder[
        category.label as keyof typeof customizeTranslations.placeholder
      ]?.[language],
    [language, category.label]
  );

  return (
    <div className="flex items-center gap-3 mb-1">
      <span className="w-20 text-gray-1 text-base font-semibold text-right mr-2">
        {translatedLabel}
      </span>
      {category.type === "select" ? (
        <CustomSelect
          value={value}
          onChange={handleChange}
          options={translatedOptions}
          selectText={customizeTranslations.ui.select[language]}
          showImages={!!category.partCategory}
        />
      ) : (
        <Input
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          type={category.inputType || "text"}
          min={category.min}
          max={category.max}
          decimalPlaces={category.decimalPlaces}
        />
      )}
    </div>
  );
});
