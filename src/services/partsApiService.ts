/**
 * 파츠 API 서비스
 */

import type { PartsApiResponse, PartApiResponse } from "@/types/parts";
import { FALLBACK_PARTS_FILES, type PartCategory } from "@/constants/parts";
import { partsCacheService } from "@/services/partsCacheService";

/**
 * 모든 파츠 파일 목록을 서버에서 가져오기
 */
export async function fetchAllPartsFiles(): Promise<Record<string, string[]>> {
  try {
    // 캐시 확인
    const cachedParts = partsCacheService.getCachedParts();
    if (cachedParts) {
      return cachedParts;
    }

    const response = await fetch("/api/parts/all");
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data: PartsApiResponse = await response.json();

    // 캐시 업데이트
    partsCacheService.setCachedParts(data.parts);

    return data.parts;
  } catch (error) {
    console.warn(
      "Failed to fetch parts files from API, using fallback:",
      error
    );
    return FALLBACK_PARTS_FILES;
  }
}

/**
 * 특정 카테고리의 파츠 파일 목록을 서버에서 가져오기
 */
export async function fetchPartFiles(
  category: PartCategory
): Promise<string[]> {
  try {
    const response = await fetch(`/api/parts?category=${category}`);
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data: PartApiResponse = await response.json();
    return data.files;
  } catch (error) {
    console.warn(
      `Failed to fetch files for category ${category}, using fallback:`,
      error
    );
    return FALLBACK_PARTS_FILES[category] || [];
  }
}
