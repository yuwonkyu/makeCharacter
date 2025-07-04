import Image from "next/image";

export default function Landing() {
  return (
    <div className="relative min-h-screen w-full">
      {/* 배경 이미지 */}
      <Image
        src="/img/bg-summer.png"
        alt="배경"
        fill
        style={{ objectFit: "cover" }}
        className="z-0"
        priority
      />
      {/* 반응형 Home 버튼 */}
      <button
        className="z-10 absolute left-1/2 bottom-8 -translate-x-1/2 px-8 py-4 rounded-[16px] text-2xl font-bold shadow-lg
          md:top-6 md:right-6 md:left-auto md:bottom-auto md:-translate-x-0 md:text-base md:px-6 md:py-2"
        style={{
          background: "var(--gradient-blue)",
          color: "var(--foreground)",
          border: "none",
        }}
      >
        Home
      </button>
    </div>
  );
}
