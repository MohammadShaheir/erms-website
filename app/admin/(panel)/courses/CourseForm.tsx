import type { Course } from "@prisma/client";

export default function CourseForm({
  action,
  item,
}: {
  action: (formData: FormData) => Promise<void>;
  item?: Course;
}) {
  return (
    <form action={action} className="max-w-3xl space-y-5">
      <div>
        <label className="label">اسم الدورة *</label>
        <input name="title" required defaultValue={item?.title} className="input" />
      </div>
      <div>
        <label className="label">الوصف</label>
        <textarea name="description" rows={5} defaultValue={item?.description} className="input" />
      </div>
      <div className="grid gap-5 sm:grid-cols-3">
        <div>
          <label className="label">التصنيف</label>
          <input name="category" defaultValue={item?.category ?? "عام"} className="input" placeholder="السلامة / البيئة / إدارة..." />
        </div>
        <div>
          <label className="label">المدة</label>
          <input name="duration" defaultValue={item?.duration ?? ""} className="input" placeholder="مثال: 3 أيام" />
        </div>
        <div>
          <label className="label">الترتيب</label>
          <input name="order" type="number" defaultValue={item?.order ?? 0} className="input" />
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
        منشورة على الموقع
      </label>
      <button className="btn-primary">{item ? "حفظ التعديلات" : "إضافة الدورة"}</button>
    </form>
  );
}
