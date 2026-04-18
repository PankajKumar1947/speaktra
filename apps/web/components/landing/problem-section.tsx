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
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="max-w-2xl mx-auto text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-heading mb-4">
            The Challenge
          </h2>
          <p className="text-lg text-foreground-muted">
            Existing apps feel childish or generic. They don't address the
            specific challenges working professionals face daily.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="text-center p-8 rounded-2xl bg-surface-muted/50 hover:bg-surface-muted transition-colors"
            >
              <div className="w-14 h-14 mx-auto mb-5 rounded-xl bg-brand-secondary/10 flex items-center justify-center">
                <problem.icon className="w-6 h-6 text-brand-secondary" />
              </div>
              <h3 className="text-xl font-semibold text-brand-heading mb-3">
                {problem.title}
              </h3>
              <p className="text-base text-foreground-muted leading-relaxed">
                {problem.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
