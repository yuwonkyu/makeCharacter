/**
 * 파츠 관리 유틸리티 - 메인 인터페이스
 */

// 타입 및 상수 export/import
export type {
  PartItem,
  PartsApiResponse,
  PartApiResponse,
} from "@/types/parts";
export type { PartCategory } from "@/constants/parts";
import type { PartItem } from "@/types/parts";
import { FALLBACK_PARTS_FILES, type PartCategory } from "@/constants/parts";

// 서비스 import
import { fetchAllPartsFiles, fetchPartFiles } from "@/services/partsApiService";
import { partsCacheService } from "@/services/partsCacheService";

// 헬퍼 함수 import
import {
  calculatePartAdjustment,
  generatePartLabel,
  generatePartImagePath,
} from "@/utils/partHelpers";

/**
 * 파츠 아이템 생성 헬퍼
 */
function createPartItem(fileName: string, category: PartCategory): PartItem {
  const adjustment = calculatePartAdjustment(fileName, category);
  const label = generatePartLabel(fileName, category);

  return {
    value: label,
    label,
    imagePath: generatePartImagePath(category, fileName),
    ...adjustment,
  };
}

/**
 * 특정 파츠 카테고리의 옵션 목록을 생성 (동적)
 */
export async function getPartOptions(
  category: PartCategory
): Promise<PartItem[]> {
  const files = await fetchPartFiles(category);
  return files.map((fileName) => createPartItem(fileName, category));
}

/**
 * 모든 파츠 카테고리의 옵션 목록을 생성 (동적)
 */
export async function getAllPartOptions(): Promise<
  Record<PartCategory, PartItem[]>
> {
  const allFiles = await fetchAllPartsFiles();
  const categories: PartCategory[] = ["head", "body", "legs", "shoes"];

  const result = {} as Record<PartCategory, PartItem[]>;

  for (const category of categories) {
    const files = allFiles[category] || FALLBACK_PARTS_FILES[category];
    result[category] = files.map((fileName) =>
      createPartItem(fileName, category)
    );
  }

  return result;
}

/**
 * 파츠 라벨을 이미지 경로로 변환
 */
export async function getPartImagePath(
  category: PartCategory,
  label: string
): Promise<string> {
  const options = await getPartOptions(category);
  const option = options.find(
    (opt) => opt.label === label || opt.value === label
  );

  return (
    option?.imagePath ||
    generatePartImagePath(category, FALLBACK_PARTS_FILES[category][0])
  );
}

/**
 * 동기적으로 사용할 수 있는 기본 파츠 옵션 (폴백용)
 */
export function getDefaultPartOptions(category: PartCategory): PartItem[] {
  const files = FALLBACK_PARTS_FILES[category] || [];
  return files.map((fileName) => createPartItem(fileName, category));
}

/**
 * 캐시 무효화 함수 (새 파츠가 추가되었을 때 호출)
 */
export function invalidatePartsCache(): void {
  partsCacheService.invalidateCache();
}
