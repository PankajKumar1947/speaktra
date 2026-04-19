import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";

export default function PracticeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-surface-alt to-background overflow-hidden">
      <Navbar />

      {/* Background Gradients matching Hero */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(14,165,233,0.08),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(249,115,22,0.06),transparent_40%)] pointer-events-none" />

      <main className="relative pt-20">
        <div className="container py-8 px-4 mx-auto max-w-7xl">{children}</div>
      </main>
      <Footer />
    </div>
  );
}
