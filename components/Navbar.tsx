"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/", label: "الرئيسية" },
  { href: "/about", label: "من نحن" },
  { href: "/conferences", label: "المؤتمرات" },
  { href: "/news", label: "الأخبار" },
  { href: "/journal", label: "المجلة" },
  { href: "/training", label: "التدريب" },
  { href: "/programs", label: "البرامج الدراسية" },
  { href: "/contact", label: "اتصل بنا" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-navy-900/95 shadow-lg backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/img/logo.png" alt="شعار الجمعية" className="h-11 w-11 object-contain" />
          <div className="leading-tight">
            <div className="text-lg font-extrabold text-white">الجمعية المصرية لدرء المخاطر</div>
            <div className="text-xs text-navy-200">Egyptian Risk Mitigation Society</div>
          </div>
        </Link>

        <button
          className="rounded-lg p-2 text-white lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label="القائمة"
        >
          <svg className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`nav-link rounded-lg px-3 py-2 text-sm font-bold transition ${
                pathname === l.href
                  ? "bg-accent text-navy-900"
                  : "text-white hover:bg-white/10"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>

      {open && (
        <nav className="border-t border-white/10 px-4 pb-4 lg:hidden">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`mt-2 block rounded-lg px-4 py-2.5 font-bold ${
                pathname === l.href ? "bg-accent text-navy-900" : "text-white hover:bg-white/10"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
