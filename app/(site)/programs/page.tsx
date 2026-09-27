import Link from "next/link";
import { db } from "@/lib/db";
import PageHeader from "@/components/PageHeader";

export const dynamic = "force-dynamic";
export const metadata = { title: "البرامج الدراسية" };

export default async function ProgramsPage() {
  const programs = await db.program.findMany({ where: { published: true } });

  return (
    <>
      <PageHeader title="البرامج الدراسية" subtitle="برامج الماجستير والدكتوراه في هندسة المخاطر" />
      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-8 md:grid-cols-2">
          {programs.map((p) => (
            <Link key={p.id} href={`/programs/${p.slug}`} className="card group flex flex-col">
              {p.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={p.image} alt={p.title} className="h-56 w-full object-cover" />
              )}
              <div className="flex-1 p-6">
                <span className="mb-3 inline-block rounded-full bg-navy-100 px-4 py-1 text-sm font-bold text-navy-800">
                  {p.degree}
                </span>
                <h2 className="mb-3 text-2xl font-extrabold text-navy-900 group-hover:text-navy-600">
                  {p.title}
                </h2>
                <p className="line-clamp-4 leading-8 text-slate-600">{p.description}</p>
                <div className="mt-4 font-bold text-accent-dark">تفاصيل البرنامج ←</div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
