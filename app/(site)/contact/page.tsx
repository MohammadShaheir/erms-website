import { getSettings } from "@/lib/settings";
import PageHeader from "@/components/PageHeader";
import ContactForm from "./ContactForm";

export const dynamic = "force-dynamic";
export const metadata = { title: "اتصل بنا" };

export default async function ContactPage() {
  const settings = await getSettings();

  return (
    <>
      <PageHeader title="اتصل بنا" subtitle="يسعدنا تواصلك معنا" />
      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="space-y-5">
            <div className="card p-6">
              <div className="mb-1 text-2xl">📍</div>
              <h3 className="mb-1 font-extrabold text-navy-900">العنوان</h3>
              <p className="text-sm leading-7 text-slate-600">{settings.address}</p>
            </div>
            {settings.email && (
              <div className="card p-6">
                <div className="mb-1 text-2xl">✉️</div>
                <h3 className="mb-1 font-extrabold text-navy-900">البريد الإلكتروني</h3>
                <a href={`mailto:${settings.email}`} dir="ltr" className="text-sm text-navy-600 hover:underline">
                  {settings.email}
                </a>
              </div>
            )}
            {settings.phone1 && (
              <div className="card p-6">
                <div className="mb-1 text-2xl">📞</div>
                <h3 className="mb-1 font-extrabold text-navy-900">الهاتف</h3>
                <p dir="ltr" className="text-sm text-slate-600">{settings.phone1}</p>
                {settings.phone2 && <p dir="ltr" className="text-sm text-slate-600">{settings.phone2}</p>}
              </div>
            )}
          </div>
          <div className="lg:col-span-2">
            <div className="card p-8">
              <h2 className="mb-6 text-2xl font-extrabold text-navy-900">أرسل لنا رسالة</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
