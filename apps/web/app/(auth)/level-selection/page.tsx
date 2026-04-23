import { Suspense } from "react";
import type { Metadata } from "next";
import { AuthLayout } from "../_components/auth-layout";
import { LevelSelectionForm } from "../_components/level-selection-form";

export const metadata: Metadata = {
  title: "Select Level | Speaktra",
  description: "Choose your current English proficiency level",
};

export default function LevelSelectionPage() {
  return (
    <AuthLayout stepLabel="Step 2 of 3">
      <Suspense fallback={null}>
        <LevelSelectionForm />
      </Suspense>
    </AuthLayout>
  );
}
