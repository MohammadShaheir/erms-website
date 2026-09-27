import { db } from "@/lib/db";
import PageHeader from "@/components/PageHeader";

export const dynamic = "force-dynamic";
export const metadata = { title: "المجلة العلمية" };

export default async function JournalPage() {
  const issues = await db.journalIssue.findMany({
    where: { published: true },
    orderBy: { date: "desc" },
  });

  return (
    <>
      <PageHeader title="المجلة العلمية" subtitle="إصدارات المجلة العلمية للجمعية" />
      <section className="mx-auto max-w-6xl px-4 py-14">
        {issues.length === 0 ? (
          <p className="text-center text-slate-500">لا توجد أعداد منشورة حاليًا — تابعونا قريبًا.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {issues.map((j) => (
              <div key={j.id} className="card flex flex-col">
                {j.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={j.image} alt={j.title} className="h-48 w-full object-cover" />
                )}
                <div className="flex flex-1 flex-col p-5">
                  <div className="mb-2 text-xs text-slate-400">
                    {new Date(j.date).toLocaleDateString("ar-EG", { dateStyle: "long" })}
                  </div>
                  <h2 className="mb-2 text-lg font-extrabold text-navy-900">{j.title}</h2>
                  <p className="mb-4 flex-1 text-sm leading-7 text-slate-600">{j.description}</p>
                  {j.pdfUrl && (
                    <a href={j.pdfUrl} target="_blank" className="btn-primary text-center text-sm">
                      تحميل العدد (PDF)
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
