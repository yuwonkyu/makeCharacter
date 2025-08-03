"use client";
import BgImage from "@/components/common/BgImage";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";

export default function MainPage() {
  const router = useRouter();
  const { language } = useLanguage();

  // 다국어 텍스트
  const TEXT = {
    character: {
      en: "Character",
      ko: "캐릭터",
      jp: "キャラクター",
    },
    customizing: {
      en: "Customizing",
      ko: "커스터마이징",
      jp: "カスタマイズ",
    },
    settings: {
      en: "Settings",
      ko: "설정",
      jp: "設定",
    },
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center">
      {/* 배경 이미지 */}
      <BgImage src="/img/bg-summer.png" overlay="full" />
      {/* 메뉴 박스 */}
      <div className="relative z-20 flex flex-1 items-center justify-center w-full ">
        <div
          className="
            rounded-2xl shadow-2xl border-2 border-accent-1
            p-6 mt-auto mb-[10vh]            
            flex flex-col items-center
          bg-gradient-blue-custom
            "
        >
          <div className="p-0.1 flex flex-col gap-0.5 items-center border-2 border-blue-1 rounded-[6px] bg-blue-1">
            <button
              className="
                w-full
                px-9 py-1 md:px-10 md:py-2
                shadow-[2px_4px_8px_0_rgba(64,100,133,0.15)]
                text-xl font-bold md:text-2xl
                rounded-[6px] transition-all
                hover:scale-[1.03] hover:shadow-lg focus:outline-none
                bg-gradient-blue-custom
              "
              onClick={() => router.push("/character")}
            >
              {TEXT.character[language]}
            </button>
            <button
              className="
                w-full
                px-9 py-1 md:px-10 md:py-2
                shadow-[2px_4px_8px_0_rgba(64,100,133,0.15)]
                text-xl font-bold md:text-2xl
                rounded-[6px] transition-all
                hover:scale-[1.03] hover:shadow-lg focus:outline-none
                bg-gradient-blue-custom
              "
              onClick={() => router.push("/customize")}
            >
              {TEXT.customizing[language]}
            </button>
            <button
              className="
                w-full
                px-9 py-1 md:px-10 md:py-2
                shadow-[2px_4px_8px_0_rgba(64,100,133,0.15)]
                text-xl font-bold md:text-2xl
                rounded-[6px] transition-all
                hover:scale-[1.03] hover:shadow-lg focus:outline-none
                bg-gradient-blue-custom
              "
              onClick={() => router.push("/settings")}
            >
              {TEXT.settings[language]}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
