import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./direction.css";
import "./refined.css";
import "./experience.css";
import "./polish.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://scalpit-franchise.kohanbin1006.chatgpt.site";
const title = "스칼프잇 가맹모집 | 헤드스파·두피관리 프랜차이즈";
const description = "직영 4곳에서 쌓은 운영 경험, 본사가 직접 실행하는 광고·교육. 스칼프잇이 전국 30개점 한정 가맹 파트너를 모집합니다. 내 지역·예산으로 출점 가능한지 먼저 확인하세요.";

export const viewport: Viewport = { themeColor: "#641522" };

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  openGraph: {
    type: "website", locale: "ko_KR", siteName: "스칼프잇 SCÁLPIT", title, description,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "스칼프잇 가맹 파트너 모집 — 1년 만에, 직영 4개." }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/og.jpg"] },
  icons: {
    icon: "/brand/scalpit-symbol.jpg",
    shortcut: "/brand/scalpit-symbol.jpg",
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
        <link rel="stylesheet" href="/fonts/pretendard/pretendardvariable-dynamic-subset.css" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
