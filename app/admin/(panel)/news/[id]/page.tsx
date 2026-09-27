import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import NewsForm from "../NewsForm";
import { updateNews } from "../actions";

export const dynamic = "force-dynamic";

export default async function EditNewsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await db.news.findUnique({ where: { id: Number(id) } });
  if (!item) notFound();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-extrabold text-navy-900">تعديل الخبر</h1>
      <NewsForm action={updateNews.bind(null, item.id)} item={item} />
    </div>
  );
}
