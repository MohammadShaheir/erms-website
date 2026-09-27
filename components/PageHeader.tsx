export default function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <section className="relative overflow-hidden bg-navy-900 py-14 text-center">
      <div className="absolute inset-0 opacity-10 [background-image:radial-gradient(circle_at_85%_30%,#f59e0b,transparent_40%),radial-gradient(circle_at_10%_80%,#2a5288,transparent_50%)]" />
      <div className="page-header-anim relative">
        <h1 className="text-4xl font-extrabold text-white">{title}</h1>
        {subtitle && <p className="mt-3 text-navy-200">{subtitle}</p>}
        <div className="mx-auto mt-5 h-1 w-20 rounded bg-accent" />
      </div>
    </section>
  );
}
