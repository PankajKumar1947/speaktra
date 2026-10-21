import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  Briefcase,
  CheckCircle2,
  Compass,
  Mic,
  Quote,
  Star,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About Us - Speaktra",
  description:
    "Speaktra is a speaking-first English practice app for working professionals, with domain-specific vocabulary and daily lessons that fit into a busy workday.",
};

const stats = [
  { value: "10K+", label: "Professionals practicing" },
  { value: "4.9/5", label: "Average app rating" },
  { value: "7", label: "Workplace domains" },
  { value: "15–20", label: "Minutes a day" },
];

const domains = [
  "Technology",
  "Business",
  "Finance",
  "Medical",
  "Law",
  "Science",
  "Academics",
];

const beliefs = [
  "Speaking beats scrolling — active practice every session.",
  "Context matters — learn the English your job actually uses.",
  "Small sessions, real consistency — progress compounds daily.",
  "Adults deserve adult design — focused, not childish.",
];

const values = [
  {
    icon: Mic,
    title: "Practice over theory",
    description:
      "Every feature is designed to get you talking, not just reading about how to talk. You learn by speaking from the very first lesson.",
    color: "bg-sky-100 text-sky-600",
  },
  {
    icon: Briefcase,
    title: "Real workplace context",
    description:
      "Vocabulary, sentences, and reading exercises are drawn from your domain, so what you practice is what you use at work tomorrow.",
    color: "bg-orange-100 text-orange-600",
  },
  {
    icon: Target,
    title: "Feedback you can act on",
    description:
      "Clear fluency and pronunciation feedback after each attempt shows you exactly what to fix, instead of leaving you guessing.",
    color: "bg-amber-100 text-amber-600",
  },
  {
    icon: TrendingUp,
    title: "Progress you can see",
    description:
      "Streaks, scores, and vocabulary growth make improvement visible — so the habit feels worth keeping.",
    color: "bg-emerald-100 text-emerald-600",
  },
];

const audiences = [
  {
    icon: Users,
    title: "Working professionals",
    description:
      "If you lead meetings, present to clients, or collaborate across time zones in English, daily practice keeps you sharp and confident.",
    color: "bg-sky-100 text-sky-600",
  },
  {
    icon: Compass,
    title: "Job seekers",
    description:
      "Prepare for interviews and workplace conversations with practice that mirrors the way professionals actually speak.",
    color: "bg-orange-100 text-orange-600",
  },
  {
    icon: Briefcase,
    title: "Teams & organizations",
    description:
      "Communication is a shared skill. Speaktra helps teams build a common, practical standard of professional English.",
    color: "bg-emerald-100 text-emerald-600",
  },
];

