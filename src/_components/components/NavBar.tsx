
"use client";

import { useContext, useState, useEffect } from "react";
import Link from "next/link";
import {
  Loader2,
  Menu,
  ShoppingCartIcon,
  UserRound,
  X,
  HeartIcon,
  Sun,
  Moon,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { CartContext } from "./context/CartContext";
import { WishlistContext } from "./context/WishListContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSession, signOut } from "next-auth/react";
import { useTheme } from "./context/themeContext";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { data: session, status } = useSession();

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const navItems = [
    { name: "Products", link: "/products" },
    { name: "Categories", link: "/categories" },
    { name: "Brands", link: "/brands" },
    { name: "Subcategories", link: "/subcategories" },
  ];

  const { cartData, loading } = useContext(CartContext);
  const { wishlist } = useContext(WishlistContext)!;

  const { theme, toggleTheme } = useTheme();

  if (!mounted) return null;

  const ThemeToggleButton = () => (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-md bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 cursor-pointer"
    >
      {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );

  return (
    <nav className="w-full shadow-md fixed top-0 left-0 z-50 bg-gray-300 dark:bg-neutral-900 text-gray-800 dark:text-gray-300 py-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center">
            <Image
            width={200}
            height={200}
              src="https://assets.aceternity.com/logo-dark.png"
              alt="Logo"
              className="h-8 w-8 mr-2"
            />
            <span className="font-semibold text-black dark:text-white">
              Nova Mart
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex space-x-6 items-center">
            {navItems.map((item, idx) => (
              <Link
                key={idx}
                href={item.link}
                className={`relative pb-1 transition ${
                  pathname === item.link
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop Right Side */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Theme Toggle */}
            <ThemeToggleButton />

            {/* Wishlist */}
            {status === "authenticated" && (
              <Link
                href="/wishlist"
                className="px-4 py-2 rounded-md hover:text-red-600 transition relative"
              >
                <HeartIcon />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 right-0 bg-red-600 text-white text-xs font-bold min-w-6 h-6 px-1 flex items-center justify-center rounded-full">
                    {wishlist.length}
                  </span>
                )}
              </Link>
            )}

            {status === "authenticated" ? (
              <>
                {/* Profile Dropdown with name */}
                <DropdownMenu>
                  <DropdownMenuTrigger className="outline-0 flex items-center gap-1">
                    <span>Hi {session.user.name.slice(0, 6)}</span>
                    <UserRound className="cursor-pointer" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <Link href="/profile">
                      <DropdownMenuItem>Profile</DropdownMenuItem>
                    </Link>
                    <Link href="/allorders">
                      <DropdownMenuItem>My Orders</DropdownMenuItem>
                    </Link>
                    <Link href="/profile/address">
                      <DropdownMenuItem>Address</DropdownMenuItem>
                    </Link>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Cart */}
                <Link
                  href="/cart"
                  className="px-4 py-2 rounded-md hover:text-blue-700 transition relative"
                >
                  <ShoppingCartIcon />
                  <span className="absolute -top-1 right-0 bg-black text-white text-xs font-bold min-w-6 h-6 px-1 flex items-center justify-center rounded-full">
                    {loading ? (
                      <Loader2 className="animate-spin" size={16} />
                    ) : (
                      cartData?.numOfCartItems
                    )}
                  </span>
                </Link>

                {/* Logout */}
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="px-3 py-1 rounded-md bg-red-600 text-white hover:bg-red-700 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-3 py-1 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="px-3 py-1 rounded-md bg-green-600 text-white hover:bg-green-700 transition"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Toggle */}
          <div className="lg:hidden flex items-center gap-2">
            <ThemeToggleButton />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-black dark:text-white"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden absolute top-16 left-0 w-full bg-white dark:bg-neutral-950 shadow-md px-4 py-6 space-y-4">
            {navItems.map((item, idx) => (
              <Link
                key={idx}
                href={item.link}
                onClick={() => setIsOpen(false)}
                className={`block relative pb-1 transition ${
                  pathname === item.link
                    ? "text-blue-600 border-b-2 border-blue-600 inline-block"
                    : "text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
                }`}
              >
                {item.name}
              </Link>
            ))}

            {/* Mobile Right Side */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
              {/* Wishlist */}
              {status === "authenticated" && (
                <Link
                  href="/wishlist"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 rounded-md hover:text-red-600 transition relative"
                >
                  <HeartIcon />
                  {wishlist.length > 0 && (
                    <span className="absolute -top-1 right-0 bg-red-600 text-white text-xs font-bold min-w-6 h-6 px-1 flex items-center justify-center rounded-full">
                      {wishlist.length}
                    </span>
                  )}
                </Link>
              )}
              {status === "authenticated" ? (
                <>
                  {/* Profile */}
                  <DropdownMenu>
                    <DropdownMenuTrigger className="outline-0">
                      <UserRound className="cursor-pointer" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <Link href="/profile" onClick={() => setIsOpen(false)}>
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                      </Link>
                      <Link href="/allorders" onClick={() => setIsOpen(false)}>
                        <DropdownMenuItem>My Orders</DropdownMenuItem>
                      </Link>
                      <Link href="/address" onClick={() => setIsOpen(false)}>
                        <DropdownMenuItem>Address</DropdownMenuItem>
                      </Link>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  {/* Cart */}
                  <Link
                    href="/cart"
                    onClick={() => setIsOpen(false)}
                    className="relative"
                  >
                    <ShoppingCartIcon />
                    <span className="absolute -top-1 -right-2 bg-black text-white text-xs font-bold min-w-5 h-5 flex items-center justify-center rounded-full">
                      {loading ? (
                        <Loader2 className="animate-spin" size={14} />
                      ) : (
                        cartData?.numOfCartItems
                      )}
                    </span>
                  </Link>

                  {/* Logout */}
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      signOut();
                    }}
                    className="px-2 py-1 rounded-md bg-red-600 text-white text-sm hover:bg-red-700 transition"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setIsOpen(false)}
                    className="px-2 py-1 rounded-md bg-blue-600 text-white text-sm hover:bg-blue-700 transition"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setIsOpen(false)}
                    className="px-2 py-1 rounded-md bg-green-600 text-white text-sm hover:bg-green-700 transition"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
