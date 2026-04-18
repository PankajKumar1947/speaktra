"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Testimonials", href: "#testimonials" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-2 left-0 right-0 z-50 transition-all duration-300 rounded-2xl container mx-auto px-4 sm:px-6 max-w-7xl ${
        scrolled ? "bg-white/70 backdrop-blur-xl shadow-md" : "bg-transparent"
      }`}
    >
      <div className="">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative h-10 transition-transform group-hover:scale-105">
              <img
                src="/logo-text.png"
                alt="Speaktra"
                className="h-full w-auto object-contain"
              />
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-base text-foreground-muted hover:text-brand-primary transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Button
              variant="ghost"
              className="text-base text-foreground-muted hover:text-brand-heading px-4 py-3"
            >
              Sign In
            </Button>
            <Button className="text-base bg-brand-secondary hover:brightness-110 text-white px-5 py-4 transition-all">
              Get Started
            </Button>
          </div>

          <button
            className="md:hidden p-2 text-slate-600"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden bg-white border-t border-slate-200">
            <nav className="py-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-base text-foreground-muted py-3 px-4 rounded-lg hover:bg-surface-alt transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex gap-3 pt-4 border-t border-slate-100 mt-2">
                <Button
                  variant="ghost"
                  className="flex-1 text-foreground-muted py-4"
                >
                  Sign In
                </Button>
                <Button className="flex-1 bg-brand-secondary hover:brightness-110 text-white py-4">
                  Get Started
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
