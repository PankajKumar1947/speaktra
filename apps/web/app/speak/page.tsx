import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { ProtectedRoute } from "@/components/common/protected-route";
import { Mic } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Speak - Speaktra",
  description: "Daily conversation practice based on your past conversations.",
};

export default function SpeakPage() {
  return (
    <ProtectedRoute>
      <div className="relative min-h-screen bg-gradient-to-b from-surface-alt to-background overflow-hidden flex flex-col">
        <Navbar />

        {/* Background Gradients matching Hero */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(14,165,233,0.08),transparent_50%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(249,115,22,0.06),transparent_40%)] pointer-events-none" />

        <main className="relative flex-1 pt-20 pb-12">
          <div className="container mx-auto max-w-7xl px-4 flex flex-col items-center justify-center h-full min-h-[60vh]">
            <div className="bg-card border border-border rounded-3xl p-12 shadow-2xl w-full text-center relative overflow-hidden group">
              {/* Subtle glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10 flex flex-col items-center">
                <div className="h-20 w-20 bg-brand-secondary/10 text-brand-secondary rounded-2xl flex items-center justify-center mb-6 shadow-inner">
                  <Mic className="size-10" />
                </div>

                <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                  Conversational{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-secondary to-orange-400">
                    AI Tutor
                  </span>
                </h1>

                <div className="inline-block bg-brand-secondary/10 text-brand-secondary px-3 py-1 rounded-full text-sm font-semibold tracking-wide uppercase mb-6">
                  Coming Soon
                </div>

                <p className="text-muted-foreground text-lg mb-8 max-w-lg mx-auto leading-relaxed">
                  This page will handle daily, interactive voice conversations
                  with you. Based on your past progress and domain, it will
                  tailor scenarios to help you build confidence in real-world
                  professional environments.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mt-4 border-t border-border pt-8 text-left">
                  <div className="p-5 bg-muted/30 rounded-xl border border-border/50 hover:bg-muted/50 transition-colors">
                    <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-brand-secondary"></span>
                      Adaptive Scenarios
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Practice everything from job interviews to sprint
                      planning.
                    </p>
                  </div>
                  <div className="p-5 bg-muted/30 rounded-xl border border-border/50 hover:bg-muted/50 transition-colors">
                    <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-orange-400"></span>
                      Real-time Feedback
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Get instant corrections on your pronunciation and
                      phrasing.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </ProtectedRoute>
  );
}
