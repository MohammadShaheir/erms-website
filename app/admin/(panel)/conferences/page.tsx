import Link from "next/link";
import { db } from "@/lib/db";
import DeleteButton from "@/components/admin/DeleteButton";
import { deleteConference } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminConferencesPage() {
  const items = await db.conference.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-extrabold text-navy-900">المؤتمرات</h1>
        <Link href="/admin/conferences/new" className="btn-primary text-sm">+ مؤتمر جديد</Link>
      </div>
      <div className="card divide-y divide-slate-100">
        {items.length === 0 && <p className="p-6 text-slate-500">لا توجد مؤتمرات.</p>}
        {items.map((c) => (
          <div key={c.id} className="flex items-center gap-4 p-4">
            <div className="min-w-0 flex-1">
              <div className="truncate font-extrabold text-navy-900">{c.title}</div>
              <div className="text-xs text-slate-400">
                {c.location ?? "—"}
                {!c.published && <span className="mr-2 rounded bg-slate-200 px-2 py-0.5 font-bold">مسودة</span>}
              </div>
            </div>
            <Link href={`/admin/conferences/${c.id}`} className="rounded-lg bg-navy-50 px-3 py-1.5 text-sm font-bold text-navy-800 hover:bg-navy-100">
              تعديل
            </Link>
            <DeleteButton action={deleteConference.bind(null, c.id)} />
          </div>
        ))}
      </div>
    </div>
  );
}
