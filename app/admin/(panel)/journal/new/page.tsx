import IssueForm from "../IssueForm";
import { createIssue } from "../actions";

export default function NewIssuePage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-extrabold text-navy-900">إضافة عدد جديد</h1>
      <IssueForm action={createIssue} />
    </div>
  );
}
