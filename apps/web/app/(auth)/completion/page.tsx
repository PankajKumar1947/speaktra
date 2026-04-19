import type { Metadata } from "next";
import { AuthLayout } from "../_components/auth-layout";
import { CompletionForm } from "../_components/completion-form";

export const metadata: Metadata = {
  title: "Complete | Speaktra",
  description: "You're all set to start learning English",
};

export default function CompletionPage() {
  return (
    <AuthLayout>
      <CompletionForm />
    </AuthLayout>
  );
}
