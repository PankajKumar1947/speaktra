import { Metadata } from "next";
import { SentenceList } from "./_components/sentence-list";

export const metadata: Metadata = {
  title: "Sentence Practice - Speaktra",
  description: "Practice corporate sentences for professional communication",
};

export default function SentencesPage() {
  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
          Sentence <span className="text-secondary">Practice</span>
        </h1>
        <p className="text-muted-foreground mt-2">
          Practice corporate sentences for professional communication
        </p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-card border rounded-xl p-4">
          <p className="text-2xl font-bold text-sky-600 dark:text-sky-400">
            10
          </p>
          <p className="text-xs text-muted-foreground mt-1">Total Sentences</p>
        </div>
        <div className="bg-card border rounded-xl p-4">
          <p className="text-2xl font-bold text-sky-600 dark:text-sky-400">8</p>
          <p className="text-xs text-muted-foreground mt-1">Practiced</p>
        </div>
        <div className="bg-card border rounded-xl p-4">
          <p className="text-2xl font-bold text-orange-500">80%</p>
          <p className="text-xs text-muted-foreground mt-1">Progress</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-4">
        <button className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity cursor-pointer">
          All
        </button>
        <button className="px-4 py-2 text-sm font-medium bg-card border text-muted-foreground rounded-lg hover:bg-muted transition-colors cursor-pointer">
          Easy
        </button>
        <button className="px-4 py-2 text-sm font-medium bg-card border text-muted-foreground rounded-lg hover:bg-muted transition-colors cursor-pointer">
          Medium
        </button>
        <button className="px-4 py-2 text-sm font-medium bg-card border text-muted-foreground rounded-lg hover:bg-muted transition-colors cursor-pointer">
          Hard
        </button>
      </div>

      <SentenceList />
    </div>
  );
}