export default function AboutPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-gradient-to-b from-surface-alt via-surface-alt to-background pt-28 pb-16 sm:pt-36">
        {/* Grid pattern */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(14,165,233,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(14,165,233,0.06)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_75%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(14,165,233,0.08),transparent_50%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(249,115,22,0.06),transparent_40%)]" />

        {/* Oversized wordmark */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-4 left-1/2 -translate-x-1/2 select-none text-[20vw] font-black leading-none tracking-tighter text-brand-primary/[0.04] sm:-bottom-10 sm:text-[16vw]"
        >
          SPEAKTRA
        </div>

        <div className="container relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto max-w-4xl text-center">
            <div className="flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-brand-secondary/50 sm:w-12" />
              <span className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-secondary">
                About Speaktra
              </span>
              <span className="h-px w-8 bg-brand-secondary/50 sm:w-12" />
            </div>

            <h1 className="mt-7 text-4xl font-bold leading-[1.05] text-foreground sm:text-5xl lg:text-6xl">
              We help professionals find their{" "}
              <span className="bg-gradient-to-r from-brand-secondary to-orange-400 bg-clip-text text-transparent">
                voice at work
              </span>
            </h1>

            <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
              Speaktra is a speaking-first English practice app for people who
              use English every day — in meetings, interviews, presentations,
              and client calls.
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/register">
                <Button
                  size="lg"
                  className="w-full bg-brand-secondary px-8 py-4 text-lg text-white shadow-lg shadow-brand-secondary/25 transition-all hover:brightness-110 hover:shadow-xl"
                >
                  Get Started
                  <ArrowRight className="size-5" />
                </Button>
              </Link>
              <a href="#mission">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full border-border px-8 py-4 text-lg text-muted-foreground hover:bg-accent"
                >
                  Explore our story
                  <ArrowDown className="size-5" />
                </Button>
              </a>
            </div>
          </div>

          {/* Stat band */}
          <dl className="mx-auto mt-16 grid max-w-5xl grid-cols-2 gap-y-8 border-y border-border/80 py-9 sm:grid-cols-4 sm:divide-x sm:divide-border/80">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col-reverse px-4 text-center"
              >
                <dt className="mt-2 text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  {stat.label}
                </dt>
                <dd className="text-3xl font-bold text-foreground sm:text-4xl">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>

          {/* Domain strip */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2 pb-2">
            <span className="mr-1 text-sm font-medium text-muted-foreground">
              Practice for
            </span>
            {domains.map((domain) => (
              <span
                key={domain}
                className="rounded-full border border-border bg-card px-3 py-1 text-sm text-muted-foreground"
              >
                {domain}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section
        id="mission"
        className="relative scroll-mt-24 overflow-hidden bg-muted py-24"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(249,115,22,0.06),transparent_40%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(14,165,233,0.05),transparent_40%)]" />

        <div className="container relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-brand-secondary/10 px-3 py-1 text-sm font-medium text-brand-secondary">
                Our Mission
              </div>
              <h2 className="mb-6 mt-4 text-3xl font-bold text-foreground sm:text-4xl">
                Why we built{" "}
                <span className="text-brand-secondary">Speaktra</span>
              </h2>
              <div className="space-y-5 text-lg leading-relaxed text-muted-foreground">
                <p>
                  Most English apps are built for casual learners: cartoon
                  characters, generic dialogues, and endless multiple-choice
                  drills. But the English that matters at work is different —
                  it&apos;s the vocabulary of your industry, the rhythm of a
                  status update, and the confidence to speak up when it counts.
                </p>
                <p>
                  Speaktra was built to close that gap. Every daily lesson is
                  shaped around situations working adults actually face, with
                  domain-specific vocabulary and speaking practice that mirrors
                  real conversations.
                </p>
                <p>
                  Our goal is simple: 15–20 focused minutes a day that make you
                  a little more fluent — and a lot more confident — at work.
                </p>
              </div>
            </div>

            <div className="relative rounded-3xl border border-border bg-card p-8 shadow-xl sm:p-10">
              <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-brand-secondary/5 via-transparent to-transparent" />
              <div className="relative">
                <h3 className="text-2xl font-bold text-foreground">
                  What we believe
                </h3>
                <ul className="mt-6 space-y-5">
                  {beliefs.map((belief) => (
                    <li key={belief} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 size-6 shrink-0 text-brand-secondary" />
                      <span className="text-base leading-relaxed text-muted-foreground">
                        {belief}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="relative overflow-hidden bg-background py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(249,115,22,0.05),transparent_70%)]" />

        <div className="container relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-brand-secondary/10 px-3 py-1 text-sm font-medium text-brand-secondary">
              What Guides Us
            </div>
            <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
              Principles Behind Every{" "}
              <span className="text-brand-secondary">Lesson</span>
            </h2>
            <p className="mx-auto max-w-xl text-lg text-muted-foreground">
              We keep the product focused on one outcome: helping you speak more
              clearly and confidently at work.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8">
            {values.map((value) => (
              <div
                key={value.title}
                className="group relative rounded-2xl border border-border bg-card p-8 transition-all duration-300 hover:border-brand-secondary/30 hover:shadow-xl hover:shadow-brand-secondary/5"
              >
                <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-brand-secondary/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative">
                  <div
                    className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110 ${value.color}`}
                  >
                    <value.icon className="size-7" />
                  </div>
                  <h3 className="mb-3 text-xl font-semibold text-foreground transition-colors group-hover:text-brand-secondary">
                    {value.title}
                  </h3>
                  <p className="text-base leading-relaxed text-muted-foreground">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="relative overflow-hidden bg-muted py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,rgba(249,115,22,0.04),transparent_50%)]" />

        <div className="container relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-brand-secondary/10 px-3 py-1 text-sm font-medium text-brand-secondary">
              Who It&apos;s For
            </div>
            <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
              Built for People Who{" "}
              <span className="text-brand-secondary">Work in English</span>
            </h2>
            <p className="mx-auto max-w-xl text-lg text-muted-foreground">
              Speaktra fits into a real workday — not the other way around.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {audiences.map((audience) => (
              <div
                key={audience.title}
                className="group relative rounded-2xl border border-border bg-card p-8 transition-all duration-300 hover:border-brand-secondary/30 hover:shadow-xl hover:shadow-brand-secondary/5"
              >
                <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-brand-secondary/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative">
                  <div
                    className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110 ${audience.color}`}
                  >
                    <audience.icon className="size-7" />
                  </div>
                  <h3 className="mb-3 text-xl font-semibold text-foreground transition-colors group-hover:text-brand-secondary">
                    {audience.title}
                  </h3>
                  <p className="text-base leading-relaxed text-muted-foreground">
                    {audience.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="relative overflow-hidden bg-background py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(14,165,233,0.05),transparent_60%)]" />

        <div className="container relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto max-w-3xl">
            <div className="relative rounded-3xl border border-border bg-card p-8 shadow-xl sm:p-12">
              <Quote className="absolute right-6 top-6 size-14 text-brand-secondary/30 sm:right-8" />
              <div className="relative">
                <div className="mb-6 flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="size-5 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <blockquote className="text-xl font-medium leading-relaxed text-foreground sm:text-2xl">
                  &ldquo;Speaktra transformed how I present in meetings. After 3
                  months, I speak with confidence and my team actually listens
                  to my ideas now.&rdquo;
                </blockquote>
                <div className="mt-8 flex items-center gap-4 border-t border-border pt-6">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-primary font-semibold text-white shadow-md">
                    PS
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-foreground">
                      Priya Sharma
                    </p>
                    <p className="text-base text-muted-foreground">
                      Project Manager at Infosys
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-muted py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(249,115,22,0.05),transparent_50%)]" />

        <div className="container relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="relative rounded-3xl border border-border bg-card p-8 text-center shadow-xl sm:p-12">
            <div className="pointer-events-none absolute right-0 top-0 size-64 -translate-y-1/2 translate-x-1/2 rounded-full bg-brand-secondary/10 blur-3xl" />
            <div className="pointer-events-none absolute bottom-0 left-0 size-48 -translate-x-1/2 translate-y-1/2 rounded-full bg-sky-500/5 blur-3xl" />

            <div className="relative mx-auto max-w-2xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-brand-secondary/10 px-4 py-2 text-sm font-semibold text-brand-secondary">
                <span className="h-2 w-2 animate-pulse rounded-full bg-brand-secondary" />
                Start Free Today
              </div>

              <h2 className="mb-6 text-3xl font-bold leading-tight text-foreground sm:text-4xl">
                Ready to Speak{" "}
                <span className="text-brand-secondary">Confidently</span> at
                Work?
              </h2>
              <p className="mb-8 text-lg text-muted-foreground">
                Start with a free account and a 15-minute daily practice habit.
                Questions? We&apos;re happy to help.
              </p>

              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Link href="/register">
                  <Button
                    size="lg"
                    className="w-full bg-brand-secondary px-8 py-4 text-lg text-white shadow-lg shadow-brand-secondary/30 transition-all hover:brightness-110 hover:shadow-xl"
                  >
                    Get Started
                    <ArrowRight className="size-5" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full border-border px-8 py-4 text-lg text-muted-foreground hover:bg-accent"
                  >
                    Contact us
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative mt-10 flex flex-col items-center justify-center gap-4 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-emerald-500" />
                <span>Free to start</span>
              </div>
              <div className="hidden h-4 w-px bg-border sm:block" />
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-emerald-500" />
                <span>No credit card required</span>
              </div>
              <div className="hidden h-4 w-px bg-border sm:block" />
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-emerald-500" />
                <span>Fits into your workday</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
