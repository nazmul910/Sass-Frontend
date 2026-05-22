"use client";

import Link from "next/link";

export default function PaymentFailPage() {
  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-white px-4">
      <div className="text-center space-y-6 max-w-sm">
        <div className="w-20 h-20 mx-auto rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center">
          <span className="text-4xl">✕</span>
        </div>
        <h1 className="text-3xl font-bold text-blue-500">Payment Failed</h1>
        <p className="text-zinc-400 text-sm">
          Something went wrong with your payment. Please try again.
        </p>
        <Link
          href="/pricing"
          className="inline-block px-6 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-semibold text-sm transition"
        >
          Try Again
        </Link>
      </div>
    </div>
  );
}