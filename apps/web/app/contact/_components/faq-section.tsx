"use client";

import Link from "next/link";
import { HelpCircle, Mail } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { faqs } from "../_data/faqs";

export function FaqSection() {
  return (
    <section
      id="faqs"
      className="scroll-mt-28 border-t border-border bg-muted/40 py-20"
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-secondary/20 bg-brand-secondary/10 px-4 py-2 text-sm font-semibold text-brand-secondary">
              <HelpCircle className="size-4" />
              FAQs
            </div>
            <h2 className="mt-5 text-3xl font-bold text-foreground sm:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-lg text-foreground-muted">
              Everything you need to know about practicing with Speaktra.
              Can&apos;t find what you&apos;re looking for? We&apos;re happy to
              help.
            </p>

            <div className="mt-8 rounded-2xl border border-border bg-card p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-foreground">
                Still have questions?
              </h3>
              <p className="mt-2 text-sm text-foreground-muted">
                Our support team replies within one business day.
              </p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <Link href="/contact#contact-form" className="sm:flex-1">
                  <Button className="w-full bg-brand-secondary text-white hover:brightness-110">
                    Ask a question
                  </Button>
                </Link>
                <a href="mailto:support@speaktra.com" className="sm:flex-1">
                  <Button variant="outline" className="w-full">
                    <Mail className="size-4" />
                    Email us
                  </Button>
                </a>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card px-5 shadow-sm sm:px-7">
            <Accordion defaultValue={["faq-1"]}>
              {faqs.map((faq, index) => (
                <AccordionItem key={faq.question} value={`faq-${index + 1}`}>
                  <AccordionTrigger className="py-5 text-base font-semibold text-foreground hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 pr-6 text-[15px] leading-relaxed text-foreground-muted">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
