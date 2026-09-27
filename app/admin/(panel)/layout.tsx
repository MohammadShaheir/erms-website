import Link from "next/link";
import { requireAdmin, destroySession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

async function logout() {
  "use server";
  await destroySession();
  redirect("/admin/login");
}

const navItems = [
  { href: "/admin", label: "الرئيسية", icon: "🏠" },
  { href: "/admin/news", label: "الأخبار", icon: "📰" },
  { href: "/admin/conferences", label: "المؤتمرات", icon: "🎤" },
  { href: "/admin/courses", label: "الدورات التدريبية", icon: "🎓" },
  { href: "/admin/programs", label: "البرامج الدراسية", icon: "📚" },
  { href: "/admin/journal", label: "المجلة", icon: "📖" },
  { href: "/admin/board", label: "مجلس الإدارة", icon: "👥" },
  { href: "/admin/committees", label: "اللجان", icon: "🗂️" },
  { href: "/admin/messages", label: "الرسائل", icon: "✉️" },
  { href: "/admin/settings", label: "إعدادات الموقع", icon: "⚙️" },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await requireAdmin();
  const unread = await db.contactMessage.count({ where: { read: false } });

  return (
    <div className="flex min-h-screen bg-slate-100">
      <aside className="hidden w-64 shrink-0 flex-col bg-navy-900 text-white md:flex">
        <div className="flex items-center gap-3 border-b border-white/10 px-5 py-5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/img/logo.png" alt="" className="h-10 w-10 object-contain" />
          <div>
            <div className="text-sm font-extrabold">لوحة التحكم</div>
            <div className="text-xs text-navy-200">{session.name}</div>
          </div>
        </div>
        <nav className="flex-1 space-y-1 overflow-y-auto p-3">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-bold text-navy-100 transition hover:bg-white/10 hover:text-white"
            >
              <span>{item.icon}</span>
              <span className="flex-1">{item.label}</span>
              {item.href === "/admin/messages" && unread > 0 && (
                <span className="rounded-full bg-accent px-2 py-0.5 text-xs font-extrabold text-navy-900">
                  {unread}
                </span>
              )}
            </Link>
          ))}
        </nav>
        <div className="border-t border-white/10 p-3">
          <Link
            href="/"
            target="_blank"
            className="mb-1 flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-bold text-navy-100 hover:bg-white/10"
          >
            🌐 <span>عرض الموقع</span>
          </Link>
          <form action={logout}>
            <button className="flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-bold text-red-300 hover:bg-red-500/20">
              🚪 <span>تسجيل الخروج</span>
            </button>
          </form>
        </div>
      </aside>

      <div className="flex-1">
        {/* Mobile top bar */}
        <div className="flex items-center justify-between bg-navy-900 px-4 py-3 text-white md:hidden">
          <span className="font-extrabold">لوحة التحكم</span>
          <form action={logout}>
            <button className="text-sm font-bold text-red-300">تسجيل الخروج</button>
          </form>
        </div>
        <div className="md:hidden overflow-x-auto whitespace-nowrap bg-navy-800 px-2 py-2">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="mx-1 inline-block rounded px-3 py-1.5 text-xs font-bold text-white hover:bg-white/10">
              {item.label}
            </Link>
          ))}
        </div>
        <main className="p-5 md:p-8">{children}</main>
      </div>
    </div>
  );
}
