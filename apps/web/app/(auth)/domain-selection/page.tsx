import type { Metadata } from "next";
import { AuthLayout } from "../_components/auth-layout";
import { DomainSelectionForm } from "../_components/domain-selection-form";

export const metadata: Metadata = {
  title: "Select Domain | Speaktra",
  description: "Choose your professional domain to personalize your learning",
};

export default function DomainSelectionPage() {
  return (
    <AuthLayout stepLabel="Step 1 of 3">
      <DomainSelectionForm />
    </AuthLayout>
  );
}
