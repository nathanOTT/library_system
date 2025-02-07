"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
  useForm,
  UseFormReturn,
} from "react-hook-form";
import { z, ZodType } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import React from "react";
import Link from "next/link";
import { FIELD_NAMES, FIELD_TYPES } from "@/app/constants";
import ImageUpload from "./ImageUpload";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

interface AuthProps<T extends FieldValues> {
  schema: ZodType<T>;
  defaultValues: T;
  onSubmit: (data: T) => Promise<{ success: boolean; error?: string }>;
  type: "SIGN_IN" | "SIGN_UP";
}

const AuthForm = <T extends FieldValues>({
  type,
  schema,
  defaultValues,
  onSubmit,
}: AuthProps<T>) => {
  const router = useRouter();
  const isSignIn = type === "SIGN_IN";
  const form: UseFormReturn<T> = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  // 2. Define a submit handler.
  const handleSubmit: SubmitHandler<T> = async (data) => {
    const response = await onSubmit(data);
    if (response && response.success) {
      toast({
        title: "Successfully signed in",
        description: isSignIn
          ? "You have successfully signed in"
          : "You have successfully created an account",
      });
      router.push("/");
    } else {
      toast({
        title: `Error ${isSignIn ? "signing in" : "creating account"}`,
        description: response.error || "An unknown error occurred",
        variant: "destructive",
        duration: 5000,
      });
    }
  };
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-semibold text-gray-300">
        {isSignIn
          ? "Welcome back to Library System"
          : "Create your Library System account"}
      </h1>
      <p className="text-gray-300">
        {isSignIn
          ? "Access vast collection of books and start borrowing"
          : "Please complete all fields to gain access to the library system"}
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-6 w-full"
        >
          {Object.keys(defaultValues).map((field) => (
            <FormField
              key={field}
              control={form.control}
              name={field as Path<T>}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="capitalize">
                    {FIELD_NAMES[field.name as keyof typeof FIELD_NAMES]}
                  </FormLabel>
                  <FormControl>
                    {field.name === "universityCard" ? (
                      <ImageUpload onFileChange={field.onChange} />
                    ) : (
                      <Input
                        required
                        type={
                          FIELD_TYPES[field.name as keyof typeof FIELD_TYPES]
                        }
                        autoComplete="on"
                        {...field}
                        className="form-input"
                        value={field.value}
                      />
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button type="submit" className="form-btn">
            {isSignIn ? "Sign in" : "Create account"}
          </Button>
        </form>
      </Form>
      <p className="text-center text-base font-medium">
        {isSignIn ? "New to Library System? " : "Already have an account? "}
        <Link
          href={isSignIn ? "/sign-up" : "/sign-in"}
          className="font-bold text-primary-500"
        >
          {isSignIn ? "Create an account" : "Sign in"}
        </Link>
      </p>
    </div>
  );
};

export default AuthForm;
