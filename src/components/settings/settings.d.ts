export type Language = "en" | "ko" | "jp";

export type OptionPanelProps = {
  language: Language;
  setLanguage: (lang: Language) => void;
  color: string;
  setColor: (color: string) => void;
  onSave?: () => void;
  onReset?: () => void;
  onClose?: () => void;
};
