"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ContactTopic,
  CreateContactMessage,
  CreateContactMessageSchema,
} from "@repo/schema";
import { useCreateContactMessage } from "@repo/query";
import { toast } from "sonner";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const topics: { value: ContactTopic; label: string }[] = [
  { value: ContactTopic.GENERAL, label: "General question" },
  { value: ContactTopic.SUPPORT, label: "Account or technical support" },
  { value: ContactTopic.FEEDBACK, label: "Product feedback" },
  { value: ContactTopic.PARTNERSHIP, label: "Partnership or press" },
  { value: ContactTopic.BUG, label: "Report a bug" },
];

const labelClassName = "mb-1.5 block text-sm font-medium text-foreground";

export function ContactForm() {
  const [isSent, setIsSent] = useState(false);
  const { mutate: sendMessage, isPending } = useCreateContactMessage();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<CreateContactMessage>({
    resolver: zodResolver(CreateContactMessageSchema),
    defaultValues: {
      name: "",
      email: "",
      topic: ContactTopic.GENERAL,
      subject: "",
      message: "",
    },
  });

  const messageLength = watch("message")?.length ?? 0;

  const onSubmit = (data: CreateContactMessage) => {
    sendMessage(data, {
      onSuccess: () => {
        setIsSent(true);
        reset();
        toast.success("Message sent! We'll get back to you soon.");
      },
      onError: (error: Error) => {
        toast.error(
          error.message ||
            "Could not send your message. Please try again or email us directly.",
        );
      },
    });
  };

  if (isSent) {
    return (
      <div className="flex h-full flex-col items-center justify-center rounded-3xl border border-border bg-card p-8 text-center shadow-xl">
        <div className="mb-5 flex size-14 items-center justify-center rounded-full bg-emerald-500/10">
          <CheckCircle2 className="size-7 text-emerald-500" />
        </div>
        <h3 className="text-xl font-bold text-foreground">Message sent!</h3>
        <p className="mt-2 max-w-sm text-foreground-muted">
          Thanks for reaching out. Our team usually replies within one business
          day.
        </p>
        <Button
          variant="outline"
          className="mt-6 h-11 px-6"
          onClick={() => setIsSent(false)}
        >
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-xl sm:p-8">
      <h2 className="text-2xl font-bold text-foreground">Send us a message</h2>
      <p className="mt-1 mb-6 text-sm text-foreground-muted">
        Fill in the form below and we&apos;ll get back to you.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className={labelClassName}>
              Name
            </label>
            <Input
              id="name"
              placeholder="Your name"
              className="h-11"
              aria-invalid={!!errors.name}
              {...register("name")}
            />
            {errors.name && (
              <p className="mt-1 text-xs text-destructive">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="email" className={labelClassName}>
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="h-11"
              aria-invalid={!!errors.email}
              {...register("email")}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-destructive">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="topic" className={labelClassName}>
            Topic
          </label>
          <select
            id="topic"
            className="h-11 w-full rounded-lg border border-input bg-transparent px-3 text-sm text-foreground outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30"
            aria-invalid={!!errors.topic}
            {...register("topic")}
          >
            {topics.map((topic) => (
              <option key={topic.value} value={topic.value}>
                {topic.label}
              </option>
            ))}
          </select>
          {errors.topic && (
            <p className="mt-1 text-xs text-destructive">
              {errors.topic.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="subject" className={labelClassName}>
            Subject
          </label>
          <Input
            id="subject"
            placeholder="How can we help?"
            className="h-11"
            aria-invalid={!!errors.subject}
            {...register("subject")}
          />
          {errors.subject && (
            <p className="mt-1 text-xs text-destructive">
              {errors.subject.message}
            </p>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="message" className={labelClassName}>
              Message
            </label>
            <span className="mb-1.5 text-xs text-muted-foreground">
              {messageLength}/2000
            </span>
          </div>
          <Textarea
            id="message"
            placeholder="Tell us a bit more..."
            className="min-h-32"
            aria-invalid={!!errors.message}
            {...register("message")}
          />
          {errors.message && (
            <p className="mt-1 text-xs text-destructive">
              {errors.message.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          size="lg"
          disabled={isPending}
          className="h-11 w-full bg-brand-secondary text-white transition-all hover:brightness-110"
        >
          {isPending ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send className="size-4" />
              Send Message
            </>
          )}
        </Button>

        <p className="text-center text-xs text-muted-foreground">
          Prefer email? Write to{" "}
          <a
            href="mailto:support@speaktra.com"
            className="font-medium text-brand-secondary hover:underline"
          >
            support@speaktra.com
          </a>
        </p>
      </form>
    </div>
  );
}
