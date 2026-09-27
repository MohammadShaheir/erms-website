import ProgramForm from "../ProgramForm";
import { createProgram } from "../actions";

export default function NewProgramPage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-extrabold text-navy-900">إضافة برنامج دراسي جديد</h1>
      <ProgramForm action={createProgram} />
    </div>
  );
}
