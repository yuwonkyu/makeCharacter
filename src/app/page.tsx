import Image from "next/image";

export default function Landing() {
  return (
    <div className="relative min-h-screen flex flex-col justify-end items-center">
      {/* 배경 이미지 */}
      <Image
        src="/bg-summer.png"
        alt="배경"
        fill
        style={{ objectFit: "cover" }}
        className="z-0"
        priority
      />
      {/* Home 버튼 */}
      <button
        className="z-10 mb-10 px-8 py-4 rounded-[16px] text-xl font-bold shadow-lg"
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
