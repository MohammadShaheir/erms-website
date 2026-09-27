import { getSettings } from "@/lib/settings";
import { saveSettings } from "./actions";
import PasswordForm from "./PasswordForm";

export const dynamic = "force-dynamic";

const textFields: [string, string][] = [
  ["siteName", "اسم الموقع"],
  ["heroTitle", "عنوان الواجهة الرئيسية"],
  ["heroSubtitle", "النص التعريفي في الواجهة"],
  ["email", "البريد الإلكتروني"],
  ["phone1", "هاتف 1"],
  ["phone2", "هاتف 2"],
  ["address", "العنوان"],
  ["facebook", "رابط فيسبوك"],
  ["regNumber", "رقم الإشهار"],
  ["foundedDate", "تاريخ التأسيس"],
];

const areaFields: [string, string, number][] = [
  ["aboutBrief", "نبذة مختصرة (الصفحة الرئيسية)", 4],
  ["aboutFull", "نبذة كاملة (صفحة من نحن)", 6],
  ["goals", "أهداف الجمعية", 3],
  ["activities", "أنشطة الجمعية (كل نشاط في سطر)", 8],
  ["membership", "شروط العضوية (كل شرط في سطر)", 6],
];

export default async function AdminSettingsPage() {
  const settings = await getSettings();

  return (
    <div className="max-w-4xl">
      <h1 className="mb-6 text-2xl font-extrabold text-navy-900">إعدادات الموقع</h1>

      <form action={saveSettings} className="card space-y-5 p-6">
        <div className="grid gap-5 sm:grid-cols-2">
          {textFields.map(([key, label]) => (
            <div key={key}>
              <label className="label text-sm">{label}</label>
              <input name={key} defaultValue={settings[key] ?? ""} className="input" />
            </div>
          ))}
        </div>
        {areaFields.map(([key, label, rows]) => (
          <div key={key}>
            <label className="label text-sm">{label}</label>
            <textarea name={key} rows={rows} defaultValue={settings[key] ?? ""} className="input" />
          </div>
        ))}
        <button className="btn-primary">حفظ الإعدادات</button>
      </form>

      <div className="card mt-8 max-w-md p-6">
        <h2 className="mb-4 text-lg font-extrabold text-navy-900">🔒 تغيير كلمة المرور</h2>
        <PasswordForm />
      </div>
    </div>
  );
}
