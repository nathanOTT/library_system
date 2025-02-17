"use server";

import { drizzleDb } from "@/database/drizzle";
import { registration } from "@/database/schema";
import { eq } from "drizzle-orm";
import { hash } from "bcryptjs";
import { signIn } from "@/auth";
import { AuthCredentials } from "@/types";

export const signInWithCredentials = async (
  params: Pick<AuthCredentials, "email" | "password">
) => {
  const { email, password } = params;

  if (!email || !password) {
    return { success: false, error: "Email and password are required" };
  }

  try {
    const user = await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
    });
    if (user?.error) {
      return { success: false, error: user.error };
    }
    return { success: true, error: "" };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: "Sign-In Error" }; // Consistent return type
    } else {
      return { success: false, error: "An unknown error occurred" };
    }
  }
};

export const signUp = async (params: AuthCredentials) => {
  const { email, password, fullName, universityId, universityCard } = params;

  if (!email || !password || !fullName || !universityId || !universityCard) {
    return { success: false, error: "" };
  }

  if (!email.includes("@")) {
    return { success: false, error: "" };
  }

  const existingUser = await drizzleDb
    .select()
    .from(registration)
    .where(eq(registration.email, email))
    .execute();
  if (existingUser.length > 0) {
    return { success: false, error: "User already exist" };
  }

  const hashedPassword = await hash(password, 10);
  if (!hashedPassword) {
    return { success: false, error: "" };
  }

  try {
    const newUser = await drizzleDb
      .insert(registration)
      .values({
        email,
        password: hashedPassword,
        fullName,
        universityId,
        universityCard,
      })
      .execute();
    console.log("newUser", newUser);

    if (!newUser) {
      return { success: false, error: "Failed to create registration" };
    }
    // ✅ Try logging in immediately after sign-up
    const signInResponse = await signInWithCredentials({ email, password });

    if (!signInResponse.success) {
      return { success: false, error: "Sign-in after registration failed." };
    }
    return { success: true, error: "" };
  } catch (error) {
    console.error("SignUp Error:", error);
    return { success: false, error: "An unexpected error occurred." }; // ✅ Properly handle errors
  }
};