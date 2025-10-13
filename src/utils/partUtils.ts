/**
 * 파츠 이미지 파일 목록을 동적으로 생성하는 유틸리티
 */

export type PartCategory = "head" | "body" | "legs" | "shoes";

export type PartItem = {
  value: string;
  label: string;
  imagePath: string;
  offsetX?: number; // X축 오프셋 (픽셀)
  offsetY?: number; // Y축 오프셋 (픽셀)
  scale?: number; // 크기 조정 (1.0 = 기본 크기)
};

/**
 * API 응답 타입 정의
 */
export type PartsApiResponse = {
  parts: Record<string, string[]>;
  categories: string[];
  totalFiles: number;
};

export type PartApiResponse = {
  category: string;
  files: string[];
  count: number;
};

/**
 * 파츠 카테고리별 폴백 파일 목록 (API 실패 시 사용)
 */
const FALLBACK_PARTS_FILES: Record<PartCategory, string[]> = {
  head: ["Head0.png"],
  body: ["body0.png"],
  legs: ["Bottom0.png"],
  shoes: ["Shoes0.png"],
};

/**
 * 카테고리별 기본 위치 조정 정보
 */
const CATEGORY_BASE_ADJUSTMENTS: Record<
  PartCategory,
  { offsetX: number; offsetY: number; scale: number }
> = {
  head: { offsetX: 0, offsetY: 0, scale: 1 }, // 머리는 더 위쪽에 배치하고 크기 축소
  body: { offsetX: 0, offsetY: 0, scale: 1 }, // 상체는 중앙에서 약간 위
  legs: { offsetX: 0, offsetY: 0, scale: 1 }, // 다리는 아래쪽에 배치
  shoes: { offsetX: 0, offsetY: 0, scale: 1 }, // 신발은 가장 아래쪽에 배치
};

/**
 * 특정 파츠 파일에 대한 개별 조정 정보 (카테고리 기본값에 추가로 적용)
 */
const INDIVIDUAL_PART_ADJUSTMENTS: Record<
  string,
  { offsetX?: number; offsetY?: number; scale?: number }
> = {
  // 토마토 머리 - 카테고리 기본값에 추가로 적용
  "Head1.png": { offsetX: 0, offsetY: -27, scale: 0.38 },
  "Head2.png": { offsetX: 0, offsetY: -25.5, scale: 0.28 },

  // 다른 머리 파츠 예시
  // "Head3.png": { offsetX: 2, offsetY: -3, scale: 0.95 },

  // 상체 파츠 예시
  "body1.png": { offsetX: 0, offsetY: 0, scale: 0.3 },

  // 다리 파츠 예시
  "Bottom1.png": { offsetX: 0, offsetY: 46, scale: 0.37 },

  // 신발 파츠 예시
  // "Shoes1.png": { offsetX: 0, offsetY: 3, scale: 1.1 },
};

/**
 * 파츠 파일명과 카테고리에 따른 최종 조정 정보 계산
 */
function getPartAdjustment(fileName: string, category: PartCategory) {
  const baseAdjustment = CATEGORY_BASE_ADJUSTMENTS[category];
  const individualAdjustment = INDIVIDUAL_PART_ADJUSTMENTS[fileName] || {};

  return {
    offsetX: baseAdjustment.offsetX + (individualAdjustment.offsetX || 0),
    offsetY: baseAdjustment.offsetY + (individualAdjustment.offsetY || 0),
    scale: baseAdjustment.scale * (individualAdjustment.scale || 1),
  };
}

/**
 * 동적으로 로드된 파츠 파일 목록을 캐시
 */
let cachedPartsFiles: Record<string, string[]> | null = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5분 캐시

/**
 * 파츠 파일명을 사용자에게 보여줄 라벨로 변환
 */
function fileNameToLabel(fileName: string, category: PartCategory): string {
  // 확장자 제거
  const nameWithoutExt = fileName.replace(/\.(png|jpg|jpeg|gif|webp)$/i, "");

  // 파일명 기반으로 라벨 생성
  const numberMatch = nameWithoutExt.match(/(\d+)$/);
  const number = numberMatch ? parseInt(numberMatch[1]) : 0;

  if (number === 0) {
    return "기본";
  }

  // 카테고리별 라벨 생성
  const categoryLabels: Record<PartCategory, string> = {
    head: "머리",
    body: "상의",
    legs: "하의",
    shoes: "신발",
  };

  return `${categoryLabels[category]}${number}`;
}

/**
 * 서버에서 모든 파츠 파일 목록을 가져오는 함수
 */
async function fetchAllPartsFiles(): Promise<Record<string, string[]>> {
  try {
    // 캐시 확인
    const now = Date.now();
    if (cachedPartsFiles && now - cacheTimestamp < CACHE_DURATION) {
      return cachedPartsFiles;
    }

    const response = await fetch("/api/parts/all");
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data: PartsApiResponse = await response.json();

    // 캐시 업데이트
    cachedPartsFiles = data.parts;
    cacheTimestamp = now;

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
 * 특정 카테고리의 파츠 파일 목록을 가져오는 함수
 */
async function fetchPartFiles(category: PartCategory): Promise<string[]> {
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

/**
 * 특정 파츠 카테고리의 옵션 목록을 생성 (동적)
 */
export async function getPartOptions(
  category: PartCategory
): Promise<PartItem[]> {
  const files = await fetchPartFiles(category);

  return files.map((fileName: string) => {
    const adjustment = getPartAdjustment(fileName, category);
    return {
      value: fileNameToLabel(fileName, category),
      label: fileNameToLabel(fileName, category),
      imagePath: `/img/parts/${category}/${fileName}`,
      ...adjustment,
    };
  });
}

/**
 * 모든 파츠 카테고리의 옵션 목록을 생성 (동적)
 */
export async function getAllPartOptions(): Promise<
  Record<PartCategory, PartItem[]>
> {
  const allFiles = await fetchAllPartsFiles();
  const categories: PartCategory[] = ["head", "body", "legs", "shoes"];

  const result: Record<PartCategory, PartItem[]> = {} as Record<
    PartCategory,
    PartItem[]
  >;

  for (const category of categories) {
    const files = allFiles[category] || FALLBACK_PARTS_FILES[category];
    result[category] = files.map((fileName: string) => {
      const adjustment = getPartAdjustment(fileName, category);
      return {
        value: fileNameToLabel(fileName, category),
        label: fileNameToLabel(fileName, category),
        imagePath: `/img/parts/${category}/${fileName}`,
        ...adjustment,
      };
    });
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
    `/img/parts/${category}/${FALLBACK_PARTS_FILES[category][0]}`
  );
}

/**
 * 동기적으로 사용할 수 있는 기본 파츠 옵션 (폴백용)
 */
export function getDefaultPartOptions(category: PartCategory): PartItem[] {
  const files = FALLBACK_PARTS_FILES[category] || [];

  return files.map((fileName: string) => {
    const adjustment = getPartAdjustment(fileName, category);
    return {
      value: fileNameToLabel(fileName, category),
      label: fileNameToLabel(fileName, category),
      imagePath: `/img/parts/${category}/${fileName}`,
      ...adjustment,
    };
  });
}

/**
 * 캐시 무효화 함수 (새 파츠가 추가되었을 때 호출)
 */
export function invalidatePartsCache(): void {
  cachedPartsFiles = null;
  cacheTimestamp = 0;
}
