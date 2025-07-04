"use client";

import Image from "next/image";
import { useAvatarMove } from "@/hooks/useAvatarMove";

const CharacterPage = () => {
  const { pos, GRID_WIDTH, GRID_HEIGHT } = useAvatarMove();

  // 아바타 크기: 모바일/태블릿/PC별로 다르게
  const AVATAR_SIZE_MOBILE = 64;
  const AVATAR_SIZE_PC = 112;

  // 반응형 아바타 크기 계산 (Tailwind로도 처리, style로도 보정)
  const getAvatarSize = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth >= 1024) return AVATAR_SIZE_PC; // lg
      return AVATAR_SIZE_MOBILE;
    }
    return AVATAR_SIZE_MOBILE;
  };

  // 위치 계산 (비율 기반)
  const avatarSize = getAvatarSize();
  const left = `calc(${(pos.x / GRID_WIDTH) * 100}% - ${avatarSize / 2}px)`;
  const top = `calc(${(pos.y / GRID_HEIGHT) * 100}% - ${avatarSize}px)`;

  return (
    <div className="w-screen h-screen bg-[var(--gray-2)] flex items-center justify-center">
      <div className="relative bg-[var(--black)] flex items-center justify-center w-full h-full">
        <div
          className="
            relative
            aspect-[3/4] md:aspect-[16/9]
            w-full max-w-[1200px]
            max-h-[90vh] min-w-[200px] md:min-w-[320px]
            min-h-[180px] bg-cover bg-center
          "
          style={{
            backgroundImage: "url('/img/bg-map.png')",
          }}
        >
          {/* 캐릭터 정보 패널 */}
          <div className="absolute top-0 right-0 z-20 bg-black/50 rounded-[6px] px-2 py-2 text-white">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[10px] font-medium">Lv.1</span>
              <span className="text-[10px] font-medium mr-8">
                나만의게임캐릭터
              </span>
            </div>
            <div className="flex items-center mb-0.5 text-[10px]">
              <span className="flex items-center border-1 border-black justify-center font-bold  h-[15px] bg-black/80 rounded-l-[4px] rounded-r-[6px] px-[7px] ">
                HP
              </span>
              <div
                className="h-[15px] w-[129px] rounded-r-[6px]"
                style={{ background: "var(--gradient-orange)" }}
              />
              <span>100/100</span>
            </div>
            <div className="flex items-center mb-0.5 text-[10px]">
              <span className="flex items-center border-1 border-black justify-center font-bold  h-[15px] bg-black/80 rounded-l-[4px] rounded-r-[6px] px-[7px] ">
                HP
              </span>
              <div
                className="h-[15px] w-[129px] rounded-r-[6px]"
                style={{ background: "var(--gradient-purple)" }}
              />
              <span>100/100</span>
            </div>
            <div className="flex flex-col flex-wrap items-end pr-4 gap-y-0.1 text-[9px]">
              <div>
                WEIGHT <span className="ml-2">80</span>
              </div>
              <div>
                HIGHT <span className="ml-2">177</span>
              </div>
              <div>
                I.Q <span className="ml-2">124</span>
              </div>
              <div>
                MBTI <span className="ml-2">INTP</span>
              </div>
            </div>
          </div>
          {/* 아바타 */}
          <div
            className="absolute z-10"
            style={{
              left,
              top,
              width: avatarSize,
              height: avatarSize,
              transition: "left 0.1s, top 0.1s, width 0.2s, height 0.2s",
            }}
          >
            <Image
              src="/img/npc1.png"
              alt="아바타"
              width={avatarSize}
              height={avatarSize}
              className="object-contain drop-shadow-lg w-16 h-16 md:w-24 md:h-24 lg:w-28 lg:h-28"
              draggable={false}
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterPage;
