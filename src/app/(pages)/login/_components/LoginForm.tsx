


"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";


import { signIn } from "next-auth/react";

import { motion } from "framer-motion";
import { Loader, Lock, Mail } from "lucide-react";
import { useSearchParams } from "next/navigation";
// import { useState } from "react";
import toast from "react-hot-toast";

// ========== Schemas ==========
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
type LoginSchema = z.infer<typeof loginSchema>;

const forgotSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});
type ForgotSchema = z.infer<typeof forgotSchema>;

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [forgotOpen, setForgotOpen] = useState(false);
  const [forgotLoading, setForgotLoading] = useState(false);
  const router = useRouter()
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const callBackUrl = searchParams.get("callBack-Url");

  // Login form
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  // Forgot form
  const forgotForm = useForm<ForgotSchema>({
    resolver: zodResolver(forgotSchema),
    defaultValues: { email: "" },

  });

  async function onSubmit(values: LoginSchema) {
    setLoading(true);
    await signIn("credentials", {
      callbackUrl: callBackUrl ?? "/",
      redirect: true,
      email: values.email,
      password: values.password,
    });
    setLoading(false);
  }


  async function handleForgot(values: ForgotSchema) {
    setForgotLoading(true);
    try {
      const res = await fetch(
        `https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: values.email }),
        }
      );

      const data = await res.json();
      if (res.ok) {
        toast.success("Check your email for reset code!");

        localStorage.setItem("resetEmail", values.email);
        setForgotOpen(false);

        router.push("/verify-reset");
      } else {
        toast.error(data.message || "Failed to send reset email");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setForgotLoading(false);
    }
  }


  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-md mx-auto"
    >
      <Card className="shadow-2xl rounded-2xl border border-gray-200 dark:border-gray-700 bg-card/70 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-bold text-primary">
            Welcome Back
          </CardTitle>
          <p className="text-center text-sm text-muted-foreground">
            Sign in to continue to your account
          </p>
          {error && <p className="text-red-500 text-xl">{error}</p>}
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" >
              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
                        <Input
                          id="email"

                          type="email"
                          autoComplete="email"
                          placeholder="you@example.com"
                          {...field}
                          className="pl-10"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
                        <Input
                          id="password"
                          type="password"
                          autoComplete="current-password"
                          placeholder="••••••••"
                          {...field}
                          className="pl-10"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Login Button */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl text-lg py-6 shadow-md hover:shadow-lg transition"
              >
                Sign In
                {loading && <Loader className="ml-2 animate-spin" />}
              </Button>

              {/* Forgot Password link */}
              <div className="text-right">
                <button
                  type="button"
                  onClick={() => setForgotOpen(true)}
                  className="text-sm text-primary hover:underline"
                >
                  Forgot Password?
                </button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Forgot Password Modal */}
      {forgotOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
        >
          <div className="bg-card p-6 rounded-2xl w-full max-w-sm shadow-xl">
            <h2 className="text-lg font-bold mb-4">Reset your password</h2>
            <Form {...forgotForm}>
              <form
                onSubmit={forgotForm.handleSubmit(handleForgot)}
                className="space-y-4"
              >
                <FormField
                  control={forgotForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="you@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex gap-2">
                  <Button
                    type="submit"
                    className="flex-1"
                    disabled={forgotLoading}
                  >
                    Send Reset
                    {forgotLoading && (
                      <Loader className="ml-2 animate-spin" size={16} />
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setForgotOpen(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}