"use client";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { createPayment } from "@/features/payment/paymentApi";
import { useEffect } from "react";

const PLANS = [
  {
    name: "BASIC",
    price: 10,
    days: "7 days",
    color: "border-blue-600/40",
    badge: "bg-blue-600/20 text-blue-400",
    features: ["Feature 1 access", "Single tenant", "Email support"],
  },
  {
    name: "STANDARD",
    price: 100,
    days: "30 days",
    color: "border-violet-600/40",
    badge: "bg-violet-600/20 text-violet-400",
    features: ["Feature 3 + 5 access", "Team members", "Priority support"],
    popular: true,
  },
  {
    name: "PREMIUM",
    price: 1000,
    days: "90 days",
    color: "border-amber-500/40",
    badge: "bg-amber-500/20 text-amber-400",
    features: ["All features", "Unlimited team", "Dedicated support", "Priority support"],
  },
];

export default function PricingPage() {
  const dispatch = useAppDispatch();
  const { me } = useAppSelector((s) => s.users);
  const { gatewayURL, payload, loading, error } = useAppSelector((s) => s.payment);

  console.log("Payment state:", { gatewayURL, payload, loading, error });

  useEffect(() => {
    if (gatewayURL && payload) {


      const form = document.createElement("form");
      form.method = "POST";
      form.action = gatewayURL;

      Object.entries(payload).forEach(([key, value]) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = String(value);
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();
    }
  }, [gatewayURL, payload]);

  const handleBuy = (amount: number) => {
    if (!me?.id) return;
    dispatch(createPayment({ userId: me.id, amount }));
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white px-6 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight">Choose a Plan</h1>
          <p className="text-zinc-400 mt-3 text-base">Upgrade to unlock more features for your team</p>
        </div>

        {error && (
          <div className="mb-8 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm text-center">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`relative bg-zinc-900 border rounded-2xl p-7 flex flex-col gap-5 ${plan.color} ${plan.popular ? "ring-2 ring-violet-500/50" : ""}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-violet-600 text-white text-xs font-bold rounded-full">
                  Most Popular
                </div>
              )}

              <div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${plan.badge}`}>
                  {plan.name}
                </span>
              </div>

              <div>
                <p className="text-4xl font-bold">
                  ৳{plan.price}
                  <span className="text-base font-normal text-zinc-400"> / {plan.days}</span>
                </p>
              </div>

              <ul className="space-y-2 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-zinc-300">
                    <span className="text-green-400">✓</span> {f}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleBuy(plan.price)}
                disabled={loading || !me}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl text-sm transition"
              >
                {loading ? "Redirecting…" : `Get ${plan.name}`}
              </button>
            </div>
          ))}
        </div>

        <p className="text-center text-zinc-600 text-xs mt-10">
          Payments are processed securely via SSLCommerz
        </p>
      </div>
    </div>
  );
}