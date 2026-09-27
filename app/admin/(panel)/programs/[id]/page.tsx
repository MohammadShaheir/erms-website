import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import ProgramForm from "../ProgramForm";
import DeleteButton from "@/components/admin/DeleteButton";
import { updateProgram, addProgramCourse, deleteProgramCourse } from "../actions";

export const dynamic = "force-dynamic";

export default async function EditProgramPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await db.program.findUnique({
    where: { id: Number(id) },
    include: { courses: { orderBy: { order: "asc" } } },
  });
  if (!item) notFound();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-extrabold text-navy-900">تعديل البرنامج: {item.title}</h1>
      <ProgramForm action={updateProgram.bind(null, item.id)} item={item} />

      <div className="mt-12 max-w-4xl">
        <h2 className="mb-4 text-xl font-extrabold text-navy-900">المقررات الدراسية ({item.courses.length})</h2>

        <div className="card mb-6 overflow-x-auto">
          <table className="w-full min-w-[560px] text-sm">
            <thead>
              <tr className="bg-navy-50 text-navy-900">
                <th className="px-3 py-2.5 text-right font-bold">الترتيب</th>
                <th className="px-3 py-2.5 text-right font-bold">الكود</th>
                <th className="px-3 py-2.5 text-right font-bold">الاسم</th>
                <th className="px-3 py-2.5 text-center font-bold">معتمدة</th>
                <th className="px-3 py-2.5 text-center font-bold">امتحان</th>
                <th className="px-3 py-2.5 text-right font-bold">ملاحظة</th>
                <th className="px-3 py-2.5" />
              </tr>
            </thead>
            <tbody>
              {item.courses.map((c) => (
                <tr key={c.id} className="border-t border-slate-100">
                  <td className="px-3 py-2">{c.order}</td>
                  <td className="whitespace-nowrap px-3 py-2 font-bold">{c.code}</td>
                  <td className="px-3 py-2">{c.name}</td>
                  <td className="px-3 py-2 text-center">{c.creditHours}</td>
                  <td className="px-3 py-2 text-center">{c.examHours ?? "—"}</td>
                  <td className="px-3 py-2">{c.note ?? ""}</td>
                  <td className="px-3 py-2">
                    <DeleteButton action={deleteProgramCourse.bind(null, item.id, c.id)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="card p-5">
          <h3 className="mb-4 font-extrabold text-navy-900">إضافة مقرر جديد</h3>
          <form action={addProgramCourse.bind(null, item.id)} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
            <div>
              <label className="label text-sm">الكود *</label>
              <input name="code" required className="input" />
            </div>
            <div className="lg:col-span-2">
              <label className="label text-sm">اسم المقرر *</label>
              <input name="name" required className="input" />
            </div>
            <div>
              <label className="label text-sm">ساعات معتمدة *</label>
              <input name="creditHours" type="number" required className="input" />
            </div>
            <div>
              <label className="label text-sm">ساعات الامتحان</label>
              <input name="examHours" type="number" className="input" />
            </div>
            <div>
              <label className="label text-sm">الترتيب</label>
              <input name="order" type="number" defaultValue={item.courses.length + 1} className="input" />
            </div>
            <div className="lg:col-span-2">
              <label className="label text-sm">ملاحظة</label>
              <input name="note" className="input" placeholder="اختياري / إجباري" />
            </div>
            <div className="flex items-end">
              <button className="btn-primary w-full text-sm">إضافة</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
