import { notFound } from "next/navigation";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function NewsDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await db.news.findFirst({ where: { id: Number(id), published: true } });
  if (!item) notFound();

  return (
    <article className="mx-auto max-w-4xl px-4 py-14">
      <div className="mb-3 text-sm text-slate-400">
        {new Date(item.createdAt).toLocaleDateString("ar-EG", { dateStyle: "long" })}
      </div>
      <h1 className="mb-6 text-3xl font-extrabold leading-snug text-navy-900">{item.title}</h1>
      {item.image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={item.image} alt={item.title} className="mb-8 max-h-[420px] w-full rounded-xl object-cover" />
      )}
      <div className="prose-ar text-lg text-slate-700">{item.body}</div>
    </article>
  );
}
