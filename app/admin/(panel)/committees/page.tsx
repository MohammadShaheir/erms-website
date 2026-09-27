import { db } from "@/lib/db";
import DeleteButton from "@/components/admin/DeleteButton";
import { addCommittee, deleteCommittee } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminCommitteesPage() {
  const committees = await db.committee.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <h1 className="mb-6 text-2xl font-extrabold text-navy-900">لجان الجمعية</h1>
      <div className="card mb-8 max-w-2xl divide-y divide-slate-100">
        {committees.map((c) => (
          <div key={c.id} className="flex items-center gap-4 p-4">
            <span className="flex-1 font-bold text-navy-900">{c.name}</span>
            <DeleteButton action={deleteCommittee.bind(null, c.id)} />
          </div>
        ))}
      </div>
      <div className="card max-w-2xl p-5">
        <h2 className="mb-4 font-extrabold text-navy-900">إضافة لجنة</h2>
        <form action={addCommittee} className="flex items-end gap-4">
          <div className="flex-1">
            <label className="label text-sm">اسم اللجنة *</label>
            <input name="name" required className="input" />
          </div>
          <div className="w-28">
            <label className="label text-sm">الترتيب</label>
            <input name="order" type="number" defaultValue={committees.length + 1} className="input" />
          </div>
          <button className="btn-primary">إضافة</button>
        </form>
      </div>
    </div>
  );
}
