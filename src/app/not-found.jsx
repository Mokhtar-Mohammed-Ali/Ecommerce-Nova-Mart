"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NotFound() {
  const router = useRouter();
  const [q, setQ] = useState("");

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-slate-900 to-slate-800 text-white px-6 py-20">
      <div className="max-w-5xl w-full flex flex-col lg:grid lg:grid-cols-2 gap-10 items-center">
        {/* Left: Text + actions */}
        <section className="flex flex-col gap-6 text-center lg:text-left">
          <div className="flex flex-col items-center lg:items-start gap-3">
            <div className="rounded-md bg-amber-400/10 p-2 border border-amber-400/20">
              <svg
                className="h-8 w-8 text-amber-300"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M12 2v5M12 17v5M12 12a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold">
              404 — Page not found
            </h1>
            <p className="text-sm text-slate-300">
              We couldn&apos;t find the page you&apos;re looking for.
            </p>
          </div>

          <p className="text-slate-300 max-w-lg mx-auto lg:mx-0">
            Maybe the product was removed or the link is broken. Try searching
            or go back to the homepage.
          </p>

          {/* Search box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (q.trim())
                router.push(`/search?q=${encodeURIComponent(q.trim())}`);
            }}
            className="flex gap-2 items-center w-full max-w-md mx-auto lg:mx-0"
          >
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search products..."
              className="flex-1 rounded-md border border-slate-700 bg-slate-900/60 px-4 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
            <button
              type="submit"
              className="rounded-md bg-amber-400 px-4 py-2 text-sm font-semibold text-slate-900 hover:brightness-95 transition"
            >
              Search
            </button>
          </form>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 mt-4 justify-center lg:justify-start">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-md border border-slate-700 px-4 py-2 text-sm transition hover:bg-white/5"
            >
              Go to Homepage
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center justify-center rounded-md bg-amber-400 px-4 py-2 text-sm font-semibold text-slate-900 hover:brightness-95 transition"
            >
              Browse Products
            </Link>
          </div>
        </section>

        {/* Right: Illustration */}
        <aside className="relative flex items-center justify-center mt-10 lg:mt-0">
          <div className="w-full max-w-sm aspect-[4/3] bg-gradient-to-br from-slate-900/60 to-slate-800/40 border border-slate-700/40 rounded-xl p-6 flex items-center justify-center">
            <svg
              viewBox="0 0 320 240"
              className="w-full h-auto max-h-[240px]"
              aria-hidden
            >
              <g transform="translate(20,20)">
                <rect
                  x="10"
                  y="60"
                  width="220"
                  height="90"
                  rx="12"
                  fill="#94a3b8"
                  opacity="0.15"
                />
                <circle cx="60" cy="170" r="12" fill="#0ea5e9" />
                <circle cx="180" cy="170" r="12" fill="#0ea5e9" />
                <text
                  x="140"
                  y="40"
                  fill="#f43f5e"
                  fontSize="34"
                  fontWeight="700"
                  className="animate-pulse"
                >
                  !
                </text>
              </g>
            </svg>
          </div>
        </aside>
      </div>
    </main>
  );
}
