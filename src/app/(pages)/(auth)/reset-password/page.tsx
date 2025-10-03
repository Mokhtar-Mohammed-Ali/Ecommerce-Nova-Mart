"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useState } from "react";
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
import { Loader } from "lucide-react";
import toast from "react-hot-toast";

const resetSchema = z.object({
  newPassword: z.string().min(6, "Password must be at least 6 characters"),
});

type ResetSchema = z.infer<typeof resetSchema>;

export default function ResetPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const router = useRouter();

  useEffect(() => {
    const storedEmail = localStorage.getItem("resetEmail");
    if (!storedEmail) {
      toast.error("No email found, please start reset again.");
      router.push("/login");
    } else {
      setEmail(storedEmail);
    }
  }, [router]);

  const form = useForm<ResetSchema>({
    resolver: zodResolver(resetSchema),
    defaultValues: { newPassword: "" },
  });

  async function onSubmit(values: ResetSchema) {
    if (!email) return;
    setLoading(true);
    try {
      const res = await fetch(
        `https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, newPassword: values.newPassword }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        toast.success("Password reset successfully! Please login.");
        localStorage.removeItem("resetEmail");
        router.push("/login");
      } else {
        toast.error(data.message || "Failed to reset password");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-md shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">Reset Password</CardTitle>
          {email && (
            <p className="text-center text-sm text-muted-foreground">
              Enter your new password for: <span className="font-semibold">{email}</span>
            </p>
          )}
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={loading} className="w-full py-4">
                Reset Password {loading && <Loader className="ml-2 animate-spin" />}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
