import { db } from "@/lib/db";
import { getSettings } from "@/lib/settings";
import PageHeader from "@/components/PageHeader";

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
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {board.map((m) => (
              <div key={m.id} className="card p-6 text-center">
                {m.photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={m.photo}
                    alt={m.name}
                    className="mx-auto mb-4 h-28 w-28 rounded-full border-4 border-navy-100 object-cover"
                  />
                ) : (
                  <div className="mx-auto mb-4 flex h-28 w-28 items-center justify-center rounded-full border-4 border-navy-100 bg-navy-800 text-4xl text-white">
                    👤
                  </div>
                )}
                <h3 className="font-extrabold leading-7 text-navy-900">{m.name}</h3>
                <div className="mt-1 text-sm font-bold text-accent-dark">{m.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Committees */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="section-title">لجان الجمعية</h2>
        <p className="mb-6 text-slate-600">يساعد مجلس إدارة الجمعية عدد من أعضاء الجمعية في اللجان الآتية:</p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {committees.map((c) => (
            <div key={c.id} className="rounded-xl border-r-4 border-accent bg-navy-50 px-5 py-4 font-extrabold text-navy-900">
              {c.name}
            </div>
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
