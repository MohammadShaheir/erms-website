import { db } from "@/lib/db";
import PageHeader from "@/components/PageHeader";

export const dynamic = "force-dynamic";
export const metadata = { title: "التدريب" };

export default async function TrainingPage() {
  const courses = await db.course.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
  });

  return (
    <>
      <PageHeader title="الدورات التدريبية" subtitle="برامج تدريبية متخصصة في السلامة ودرء المخاطر" />
      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((c) => (
            <div key={c.id} className="card flex flex-col">
              {c.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={c.image} alt={c.title} className="h-44 w-full object-cover" />
              )}
              <div className="flex flex-1 flex-col p-5">
                <span className="mb-2 self-start rounded-full bg-accent/15 px-3 py-1 text-xs font-bold text-accent-dark">
                  {c.category}
                </span>
                <h2 className="mb-2 text-lg font-extrabold text-navy-900">{c.title}</h2>
                <p className="flex-1 text-sm leading-7 text-slate-600">{c.description}</p>
                {c.duration && <div className="mt-3 text-xs font-bold text-slate-500">⏱ المدة: {c.duration}</div>}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 rounded-xl bg-navy-50 p-8 text-center">
          <h3 className="mb-2 text-xl font-extrabold text-navy-900">هل تريد التسجيل في إحدى الدورات؟</h3>
          <p className="mb-5 text-slate-600">تواصل معنا وسنرد عليك بكل التفاصيل</p>
          <a href="/contact" className="btn-primary">اتصل بنا</a>
        </div>
      </section>
    </>
  );
}
