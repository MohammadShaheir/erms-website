import Link from "next/link";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [news, conferences, courses, programs, journal, board, messages, unread] = await Promise.all([
    db.news.count(),
    db.conference.count(),
    db.course.count(),
    db.program.count(),
    db.journalIssue.count(),
    db.boardMember.count(),
    db.contactMessage.count(),
    db.contactMessage.count({ where: { read: false } }),
  ]);

  const cards = [
    { label: "الأخبار", count: news, href: "/admin/news", icon: "📰" },
    { label: "المؤتمرات", count: conferences, href: "/admin/conferences", icon: "🎤" },
    { label: "الدورات التدريبية", count: courses, href: "/admin/courses", icon: "🎓" },
    { label: "البرامج الدراسية", count: programs, href: "/admin/programs", icon: "📚" },
    { label: "أعداد المجلة", count: journal, href: "/admin/journal", icon: "📖" },
    { label: "أعضاء مجلس الإدارة", count: board, href: "/admin/board", icon: "👥" },
    { label: "الرسائل", count: messages, href: "/admin/messages", icon: "✉️", badge: unread },
  ];

  return (
    <div>
      <h1 className="mb-8 text-2xl font-extrabold text-navy-900">مرحبًا بك في لوحة التحكم</h1>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {cards.map((c) => (
          <Link key={c.href} href={c.href} className="card relative p-6 hover:border-navy-600">
            <div className="mb-3 text-3xl">{c.icon}</div>
            <div className="text-3xl font-extrabold text-navy-900">{c.count}</div>
            <div className="mt-1 font-bold text-slate-500">{c.label}</div>
            {c.badge ? (
              <span className="absolute left-4 top-4 rounded-full bg-accent px-2.5 py-1 text-xs font-extrabold text-navy-900">
                {c.badge} جديدة
              </span>
            ) : null}
          </Link>
        ))}
      </div>
    </div>
  );
}
