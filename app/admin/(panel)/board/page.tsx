import { db } from "@/lib/db";
import DeleteButton from "@/components/admin/DeleteButton";
import { addMember, updateMember, deleteMember } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminBoardPage() {
  const members = await db.boardMember.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <h1 className="mb-6 text-2xl font-extrabold text-navy-900">مجلس الإدارة</h1>

      <div className="mb-8 space-y-4">
        {members.map((m) => (
          <div key={m.id} className="card p-5">
            <form action={updateMember.bind(null, m.id)} className="grid items-end gap-4 sm:grid-cols-2 lg:grid-cols-6">
              <div className="flex items-center gap-3 lg:col-span-1">
                {m.photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={m.photo} alt="" className="h-14 w-14 rounded-full object-cover object-top" />
                ) : (
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-navy-800 text-xl text-white">👤</div>
                )}
              </div>
              <div className="lg:col-span-2">
                <label className="label text-sm">الاسم</label>
                <input name="name" defaultValue={m.name} required className="input" />
              </div>
              <div>
                <label className="label text-sm">الصفة</label>
                <input name="role" defaultValue={m.role} required className="input" />
              </div>
              <div>
                <label className="label text-sm">الترتيب</label>
                <input name="order" type="number" defaultValue={m.order} className="input" />
              </div>
              <div>
                <label className="label text-sm">الصورة</label>
                <input name="photo" type="file" accept="image/*" className="input text-xs" />
              </div>
              <div className="flex gap-2 lg:col-span-6">
                <button className="rounded-lg bg-navy-800 px-4 py-2 text-sm font-bold text-white hover:bg-navy-700">حفظ</button>
                <DeleteButton action={deleteMember.bind(null, m.id)} />
              </div>
            </form>
          </div>
        ))}
      </div>

      <div className="card max-w-3xl p-5">
        <h2 className="mb-4 font-extrabold text-navy-900">إضافة عضو جديد</h2>
        <form action={addMember} className="grid items-end gap-4 sm:grid-cols-2">
          <div>
            <label className="label text-sm">الاسم *</label>
            <input name="name" required className="input" />
          </div>
          <div>
            <label className="label text-sm">الصفة *</label>
            <input name="role" required className="input" placeholder="عضو مجلس الإدارة" />
          </div>
          <div>
            <label className="label text-sm">الترتيب</label>
            <input name="order" type="number" defaultValue={members.length + 1} className="input" />
          </div>
          <div>
            <label className="label text-sm">الصورة</label>
            <input name="photo" type="file" accept="image/*" className="input text-xs" />
          </div>
          <button className="btn-primary sm:col-span-2">إضافة العضو</button>
        </form>
      </div>
    </div>
  );
}
