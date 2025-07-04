"use client";

import { useCallback, useEffect, useState } from "react";

// PC(16:9)용
const mapGridPC = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0],
  [0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0],
  [0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
  [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
  [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];
const GRID_WIDTH_PC = 16;
const GRID_HEIGHT_PC = 10;

// 모바일(3:4)용
const mapGridMobile = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0],
  [0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0],
  [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0],
  [0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0],
  [0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];
const GRID_WIDTH_MOBILE = 12;
const GRID_HEIGHT_MOBILE = 16;

export function useAvatarMove(
  initXPC = 8,
  initYPC = 5,
  initXMobile = 6,
  initYMobile = 8
) {
  // 화면 크기에 따라 PC/모바일 구분
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // 좌표 상태
  const [pos, setPos] = useState(() =>
    isMobile ? { x: initXMobile, y: initYMobile } : { x: initXPC, y: initYPC }
  );

  // 화면 크기(isMobile) 변경 시 pos도 초기화
  useEffect(() => {
    setPos(
      isMobile ? { x: initXMobile, y: initYMobile } : { x: initXPC, y: initYPC }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile]);

  // 충돌 체크
  const canMove = useCallback(
    (x: number, y: number) => {
      if (isMobile) {
        return (
          x >= 0 &&
          x < GRID_WIDTH_MOBILE &&
          y >= 0 &&
          y < GRID_HEIGHT_MOBILE &&
          mapGridMobile[y]?.[x] === 1
        );
      } else {
        return (
          x >= 0 &&
          x < GRID_WIDTH_PC &&
          y >= 0 &&
          y < GRID_HEIGHT_PC &&
          mapGridPC[y]?.[x] === 1
        );
      }
    },
    [isMobile]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      let { x, y } = pos;
      if (e.key === "ArrowUp" || e.key === "w" || e.key === "W") y -= 1;
      if (e.key === "ArrowDown" || e.key === "s" || e.key === "S") y += 1;
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") x -= 1;
      if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") x += 1;
      if (canMove(x, y)) setPos({ x, y });
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [pos, canMove]);

  // 현재 적용되는 맵 정보 반환
  return {
    pos,
    GRID_WIDTH: isMobile ? GRID_WIDTH_MOBILE : GRID_WIDTH_PC,
    GRID_HEIGHT: isMobile ? GRID_HEIGHT_MOBILE : GRID_HEIGHT_PC,
    mapGrid: isMobile ? mapGridMobile : mapGridPC,
  };
}
