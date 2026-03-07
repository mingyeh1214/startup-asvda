import type { Metadata } from "next";
import { Inter, Noto_Sans_TC } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const notoSansTC = Noto_Sans_TC({
  variable: "--font-noto-sans-tc",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "國高中數學學習現況調查",
  description: "花 5 分鐘填寫問卷，幫助我們了解國高中生的數學學習需求",
  openGraph: {
    title: "國高中數學學習現況調查",
    description: "花 5 分鐘填寫問卷，幫助我們了解國高中生的數學學習需求",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hant-TW">
      <body className={`${inter.variable} ${notoSansTC.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
