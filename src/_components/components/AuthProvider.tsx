"use client"

import Navbar  from "@/_components/components/NavBar";
import Footer from "@/_components/components/Footer";
import {Toaster} from "react-hot-toast";
import CartContextProvider from "@/_components/components/context/CartContext";
import { WishlistProvider } from "@/_components/components/context/WishListContext";
import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "./context/themeContext";


export default function AuthProvider({children}:{children:ReactNode}) {
  return (
    <ThemeProvider>
    <SessionProvider>
          <CartContextProvider>
 <WishlistProvider> 

      
       
        <Navbar />

        <main className=" pt-16 bg-gray-100 dark:bg-gray-950">
          {children}
          <Toaster/>
        </main>

        <Footer/>
        </WishlistProvider>
            </CartContextProvider>
            </SessionProvider>
            </ThemeProvider>
  )
}
