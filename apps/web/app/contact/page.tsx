import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Clock3,
  Mail,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { ContactForm } from "./_components/contact-form";
import { FaqSection } from "./_components/faq-section";
import { faqs } from "./_data/faqs";

export const metadata: Metadata = {
  title: "Contact Us - Speaktra",
  description:
    "Get in touch with the Speaktra team. Ask a question, share feedback, or find answers to frequently asked questions about practicing English with Speaktra.",
};

const contactChannels = [
  {
    icon: Mail,
    title: "Email support",
    value: "support@speaktra.com",
    description: "Account, billing, and technical questions.",
    href: "mailto:support@speaktra.com",
  },
  {
    icon: MessageSquare,
    title: "Feedback & partnerships",
    value: "hello@speaktra.com",
    description: "Product feedback, press, and collaboration ideas.",
    href: "mailto:hello@speaktra.com",
  },
  {
    icon: Clock3,
    title: "Support hours",
    value: "Mon–Fri, 9am–6pm IST",
    description: "We usually reply within one business day.",
    href: undefined,
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

function ChannelCard({
  channel,
}: {
  channel: (typeof contactChannels)[number];
}) {
  const Icon = channel.icon;

  const content = (
    <>
      <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-secondary/10 text-brand-secondary">
        <Icon className="size-5" />
      </div>
      <div className="min-w-0">
        <p className="text-sm text-foreground-muted">{channel.title}</p>
        <p className="font-semibold text-foreground transition-colors group-hover:text-brand-secondary">
          {channel.value}
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          {channel.description}
        </p>
      </div>
    </>
  );

  const className =
    "group flex gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm transition-all";

  if (channel.href) {
    return (
      <a
        href={channel.href}
        className={`${className} hover:border-brand-secondary/40 hover:shadow-md`}
      >
        {content}
      </a>
    );
  }

  return <div className={className}>{content}</div>;
}

export default function ContactPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-surface-alt to-background">
      <Navbar />

      {/* Background Gradients */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(14,165,233,0.08),transparent_45%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_30%,rgba(249,115,22,0.06),transparent_40%)]" />

      <main className="relative pt-28 pb-20">
        <section className="container mx-auto max-w-3xl px-4 text-center sm:px-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-secondary/20 bg-brand-secondary/10 px-4 py-2 text-sm font-semibold text-brand-secondary">
            <Sparkles className="size-4" />
            Contact us
          </div>
          <h1 className="mt-6 text-4xl font-bold text-foreground sm:text-5xl">
            We&apos;d love to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-secondary to-orange-400">
              hear from you
            </span>
          </h1>
          <p className="mt-5 text-lg text-foreground-muted">
            Questions about your practice, your account, or working with us?
            Send a message and our team will get back to you within one business
            day.
          </p>
        </section>

        <section className="container mx-auto mt-14 max-w-7xl px-4 sm:px-6">
          <div className="grid items-start gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="space-y-4">
              {contactChannels.map((channel) => (
                <ChannelCard key={channel.title} channel={channel} />
              ))}

              <Link
                href="#faqs"
                className="group flex items-center justify-between gap-4 rounded-2xl border border-brand-secondary/20 bg-brand-secondary/10 p-5 transition-all hover:border-brand-secondary/40 hover:bg-brand-secondary/15"
              >
                <div>
                  <p className="font-semibold text-foreground">
                    Looking for a quick answer?
                  </p>
                  <p className="mt-1 text-sm text-foreground-muted">
                    Browse the FAQs below — most questions are answered there.
                  </p>
                </div>
                <ArrowRight className="size-5 shrink-0 text-brand-secondary transition-transform group-hover:translate-x-1" />
              </Link>

              <p className="px-1 text-xs leading-relaxed text-muted-foreground">
                By contacting us you agree to our{" "}
                <span className="font-medium text-brand-primary">
                  Privacy Policy
                </span>
                . We only use your details to reply to your message.
              </p>
            </div>

            <div id="contact-form" className="scroll-mt-28">
              <ContactForm />
            </div>
          </div>
        </section>

        <div className="mt-20">
          <FaqSection />
        </div>
      </main>

      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </div>
  );
}
