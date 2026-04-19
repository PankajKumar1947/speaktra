import { Users, MessageCircle, Zap } from "lucide-react";

const problems = [
  {
    icon: Users,
    title: "Fear of Speaking",
    description:
      "Hesitate to share ideas in meetings because you're unsure about your pronunciation.",
  },
  {
    icon: MessageCircle,
    title: "Limited Vocabulary",
    description:
      "Struggle to find the right words in corporate conversations and presentations.",
  },
  {
    icon: Zap,
    title: "Hesitation & Stumbling",
    description:
      "Feel stuck mid-sentence while colleagues wait for your response.",
  },
];

export function ProblemSection() {
  return (
    <section className="py-24 bg-muted relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(249,115,22,0.06),transparent_40%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(14,165,233,0.05),transparent_40%)]" />

      <div className="container mx-auto px-6 max-w-7xl relative">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-secondary/10 text-brand-secondary text-sm font-medium mb-4">
            The Challenge
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Why Professional English Feels{" "}
            <span className="text-brand-secondary">Difficult</span>
          </h2>
          <p className="text-lg text-foreground-muted max-w-xl mx-auto">
            Existing apps feel childish or generic. They don't address the
            specific challenges working professionals face daily.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="group relative p-8 rounded-2xl bg-card border border-border hover:border-brand-secondary/30 hover:shadow-xl hover:shadow-brand-secondary/5 transition-all duration-300"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand-secondary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute -top-px -left-px w-16 h-16 bg-gradient-to-br from-brand-secondary/20 to-transparent rounded-tl-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative">
                <div className="w-14 h-14 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-brand-secondary/10 to-background border border-brand-secondary/20 flex items-center justify-center group-hover:border-brand-secondary/40 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-brand-secondary/20 transition-all duration-300">
                  <problem.icon className="w-6 h-6 text-brand-secondary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3 text-center group-hover:text-brand-secondary transition-all duration-300">
                  {problem.title}
                </h3>
                <p className="text-base text-foreground-muted leading-relaxed text-center">
                  {problem.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
