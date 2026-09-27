import Link from "next/link";

export default function Footer({ settings }: { settings: Record<string, string> }) {
  return (
    <footer className="bg-navy-900 text-navy-100">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-3">
        <div>
          <div className="mb-4 flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/logo.png" alt="شعار الجمعية" className="h-12 w-12 object-contain" />
            <div className="text-lg font-extrabold text-white">الجمعية المصرية لدرء المخاطر</div>
          </div>
          <p className="text-sm leading-7 text-navy-200">
            جمعية خدمية مشهرة برقم {settings.regNumber ?? "3880/2011"} — تابعة لوزارة التضامن
            الاجتماعي، لا تهدف للربح.
          </p>
        </div>
        <div>
          <h3 className="mb-4 text-lg font-extrabold text-white">روابط سريعة</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about" className="hover:text-accent">من نحن</Link></li>
            <li><Link href="/training" className="hover:text-accent">الدورات التدريبية</Link></li>
            <li><Link href="/programs" className="hover:text-accent">البرامج الدراسية</Link></li>
            <li><Link href="/news" className="hover:text-accent">الأخبار</Link></li>
            <li><Link href="/contact" className="hover:text-accent">اتصل بنا</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-lg font-extrabold text-white">تواصل معنا</h3>
          <ul className="space-y-3 text-sm leading-7">
            <li>📍 {settings.address ?? ""}</li>
            {settings.email && (
              <li>
                ✉️ <a href={`mailto:${settings.email}`} className="hover:text-accent" dir="ltr">{settings.email}</a>
              </li>
            )}
            {settings.phone1 && <li>📞 <span dir="ltr">{settings.phone1}</span></li>}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-navy-200">
        © {new Date().getFullYear()} الجمعية المصرية لدرء المخاطر — جميع الحقوق محفوظة
      </div>
    </footer>
  );
}
