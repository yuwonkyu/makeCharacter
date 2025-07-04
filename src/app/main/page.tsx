"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function MainPage() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen flex flex-col items-center">
      {/* 배경 이미지 */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Image
          src="/img/bg-summer.png"
          alt="메인 배경"
          fill
          className="object-cover"
          priority
          draggable={false}
        />
        {/* 검은색 반투명 오버레이 */}
        <div className="absolute inset-0 bg-black/50 z-10" />
      </div>
      {/* 메뉴 박스 */}
      <div className="relative z-20 flex flex-1 items-center justify-center w-full">
        <div
          className="
            rounded-2xl shadow-2xl border-2 border-[var(--accent-1)]
            p-6 mt-auto mb-[10vh]            
            flex flex-col items-center
          "
          style={{ background: "var(--gradient-blue)" }}
        >
          <div className="p-0.1 flex flex-col gap-0.5 items-center border-2 border-[var(--blue-1)] rounded-[6px] bg-[var(--blue-1)] ">
            <button
              className="
                w-full
                px-9 py-1 md:px-10 md:py-2
                shadow-[2px_4px_8px_0_rgba(64,100,133,0.15)]
                text-xl font-bold md:text-2xl
                rounded-[6px] transition-all
                hover:scale-[1.03] hover:shadow-lg focus:outline-none
              "
              style={{ background: "var(--gradient-blue)" }}
              onClick={() => router.push("/character")}
            >
              Character
            </button>
            <button
              className="
                w-full
                px-9 py-1 md:px-10 md:py-2
                shadow-[2px_4px_8px_0_rgba(64,100,133,0.15)]
                text-xl font-bold md:text-2xl
                rounded-[6px] transition-all
                hover:scale-[1.03] hover:shadow-lg focus:outline-none
              "
              style={{ background: "var(--gradient-blue)" }}
              onClick={() => router.push("/customize")}
            >
              Customizing
            </button>
            <button
              className="
                w-full
                px-9 py-1 md:px-10 md:py-2
                shadow-[2px_4px_8px_0_rgba(64,100,133,0.15)]
                text-xl font-bold md:text-2xl
                rounded-[6px] transition-all
                hover:scale-[1.03] hover:shadow-lg focus:outline-none
              "
              style={{ background: "var(--gradient-blue)" }}
              onClick={() => router.push("/settings")}
            >
              Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
