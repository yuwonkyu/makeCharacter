import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";

export const metadata: Metadata = {
  title: "나만의 게임 케릭터",
  description:
    "나만의 게임 케릭터를 생성합니다. 이 앱은 다양한 언어를 지원하며, 사용자 설정을 저장하고 불러올 수 있습니다.",
  keywords: [
    "게임 케릭터",
    "캐릭터 생성",
    "다국어 지원",
    "사용자 설정",
    "Next.js",
  ],
  authors: [
    { name: "유원규", url: "https://github.com/yuwonkyu/makeCharacter" },
  ],
  creator: "유원규",
  publisher: "유원규",
  openGraph: {
    title: "나만의 게임 케릭터",
    description:
      "나만의 게임 케릭터를 생성합니다. 이 앱은 다양한 언어를 지원하며, 사용자 설정을 저장하고 불러올 수 있습니다.",
    url: "https://make-character-0001.vercel.app/",
    siteName: "나만의 게임 케릭터",
    images: [
      {
        url: "https://make-character-0001.vercel.app/open.png",
        width: 1200,
        height: 630,
        alt: "나만의 게임 케릭터 OG 이미지",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link rel="icon" href="/img/victor-fa.png" type="image/png" />
      </head>
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
