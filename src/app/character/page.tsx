"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useAvatarMove } from "@/hooks/useAvatarMove";
import { useCharacterStore } from "@/store/characterStore";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCharacterLoading } from "@/hooks/useCharacterLoading";
import { calculateAvatarPosition } from "@/utils/characterUtils";
import { CHARACTER_TRANSLATIONS } from "@/constants/character";
import BlueSpinner from "@/components/lodding/BlueSpinner";
import { BackButton } from "@/components/character/BackButton";
import { CharacterStats } from "@/components/character/CharacterStats";
import { CharacterAvatar } from "@/components/character/CharacterAvatar";
import { GameMap } from "@/components/character/GameMap";

const CharacterPage: React.FC = () => {
  const router = useRouter();
  const { pos, GRID_WIDTH, GRID_HEIGHT } = useAvatarMove();
  const { form } = useCharacterStore();
  const { language } = useLanguage();
  const { loading } = useCharacterLoading();

  // 뒤로가기 핸들러
  const handleGoBack = () => {
    router.push("/main");
  };

  // 아바타 위치 계산
  const avatarPosition = calculateAvatarPosition(pos, GRID_WIDTH, GRID_HEIGHT);

  // 로딩 화면
  if (loading) {
    return (
      <div className="bg-black w-screen h-screen flex items-center justify-center">
        <BlueSpinner text={CHARACTER_TRANSLATIONS.loading[language]} />
      </div>
    );
  }

  return (
    <div className="w-screen h-screen bg-gray-2 flex items-center justify-center">
      <div className="relative bg-black flex items-center justify-center w-full h-full">
        <GameMap>
          <BackButton onClick={handleGoBack} />
          <CharacterStats form={form} language={language} />
          <CharacterAvatar style={avatarPosition} />
        </GameMap>
      </div>
    </div>
  );
};

export default CharacterPage;
