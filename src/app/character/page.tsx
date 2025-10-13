"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAvatarMove } from "@/hooks/useAvatarMove";
import { useCharacterStore } from "@/store/characterStore";
import { useEffect, useState } from "react";
import BlueSpinner from "@/components/lodding/BlueSpinner";
import { useLanguage } from "@/contexts/LanguageContext";
import CharacterRenderer from "@/components/character/CharacterRenderer";

const CharacterPage = () => {
  const router = useRouter();
  const { pos, GRID_WIDTH, GRID_HEIGHT } = useAvatarMove();
  const { form, loadFromStorage } = useCharacterStore();
  const [loading, setLoading] = useState(true);
  const { language } = useLanguage();

  const TEXT = {
    loading: {
      en: "Loading character...",
      ko: "캐릭터 불러오는 중...",
      jp: "キャラクターを読み込み中...",
    },
  };

  // 뒤로가기 핸들러
  const handleGoBack = () => {
    router.push("/main");
  };

  useEffect(() => {
    // 저장된 캐릭터 데이터 불러오기
    loadFromStorage();

    // 예시: 1초 후 로딩 해제 (실제 fetch 등과 연동 가능)
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, [loadFromStorage]);

  // 아바타 크기: PC 크기로 고정
  const AVATAR_SIZE = 112;

  // 위치 계산 (비율 기반)
  const avatarSize = AVATAR_SIZE;
  const left = `calc(${(pos.x / GRID_WIDTH) * 100}% - ${avatarSize / 2}px)`;
  const top = `calc(${(pos.y / GRID_HEIGHT) * 100}% - ${avatarSize}px)`;

  if (loading)
    return (
      <div className="bg-black w-screen h-screen flex items-center justify-center">
        <BlueSpinner text={TEXT.loading[language]} />
      </div>
    );

  return (
    <div className="w-screen h-screen bg-gray-2 flex items-center justify-center">
      <div className="relative bg-black flex items-center justify-center w-full h-full">
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
          {/* 뒤로가기 버튼 */}
          <button
            onClick={handleGoBack}
            className="
              absolute top-4 left-4 z-30 
              w-12 h-12 
              bg-gradient-blue-custom
              hover:bg-blue-1
              rounded-full 
              flex items-center justify-center 
              transition-all duration-200 
              text-gray-1 font-bold border border-gray-1 cursor-pointer shadow-md
              hover:shadow-lg
              transform hover:scale-105
            "
            aria-label="뒤로가기"
          >
            <Image
              src="/icon/back.svg"
              alt="뒤로가기"
              width={20}
              height={20}
              className="filter brightness-0 saturate-100"
              style={{
                filter:
                  "invert(26%) sepia(16%) saturate(1003%) hue-rotate(173deg) brightness(93%) contrast(86%)",
              }}
            />
          </button>
          {/* 캐릭터 정보 패널 */}
          <div className="absolute top-0 right-0 z-20 bg-black/70 rounded-[6px] px-2 py-2 text-white">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[10px] font-medium">Lv.1</span>
              <span className="text-[10px] font-medium mr-8">
                나만의게임캐릭터
              </span>
            </div>
            <div className="flex items-center mb-0.5 text-[10px]">
              <span className="flex items-center border border-black justify-center font-bold h-[15px] bg-black/90 rounded-l-[4px] rounded-r-[6px] px-[7px] w-[35px]">
                HP
              </span>
              <div className="h-[15px] w-[129px] rounded-r-[6px] bg-gray-4/40 overflow-hidden flex items-center mr-2">
                <div
                  className="h-full bg-gradient-orange-custom rounded-r-[6px] transition-all duration-300"
                  style={{
                    width: `${Math.max(
                      0,
                      Math.min(100, Number(form["체력"]) || 100)
                    )}%`,
                  }}
                />
              </div>
              <span>{form["체력"] || "100"}/100</span>
            </div>
            <div className="flex items-center mb-0.5 text-[10px]">
              <span className="flex items-center border border-black justify-center font-bold h-[15px] bg-black/90 rounded-l-[4px] rounded-r-[6px] px-[7px] w-[35px]">
                MP
              </span>
              <div className="h-[15px] w-[129px] rounded-r-[6px] bg-gray-4/40 overflow-hidden flex items-center mr-2">
                <div
                  className="h-full bg-gradient-purple-custom rounded-r-[6px] transition-all duration-300"
                  style={{
                    width: `${Math.max(
                      0,
                      Math.min(100, Number(form["마력"]) || 100)
                    )}%`,
                  }}
                />
              </div>
              <span>{form["마력"] || "100"}/100</span>
            </div>
            <div className="flex flex-col flex-wrap items-end pr-4 gap-y-0.1 text-[9px]">
              <div>
                WEIGHT <span className="ml-2">{form["무게"] || "80"}</span>
              </div>
              <div>
                HEIGHT <span className="ml-2">{form["키"] || "177"}</span>
              </div>
              <div>
                I.Q <span className="ml-2">{form["IQ"] || "124"}</span>
              </div>
              <div>
                MBTI <span className="ml-2">{form["MBTI"] || "INTP"}</span>
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
              transition: "left 0.1s, top 0.1s",
            }}
          >
            <CharacterRenderer
              width={avatarSize}
              height={avatarSize}
              className="object-contain drop-shadow-lg w-28 h-28"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterPage;
