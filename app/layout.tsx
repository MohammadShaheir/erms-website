import type { Metadata } from "next";
import { Tajawal } from "next/font/google";
import "./globals.css";

const tajawal = Tajawal({
  weight: ["300", "400", "500", "700", "800"],
  subsets: ["arabic", "latin"],
  variable: "--font-tajawal",
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
      <body className={`${tajawal.variable} font-sans antialiased`}>{children}</body>
    </html>
  );
}
