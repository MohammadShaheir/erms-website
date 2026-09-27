import NewsForm from "../NewsForm";
import { createNews } from "../actions";

export default function NewNewsPage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-extrabold text-navy-900">إضافة خبر جديد</h1>
      <NewsForm action={createNews} />
    </div>
  );
}
