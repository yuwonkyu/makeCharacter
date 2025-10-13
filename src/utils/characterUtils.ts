/**
 * 캐릭터 위치 계산 유틸리티
 */

import { CHARACTER_CONFIG } from "@/constants/character";

interface Position {
  x: number;
  y: number;
}

interface PositionStyles {
  left: string;
  top: string;
  width: number;
  height: number;
}

/**
 * 아바타 위치 스타일 계산
 */
export function calculateAvatarPosition(
  pos: Position,
  gridWidth: number,
  gridHeight: number
): PositionStyles {
  const { AVATAR_SIZE } = CHARACTER_CONFIG;

  return {
    left: `calc(${(pos.x / gridWidth) * 100}% - ${AVATAR_SIZE / 2}px)`,
    top: `calc(${(pos.y / gridHeight) * 100}% - ${AVATAR_SIZE}px)`,
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
  };
}
