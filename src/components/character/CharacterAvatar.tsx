/**
 * 캐릭터 아바타 표시 컴포넌트
 */

import React from "react";
import CharacterRenderer from "./CharacterRenderer";
import { CHARACTER_CONFIG } from "@/constants/character";

interface CharacterAvatarProps {
  style: {
    left: string;
    top: string;
    width: number;
    height: number;
  };
}

export const CharacterAvatar: React.FC<CharacterAvatarProps> = ({ style }) => {
  const { AVATAR_SIZE } = CHARACTER_CONFIG;

  return (
    <div
      className="absolute z-10"
      style={{
        ...style,
        transition: "left 0.1s, top 0.1s",
      }}
    >
      <CharacterRenderer
        width={AVATAR_SIZE}
        height={AVATAR_SIZE}
        className="object-contain drop-shadow-lg w-28 h-28"
        priority
      />
    </div>
  );
};
