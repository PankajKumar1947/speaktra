import {
  Briefcase,
  Mic,
  Target,
  TrendingUp,
  Brain,
  BarChart3,
} from "lucide-react";

const features = [
  {
    icon: Briefcase,
    title: "Domain-Specific",
    description:
      "Customized vocabulary for Corporate, IT, Sales, Healthcare and more.",
  },
  {
    icon: Mic,
    title: "Speaking-First",
    description:
      "Priority on verbal practice over passive learning every session.",
  },
  {
    icon: Target,
    title: "Daily Structure",
    description:
      "Words → Sentences → Reading → Speaking flow for consistent progress.",
  },
  {
    icon: Brain,
    title: "AI Feedback",
    description: "Fluency scores, grammar suggestions, and vocabulary tips.",
  },
  {
    icon: TrendingUp,
    title: "Progress Tracking",
    description:
      "Monitor speaking time, vocabulary growth, and confidence scores.",
  },
  {
    icon: BarChart3,
    title: "Professional UI",
    description: "Adult-first, distraction-free design for busy professionals.",
  },
];

export function FeaturesGrid() {
  return (
    <section id="features" className="py-24 bg-slate-50">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-secondary/10 text-brand-secondary text-sm font-medium mb-4">
            Features
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Everything You Need to{" "}
            <span className="text-brand-secondary">Excel</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-xl mx-auto">
            Built specifically for working professionals who want real results.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative p-8 rounded-2xl bg-white border border-slate-200 hover:border-brand-secondary/30 hover:shadow-xl hover:shadow-brand-secondary/5 transition-all duration-300"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand-secondary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 ${
                    [
                      "bg-sky-100 text-sky-600",
                      "bg-orange-100 text-orange-600",
                      "bg-sky-100 text-sky-600",
                      "bg-amber-100 text-amber-600",
                      "bg-emerald-100 text-emerald-600",
                      "bg-cyan-100 text-cyan-600",
                    ][index]
                  }`}
                >
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-3 group-hover:text-brand-secondary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-base text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
