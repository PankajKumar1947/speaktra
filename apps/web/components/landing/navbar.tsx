"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { useAuth } from "@/context/auth-context";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Practice", href: "/practice" },
  { label: "Speak", href: "#speak" },
  { label: "Download", href: "/download" },
];

export function Navbar() {
  const { isLoggedIn, logout } = useAuth();
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
        scrolled
          ? "bg-card/70 backdrop-blur-xl shadow-md border border-border"
          : "bg-transparent"
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
            <ThemeToggle />
            {isLoggedIn ? (
              <>
                <Link href="/practice">
                  <Button
                    variant="ghost"
                    className="text-base text-foreground-muted hover:text-brand-heading px-4 py-3"
                  >
                    Dashboard
                  </Button>
                </Link>
                <Button
                  onClick={logout}
                  className="text-base bg-brand-secondary hover:brightness-110 text-white px-5 py-4 transition-all"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button
                    variant="ghost"
                    className="text-base text-foreground-muted hover:text-brand-heading px-4 py-3"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link href="/register">
                  <Button className="text-base bg-brand-secondary hover:brightness-110 text-white px-5 py-4 transition-all">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>

          <button
            className="md:hidden p-2 text-foreground-muted"
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
          <div className="md:hidden bg-card border-t border-border">
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
              <div className="flex flex-col gap-3 pt-4 border-t border-border mt-2">
                <div className="flex items-center gap-2 mb-2">
                  <ThemeToggle />
                  <span className="text-sm text-foreground-muted px-2">
                    Theme
                  </span>
                </div>
                {isLoggedIn ? (
                  <>
                    <Link
                      href="/practice"
                      className="w-full"
                      onClick={() => setIsOpen(false)}
                    >
                      <Button
                        variant="ghost"
                        className="w-full text-foreground-muted py-4 justify-start"
                      >
                        Dashboard
                      </Button>
                    </Link>
                    <Button
                      onClick={() => {
                        logout();
                        setIsOpen(false);
                      }}
                      className="w-full bg-brand-secondary hover:brightness-110 text-white py-4"
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <div className="flex gap-3">
                    <Link
                      href="/login"
                      className="flex-1"
                      onClick={() => setIsOpen(false)}
                    >
                      <Button
                        variant="ghost"
                        className="w-full text-foreground-muted py-4"
                      >
                        Sign In
                      </Button>
                    </Link>
                    <Link
                      href="/register"
                      className="flex-1"
                      onClick={() => setIsOpen(false)}
                    >
                      <Button className="w-full bg-brand-secondary hover:brightness-110 text-white py-4">
                        Get Started
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
