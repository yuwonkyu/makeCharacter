/**
 * CustomizePanelFooter 컴포넌트
 */

import React from "react";
import { customizeTranslations } from "./translations";

interface CustomizePanelFooterProps {
  language: "en" | "ko" | "jp";
  onSave: () => void;
  onReset: () => void;
}

export const CustomizePanelFooter: React.FC<CustomizePanelFooterProps> = ({
  language,
  onSave,
  onReset,
}) => {
  return (
    <div className="flex justify-center gap-6 px-8 py-4 rounded-b-xl border-t border-blue-3 bg-gradient-blue-custom">
      <button
        className="w-32 py-2 rounded bg-gradient-blue-custom text-gray-1 font-bold border border-blue-3 shadow hover:shadow-lg transition-shadow"
        onClick={onSave}
      >
        {customizeTranslations.ui.save[language]}
      </button>
      <button
        className="w-32 py-2 rounded bg-gradient-blue-custom text-gray-1 font-bold border border-blue-3 shadow hover:shadow-lg transition-shadow"
        onClick={onReset}
      >
        {customizeTranslations.ui.reset[language]}
      </button>
    </div>
  );
};
