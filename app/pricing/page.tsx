"use client";

import api from "../../lib/axiosClient";
import { useState } from "react";

export default function Pricing() {
  const [loading, setLoading] = useState(false);

  const handleBuy = async (amount: number, plan: string) => {
    setLoading(true);
    try {
      const userId = localStorage.getItem("userId");

      const res = await api.post("/payment", {
        userId,
        amount,
      });

      const data = res.data;

      //  SSLCommerz redirect
      const form = document.createElement("form");
      form.method = "POST";
      form.action = data.gatewayURL;

      Object.keys(data.payload).forEach((key) => {
        const input = document.createElement("input");
        input.name = key;
        input.value = data.payload[key];
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();
    } catch (error) {
      alert("Payment processing failed");
    } finally {
      setLoading(false);
    }
  };

  const plans = [
    {
      name: "Starter",
      price: 10,
      description: "Perfect for individuals",
      features: [
        "Up to 10 projects",
        "5GB storage",
        "Basic analytics",
        "Email support",
      ],
      highlighted: false,
    },
    {
      name: "Professional",
      price: 100,
      description: "Best for teams",
      features: [
        "Unlimited projects",
        "100GB storage",
        "Advanced analytics",
        "Priority support",
        "API access",
        "Custom integrations",
      ],
      highlighted: true,
    },
    {
      name: "Enterprise",
      price: 1000,
      description: "For large organizations",
      features: [
        "Unlimited everything",
        "Unlimited storage",
        "Real-time analytics",
        "24/7 phone support",
        "Custom API",
        "Dedicated account manager",
      ],
      highlighted: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Choose the perfect plan for your business
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`rounded-2xl overflow-hidden transition-transform hover:scale-105 ${
                plan.highlighted
                  ? "bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-2xl md:scale-105 md:z-10"
                  : "bg-white shadow-lg"
              }`}
            >
              <div className="p-8">
                {/* Badge for popular */}
                {plan.highlighted && (
                  <div className="inline-block bg-yellow-400 text-blue-900 px-4 py-1 rounded-full text-sm font-bold mb-4">
                    Most Popular
                  </div>
                )}

                {/* Plan Name */}
                <h3 className={`text-2xl font-bold mb-2 ${plan.highlighted ? "" : "text-gray-900"}`}>
                  {plan.name}
                </h3>
                <p className={`mb-6 ${plan.highlighted ? "text-blue-100" : "text-gray-600"}`}>
                  {plan.description}
                </p>

                {/* Price */}
                <div className="mb-6">
                  <span className={`text-5xl font-bold ${plan.highlighted ? "" : "text-gray-900"}`}>
                    ${plan.price}
                  </span>
                  <span className={`text-sm ml-2 ${plan.highlighted ? "text-blue-100" : "text-gray-600"}`}>
                    /month
                  </span>
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => handleBuy(plan.price, plan.name)}
                  disabled={loading}
                  className={`w-full py-3 rounded-lg font-bold transition mb-8 disabled:opacity-50 disabled:cursor-not-allowed ${
                    plan.highlighted
                      ? "bg-white text-blue-600 hover:bg-gray-100"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  {loading ? "Processing..." : "Get Started"}
                </button>

                {/* Features */}
                <div className="space-y-4">
                  {plan.features.map((feature, featureIdx) => (
                    <div key={featureIdx} className="flex items-center">
                      <svg
                        className={`w-5 h-5 mr-3 ${plan.highlighted ? "text-yellow-400" : "text-green-500"}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className={plan.highlighted ? "text-blue-100" : "text-gray-700"}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-20 bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                q: "Can I change my plan later?",
                a: "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately.",
              },
              {
                q: "Do you offer a free trial?",
                a: "Yes, we offer a 14-day free trial for all plans. No credit card required.",
              },
              {
                q: "What payment methods do you accept?",
                a: "We accept all major credit cards, PayPal, and bank transfers for enterprise plans.",
              },
              {
                q: "Is there a long-term contract?",
                a: "No, all plans are month-to-month. You can cancel anytime without penalties.",
              },
            ].map((faq, idx) => (
              <div key={idx}>
                <h4 className="font-bold text-lg text-gray-900 mb-2">{faq.q}</h4>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
