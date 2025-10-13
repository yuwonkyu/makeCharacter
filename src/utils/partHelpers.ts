/**
 * 파츠 관련 유틸리티 함수들
 */

import type { PartAdjustment } from "@/types/parts";
import type { PartCategory } from "@/constants/parts";
import {
  CATEGORY_BASE_ADJUSTMENTS,
  INDIVIDUAL_PART_ADJUSTMENTS,
  CATEGORY_LABELS,
  SUPPORTED_IMAGE_EXTENSIONS,
} from "@/constants/parts";

/**
 * 파츠 파일명과 카테고리에 따른 최종 위치 조정 정보 계산
 */
export function calculatePartAdjustment(
  fileName: string,
  category: PartCategory
): PartAdjustment {
  const baseAdjustment = CATEGORY_BASE_ADJUSTMENTS[category];
  const individualAdjustment = INDIVIDUAL_PART_ADJUSTMENTS[fileName] || {};

  return {
    offsetX: baseAdjustment.offsetX + (individualAdjustment.offsetX || 0),
    offsetY: baseAdjustment.offsetY + (individualAdjustment.offsetY || 0),
    scale: baseAdjustment.scale * (individualAdjustment.scale || 1),
  };
}

/**
 * 파츠 파일명을 사용자에게 보여줄 라벨로 변환
 */
export function generatePartLabel(
  fileName: string,
  category: PartCategory
): string {
  // 확장자 제거
  const nameWithoutExt = fileName.replace(SUPPORTED_IMAGE_EXTENSIONS, "");

  // 파일명에서 숫자 추출
  const numberMatch = nameWithoutExt.match(/(\d+)$/);
  const number = numberMatch ? parseInt(numberMatch[1]) : 0;

  if (number === 0) {
    return "기본";
  }

  return `${CATEGORY_LABELS[category]}${number}`;
}

/**
 * 파츠 이미지 경로 생성
 */
export function generatePartImagePath(
  category: PartCategory,
  fileName: string
): string {
  return `/img/parts/${category}/${fileName}`;
}
