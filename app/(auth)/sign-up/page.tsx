"use client";

import AuthForm from "@/components/AuthForm";
import { signUp } from "@/lib/actions/auth";
import { signUpSchema } from "@/lib/validation";
import React from "react";

const page = () => {
  return (
    <AuthForm
      type="SIGN_UP"
      schema={signUpSchema}
      defaultValues={{
        email: "",
        password: "",
        fullName: "",
        universityId: 0, // Update the type to number and provide a default value
        universityCard: "",
      }}
      onSubmit={signUp}
    />
  );
};

export default page;
