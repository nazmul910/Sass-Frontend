
"use client";

import { useDispatch } from "react-redux";
import { setUser } from "../../features/auth/authSlice";
import api from "../../lib/axiosClient";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.post("/auth/login", {
        email: "test@gmail.com",
        password: "123456",
      });

      dispatch(setUser(res.data));
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.userId);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
              SaaS
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
            <p className="text-gray-600 mt-2">Sign in to your account</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}

          {/* Form */}
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                defaultValue="test@gmail.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                defaultValue="123456"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled
              />
              <p className="text-xs text-gray-500 mt-1">Demo credentials</p>
            </div>
          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full btn-primary mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

          {/* Footer */}
          <p className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
              Sign up
            </a>
          </p>
        </div>

        {/* Additional Info */}
        <div className="text-center mt-6 text-gray-600 text-sm">
          <p>Demo Login Credentials:</p>
          <p className="font-mono">test@gmail.com / 123456</p>
        </div>
      </div>
    </div>
  );
}
