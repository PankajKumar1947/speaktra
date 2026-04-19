import type { Metadata } from "next";
import { AuthLayout } from "../_components/auth-layout";
import { RegisterForm } from "../_components/register-form";

export const metadata: Metadata = {
  title: "Register | Speaktra",
  description: "Create an account to start your English learning journey",
};

export default function RegisterPage() {
  return (
    <AuthLayout>
      <RegisterForm />
    </AuthLayout>
  );
}
