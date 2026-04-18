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
    <section id="features" className="py-20 bg-slate-50">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="max-w-2xl mx-auto text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0C4A6E] mb-4">
            Everything You Need
          </h2>
          <p className="text-lg text-slate-600">
            Built specifically for working professionals who want real results.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-white hover:bg-slate-50 transition-colors cursor-pointer group"
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
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
                  <feature.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#0C4A6E] mb-2 group-hover:text-sky-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-base text-slate-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
