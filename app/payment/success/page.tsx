"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { verifyStripePayment } from "@/features/stripe-payment/stripePaymentApi";

function PaymentSuccessContent() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();

  const { verifying, verified, error } = useAppSelector(
    (s) => s.stripePayment
  );

  useEffect(() => {
    const sessionId = searchParams.get("session_id");

    if (sessionId) {
      dispatch(verifyStripePayment(sessionId));
    }
  }, [dispatch, searchParams]);

  useEffect(() => {
    if (verified) {
      const timer = setTimeout(() => router.push("/dashboard"), 3000);

      return () => clearTimeout(timer);
    }
  }, [verified, router]);

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
      <div className="text-center space-y-4">
        {verifying && (
          <>
            <div className="w-12 h-12 border-4 border-violet-500 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-zinc-400">Payment verifying...</p>
          </>
        )}

        {verified && (
          <>
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
              <span className="text-green-400 text-3xl">✓</span>
            </div>

            <h1 className="text-2xl font-bold text-blue-500">
              Payment Successful!
            </h1>

            <p className="text-zinc-400">
              Your plan has been activated. Redirecting to Dashboard...
            </p>
          </>
        )}

        {error && (
          <>
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto">
              <span className="text-red-400 text-3xl">✗</span>
            </div>

            <h1 className="text-2xl font-bold text-blue-500">
              Something went wrong
            </h1>

            <p className="text-zinc-400">{error}</p>

            <button
              onClick={() => router.push("/pricing")}
              className="px-6 py-2 bg-violet-600 rounded-xl text-sm"
            >
              Try Again
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <PaymentSuccessContent />
    </Suspense>
  );
}