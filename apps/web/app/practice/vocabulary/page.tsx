import { Metadata } from "next";
import { VocabularyDetail } from "./_components/vocabulary-detail";

export const metadata: Metadata = {
  title: "Vocabulary Practice - Speaktra",
  description: "Learn domain-specific words for your professional context",
};

export default function VocabularyPage() {
  return <VocabularyDetail />;
}
