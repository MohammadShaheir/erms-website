import type { Program } from "@prisma/client";

export default function ProgramForm({
  action,
  item,
}: {
  action: (formData: FormData) => Promise<void>;
  item?: Program;
}) {
  return (
    <form action={action} className="max-w-3xl space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="label">اسم البرنامج *</label>
          <input name="title" required defaultValue={item?.title} className="input" />
        </div>
        <div>
          <label className="label">الدرجة العلمية *</label>
          <input name="degree" required defaultValue={item?.degree} className="input" placeholder="ماجستير / دكتوراه / دبلومة" />
        </div>
      </div>
      <div>
        <label className="label">المعرّف في الرابط (بالإنجليزية) *</label>
        <input name="slug" required defaultValue={item?.slug} className="input" dir="ltr" placeholder="masters" />
      </div>
      <div>
        <label className="label">وصف البرنامج *</label>
        <textarea name="description" required rows={6} defaultValue={item?.description} className="input" />
      </div>
      <div>
        <label className="label">شروط الالتحاق</label>
        <textarea name="admissionReq" rows={3} defaultValue={item?.admissionReq} className="input" />
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
      <button className="btn-primary">{item ? "حفظ التعديلات" : "إضافة البرنامج"}</button>
    </form>
  );
}
