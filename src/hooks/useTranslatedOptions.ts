/**
 * 번역된 옵션 생성 유틸리티
 */

import { useMemo } from "react";
import type { PartCategory, PartItem } from "@/utils/partUtils";
import type { CategoryConfig } from "@/constants/customize";
import { customizeTranslations } from "@/components/customize/translations";

interface TranslatedOption {
  value: string;
  label: string;
  imagePath?: string;
}

/**
 * 번역된 옵션 목록을 생성하는 커스텀 훅
 */
export function useTranslatedOptions(
  category: CategoryConfig,
  language: "en" | "ko" | "jp",
  partOptions: Record<PartCategory, PartItem[]>
): TranslatedOption[] {
  return useMemo(() => {
    if (category.type !== "select") return [];

    // 파츠 카테고리인 경우
    if (category.partCategory) {
      const categoryPartOptions = partOptions[category.partCategory] || [];
      return categoryPartOptions.map((partOption) => ({
        value: partOption.value,
        label:
          customizeTranslations.options[
            partOption.label as keyof typeof customizeTranslations.options
          ]?.[language] || partOption.label,
        imagePath: partOption.imagePath,
      }));
    }

    // 일반 카테고리인 경우
    return (
      category.options?.map((option: string) => ({
        value: option,
        label:
          customizeTranslations.options[
            option as keyof typeof customizeTranslations.options
          ]?.[language] || option,
      })) || []
    );
  }, [
    category.type,
    category.options,
    category.partCategory,
    language,
    partOptions,
  ]);
}
