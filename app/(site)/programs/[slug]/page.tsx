import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import PageHeader from "@/components/PageHeader";

export const dynamic = "force-dynamic";

export default async function ProgramDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const program = await db.program.findFirst({
    where: { slug, published: true },
    include: { courses: { orderBy: { order: "asc" } } },
  });
  if (!program) notFound();

  const totalCredits = program.courses
    .filter((c) => c.note !== "إجباري")
    .reduce((s, c) => s + c.creditHours, 0);

  return (
    <>
      <PageHeader title={program.title} subtitle={`درجة ${program.degree} — كلية الهندسة، جامعة القاهرة`} />
      <section className="mx-auto max-w-5xl px-4 py-14">
        <h2 className="section-title">عن البرنامج</h2>
        <p className="prose-ar text-lg text-slate-600">{program.description}</p>

        {program.admissionReq && (
          <div className="mt-8 rounded-xl border-r-4 border-accent bg-navy-50 p-6">
            <h3 className="mb-2 text-lg font-extrabold text-navy-900">شروط الالتحاق</h3>
            <p className="prose-ar text-slate-600">{program.admissionReq}</p>
          </div>
        )}

        {program.courses.length > 0 && (
          <div className="mt-12">
            <h2 className="section-title">المقررات الدراسية</h2>
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full min-w-[560px] text-sm">
                <thead>
                  <tr className="bg-navy-900 text-white">
                    <th className="px-4 py-3 text-right font-bold">م</th>
                    <th className="px-4 py-3 text-right font-bold">الكود</th>
                    <th className="px-4 py-3 text-right font-bold">اسم المقرر</th>
                    <th className="px-4 py-3 text-center font-bold">الساعات المعتمدة</th>
                    <th className="px-4 py-3 text-center font-bold">ساعات الامتحان</th>
                  </tr>
                </thead>
                <tbody>
                  {program.courses.map((c, i) => (
                    <tr key={c.id} className={i % 2 ? "bg-navy-50/60" : "bg-white"}>
                      <td className="px-4 py-3">{i + 1}</td>
                      <td className="whitespace-nowrap px-4 py-3 font-bold text-navy-700">{c.code}</td>
                      <td className="px-4 py-3">
                        {c.name}
                        {c.note && (
                          <span className="mr-2 rounded-full bg-accent/15 px-2 py-0.5 text-xs font-bold text-accent-dark">
                            {c.note}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-center">{c.creditHours}</td>
                      <td className="px-4 py-3 text-center">{c.examHours ?? "—"}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-navy-100 font-extrabold text-navy-900">
                    <td colSpan={3} className="px-4 py-3">المجموع الأقصى للساعات المعتمدة</td>
                    <td className="px-4 py-3 text-center">{totalCredits}</td>
                    <td />
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
