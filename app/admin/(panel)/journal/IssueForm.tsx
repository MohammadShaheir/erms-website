import type { JournalIssue } from "@prisma/client";

export default function IssueForm({
  action,
  item,
}: {
  action: (formData: FormData) => Promise<void>;
  item?: JournalIssue;
}) {
  return (
    <form action={action} className="max-w-3xl space-y-5">
      <div>
        <label className="label">عنوان العدد *</label>
        <input name="title" required defaultValue={item?.title} className="input" />
      </div>
      <div>
        <label className="label">الوصف</label>
        <textarea name="description" rows={4} defaultValue={item?.description} className="input" />
      </div>
      <div>
        <label className="label">تاريخ الإصدار</label>
        <input
          name="date"
          type="date"
          defaultValue={item?.date ? new Date(item.date).toISOString().slice(0, 10) : ""}
          className="input"
        />
      </div>
      <div>
        <label className="label">صورة الغلاف {item?.image && "(فارغ = الإبقاء على الحالية)"}</label>
        <input name="image" type="file" accept="image/*" className="input" />
      </div>
      <div>
        <label className="label">
          ملف العدد PDF {item?.pdfUrl && "(فارغ = الإبقاء على الحالي)"}
        </label>
        <input name="pdf" type="file" accept=".pdf" className="input" />
      </div>
      <label className="flex items-center gap-2 font-bold text-slate-700">
        <input type="checkbox" name="published" defaultChecked={item ? item.published : true} className="h-4 w-4" />
        منشور على الموقع
      </label>
      <button className="btn-primary">{item ? "حفظ التعديلات" : "إضافة العدد"}</button>
    </form>
  );
}
