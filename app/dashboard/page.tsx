"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { fetchMe } from "@/features/users/usersApi";
import { fetchTenantUsers } from "@/features/users/usersApi";
import { fetchFeature1, fetchFeature2, fetchFeature3 } from "@/features/features/featuresApi";
import { logout } from "@/features/auth/authSlice";


const planColor: Record<string, string> = {
  FREE: "bg-zinc-700 text-zinc-300",
  BASIC: "bg-blue-600/20 text-blue-400 border border-blue-600/40",
  STANDARD: "bg-violet-600/20 text-violet-400 border border-violet-600/40",
  PREMIUM: "bg-amber-500/20 text-amber-400 border border-amber-500/40",
};


const PLAN_HIERARCHY = ["FREE", "BASIC", "STANDARD", "PREMIUM"];

function canAccess(userPlan: string, requiredPlan: string) {
  return PLAN_HIERARCHY.indexOf(userPlan) >= PLAN_HIERARCHY.indexOf(requiredPlan);
}

export default function DashboardPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { token } = useAppSelector((s) => s.auth);
  const { me, tenantUsers, loading: usersLoading } = useAppSelector((s) => s.users);
  const { feature1, feature2, feature3, loading: featLoading, error: featError } = useAppSelector((s) => s.features);

 
  useEffect(() => {
    if (!token && typeof window !== "undefined" && !localStorage.getItem("token")) {
      router.push("/login");
    }
  }, [token, router]);

  useEffect(() => {
    dispatch(fetchMe());
    dispatch(fetchTenantUsers());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  const userPlan: string = me?.plan ?? "FREE";

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Navbar */}
      <nav className="border-b border-zinc-800 px-6 py-4 flex items-center justify-between">
        <span className="text-xl font-bold tracking-tight">SaaSify</span>
        <div className="flex items-center gap-4">
          <span className="text-sm text-zinc-400">{me?.email}</span>
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${planColor[userPlan] ?? planColor.FREE}`}>
            {userPlan}
          </span>
          <Link
            href="/pricing"
            className="text-sm px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 rounded-lg transition"
          >
            Upgrade
          </Link>
          <button
            onClick={handleLogout}
            className="text-sm text-zinc-400 hover:text-white transition"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-10 space-y-10">

        {/* Plan Info */}
        <section>
          <h2 className="text-lg font-semibold mb-4 text-zinc-200">Your Plan</h2>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold">{userPlan}</p>
              {me?.planExpiry && (
                <p className="text-sm text-zinc-400 mt-1">
                  Expires: {new Date(me.planExpiry).toLocaleDateString()}
                </p>
              )}
            </div>
            <Link
              href="/pricing"
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-sm font-semibold rounded-lg transition"
            >
              Upgrade Plan →
            </Link>
          </div>
        </section>

        {/* Features */}
        <section>
          <h2 className="text-lg font-semibold mb-4 text-zinc-200">Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Feature 1 — BASIC */}
            <FeatureCard
              title="Feature 1"
              required="BASIC"
              userPlan={userPlan}
              result={feature1}
              loading={featLoading}
              error={featError}
              onTry={() => dispatch(fetchFeature1())}
            />
            {/* Feature 2 — STANDARD */}
            <FeatureCard
              title="Feature 2"
              required="STANDARD"
              userPlan={userPlan}
              result={feature2}
              loading={featLoading}
              error={featError}
              onTry={() => dispatch(fetchFeature2())}
            />
            {/* Feature 3 — PREMIUM */}
            <FeatureCard
              title="Feature 3"
              required="PREMIUM"
              userPlan={userPlan}
              result={feature3}
              loading={featLoading}
              error={featError}
              onTry={() => dispatch(fetchFeature3())}
            />
          </div>
        </section>

        {/* Tenant Users */}
        <section>
          <h2 className="text-lg font-semibold mb-4 text-zinc-200">
            Team Members ({tenantUsers.length})
          </h2>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
            {usersLoading ? (
              <p className="p-6 text-zinc-500 text-sm">Loading…</p>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-zinc-800 text-zinc-400 text-left">
                    <th className="px-6 py-3 font-medium">Email</th>
                    <th className="px-6 py-3 font-medium">Plan</th>
                    <th className="px-6 py-3 font-medium">Role</th>
                  </tr>
                </thead>
                <tbody>
                  {tenantUsers.map((u: any) => (
                    <tr key={u.id} className="border-b border-zinc-800/60 hover:bg-zinc-800/40 transition">
                      <td className="px-6 py-3 text-zinc-200">{u.email}</td>
                      <td className="px-6 py-3">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${planColor[u.plan] ?? planColor.FREE}`}>
                          {u.plan}
                        </span>
                      </td>
                      <td className="px-6 py-3 text-zinc-400">{u.role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </section>

      </div>
    </div>
  );
}

function FeatureCard({
  title,
  required,
  userPlan,
  result,
  loading,
  error,
  onTry,
}: {
  title: string;
  required: string;
  userPlan: string;
  result: string | null;
  loading: boolean;
  error: string | null;
  onTry: () => void;
}) {
  const accessible = canAccess(userPlan, required);

  return (
    <div className={`bg-zinc-900 border rounded-xl p-5 flex flex-col gap-3 ${accessible ? "border-zinc-700" : "border-zinc-800 opacity-60"}`}>
      <div className="flex items-center justify-between">
        <p className="font-semibold text-zinc-200">{title}</p>
        <span className="text-xs text-zinc-500">{required}+</span>
      </div>

      {result && (
        <p className="text-green-400 text-sm">✓ {result}</p>
      )}

      {!accessible ? (
        <Link
          href="/pricing"
          className="text-xs text-center py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition"
        >
          Upgrade to {required}
        </Link>
      ) : (
        <button
          onClick={onTry}
          disabled={loading}
          className="text-xs py-2 rounded-lg bg-indigo-600/80 hover:bg-indigo-600 text-white transition disabled:opacity-50"
        >
          {loading ? "Loading…" : "Try Feature"}
        </button>
      )}

      {error && accessible && (
        <p className="text-red-400 text-xs">{error}</p>
      )}
    </div>
  );
}