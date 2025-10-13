/**
 * 파츠 캐시 관리 서비스
 */

import { CACHE_DURATION } from "@/constants/parts";

class PartsCacheService {
  private cachedPartsFiles: Record<string, string[]> | null = null;
  private cacheTimestamp = 0;

  /**
   * 캐시가 유효한지 확인
   */
  private isCacheValid(): boolean {
    const now = Date.now();
    return (
      this.cachedPartsFiles !== null &&
      now - this.cacheTimestamp < CACHE_DURATION
    );
  }

  /**
   * 캐시된 파츠 파일들 반환
   */
  getCachedParts(): Record<string, string[]> | null {
    return this.isCacheValid() ? this.cachedPartsFiles : null;
  }

  /**
   * 파츠 파일들을 캐시에 저장
   */
  setCachedParts(parts: Record<string, string[]>): void {
    this.cachedPartsFiles = parts;
    this.cacheTimestamp = Date.now();
  }

  /**
   * 캐시 무효화
   */
  invalidateCache(): void {
    this.cachedPartsFiles = null;
    this.cacheTimestamp = 0;
  }
}

export const partsCacheService = new PartsCacheService();
