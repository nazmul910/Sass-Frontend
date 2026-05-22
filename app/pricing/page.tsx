"use client";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { createPayment } from "@/features/payment/paymentApi";
import { createStripePayment } from "@/features/stripe-payment/stripePaymentApi"
import { useEffect } from "react";

const SSL_PLANS = [
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

const STRIPE_PLANS = [
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
  const {
    loading: stripeLoading,
    error: stripeError,
  } = useAppSelector((s) => s.stripePayment);

  // SSLCommerz redirect
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

  const handleSSLBuy = (amount: number) => {
    if (!me?.id) return;
    dispatch(createPayment({ userId: me.id, amount }));
  };

  const handleStripeBuy = (amount: number) => {

    if (!me?.id) return;

    console.log("Stripe Buy Clicked with amount:", amount);
    console.log("Stripe Buy Clicked with amount:", me.id);
    dispatch(createStripePayment({ userId: me.id, amount }));
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white px-6 py-16">
      <div className="max-w-4xl mx-auto">

        {/* ── SSLCommerz Section ── */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-blue-500">Choose a Plan</h1>
          <p className="text-zinc-400 mt-3 text-base">
            Upgrade to unlock more features for your team
          </p>
          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-800 text-zinc-400 text-xs">
            <img
              src="https://securepay.sslcommerz.com/public/image/SSLCommerz-Pay-With-logo-All-Size-01.png"
              alt="SSLCommerz"
              className="h-4 object-contain"
            />
            Pay with bKash, Nagad, Cards & more
          </div>
        </div>

        {error && (
          <div className="mb-8 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm text-center">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {SSL_PLANS.map((plan) => (
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
                onClick={() => handleSSLBuy(plan.price)}
                disabled={loading || !me}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl text-sm transition"
              >
                {loading ? "Redirecting…" : `Get ${plan.name}`}
              </button>
            </div>
          ))}
        </div>

        <p className="text-center text-zinc-600 text-xs mt-6">
          Payments are processed securely via SSLCommerz
        </p>

        {/* ── Divider ── */}
        <div className="flex items-center gap-4 my-16">
          <div className="flex-1 h-px bg-zinc-800" />
          <span className="text-zinc-500 text-sm">or pay with</span>
          <div className="flex-1 h-px bg-zinc-800" />
        </div>

        {/* ── Stripe Section ── */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-blue-500">International Payment</h2>
          <p className="text-zinc-400 mt-3 text-base">
            Pay securely with your international card via Stripe
          </p>
          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-800 text-zinc-400 text-xs">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="#6772E5">
              <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.594-7.305h.003z" />
            </svg>
            Visa, Mastercard, Amex accepted
          </div>
        </div>

        {stripeError && (
          <div className="mb-8 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm text-center">
            {stripeError}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {STRIPE_PLANS.map((plan) => (
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
                  ${plan.price}
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
                onClick={() => handleStripeBuy(plan.price)}
                disabled={stripeLoading || !me}
                className="w-full py-3 bg-violet-600 hover:bg-violet-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl text-sm transition"
              >
                {stripeLoading ? "Redirecting…" : `Get ${plan.name}`}
              </button>
            </div>
          ))}
        </div>

        <p className="text-center text-zinc-600 text-xs mt-6">
          Payments are processed securely via Stripe
        </p>

      </div>
    </div>
  );
}