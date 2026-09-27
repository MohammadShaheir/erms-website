import Link from "next/link";
import { db } from "@/lib/db";
import PageHeader from "@/components/PageHeader";

export const dynamic = "force-dynamic";
export const metadata = { title: "الأخبار" };

export default async function NewsPage() {
  const news = await db.news.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <PageHeader title="الأخبار" subtitle="آخر أخبار وأنشطة الجمعية" />
      <section className="mx-auto max-w-6xl px-4 py-14">
        {news.length === 0 ? (
          <p className="text-center text-slate-500">لا توجد أخبار منشورة حاليًا.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {news.map((n) => (
              <Link key={n.id} href={`/news/${n.id}`} className="card group">
                {n.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={n.image} alt={n.title} className="h-48 w-full object-cover" />
                )}
                <div className="p-5">
                  <div className="mb-2 text-xs text-slate-400">
                    {new Date(n.createdAt).toLocaleDateString("ar-EG", { dateStyle: "long" })}
                  </div>
                  <h2 className="mb-2 text-lg font-extrabold text-navy-900 group-hover:text-navy-600">
                    {n.title}
                  </h2>
                  <p className="line-clamp-3 text-sm leading-7 text-slate-600">{n.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
