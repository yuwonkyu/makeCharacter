import { create } from "zustand";

export type CharacterForm = {
  머리: string;
  몸통: string;
  다리: string;
  신발: string;
  체력: string;
  마력: string;
  무게: string;
  키: string;
  IQ: string;
  MBTI: string;
};

interface CharacterStore {
  form: CharacterForm;
  setForm: (form: CharacterForm) => void;
  updateField: (key: keyof CharacterForm, value: string) => void;
  resetForm: () => void;
  loadFromStorage: () => void;
  saveToStorage: () => void;
}

const initialForm: CharacterForm = {
  머리: "기본",
  몸통: "기본",
  다리: "기본",
  신발: "기본",
  체력: "",
  마력: "",
  무게: "",
  키: "",
  IQ: "",
  MBTI: "",
};

// 로컬 스토리지에서 데이터 불러오기
const loadCharacterFromStorage = (): CharacterForm => {
  if (typeof window === "undefined") return initialForm;

  try {
    const saved = localStorage.getItem("characterData");
    if (saved) {
      const parsed = JSON.parse(saved);
      // 모든 필수 필드가 있는지 확인하고 병합
      return { ...initialForm, ...parsed };
    }
  } catch (error) {
    console.error("Failed to load character data from storage:", error);
  }
  return initialForm;
};

export const useCharacterStore = create<CharacterStore>((set, get) => ({
  form: initialForm,
  setForm: (form) => set({ form }),
  updateField: (key, value) =>
    set((state) => ({
      form: { ...state.form, [key]: value },
    })),
  resetForm: () => set({ form: initialForm }),
  loadFromStorage: () => {
    const savedForm = loadCharacterFromStorage();
    set({ form: savedForm });
  },
  saveToStorage: () => {
    try {
      const { form } = get();
      localStorage.setItem("characterData", JSON.stringify(form));
    } catch (error) {
      console.error("Failed to save character data to storage:", error);
    }
  },
}));
