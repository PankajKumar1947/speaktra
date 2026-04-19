"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "@repo/schema";
import { useRegister } from "@repo/query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { PasswordInput } from "./password-input";

export function RegisterForm() {
  const router = useRouter();
  const { mutate: register, isPending } = useRegister();

  type RegisterFormData = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  };

  const {
    register: registerField,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: RegisterFormData) => {
    const { name, email, password } = data;
    register({ name, email, password } as never, {
      onSuccess: () => {
        toast.success("Account created successfully!");
        router.push("/domain-selection");
      },
      onError: (error: Error) => {
        toast.error(error.message || "Registration failed");
      },
    });
  };

  return (
    <>
      <h2 className="text-xl font-bold text-foreground mb-1">Join Us</h2>
      <p className="text-foreground-muted text-sm mb-6">
        Create an account to start learning
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-1.5">
          <Input
            type="text"
            placeholder="Full Name"
            {...registerField("name")}
            className="h-11"
          />
          {errors.name && (
            <p className="text-xs text-destructive">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <Input
            type="email"
            placeholder="Email address"
            {...registerField("email")}
            className="h-11"
          />
          {errors.email && (
            <p className="text-xs text-destructive">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <PasswordInput
            placeholder="Password"
            register={registerField("password")}
            error={errors.password?.message}
          />
        </div>

        <div className="space-y-1.5">
          <PasswordInput
            placeholder="Confirm Password"
            register={registerField("confirmPassword")}
            error={errors.confirmPassword?.message}
          />
        </div>

        <Button
          type="submit"
          className="w-full h-11 bg-brand-secondary hover:brightness-110 text-white"
          disabled={isPending}
        >
          {isPending ? "Creating Account..." : "Create Account"}
        </Button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-foreground-muted">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-brand-secondary font-semibold hover:underline"
          >
            Login
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
