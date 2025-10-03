
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
import { Loader } from "lucide-react";
import toast from "react-hot-toast";
import { signOut, useSession } from "next-auth/react";

// ✅ Validation Schema
const updateProfileSchema = z.object({
  name: z.string().min(3, "Name is required").optional(),
  email: z.string().email("Invalid email").optional(),
  phone: z.string().min(10, "Invalid phone number").optional(),
});

type UpdateProfileSchema = z.infer<typeof updateProfileSchema>;


export default function UpdateProfileForm({ defaultValues }: { defaultValues: UpdateProfileSchema }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<UpdateProfileSchema>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues,
  });


  async function onSubmit(values: UpdateProfileSchema) {
    setLoading(true);
    try {
      const res = await fetch("/api/update-profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
        credentials: "include"
      });

      const data = await res.json();

      if (res.ok && data.message === "success") {
  
        toast.success("Profile updated successfully! Please sign in with a new data");
       await signOut({ callbackUrl: "/login" });
       
      } else if (data.statusMsg === "fail") {
        toast.error(data.message || "Failed to update profile. Please login again.");
      } else {
        toast.error("Failed to update profile");
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  }

  
  return (
    <div className="flex flex-col justify-center items-center min-h-screen  bg-gray-50 dark:bg-gray-900">
      <Card className="w-full max-w-md shadow-lg rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold text-gray-900 dark:text-gray-100">
            Update Profile
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Name Field */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Your Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email Field */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="you@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Phone Field */}
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="01012345678" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full py-4 text-lg rounded-xl"
              >
                Update Profile {loading && <Loader className="ml-2 animate-spin" />}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
