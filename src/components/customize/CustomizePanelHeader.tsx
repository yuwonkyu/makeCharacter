/**
 * CustomizePanelHeader 컴포넌트
 */

import React from "react";
import Image from "next/image";
import { customizeTranslations } from "./translations";

interface CustomizePanelHeaderProps {
  language: "en" | "ko" | "jp";
  onClose: () => void;
}

export const CustomizePanelHeader: React.FC<CustomizePanelHeaderProps> = ({
  language,
  onClose,
}) => {
  return (
    <div className="flex items-center justify-between px-6 py-3 border-b border-blue-3 rounded-t-xl bg-gradient-blue-custom relative">
      <span className="text-xl font-bold text-gray-1 mx-auto">
        {customizeTranslations.ui.header[language]}
      </span>
      <button
        className="absolute right-3 top-3 size-6 flex items-center justify-center bg-transparent"
        style={{ border: "none", boxShadow: "none" }}
        onClick={onClose}
        aria-label="닫기"
        type="button"
      >
        <Image
          src="/icon/cancel.svg"
          alt="닫기"
          width={24}
          height={24}
          className="size-6 cursor-pointer"
        />
      </button>
    </div>
  );
};
