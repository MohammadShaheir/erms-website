import Link from "next/link";
import { db } from "@/lib/db";
import DeleteButton from "@/components/admin/DeleteButton";
import { deleteNews } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminNewsPage() {
  const news = await db.news.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-extrabold text-navy-900">الأخبار</h1>
        <Link href="/admin/news/new" className="btn-primary text-sm">+ خبر جديد</Link>
      </div>
      <div className="card divide-y divide-slate-100">
        {news.length === 0 && <p className="p-6 text-slate-500">لا توجد أخبار.</p>}
        {news.map((n) => (
          <div key={n.id} className="flex items-center gap-4 p-4">
            {n.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={n.image} alt="" className="h-14 w-20 rounded-lg object-cover" />
            ) : (
              <div className="flex h-14 w-20 items-center justify-center rounded-lg bg-slate-100">📰</div>
            )}
            <div className="min-w-0 flex-1">
              <div className="truncate font-extrabold text-navy-900">{n.title}</div>
              <div className="text-xs text-slate-400">
                {new Date(n.createdAt).toLocaleDateString("ar-EG")}
                {!n.published && <span className="mr-2 rounded bg-slate-200 px-2 py-0.5 font-bold">مسودة</span>}
              </div>
            </div>
            <Link href={`/admin/news/${n.id}`} className="rounded-lg bg-navy-50 px-3 py-1.5 text-sm font-bold text-navy-800 hover:bg-navy-100">
              تعديل
            </Link>
            <DeleteButton action={deleteNews.bind(null, n.id)} />
          </div>
        ))}
      </div>
    </div>
  );
}
