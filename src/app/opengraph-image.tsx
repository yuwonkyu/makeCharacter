import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "나만의 게임 케릭터";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 48,
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          flexDirection: "column",
        }}
      >
        <div style={{ marginBottom: 20 }}>🎮</div>
        <div style={{ textAlign: "center" }}>나만의 게임 케릭터</div>
        <div
          style={{
            fontSize: 24,
            marginTop: 20,
            textAlign: "center",
            opacity: 0.9,
          }}
        >
          캐릭터를 커스터마이징하고 나만의 아바타를 만들어보세요
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
