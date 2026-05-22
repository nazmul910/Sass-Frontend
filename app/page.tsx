"use client";

import Link from "next/link";
import { AiFillThunderbolt } from "react-icons/ai";
import { FaLock } from "react-icons/fa";
import { BsFillFileBarGraphFill } from "react-icons/bs";


export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="container-custom py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Welcome to <span className="bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">SaaS Platform</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Transform your business with our powerful SaaS solution. Get started today and experience the difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/login" className="btn-primary text-center">
                Get Started
              </Link>
              <Link href="/pricing" className="btn-outline text-center">
                View Pricing
              </Link>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <div className="w-full flex justify-center items-center  h-64 bg-linear-to-br from-blue-300 to-indigo-500 rounded-xl">
              <h1 className="text-white">Sass</h1>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container-custom py-20">
        <h2 className="text-center mb-12">Why Choose Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <AiFillThunderbolt />,
              title: "Fast & Reliable",
              description: "Lightning-fast performance with 99.9% uptime guarantee"
            },
            {
              icon: <FaLock />,
              title: "Secure",
              description: "Enterprise-grade security to protect your data"
            },
            {
              icon: <BsFillFileBarGraphFill />,
              title: "Analytics",
              description: "Real-time insights and comprehensive analytics"
            },
          ].map((feature, idx) => (
            <div key={idx} className="card text-center">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-linear-to-r from-blue-600 to-indigo-600 py-16">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to get started?</h2>
          <p className="text-blue-100 mb-8">Join thousands of satisfied customers today</p>
          <Link href="/login" className="inline-block bg-white text-blue-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition">
            Start Free Trial
          </Link>
        </div>
      </section>
    </div>
  );
}

