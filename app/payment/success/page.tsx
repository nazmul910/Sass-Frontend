"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useAppDispatch } from "@/lib/hooks";
import { fetchMe } from "@/features/users/usersApi";

export default function PaymentSuccessPage() {
  const dispatch = useAppDispatch();


  useEffect(() => {
    dispatch(fetchMe());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-white px-4">
      <div className="text-center space-y-6 max-w-sm">
        <div className="w-20 h-20 mx-auto rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center">
          <span className="text-4xl">✓</span>
        </div>
        <h1 className="text-3xl font-bold">Payment Successful!</h1>
        <p className="text-zinc-400 text-sm">
          Your plan has been upgraded. Enjoy your new features!
        </p>
        <Link
          href="/dashboard"
          className="inline-block px-6 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-semibold text-sm transition"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}