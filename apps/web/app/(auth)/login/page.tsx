import type { Metadata } from "next";
import { AuthLayout } from "../_components/auth-layout";
import { LoginForm } from "../_components/login-form";

export const metadata: Metadata = {
  title: "Login | Speaktra",
  description: "Sign in to continue your English learning journey",
};

export default function LoginPage() {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
}
