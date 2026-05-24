"use client";

import Link from "next/link";

export default function PaymentCancelPage() {
  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-white px-4">
      <div className="text-center space-y-6 max-w-sm">
        <div className="w-20 h-20 mx-auto rounded-full bg-zinc-700/40 border border-zinc-600/40 flex items-center justify-center">
          <span className="text-4xl">–</span>
        </div>
        <h1 className="text-3xl font-bold text-blue-500">Payment Cancelled</h1>
        <p className="text-zinc-400 text-sm">
          You cancelled the payment. No charges were made.
        </p>
        <div className="flex gap-3 justify-center">
          <Link
            href="/pricing"
            className="inline-block px-6 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-semibold text-sm transition"
          >
            View Plans
          </Link>
          <Link
            href="/dashboard" 
            className="inline-block px-6 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-xl font-semibold text-sm transition"
          >
           Go To Dashboard 
          </Link>
        </div>
      </div>
    </div>
  );
}