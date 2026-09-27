import ConferenceForm from "../ConferenceForm";
import { createConference } from "../actions";

export default function NewConferencePage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-extrabold text-navy-900">إضافة مؤتمر جديد</h1>
      <ConferenceForm action={createConference} />
    </div>
  );
}
