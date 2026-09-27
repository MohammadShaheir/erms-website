import type { Conference } from "@prisma/client";

export default function ConferenceForm({
  action,
  item,
}: {
  action: (formData: FormData) => Promise<void>;
  item?: Conference;
}) {
  return (
    <form action={action} className="max-w-3xl space-y-5">
      <div>
        <label className="label">عنوان المؤتمر *</label>
        <input name="title" required defaultValue={item?.title} className="input" />
      </div>
      <div>
        <label className="label">الوصف *</label>
        <textarea name="description" required rows={7} defaultValue={item?.description} className="input" />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="label">المكان</label>
          <input name="location" defaultValue={item?.location ?? ""} className="input" />
        </div>
        <div>
          <label className="label">التاريخ</label>
          <input
            name="startDate"
            type="date"
            defaultValue={item?.startDate ? new Date(item.startDate).toISOString().slice(0, 10) : ""}
            className="input"
          />
        </div>
      </div>
      <div>
        <label className="label">الصورة {item?.image && "(اترك الحقل فارغًا للإبقاء على الحالية)"}</label>
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
      <button className="btn-primary">{item ? "حفظ التعديلات" : "إضافة المؤتمر"}</button>
    </form>
  );
}
