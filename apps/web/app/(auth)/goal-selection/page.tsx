import { Suspense } from "react";
import type { Metadata } from "next";
import { AuthLayout } from "../_components/auth-layout";
import { GoalSelectionForm } from "../_components/goal-selection-form";

export const metadata: Metadata = {
  title: "Select Goals | Speaktra",
  description: "Choose your learning goals to personalize your experience",
};

export default function GoalSelectionPage() {
  return (
    <AuthLayout stepLabel="Step 3 of 3">
      <Suspense fallback={null}>
        <GoalSelectionForm />
      </Suspense>
    </AuthLayout>
  );
}
