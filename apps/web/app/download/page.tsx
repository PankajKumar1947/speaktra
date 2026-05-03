import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { Smartphone, Download, CheckCircle2 } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Download App - Speaktra",
  description: "Download the Speaktra mobile app for iOS and Android.",
};

export default function DownloadPage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-surface-alt to-background overflow-hidden flex flex-col">
      <Navbar />

      {/* Background Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(14,165,233,0.08),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(249,115,22,0.06),transparent_40%)] pointer-events-none" />

      <main className="relative flex-1 pt-12 pb-12 flex flex-col">
        <div className="container mx-auto max-w-7xl px-4 flex flex-col lg:flex-row items-center lg:items-start justify-between gap-12 pt-8 lg:pt-12">
          {/* Left Content */}
          <div className="flex-1 space-y-8 text-center lg:text-left z-10 lg:mt-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-secondary/10 text-brand-secondary font-medium text-sm border border-brand-secondary/20">
              <Smartphone className="size-4" />
              <span>Mobile App Now Available</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
              Practice Anywhere, <br className="hidden lg:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-secondary to-orange-400">
                Anytime.
              </span>
            </h1>

            <ul className="space-y-4 max-w-md mx-auto lg:mx-0 text-left">
              {[
                "Daily domain-specific vocabulary",
                "Interactive voice conversations",
                "Real-time pronunciation feedback",
                "Offline practice mode",
              ].map((feature, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 text-foreground"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <CheckCircle2 className="size-5 text-brand-secondary shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row items-center gap-4 pt-6 justify-center lg:justify-start">
              <button className="flex items-center justify-center gap-3 bg-foreground text-background px-6 py-4 rounded-xl font-semibold hover:scale-105 transition-transform w-full sm:w-auto shadow-xl">
                <Download className="size-5" />
                <div className="text-left flex flex-col">
                  <span className="text-[10px] uppercase opacity-80 mb-1">
                    Download on the
                  </span>
                  <span className="text-base">App Store</span>
                </div>
              </button>

              <button className="flex items-center justify-center gap-3 bg-foreground text-background px-6 py-4 rounded-xl font-semibold hover:scale-105 transition-transform w-full sm:w-auto shadow-xl">
                <Download className="size-5" />
                <div className="text-left flex flex-col">
                  <span className="text-[10px] uppercase opacity-80 mb-1">
                    Get it on
                  </span>
                  <span className="text-base">Google Play</span>
                </div>
              </button>
            </div>
          </div>

          {/* Right Content - Mock Device */}
          <div className="flex-shrink-0 w-full max-w-[280px] sm:max-w-[320px] lg:w-[340px] mt-12 lg:mt-0 relative z-10 mx-auto">
            <div className="relative mx-auto w-full aspect-[9/16] rounded-[3rem] border-[8px] border-foreground/10 bg-card shadow-2xl overflow-hidden group hover:scale-105 transition-transform duration-500">
              {/* Device Notch */}
              <div className="absolute top-0 inset-x-0 h-6 bg-foreground/10 rounded-b-3xl w-1/2 mx-auto z-20"></div>

              {/* App Screen Content */}
              <div className="absolute inset-0 bg-gradient-to-br from-surface-alt to-background flex flex-col p-6 pt-12">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-tight">
                      Hello,
                    </span>
                    <span className="text-sm font-extrabold text-foreground leading-none">
                      Pankaj
                    </span>
                  </div>
                  <div className="size-8 rounded-full bg-brand-secondary/20 flex items-center justify-center">
                    <div className="size-4 bg-brand-secondary rounded-full"></div>
                  </div>
                </div>

                <div className="h-32 rounded-2xl bg-gradient-to-r from-orange-400/90 to-brand-secondary/90 mb-6 shadow-inner p-4 flex flex-col justify-end">
                  <span className="text-white/80 text-[10px] font-bold uppercase tracking-wider mb-1">
                    Today's Focus
                  </span>
                  <span className="text-white text-xl font-bold">
                    Daily Challenge
                  </span>
                </div>

                <div className="space-y-4 flex-1">
                  {[
                    {
                      title: "Vocabulary",
                      desc: "Domain-specific words",
                      icon: (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-brand-secondary"
                        >
                          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                        </svg>
                      ),
                      bg: "bg-brand-secondary/10",
                    },
                    {
                      title: "Sentences",
                      desc: "Corporate scenarios",
                      icon: (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-orange-400"
                        >
                          <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
                        </svg>
                      ),
                      bg: "bg-orange-400/10",
                    },
                    {
                      title: "Articles",
                      desc: "Business reading",
                      icon: (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-sky-500"
                        >
                          <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
                          <path d="M18 14h-8" />
                          <path d="M15 18h-5" />
                          <path d="M10 6h8v4h-8V6Z" />
                        </svg>
                      ),
                      bg: "bg-sky-500/10",
                    },
                    {
                      title: "Conversation",
                      desc: "Interactive AI tutor",
                      icon: (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-emerald-500"
                        >
                          <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                          <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                          <line x1="12" x2="12" y1="19" y2="22" />
                        </svg>
                      ),
                      bg: "bg-emerald-500/10",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-4 bg-card/80 p-3 rounded-xl border border-border/50 shadow-sm backdrop-blur-sm"
                    >
                      <div
                        className={`size-10 rounded-lg ${item.bg} flex items-center justify-center shrink-0`}
                      >
                        {item.icon}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-semibold text-foreground">
                          {item.title}
                        </div>
                        <div className="text-xs text-muted-foreground mt-0.5">
                          {item.desc}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-tr from-brand-secondary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
              </div>
            </div>

            {/* Decorative blurs behind the phone */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 aspect-square bg-brand-secondary/20 blur-[100px] rounded-full z-0 pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-1/2 aspect-square bg-orange-400/20 blur-[80px] rounded-full z-0 pointer-events-none"></div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
