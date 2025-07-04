"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Landing() {
  const router = useRouter();
  return (
    <div className="relative min-h-screen w-full">
      {/* 배경 이미지 */}
      <Image
        src="/img/bg-summer.png"
        alt="배경"
        fill
        className="z-0 object-cover"
        priority
        draggable={false}
      />
      {/* 반응형 Home 버튼 */}
      <button
        className="z-10 absolute left-1/2 bottom-8 -translate-x-1/2 px-8 py-4 rounded-[16px] text-2xl font-bold shadow-lg border-none
          md:top-10 md:right-10 md:left-auto md:bottom-auto md:-translate-x-0 md:text-3xl md:px-6 md:py-2 text-[var(--gray-1)]
          hover:opacity-90 transition-opacity duration-300 ease-in-out"
        style={{ background: "var(--gradient-blue)" }}
        onClick={() => router.push("/main")}
      >
        Home
      </button>
    </div>
  );
}
