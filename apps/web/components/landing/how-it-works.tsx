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
    <section id="how-it-works" className="py-20 bg-white">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="max-w-2xl mx-auto text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0C4A6E] mb-4">
            How It Works
          </h2>
          <p className="text-lg text-slate-600">
            Follow a proven progression in just 15-20 minutes daily.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="text-center p-8 rounded-2xl bg-slate-50 hover:bg-sky-50 transition-colors"
            >
              <div className="w-14 h-14 mx-auto mb-5 rounded-xl bg-white border-2 border-slate-200 flex items-center justify-center">
                <step.icon className="w-6 h-6 text-sky-600" />
              </div>
              <span className="text-base font-medium text-slate-400 block mb-3">
                {step.number}
              </span>
              <h3 className="text-xl font-semibold text-[#0C4A6E] mb-2">
                {step.title}
              </h3>
              <p className="text-base text-slate-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <div className="inline-flex items-center gap-3 px-5 py-3 bg-sky-50 rounded-xl text-base">
            <span className="text-sky-700 font-medium">Daily Target:</span>
            <span className="text-slate-600">
              5 words • 5-10 sentences • 3-4 articles • 10-20 min
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
