
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(true);

  const navItems = [
    { href: "/profile", label: "My Info" },
    { href: "/profile/password", label: "Change Password" },
    { href: "/profile/userorders", label: "My Orders" },
    { href: "/profile/address", label: "My Addresses" },
  ];

  return (
    <div className="flex min-h-screen bg-background text-foreground -pt-10">
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
        className="lg:hidden fixed left-10 top-1/2 -translate-y-1/2 z-50 p-2 rounded-full bg-primary text-primary-foreground shadow-lg"
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
            className="lg:hidden fixed top-20 left-5 h-full w-56 bg-card border-r border-border shadow-lg z-40 flex flex-col"
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
      <main className="flex-1">{children}</main>
    </div>
  );
}
