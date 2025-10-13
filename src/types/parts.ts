/**
 * 파츠 관련 타입 정의
 */

export type { PartCategory } from "@/constants/parts";

export interface PartItem {
  value: string;
  label: string;
  imagePath: string;
  offsetX?: number;
  offsetY?: number;
  scale?: number;
}

export interface PartAdjustment {
  offsetX: number;
  offsetY: number;
  scale: number;
}

export interface PartsApiResponse {
  parts: Record<string, string[]>;
  categories: string[];
  totalFiles: number;
}

export interface PartApiResponse {
  category: string;
  files: string[];
  count: number;
}
