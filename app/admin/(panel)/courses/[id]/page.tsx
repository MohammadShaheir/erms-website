import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import CourseForm from "../CourseForm";
import { updateCourse } from "../actions";

export const dynamic = "force-dynamic";

export default async function EditCoursePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await db.course.findUnique({ where: { id: Number(id) } });
  if (!item) notFound();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-extrabold text-navy-900">تعديل الدورة</h1>
      <CourseForm action={updateCourse.bind(null, item.id)} item={item} />
    </div>
  );
}
