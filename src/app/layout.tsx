import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { Analytics } from "@vercel/analytics/next";

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
  metadataBase: new URL("https://make-character-0001.vercel.app"),
  openGraph: {
    title: "나만의 게임 케릭터",
    description:
      "나만의 게임 케릭터를 생성합니다. 이 앱은 다양한 언어를 지원하며, 사용자 설정을 저장하고 불러올 수 있습니다.",
    url: "/",
    siteName: "나만의 게임 케릭터",
    images: [
      {
        url: "/img/open.png",
        width: 1200,
        height: 630,
        alt: "나만의 게임 케릭터 - 캐릭터 커스터마이징 사이트",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "나만의 게임 케릭터",
    description:
      "나만의 게임 케릭터를 생성합니다. 이 앱은 다양한 언어를 지원하며, 사용자 설정을 저장하고 불러올 수 있습니다.",
    images: ["/img/open.png"],
    creator: "@yuwonkyu",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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
        <link rel="apple-touch-icon" href="/img/victor-fa.png" />
        <link rel="canonical" href="https://make-character-0001.vercel.app/" />
        <meta name="theme-color" content="#667eea" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <LanguageProvider>{children}</LanguageProvider>
        <Analytics />
      </body>
    </html>
  );
}
