
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(true);
  const { data: session, status } = useSession();
  const user = session?.user;

  const navItems = [
    { href: "/profile", label: "My Info" },
    { href: "/profile/password", label: "Change Password" },
    { href: "/profile/userorders", label: "My Orders" },
    { href: "/profile/address", label: "My Addresses" },
  ];

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Sidebar - Large screens */}
      <aside className="hidden lg:flex w-64 flex-col border-r border-border bg-card lg:py-3">
        <div className="px-6 py-4 text-xl font-bold">My Account</div>
        <nav className="flex flex-col gap-1 px-4 py-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "px-3 py-3 rounded-md hover:bg-muted transition",
                pathname === item.href && "bg-primary text-primary-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Floating button for small screens */}
      <button
        onClick={() => setOpen(!open)}
        className="lg:hidden fixed left-3 top-1/2 -translate-y-1/2 z-50 p-2 rounded-full bg-primary text-primary-foreground shadow-lg"
      >
        <Menu size={22} />
      </button>

      {/* Drawer for mobile */}
      <AnimatePresence>
        {open && (
          <motion.aside
            initial={{ x: -200 }}
            animate={{ x: 0 }}
            exit={{ x: -200 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden fixed top-20 left-0 h-full w-56 bg-card border-r border-border shadow-lg z-40 flex flex-col"
          >
            <div className="px-6 py-4 text-lg font-bold border-b border-border">
              My Account
            </div>
            <nav className="flex flex-col gap-1 px-4 py-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "px-3 py-2 rounded-md hover:bg-muted transition",
                    pathname === item.href && "bg-primary text-primary-foreground"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6">
        {/* ✅ User Info Section */}
        {status === "loading" ? (
          <p className="text-center text-sm text-muted-foreground">
            Loading user data...
          </p>
        ) : user ? (
          <div className="bg-card border border-border rounded-2xl shadow-sm p-4 md:p-6 mb-6 transition-colors">
            <h2 className="text-lg md:text-xl font-semibold mb-4 text-amber-700 dark:text-amber-400">
              User Information
            </h2>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-6">
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground">Name</span>
                <span className="font-medium text-sm md:text-base">
                  {user.name || "—"}
                </span>
              </div>

              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground">Email</span>
                <span className="font-medium text-sm md:text-base break-all">
                  {user.email || "—"}
                </span>
              </div>

              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground">Role</span>
                <span className="font-medium text-sm md:text-base capitalize">
                  {user.role || "user"}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center text-sm text-destructive">
            User not logged in
          </p>
        )}

        {/* ✅ Children Section */}
        {children}
      </main>
    </div>
  );
}
