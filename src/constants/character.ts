/**
 * 캐릭터 페이지 관련 상수
 */

export const CHARACTER_CONFIG = {
  AVATAR_SIZE: 112,
  LOADING_DELAY: 300,
  MAP_BACKGROUND: "/img/bg-map.png",
} as const;

export const CHARACTER_TRANSLATIONS = {
  loading: {
    en: "Loading character...",
    ko: "캐릭터 불러오는 중...",
    jp: "キャラクターを読み込み中...",
  },
  level: {
    en: "Lv.1",
    ko: "Lv.1",
    jp: "Lv.1",
  },
  gameTitle: {
    en: "My Game Character",
    ko: "나만의게임캐릭터",
    jp: "私のゲームキャラクター",
  },
} as const;

export const DEFAULT_CHARACTER_STATS = {
  체력: "100",
  마력: "100",
  무게: "80",
  키: "177",
  IQ: "124",
  MBTI: "INTP",
} as const;
