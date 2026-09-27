export default function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <section className="bg-navy-900 py-14 text-center">
      <h1 className="text-4xl font-extrabold text-white">{title}</h1>
      {subtitle && <p className="mt-3 text-navy-200">{subtitle}</p>}
      <div className="mx-auto mt-5 h-1 w-20 rounded bg-accent" />
    </section>
  );
}
