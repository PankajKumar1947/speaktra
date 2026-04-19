"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { AuthLayout } from "../auth-layout";
import { CheckCircle2 } from "lucide-react";

export default function CompletionPage() {
  const router = useRouter();

  return (
    <AuthLayout>
      <div className="text-center">
        <div className="w-20 h-20 bg-brand-secondary rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-white" />
        </div>

        <h1 className="text-2xl font-bold text-foreground mb-2">
          You&apos;re All Set!
        </h1>
        <p className="text-foreground-muted mb-8">
          Your account has been created. Start your English learning journey
          now.
        </p>

        <Button
          onClick={() => router.push("/")}
          className="w-full h-11 bg-brand-secondary hover:brightness-110 text-white"
        >
          Go to Dashboard
        </Button>
      </div>
    </AuthLayout>
  );
}
