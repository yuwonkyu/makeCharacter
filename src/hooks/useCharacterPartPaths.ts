/**
 * 캐릭터 파츠 경로 관리 커스텀 훅
 */

import { useMemo } from "react";
import { useCharacterStore } from "@/store/characterStore";
import type { PartItem } from "@/types/parts";
import type { PartCategory } from "@/constants/parts";

interface PartPaths {
  head: PartItem | null;
  body: PartItem | null;
  legs: PartItem | null;
  shoes: PartItem | null;
}

export function useCharacterPartPaths(
  partOptions: Record<PartCategory, PartItem[]>
): PartPaths {
  const { form } = useCharacterStore();

  return useMemo(() => {
    const findPartOption = (
      category: PartCategory,
      formValue: string
    ): PartItem | null => {
      if (!formValue || formValue === "기본") return null;
      return (
        partOptions[category].find((opt) => opt.label === formValue) || null
      );
    };

    return {
      head: findPartOption("head", form["머리"]),
      body: findPartOption("body", form["몸통"]),
      legs: findPartOption("legs", form["다리"]),
      shoes: findPartOption("shoes", form["신발"]),
    };
  }, [form, partOptions]);
}
