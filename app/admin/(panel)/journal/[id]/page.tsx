import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import IssueForm from "../IssueForm";
import { updateIssue } from "../actions";

export const dynamic = "force-dynamic";

export default async function EditIssuePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await db.journalIssue.findUnique({ where: { id: Number(id) } });
  if (!item) notFound();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-extrabold text-navy-900">تعديل العدد</h1>
      <IssueForm action={updateIssue.bind(null, item.id)} item={item} />
    </div>
  );
}
