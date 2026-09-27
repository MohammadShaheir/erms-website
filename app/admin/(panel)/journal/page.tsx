import Link from "next/link";
import { db } from "@/lib/db";
import DeleteButton from "@/components/admin/DeleteButton";
import { deleteIssue } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminJournalPage() {
  const items = await db.journalIssue.findMany({ orderBy: { date: "desc" } });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-extrabold text-navy-900">المجلة العلمية</h1>
        <Link href="/admin/journal/new" className="btn-primary text-sm">+ عدد جديد</Link>
      </div>
      <div className="card divide-y divide-slate-100">
        {items.length === 0 && <p className="p-6 text-slate-500">لا توجد أعداد.</p>}
        {items.map((j) => (
          <div key={j.id} className="flex items-center gap-4 p-4">
            <div className="min-w-0 flex-1">
              <div className="truncate font-extrabold text-navy-900">{j.title}</div>
              <div className="text-xs text-slate-400">
                {new Date(j.date).toLocaleDateString("ar-EG")}
                {j.pdfUrl && <span className="mr-2">📎 PDF</span>}
                {!j.published && <span className="mr-2 rounded bg-slate-200 px-2 py-0.5 font-bold">مسودة</span>}
              </div>
            </div>
            <Link href={`/admin/journal/${j.id}`} className="rounded-lg bg-navy-50 px-3 py-1.5 text-sm font-bold text-navy-800 hover:bg-navy-100">
              تعديل
            </Link>
            <DeleteButton action={deleteIssue.bind(null, j.id)} />
          </div>
        ))}
      </div>
    </div>
  );
}
