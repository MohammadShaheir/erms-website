import { db } from "@/lib/db";
import { getSettings } from "@/lib/settings";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";

export const dynamic = "force-dynamic";
export const metadata = { title: "من نحن" };

export default async function AboutPage() {
  const [settings, board, committees] = await Promise.all([
    getSettings(),
    db.boardMember.findMany({ orderBy: { order: "asc" } }),
    db.committee.findMany({ orderBy: { order: "asc" } }),
  ]);

  return (
    <>
      <PageHeader title="من نحن" subtitle="تعرف على الجمعية المصرية لدرء المخاطر" />

      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="section-title">نبذة عن الجمعية</h2>
        <p className="prose-ar max-w-4xl text-slate-600">{settings.aboutFull ?? ""}</p>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="card p-6">
            <h3 className="mb-3 text-xl font-extrabold text-navy-900">🎯 أهداف الجمعية</h3>
            <p className="prose-ar text-slate-600">{settings.goals ?? ""}</p>
          </div>
          <div className="card p-6">
            <h3 className="mb-3 text-xl font-extrabold text-navy-900">📋 بيانات الإشهار</h3>
            <ul className="space-y-2 leading-8 text-slate-600">
              <li><b>رقم القيد:</b> {settings.regNumber}</li>
              <li><b>تاريخ الإنشاء:</b> {settings.foundedDate}</li>
              <li><b>الجهة الإدارية:</b> إدارة جنوب الجيزة الاجتماعية (وزارة التضامن الاجتماعي)</li>
              <li><b>المقر:</b> {settings.address}</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Board */}
      <section className="bg-navy-50 py-14">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="section-title">مجلس الإدارة</h2>
          <div className="grid gap-6 pt-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {board.map((m, i) => (
              <Reveal key={m.id} delay={(i % 4) * 100}>
              <div
                className="group relative h-full overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-slate-200 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:ring-accent/40"
              >
                {/* Gradient header band */}
                <div className="relative h-24 bg-gradient-to-l from-navy-900 via-navy-700 to-navy-600">
                  <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_20%_120%,#f59e0b,transparent_50%)]" />
                </div>
                {/* Avatar overlapping the band */}
                <div className="relative z-10 -mt-14 flex justify-center">
                  {m.photo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={m.photo}
                      alt={m.name}
                      className="h-28 w-28 rounded-full object-cover object-top shadow-lg ring-4 ring-white transition group-hover:ring-accent/60"
                    />
                  ) : (
                    <div className="flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-b from-navy-600 to-navy-900 text-4xl text-white shadow-lg ring-4 ring-white transition group-hover:ring-accent/60">
                      👤
                    </div>
                  )}
                </div>
                <div className="px-5 pb-6 pt-4 text-center">
                  <h3 className="min-h-14 font-extrabold leading-7 text-navy-900">{m.name}</h3>
                  <span className="mt-2 inline-block rounded-full bg-accent/15 px-4 py-1 text-sm font-bold text-accent-dark">
                    {m.role}
                  </span>
                </div>
                {/* Bottom accent line */}
                <div className="absolute bottom-0 right-0 h-1 w-0 bg-accent transition-all duration-300 group-hover:w-full" />
              </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Committees */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="section-title">لجان الجمعية</h2>
        <p className="mb-6 text-slate-600">يساعد مجلس إدارة الجمعية عدد من أعضاء الجمعية في اللجان الآتية:</p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {committees.map((c, i) => (
            <Reveal key={c.id} delay={(i % 3) * 100}>
              <div className="rounded-xl border-r-4 border-accent bg-navy-50 px-5 py-4 font-extrabold text-navy-900 transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-md">
                {c.name}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Membership */}
      <section className="bg-navy-900 py-14 text-white">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="mb-8 text-3xl font-extrabold">عضوية الجمعية</h2>
          <p className="mb-6 text-navy-100">يشترط في عضوية الجمعية ما يلي:</p>
          <ol className="max-w-4xl list-decimal space-y-3 pr-6 leading-8 text-navy-100 marker:font-extrabold marker:text-accent">
            {(settings.membership ?? "").split("\n").filter(Boolean).map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
