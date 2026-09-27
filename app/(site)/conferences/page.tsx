import { db } from "@/lib/db";
import PageHeader from "@/components/PageHeader";

export const dynamic = "force-dynamic";
export const metadata = { title: "المؤتمرات" };

export default async function ConferencesPage() {
  const conferences = await db.conference.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <PageHeader title="المؤتمرات" subtitle="المؤتمرات والفعاليات العلمية للجمعية" />
      <section className="mx-auto max-w-6xl px-4 py-14">
        {conferences.length === 0 ? (
          <p className="text-center text-slate-500">لا توجد مؤتمرات معلنة حاليًا — تابعونا قريبًا.</p>
        ) : (
          <div className="space-y-6">
            {conferences.map((c) => (
              <div key={c.id} className="card flex flex-col md:flex-row">
                {c.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={c.image} alt={c.title} className="h-52 w-full object-cover md:w-72" />
                )}
                <div className="flex-1 p-6">
                  <h2 className="mb-2 text-xl font-extrabold text-navy-900">{c.title}</h2>
                  <div className="mb-3 flex flex-wrap gap-4 text-sm text-slate-500">
                    {c.location && <span>📍 {c.location}</span>}
                    {c.startDate && (
                      <span>📅 {new Date(c.startDate).toLocaleDateString("ar-EG", { dateStyle: "long" })}</span>
                    )}
                  </div>
                  <p className="prose-ar text-sm text-slate-600">{c.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
