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

const verifySchema = z.object({
  resetCode: z.string().min(4, "Enter the 4-digit code sent to your email"),
});

type VerifySchema = z.infer<typeof verifySchema>;

export default function VerifyResetPage() {
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

  const form = useForm<VerifySchema>({
    resolver: zodResolver(verifySchema),
    defaultValues: { resetCode: "" },
  });

  async function onSubmit(values: VerifySchema) {
    setLoading(true);
    try {
      const res = await fetch(
        `https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ resetCode: values.resetCode }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        toast.success("Code verified! Reset your password.");
        router.push("/reset-password");
      } else {
        toast.error(data.message || "Invalid reset code");
      }
    } catch {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-md shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Verify Reset Code
          </CardTitle>
          {email && (
            <p className="text-center text-sm text-muted-foreground">
              Enter the code sent to: <span className="font-semibold">{email}</span>
            </p>
          )}
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="resetCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reset Code</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Enter code" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={loading} className="w-full py-4">
                Verify Code {loading && <Loader className="ml-2 animate-spin" />}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
