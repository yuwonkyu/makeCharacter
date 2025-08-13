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

export const useCharacterStore = create<CharacterStore>((set) => ({
  form: initialForm,
  setForm: (form) => set({ form }),
  updateField: (key, value) =>
    set((state) => ({
      form: { ...state.form, [key]: value },
    })),
  resetForm: () => set({ form: initialForm }),
}));
