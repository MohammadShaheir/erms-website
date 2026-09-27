import CourseForm from "../CourseForm";
import { createCourse } from "../actions";

export default function NewCoursePage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-extrabold text-navy-900">إضافة دورة جديدة</h1>
      <CourseForm action={createCourse} />
    </div>
  );
}
