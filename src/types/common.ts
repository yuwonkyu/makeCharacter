/**
 * 공통 타입 정의
 */

export type Language = "en" | "ko" | "jp";

export interface LanguageOption {
  code: Language;
  name: string;
  flag: string;
}
