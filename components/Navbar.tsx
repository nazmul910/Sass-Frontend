"use client";

import { logout } from "@/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
    const dispatch = useAppDispatch();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const { token } = useAppSelector((s) => s.auth);

  // const handleLogout = () => {
  //   localStorage.removeItem("token");
  //   localStorage.removeItem("userId");
  //   router.push("/login");
  // };
    const handleLogout = () => {
      dispatch(logout());
      router.push("/login");
    };

      useEffect(() => {
        if (!token && typeof window !== "undefined" && !localStorage.getItem("token")) {
          router.push("/login");
        }
      }, [token, router]);

  return (
    <nav className="bg-white shadow-md">
      <div className="container-custom">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="text-2xl font-bold bg-linear-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              SaaS
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-gray-600 hover:text-blue-600 transition">
              Home
            </Link>
            <Link href="/pricing" className="text-gray-600 hover:text-blue-600 transition">
              Pricing
            </Link>
            <Link href="/dashboard" className="text-gray-600 hover:text-blue-600 transition">
              Dashboard
            </Link>
          </div>

          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex items-center gap-4">
            {!token ? (
              <Link href="/login" className="btn-secondary text-sm">
                Login
              </Link>
            ) : (
              <button onClick={handleLogout} className="bg-red-500 text-white hover:bg-red-600 px-4 py-2 rounded-lg font-medium transition-all duration-200 text-sm">
                Logout
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-gray-200">
            <Link href="/" className="block px-4 py-2 text-gray-600 hover:text-blue-600">
              Home
            </Link>
            <Link href="/pricing" className="block px-4 py-2 text-gray-600 hover:text-blue-600">
              Pricing
            </Link>
            <Link href="/dashboard" className="block px-4 py-2 text-gray-600 hover:text-blue-600">
              Dashboard
            </Link>

            {/* Auth Buttons - Mobile */}
            {!token ? (
              <Link
                href="/login"
                className="block w-full mt-2 text-center btn-secondary text-sm"
              >
                Login
              </Link>
            ) : (
              <button onClick={handleLogout} className="w-full mt-2 btn-secondary text-sm">
                Logout
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}