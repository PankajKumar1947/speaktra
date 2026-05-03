"use client";

import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { LoadingState } from "@/components/common/loading-state";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isReady, isLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isReady && !isLoggedIn) {
      router.replace("/login");
    }
  }, [isReady, isLoggedIn, router]);

  if (!isReady) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-background">
        <LoadingState text="Authenticating..." />
      </div>
    );
  }

  if (!isLoggedIn) {
    return null; // Will redirect in useEffect
  }

  return <>{children}</>;
}
