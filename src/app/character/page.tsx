import Image from "next/image";

const CharacterPage = () => {
  return (
    <div className="w-screen h-screen bg-black flex items-center justify-center">
      {/* 검은 배경 + 맵 중앙 정렬 */}
      <div className="relative bg-black flex items-center justify-center size-full">
        {/* 맵 영역 (반응형, 16:9 비율 유지) */}
        <div
          className="relative aspect-[16/20] md:aspect-[16/9] w-full bg-cover bg-center"
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
          <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
            <Image
              src="/img/npc1.png"
              alt="아바타"
              width={96}
              height={96}
              className="object-contain drop-shadow-lg"
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
