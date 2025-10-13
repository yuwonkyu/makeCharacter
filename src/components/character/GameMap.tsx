/**
 * 게임 맵 컨테이너 컴포넌트
 */

import React from "react";
import { CHARACTER_CONFIG } from "@/constants/character";

interface GameMapProps {
  children: React.ReactNode;
}

export const GameMap: React.FC<GameMapProps> = ({ children }) => {
  return (
    <div
      className="
        relative
        aspect-[3/4] md:aspect-[16/9]
        w-full max-w-[1200px]
        max-h-[90vh] min-w-[200px] md:min-w-[320px]
        min-h-[180px] bg-cover bg-center
      "
      style={{
        backgroundImage: `url('${CHARACTER_CONFIG.MAP_BACKGROUND}')`,
      }}
    >
      {children}
    </div>
  );
};
