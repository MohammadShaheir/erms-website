import Link from "next/link";
import { db } from "@/lib/db";
import { getSettings } from "@/lib/settings";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [settings, news, courses, programs] = await Promise.all([
    getSettings(),
    db.news.findMany({ where: { published: true }, orderBy: { createdAt: "desc" }, take: 3 }),
    db.course.findMany({ where: { published: true }, orderBy: { order: "asc" }, take: 6 }),
    db.program.findMany({ where: { published: true } }),
  ]);

  return (
    <>
      {/* Hero */}
      <section
        className="relative bg-navy-900 bg-cover bg-center"
        style={{ backgroundImage: "url(/img/CaFromUp.jpg)" }}
      >
        <div className="absolute inset-0 bg-navy-900/80" />
        <div className="relative mx-auto max-w-6xl px-4 py-28 text-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/img/logo.png" alt="شعار الجمعية" className="mx-auto mb-6 h-24 w-24 object-contain" />
          <h1 className="mb-4 text-4xl font-extrabold leading-tight text-white md:text-5xl">
            {settings.heroTitle ?? "معًا نحو حياة آمنة للمجتمع"}
          </h1>
          <p className="mx-auto mb-8 max-w-3xl text-lg leading-9 text-navy-100">
            {settings.heroSubtitle ?? ""}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/training" className="btn-primary">الدورات التدريبية</Link>
            <Link href="/about" className="btn-outline">تعرف علينا</Link>
          </div>
        </div>
      </section>

      {/* About brief */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <h2 className="section-title">عن الجمعية</h2>
            <p className="prose-ar text-slate-600">{settings.aboutBrief ?? ""}</p>
            <Link href="/about" className="btn-primary mt-6">المزيد عنا ←</Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {/* eslint-disable @next/next/no-img-element */}
            <img src="/img/fire2.jpg" alt="مكافحة الحرائق" className="h-44 w-full rounded-xl object-cover" />
            <img src="/img/training.jpg" alt="تدريب" className="mt-6 h-44 w-full rounded-xl object-cover" />
            <img src="/img/enivornment.jpg" alt="البيئة" className="h-44 w-full rounded-xl object-cover" />
            <img src="/img/child.jpeg" alt="توعية الأطفال" className="mt-6 h-44 w-full rounded-xl object-cover" />
            {/* eslint-enable @next/next/no-img-element */}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-navy-800 py-12">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-4 text-center md:grid-cols-4">
          {[
            ["2011", "سنة التأسيس"],
            ["3880", "رقم الإشهار"],
            ["7", "أعضاء مجلس الإدارة"],
            ["6", "لجان متخصصة"],
          ].map(([num, label]) => (
            <div key={label}>
              <div className="text-4xl font-extrabold text-accent">{num}</div>
              <div className="mt-2 text-sm font-bold text-navy-100">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Programs */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="section-title">البرامج الدراسية</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {programs.map((p) => (
            <Link key={p.id} href={`/programs/${p.slug}`} className="card group flex flex-col">
              {p.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={p.image} alt={p.title} className="h-48 w-full object-cover" />
              )}
              <div className="flex-1 p-6">
                <span className="mb-2 inline-block rounded-full bg-navy-100 px-3 py-1 text-xs font-bold text-navy-800">
                  {p.degree}
                </span>
                <h3 className="mb-2 text-xl font-extrabold text-navy-900 group-hover:text-navy-600">
                  {p.title}
                </h3>
                <p className="line-clamp-3 text-sm leading-7 text-slate-600">{p.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Courses */}
      <section className="bg-navy-50 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="section-title">الدورات التدريبية</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((c) => (
              <div key={c.id} className="card p-6">
                <span className="mb-2 inline-block rounded-full bg-accent/15 px-3 py-1 text-xs font-bold text-accent-dark">
                  {c.category}
                </span>
                <h3 className="mb-2 text-lg font-extrabold text-navy-900">{c.title}</h3>
                <p className="line-clamp-2 text-sm leading-7 text-slate-600">{c.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/training" className="btn-primary">جميع الدورات ←</Link>
          </div>
        </div>
      </section>

      {/* News */}
      {news.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="section-title">آخر الأخبار</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {news.map((n) => (
              <Link key={n.id} href={`/news/${n.id}`} className="card group">
                {n.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={n.image} alt={n.title} className="h-44 w-full object-cover" />
                )}
                <div className="p-5">
                  <div className="mb-2 text-xs text-slate-400">
                    {new Date(n.createdAt).toLocaleDateString("ar-EG", { dateStyle: "long" })}
                  </div>
                  <h3 className="mb-2 font-extrabold text-navy-900 group-hover:text-navy-600">{n.title}</h3>
                  <p className="line-clamp-2 text-sm leading-7 text-slate-600">{n.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
