"use client";

import { useActionState } from "react";
import { changePassword } from "./actions";

export default function PasswordForm() {
  const [state, action, pending] = useActionState(changePassword, null);

  return (
    <form action={action} className="space-y-4">
      <div>
        <label className="label text-sm">كلمة المرور الحالية</label>
        <input name="current" type="password" required className="input" dir="ltr" />
      </div>
      <div>
        <label className="label text-sm">كلمة المرور الجديدة (8 أحرف على الأقل)</label>
        <input name="next" type="password" required minLength={8} className="input" dir="ltr" />
      </div>
      {state?.error && <div className="rounded-lg bg-red-50 px-4 py-2.5 text-sm font-bold text-red-700">{state.error}</div>}
      {state?.ok && <div className="rounded-lg bg-green-50 px-4 py-2.5 text-sm font-bold text-green-700">تم تغيير كلمة المرور بنجاح</div>}
      <button disabled={pending} className="rounded-lg bg-navy-800 px-5 py-2.5 text-sm font-bold text-white hover:bg-navy-700 disabled:opacity-50">
        تغيير كلمة المرور
      </button>
    </form>
  );
}
