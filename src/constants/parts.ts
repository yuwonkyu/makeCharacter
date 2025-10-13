/**
 * 파츠 관련 상수들
 */

export type PartCategory = "head" | "body" | "legs" | "shoes";

/**
 * 파츠 카테고리별 폴백 파일 목록 (API 실패 시 사용)
 */
export const FALLBACK_PARTS_FILES: Record<PartCategory, string[]> = {
  head: ["Head0.png"],
  body: ["body0.png"],
  legs: ["Bottom0.png"],
  shoes: ["Shoes0.png"],
} as const;

/**
 * 카테고리별 기본 위치 조정 정보
 */
export const CATEGORY_BASE_ADJUSTMENTS: Record<
  PartCategory,
  { offsetX: number; offsetY: number; scale: number }
> = {
  head: { offsetX: 0, offsetY: 0, scale: 1 },
  body: { offsetX: 0, offsetY: 0, scale: 1 },
  legs: { offsetX: 0, offsetY: 0, scale: 1 },
  shoes: { offsetX: 0, offsetY: 0, scale: 1 },
} as const;

/**
 * 특정 파츠 파일에 대한 개별 조정 정보 (카테고리 기본값에 추가로 적용)
 */
export const INDIVIDUAL_PART_ADJUSTMENTS: Record<
  string,
  { offsetX?: number; offsetY?: number; scale?: number }
> = {
  // 머리 파츠
  "Head1.png": { offsetX: 0, offsetY: -27, scale: 0.38 },
  "Head2.png": { offsetX: 0, offsetY: -25.5, scale: 0.28 },

  // 상체 파츠
  "body1.png": { offsetX: -2, offsetY: 5, scale: 0.33 },

  // 다리 파츠
  "Bottom1.png": { offsetX: 0, offsetY: 46, scale: 0.35 },

  // 신발 파츠
  "Shoes1.png": { offsetX: 0, offsetY: 86, scale: 0.35 },
} as const;

/**
 * 카테고리별 라벨 매핑
 */
export const CATEGORY_LABELS: Record<PartCategory, string> = {
  head: "머리",
  body: "상의",
  legs: "하의",
  shoes: "신발",
} as const;

/**
 * 캐시 지속 시간 (5분)
 */
export const CACHE_DURATION = 5 * 60 * 1000;

/**
 * 지원하는 이미지 확장자
 */
export const SUPPORTED_IMAGE_EXTENSIONS = /\.(png|jpg|jpeg|gif|webp)$/i;
