import Link from "next/link";
import { db } from "@/lib/db";
import DeleteButton from "@/components/admin/DeleteButton";
import { deleteCourse } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminCoursesPage() {
  const items = await db.course.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-extrabold text-navy-900">الدورات التدريبية</h1>
        <Link href="/admin/courses/new" className="btn-primary text-sm">+ دورة جديدة</Link>
      </div>
      <div className="card divide-y divide-slate-100">
        {items.length === 0 && <p className="p-6 text-slate-500">لا توجد دورات.</p>}
        {items.map((c) => (
          <div key={c.id} className="flex items-center gap-4 p-4">
            <div className="min-w-0 flex-1">
              <div className="truncate font-extrabold text-navy-900">{c.title}</div>
              <div className="text-xs text-slate-400">
                {c.category}
                {!c.published && <span className="mr-2 rounded bg-slate-200 px-2 py-0.5 font-bold">مخفية</span>}
              </div>
            </div>
            <Link href={`/admin/courses/${c.id}`} className="rounded-lg bg-navy-50 px-3 py-1.5 text-sm font-bold text-navy-800 hover:bg-navy-100">
              تعديل
            </Link>
            <DeleteButton action={deleteCourse.bind(null, c.id)} />
          </div>
        ))}
      </div>
    </div>
  );
}
