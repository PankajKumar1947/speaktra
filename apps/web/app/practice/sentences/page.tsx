import { Metadata } from "next";
import { SentencesDetail } from "./_components/sentences-detail";

export const metadata: Metadata = {
  title: "Sentence Practice - Speaktra",
  description: "Practice corporate sentences for professional communication",
};

export default function SentencesPage() {
  return <SentencesDetail />;
}
