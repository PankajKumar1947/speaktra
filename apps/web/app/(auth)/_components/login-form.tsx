"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginBody, LoginSchema } from "@repo/schema";
import { useLogin } from "@repo/query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { PasswordInput } from "./password-input";

export function LoginForm() {
  const router = useRouter();
  const { mutate: login, isPending } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginBody>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginBody) => {
    login(data, {
      onSuccess: () => {
        toast.success("Login successful!");
        router.push("/domain-selection");
      },
      onError: (error: Error) => {
        toast.error(error.message || "Login failed");
      },
    });
  };

  const handleGoogleLogin = () => {
    router.push("/domain-selection");
  };

  return (
    <>
      <h2 className="text-xl font-bold text-foreground mb-1">Welcome Back</h2>
      <p className="text-foreground-muted text-sm mb-6">
        Sign in to continue your journey
      </p>

      <Button
        variant="outline"
        className="w-full mb-6 h-11 border-border text-foreground"
        onClick={handleGoogleLogin}
      >
        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="currentColor"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.96 21.02 7.68 23 12 23z"
          />
          <path
            fill="currentColor"
            d="M5.84 14.09c-.22-.66-.38-1.36-.38-2.09 0-.73.16-1.43.38-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="currentColor"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.68 1 3.96 3.02 2.18 6.84l2.85 2.86c.87-2.6 3.3-4.53 5.97-4.53z"
          />
        </svg>
        Continue with Google
      </Button>

      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 h-px bg-border" />
        <span className="text-xs text-foreground-muted">OR</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-1.5">
          <Input
            type="email"
            placeholder="Email address"
            {...register("email")}
            className="h-11"
          />
          {errors.email && (
            <p className="text-xs text-destructive">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <PasswordInput
            placeholder="Password"
            register={register("password")}
            error={errors.password?.message}
          />
        </div>

        <Button
          type="submit"
          className="w-full h-11 bg-brand-secondary hover:brightness-110 text-white"
          disabled={isPending}
        >
          {isPending ? "Loading..." : "Continue"}
        </Button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-foreground-muted">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="text-brand-secondary font-semibold hover:underline"
          >
            Register
          </Link>
        </p>
      </div>

      <p className="mt-6 text-xs text-foreground-muted text-center">
        By continuing, you agree to our{" "}
        <span className="text-brand-primary font-semibold">Terms</span> and{" "}
        <span className="text-brand-primary font-semibold">Privacy Policy</span>
      </p>
    </>
  );
}
