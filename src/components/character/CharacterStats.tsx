/**
 * 캐릭터 스탯 표시 컴포넌트
 */

import React from "react";
import type { CharacterForm } from "@/store/characterStore";
import {
  CHARACTER_TRANSLATIONS,
  DEFAULT_CHARACTER_STATS,
} from "@/constants/character";

interface CharacterStatsProps {
  form: CharacterForm;
  language: "en" | "ko" | "jp";
}

interface StatBarProps {
  label: string;
  current: number;
  max: number;
  gradientClass: string;
}

const StatBar: React.FC<StatBarProps> = ({
  label,
  current,
  max,
  gradientClass,
}) => {
  const percentage = Math.max(0, Math.min(100, (current / max) * 100));

  return (
    <div className="flex items-center mb-0.5 text-[10px]">
      <span className="flex items-center border border-black justify-center font-bold h-[15px] bg-black/90 rounded-l-[4px] rounded-r-[6px] px-[7px] w-[35px]">
        {label}
      </span>
      <div className="h-[15px] w-[129px] rounded-r-[6px] bg-gray-4/40 overflow-hidden flex items-center mr-2">
        <div
          className={`h-full ${gradientClass} rounded-r-[6px] transition-all duration-300`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span>
        {current}/{max}
      </span>
    </div>
  );
};

export const CharacterStats: React.FC<CharacterStatsProps> = ({
  form,
  language,
}) => {
  const getStat = (key: keyof typeof DEFAULT_CHARACTER_STATS): string => {
    return form[key] || DEFAULT_CHARACTER_STATS[key];
  };

  return (
    <div className="absolute top-0 right-0 z-20 bg-black/70 rounded-[6px] px-2 py-2 text-white">
      {/* 헤더 */}
      <div className="flex justify-between items-center mb-1">
        <span className="text-[10px] font-medium">
          {CHARACTER_TRANSLATIONS.level[language]}
        </span>
        <span className="text-[10px] font-medium mr-8">
          {CHARACTER_TRANSLATIONS.gameTitle[language]}
        </span>
      </div>

      {/* 체력 바 */}
      <StatBar
        label="HP"
        current={Number(getStat("체력"))}
        max={100}
        gradientClass="bg-gradient-orange-custom"
      />

      {/* 마력 바 */}
      <StatBar
        label="MP"
        current={Number(getStat("마력"))}
        max={100}
        gradientClass="bg-gradient-purple-custom"
      />

      {/* 기타 스탯 */}
      <div className="flex flex-col flex-wrap items-end pr-4 gap-y-0.1 text-[9px]">
        <div>
          WEIGHT <span className="ml-2">{getStat("무게")}</span>
        </div>
        <div>
          HEIGHT <span className="ml-2">{getStat("키")}</span>
        </div>
        <div>
          I.Q <span className="ml-2">{getStat("IQ")}</span>
        </div>
        <div>
          MBTI <span className="ml-2">{getStat("MBTI")}</span>
        </div>
      </div>
    </div>
  );
};
