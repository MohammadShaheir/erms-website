"use client";

import { useActionState } from "react";
import { login } from "./actions";

export default function LoginPage() {
  const [state, action, pending] = useActionState(login, null);

  return (
    <div className="flex min-h-screen items-center justify-center bg-navy-900 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
        <div className="mb-8 text-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/img/logo.png" alt="الشعار" className="mx-auto mb-4 h-20 w-20 object-contain brightness-50" />
          <h1 className="text-2xl font-extrabold text-navy-900">لوحة التحكم</h1>
          <p className="mt-1 text-sm text-slate-500">الجمعية المصرية لدرء المخاطر</p>
        </div>
        <form action={action} className="space-y-5">
          <div>
            <label className="label">البريد الإلكتروني</label>
            <input name="email" type="email" required className="input" dir="ltr" />
          </div>
          <div>
            <label className="label">كلمة المرور</label>
            <input name="password" type="password" required className="input" dir="ltr" />
          </div>
          {state?.error && (
            <div className="rounded-lg bg-red-50 px-4 py-3 text-sm font-bold text-red-700">{state.error}</div>
          )}
          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-lg bg-navy-800 py-3 font-extrabold text-white transition hover:bg-navy-700 disabled:opacity-50"
          >
            {pending ? "جارٍ الدخول..." : "تسجيل الدخول"}
          </button>
        </form>
      </div>
    </div>
  );
}
