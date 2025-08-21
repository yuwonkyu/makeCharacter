// 커스터마이징 페이지 번역 데이터
export const customizeTranslations = {
  // 카테고리 라벨 번역
  categories: {
    머리: {
      ko: "머리",
      en: "Head",
      jp: "頭",
    },
    몸통: {
      ko: "몸통",
      en: "Body",
      jp: "胴体",
    },
    다리: {
      ko: "다리",
      en: "Legs",
      jp: "脚",
    },
    신발: {
      ko: "신발",
      en: "Shoes",
      jp: "靴",
    },
    체력: {
      ko: "체력",
      en: "Health",
      jp: "体力",
    },
    마력: {
      ko: "마력",
      en: "Mana",
      jp: "魔力",
    },
    무게: {
      ko: "무게",
      en: "Weight",
      jp: "体重",
    },
    키: {
      ko: "키",
      en: "Height",
      jp: "身長",
    },
    IQ: {
      ko: "IQ",
      en: "IQ",
      jp: "IQ",
    },
    MBTI: {
      ko: "MBTI",
      en: "MBTI",
      jp: "MBTI",
    },
  },

  // 파츠 옵션 번역
  options: {
    // 기본 옵션
    기본: {
      ko: "기본",
      en: "Default",
      jp: "デフォルト",
    },

    // 머리 옵션들
    머리1: {
      ko: "머리1",
      en: "Head 1",
      jp: "頭1",
    },
    머리2: {
      ko: "머리2",
      en: "Head 2",
      jp: "頭2",
    },
    머리3: {
      ko: "머리3",
      en: "Head 3",
      jp: "頭3",
    },
    머리4: {
      ko: "머리4",
      en: "Head 4",
      jp: "頭4",
    },

    // 상의 옵션들
    상의1: {
      ko: "상의1",
      en: "Top 1",
      jp: "上着1",
    },
    상의2: {
      ko: "상의2",
      en: "Top 2",
      jp: "上着2",
    },
    상의3: {
      ko: "상의3",
      en: "Top 3",
      jp: "上着3",
    },
    상의4: {
      ko: "상의4",
      en: "Top 4",
      jp: "上着4",
    },

    // 하의 옵션들
    하의1: {
      ko: "하의1",
      en: "Bottom 1",
      jp: "下着1",
    },
    하의2: {
      ko: "하의2",
      en: "Bottom 2",
      jp: "下着2",
    },
    하의3: {
      ko: "하의3",
      en: "Bottom 3",
      jp: "下着3",
    },
    하의4: {
      ko: "하의4",
      en: "Bottom 4",
      jp: "下着4",
    },

    // 신발 옵션들
    신발1: {
      ko: "신발1",
      en: "Shoes 1",
      jp: "靴1",
    },
    신발2: {
      ko: "신발2",
      en: "Shoes 2",
      jp: "靴2",
    },
    신발3: {
      ko: "신발3",
      en: "Shoes 3",
      jp: "靴3",
    },
    신발4: {
      ko: "신발4",
      en: "Shoes 4",
      jp: "靴4",
    },
  },

  // 플레이스홀더 번역
  placeholder: {
    체력: {
      ko: "1~100중에 적어주세요.",
      en: "Please enter a value between 1 and 100.",
      jp: "1~100の間で入力してください。",
    },
    마력: {
      ko: "1~100중에 적어주세요.",
      en: "Please enter a value between 1 and 100.",
      jp: "1~100の間で入力してください。",
    },
    무게: {
      ko: "몸무게를 입력해주세요.",
      en: "Please enter your weight.",
      jp: "体重を入力してください。",
    },
    키: {
      ko: "키를 입력해주세요.",
      en: "Please enter your height.",
      jp: "身長を入力してください。",
    },
    IQ: {
      ko: "IQ를 입력해주세요.",
      en: "Please enter your IQ.",
      jp: "IQを入力してください。",
    },
  },

  // UI 텍스트 번역
  ui: {
    header: {
      ko: "커스터마이징",
      en: "Customizing",
      jp: "カスタマイズ",
    },
    save: {
      ko: "저장",
      en: "Save",
      jp: "保存",
    },
    reset: {
      ko: "초기화",
      en: "Reset",
      jp: "リセット",
    },
    select: {
      ko: "선택",
      en: "Select",
      jp: "選択",
    },
  },
};

// 타입 정의
export type Language = "ko" | "en" | "jp";
export type CustomizeTranslationType = typeof customizeTranslations;
