import { BookOpen, MessageSquare, FileText, Mic } from "lucide-react";

const steps = [
  {
    icon: BookOpen,
    number: "01",
    title: "Learn Words",
    description: "Master domain-specific vocabulary with pronunciation.",
  },
  {
    icon: MessageSquare,
    number: "02",
    title: "Practice Sentences",
    description: "Build fluency with sentence patterns and recording.",
  },
  {
    icon: FileText,
    number: "03",
    title: "Read Articles",
    description: "Read professional paragraphs with audio support.",
  },
  {
    icon: Mic,
    number: "04",
    title: "Speak Daily",
    description: "Practice real-world topics with timed sessions.",
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-24 bg-white relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(249,115,22,0.05),transparent_70%)]" />
      <div className="container mx-auto px-6 max-w-7xl relative">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-secondary/10 text-brand-secondary text-sm font-medium mb-4">
            How It Works
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Your Daily{" "}
            <span className="text-brand-secondary">Progress Path</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-xl mx-auto">
            Follow a proven progression in just 15-20 minutes daily.
          </p>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-slate-300 to-transparent -translate-y-1/2" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative group">
                <div className="relative p-8 rounded-2xl bg-white border-2 border-slate-200 hover:border-brand-secondary/50 hover:shadow-2xl hover:shadow-brand-secondary/10 transition-all duration-300 text-center">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-gradient-to-br from-brand-secondary to-orange-400 text-white text-lg font-bold flex items-center justify-center shadow-lg shadow-brand-secondary/30 z-10">
                    {index + 1}
                  </div>

                  <div className="mt-2 mb-6">
                    <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 border-2 border-slate-200 flex items-center justify-center group-hover:scale-110 group-hover:shadow-lg transition-all duration-300">
                      <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center">
                        <step.icon className="w-6 h-6 text-brand-secondary" />
                      </div>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-slate-800 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {index < steps.length - 1 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-4 -translate-y-1/2 z-10">
                    <div className="w-8 h-8 rounded-full bg-white border-2 border-slate-300 flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-slate-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 p-6 bg-slate-50 rounded-2xl border border-slate-200">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-brand-secondary/10 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-brand-secondary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="text-left">
                <p className="font-semibold text-slate-900">Time Required</p>
                <p className="text-sm text-slate-500">15-20 minutes daily</p>
              </div>
            </div>

            <div className="hidden lg:block w-px h-12 bg-slate-300" />

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-brand-secondary/10 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-brand-secondary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
              <div className="text-left">
                <p className="font-semibold text-slate-900">
                  Expected Progress
                </p>
                <p className="text-sm text-slate-500">
                  Visible results in 30 days
                </p>
              </div>
            </div>

            <div className="hidden lg:block w-px h-12 bg-slate-300" />

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-brand-secondary/10 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-brand-secondary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="text-left">
                <p className="font-semibold text-slate-900">Certificate</p>
                <p className="text-sm text-slate-500">
                  Completion badge on completion
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
