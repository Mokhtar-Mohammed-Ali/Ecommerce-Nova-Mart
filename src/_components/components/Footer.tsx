

"use client";

import React, { useState } from "react";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    alert(`Subscribed with: ${email}`);
    setEmail("");
  };

  return (
    <footer className="bg-gray-300 dark:bg-neutral-900 text-gray-800 dark:text-gray-300 py-12">
      <div className="container mx-auto px-4">

        {/* Subscribe & Social */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 lg:gap-0 border-b border-gray-300 dark:border-gray-700 pb-10">
          <div className="flex-1">
            <h3 className="text-2xl font-bold mb-4">Subscribe to our newsletter</h3>
            <form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row gap-2 sm:gap-0"
            >
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-2 rounded-l-md border border-gray-400 dark:border-gray-600 bg-white dark:bg-neutral-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <button
                type="submit"
                className="mt-2 sm:mt-0 px-6 py-2 bg-amber-500 text-white font-semibold rounded-r-md hover:bg-amber-600 transition"
              >
                Subscribe
              </button>
            </form>
          </div>

          <div className="flex gap-4 mt-4 lg:mt-0">
            <a href="#" className="hover:text-amber-500 transition"><Facebook /></a>
            <a href="#" className="hover:text-amber-500 transition"><Twitter /></a>
            <a href="#" className="hover:text-amber-500 transition"><Instagram /></a>
            <a href="https://www.linkedin.com/in/mokhtar-mohammed-29b80624b/" className="hover:text-amber-500 transition"><Linkedin /></a>
          </div>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mt-12">
          <div>
            <h4 className="text-lg font-semibold mb-4">Shop</h4>
            <ul className="space-y-2">
              <li><Link href="/products" className="hover:text-amber-500 transition">Products</Link></li>
              <li><Link href="/categories" className="hover:text-amber-500 transition">Categories</Link></li>
              <li><Link href="/brands" className="hover:text-amber-500 transition">Brands</Link></li>
              <li><Link href="/subcategories" className="hover:text-amber-500 transition">Subcategories</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-amber-500 transition">About Us</Link></li>
              <li><Link href="/" className="hover:text-amber-500 transition">Contact</Link></li>
              <li><Link href="/" className="hover:text-amber-500 transition">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-amber-500 transition">Shipping</Link></li>
              <li><Link href="/" className="hover:text-amber-500 transition">Returns</Link></li>
              <li><Link href="/" className="hover:text-amber-500 transition">Privacy Policy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Account</h4>
            <ul className="space-y-2">
              <li><Link href="/login" className="hover:text-amber-500 transition">Login</Link></li>
              <li><Link href="/register" className="hover:text-amber-500 transition">Register</Link></li>
              <li><Link href="/allorders" className="hover:text-amber-500 transition">Orders</Link></li>
              <li><Link href="/addresse" className="hover:text-amber-500 transition">Addresses</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li>
                Name: <span className="font-medium">Mokhtar Mohamed</span>
              </li>
              <li>
                Email:{" "}
                <a
                  href="mailto:mokhtaemohammed101@gmail.com"
                  className="hover:underline text-blue-600 dark:text-blue-400"
                >
                  mokhtaemohammed101@gmail.com
                </a>
              </li>
              <li>
                Phone:{" "}
                <a
                  href="tel:01113756009"
                  className="hover:underline text-blue-600 dark:text-blue-400"
                >
                  01113756009
                </a>
              </li>
              <li>Address: Giza, Egypt</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="p-2 mt-12 border-t border-gray-300 dark:border-gray-700 pt-6 text-sm flex flex-col sm:flex-row justify-between items-center gap-2">
  <p>
    &copy; {new Date().getFullYear()} <span className="font-semibold text-amber-500">Mokhtar Mohamed</span>. All rights reserved.
  </p>
  <div className="flex gap-4">
    <a
      href="https://github.com/AboomarAboamma"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-amber-500 transition"
    >
      GitHub
    </a>
    <a
      href="https://www.linkedin.com/in/mokhtar-mohammed-29b80624b/"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-amber-500 transition"
    >
      LinkedIn
    </a>
    <a
      href="mailto:mokhtaemohammed101@gmail.com"
      className="hover:text-amber-500 transition"
    >
      Contact Me
    </a>
  </div>
</div>
        

      </div>
    </footer>
  );
}
