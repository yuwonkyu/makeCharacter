"use client";
import BgImage from "@/components/common/BgImage";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Landing() {
  const router = useRouter();
  const { language } = useLanguage();

  // 다국어 텍스트 객체
  const START_TEXT = {
    en: "Start",
    ko: "시작하기",
    jp: "スタート",
  };

  return (
    <div className="relative min-h-screen w-full">
      {/* 배경 이미지 */}
      <BgImage src="/img/bg-summer.png" overlay="top-bottom" />

      {/* 반응형 Home 버튼 */}
      <button
        className="z-10 absolute left-1/2 bottom-10 -translate-x-1/2 px-8 py-4 rounded-[16px] text-2xl font-bold shadow-lg border-none
          md:top-10 md:right-10 md:left-auto md:bottom-auto md:-translate-x-0 text-[var(--gray-1)]
          hover:opacity-90 transition-opacity duration-300 ease-in-out"
        style={{ background: "var(--gradient-blue)" }}
        onClick={() => router.push("/main")}
      >
        {START_TEXT[language]}
      </button>
    </div>
  );
}
