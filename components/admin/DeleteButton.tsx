"use client";

export default function DeleteButton({
  action,
  label = "حذف",
}: {
  action: () => Promise<void>;
  label?: string;
}) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm("هل أنت متأكد من الحذف؟ لا يمكن التراجع.")) e.preventDefault();
      }}
      className="inline"
    >
      <button className="rounded-lg bg-red-50 px-3 py-1.5 text-sm font-bold text-red-700 transition hover:bg-red-600 hover:text-white">
        {label}
      </button>
    </form>
  );
}
