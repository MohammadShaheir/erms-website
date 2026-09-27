import type { News } from "@prisma/client";

export default function NewsForm({
  action,
  item,
}: {
  action: (formData: FormData) => Promise<void>;
  item?: News;
}) {
  return (
    <form action={action} className="max-w-3xl space-y-5">
      <div>
        <label className="label">عنوان الخبر *</label>
        <input name="title" required defaultValue={item?.title} className="input" />
      </div>
      <div>
        <label className="label">مقتطف قصير (يظهر في القوائم)</label>
        <input name="excerpt" defaultValue={item?.excerpt} className="input" />
      </div>
      <div>
        <label className="label">نص الخبر *</label>
        <textarea name="body" required rows={10} defaultValue={item?.body} className="input" />
      </div>
      <div>
        <label className="label">الصورة {item?.image && "(اترك الحقل فارغًا للإبقاء على الصورة الحالية)"}</label>
        {item?.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={item.image} alt="" className="mb-2 h-28 rounded-lg object-cover" />
        )}
        <input name="image" type="file" accept="image/*" className="input" />
      </div>
      <label className="flex items-center gap-2 font-bold text-slate-700">
        <input type="checkbox" name="published" defaultChecked={item ? item.published : true} className="h-4 w-4" />
        منشور على الموقع
      </label>
      <button className="btn-primary">{item ? "حفظ التعديلات" : "إضافة الخبر"}</button>
    </form>
  );
}
