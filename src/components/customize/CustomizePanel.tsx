"use client";

import React, { useMemo } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { usePartOptions } from "@/hooks/usePartOptions";
import { createCategoryList } from "@/utils/categoryUtils";
import CharacterRenderer from "@/components/character/CharacterRenderer";
import { CustomizePanelHeader } from "./CustomizePanelHeader";
import { CustomizePanelFooter } from "./CustomizePanelFooter";
import { CategoryRow } from "./CategoryRow";

interface CustomizePanelProps {
  onClose: () => void;
  onSave: () => void;
  onReset: () => void;
}

const CustomizePanel: React.FC<CustomizePanelProps> = ({
  onClose,
  onSave,
  onReset,
}) => {
  const { language } = useLanguage();
  const { partOptions } = usePartOptions();

  // 카테고리 목록을 partOptions 기반으로 생성
  const categoryList = useMemo(
    () => createCategoryList(partOptions),
    [partOptions]
  );

  return (
    <div className="relative z-10 w-[1000px] max-w-full rounded-xl border border-blue-3 shadow-2xl mx-auto flex flex-col bg-gradient-blue-custom">
      <CustomizePanelHeader language={language} onClose={onClose} />

      {/* 본문 */}
      <div className="flex flex-row w-full h-[480px] bg-white py-70">
        {/* 왼쪽: 캐릭터 미리보기 */}
        <div className="flex-1 flex items-center justify-center">
          <div className="relative w-28 h-28">
            <CharacterRenderer
              width={112}
              height={112}
              className="object-contain drop-shadow-lg w-28 h-28"
              priority
              showBase={true}
            />
          </div>
        </div>

        {/* 오른쪽: 카테고리/입력 */}
        <div className="flex-1 flex flex-col justify-center gap-3 px-8 py-6">
          {categoryList.map((category) => (
            <CategoryRow
              key={category.label}
              category={category}
              language={language}
              partOptions={partOptions}
            />
          ))}
        </div>
      </div>

      <CustomizePanelFooter
        language={language}
        onSave={onSave}
        onReset={onReset}
      />
    </div>
  );
};

export default CustomizePanel;
