import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";

const cairo = Cairo({
  weight: ["300", "400", "600", "700", "800", "900"],
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
});

export const metadata: Metadata = {
  title: {
    default: "الجمعية المصرية لدرء المخاطر",
    template: "%s | الجمعية المصرية لدرء المخاطر",
  },
  description:
    "جمعية خدمية رسالتها نشر ثقافة الأمان وإبراز مكامن الخطر المصاحبة للأنشطة الحياتية من أجل حياة آمنة للمجتمع",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${cairo.className} ${cairo.variable} antialiased`}>{children}</body>
    </html>
  );
}
