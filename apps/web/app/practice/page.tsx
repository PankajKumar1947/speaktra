import { Metadata } from "next";
import { PracticeHub } from "./_components/practice-hub";

export const metadata: Metadata = {
  title: "Practice Hub - Speaktra",
  description:
    "Choose a module to improve your professional communication skills",
};

export default function PracticePage() {
  return (
    <div className="container mx-auto max-w-7xl py-6 px-4">
      <PracticeHub />
    </div>
  );
}
