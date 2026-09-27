import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import ConferenceForm from "../ConferenceForm";
import { updateConference } from "../actions";

export const dynamic = "force-dynamic";

export default async function EditConferencePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await db.conference.findUnique({ where: { id: Number(id) } });
  if (!item) notFound();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-extrabold text-navy-900">تعديل المؤتمر</h1>
      <ConferenceForm action={updateConference.bind(null, item.id)} item={item} />
    </div>
  );
}
