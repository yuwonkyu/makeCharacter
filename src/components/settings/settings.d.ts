import type { Language } from "@/types/common";

export type { Language };

export interface OptionPanelProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  onSave?: () => void;
  onReset?: () => void;
  onClose?: () => void;
}
