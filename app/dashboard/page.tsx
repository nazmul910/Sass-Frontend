"use client";

import api from "../../lib/axiosClient";
import { useState } from "react";

interface FeatureResult {
  success: boolean;
  message: string;
  feature: string;
}

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<FeatureResult | null>(null);

  const getFeature = async (url: string, featureName: string) => {
    setLoading(true);
    setResult(null);
    try {
      const res = await api.get(url);
      setResult({ success: true, message: res.data.message, feature: featureName });
    } catch (err: any) {
      setResult({ success: false, message: "Access Denied", feature: featureName });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Access your features and manage your account</p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {[
            { name: "Feature 1", url: "/features/feature1", icon: "⚙️", color: "from-blue-500 to-blue-600" },
            { name: "Feature 2", url: "/features/feature2", icon: "📊", color: "from-indigo-500 to-indigo-600" },
            { name: "Feature 3", url: "/features/feature3", icon: "🎯", color: "from-purple-500 to-purple-600" },
          ].map((feature, idx) => (
            <button
              key={idx}
              onClick={() => getFeature(feature.url, feature.name)}
              disabled={loading}
              className={`group card flex flex-col items-center justify-center py-8 cursor-pointer hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <div className={`bg-gradient-to-br ${feature.color} rounded-full p-4 mb-4 text-white`}>
                <span className="text-4xl">{feature.icon}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.name}</h3>
              <p className="text-sm text-gray-600 text-center mb-4">
                Click to access this feature
              </p>
              <div className="btn-primary text-sm">
                Access Feature
              </div>
            </button>
          ))}
        </div>

        {/* Result Display */}
        {result && (
          <div
            className={`rounded-xl p-6 mb-8 ${
              result.success
                ? "bg-green-50 border border-green-200"
                : "bg-red-50 border border-red-200"
            }`}
          >
            <div className="flex items-start">
              <div className="flex-shrink-0">
                {result.success ? (
                  <svg
                    className="h-6 w-6 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-6 w-6 text-red-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
              <div className="ml-4">
                <h3 className={`font-bold ${result.success ? "text-green-900" : "text-red-900"}`}>
                  {result.feature}
                </h3>
                <p className={result.success ? "text-green-700 mt-1" : "text-red-700 mt-1"}>
                  {result.message}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { label: "Active Features", value: "3", change: "+12%" },
            { label: "Usage This Month", value: "2.4 GB", change: "+8%" },
            { label: "Account Status", value: "Active", change: "✓" },
          ].map((stat, idx) => (
            <div key={idx} className="card">
              <p className="text-gray-600 text-sm font-medium mb-2">{stat.label}</p>
              <p className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</p>
              <p className="text-green-600 text-sm font-medium">{stat.change}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
