import { db } from "@/lib/db";
import DeleteButton from "@/components/admin/DeleteButton";
import { toggleRead, deleteMessage } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminMessagesPage() {
  const messages = await db.contactMessage.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <h1 className="mb-6 text-2xl font-extrabold text-navy-900">رسائل التواصل</h1>
      {messages.length === 0 && <p className="text-slate-500">لا توجد رسائل.</p>}
      <div className="space-y-4">
        {messages.map((m) => (
          <div key={m.id} className={`card p-5 ${!m.read ? "border-r-4 border-accent" : ""}`}>
            <div className="mb-2 flex flex-wrap items-center gap-3">
              <span className="font-extrabold text-navy-900">{m.name}</span>
              <a href={`mailto:${m.email}`} dir="ltr" className="text-sm text-navy-600 hover:underline">{m.email}</a>
              {m.phone && <span dir="ltr" className="text-sm text-slate-500">{m.phone}</span>}
              <span className="text-xs text-slate-400">
                {new Date(m.createdAt).toLocaleString("ar-EG")}
              </span>
              {!m.read && (
                <span className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-extrabold text-navy-900">جديدة</span>
              )}
            </div>
            {m.subject && <div className="mb-1 font-bold text-slate-700">الموضوع: {m.subject}</div>}
            <p className="prose-ar mb-4 text-sm text-slate-600">{m.message}</p>
            <div className="flex gap-2">
              <form action={toggleRead.bind(null, m.id)}>
                <button className="rounded-lg bg-navy-50 px-3 py-1.5 text-sm font-bold text-navy-800 hover:bg-navy-100">
                  {m.read ? "وضع كغير مقروءة" : "وضع كمقروءة"}
                </button>
              </form>
              <DeleteButton action={deleteMessage.bind(null, m.id)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
