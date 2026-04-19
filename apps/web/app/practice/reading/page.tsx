import { Metadata } from "next";
import { ReadingList } from "./_components/reading-list";

export const metadata: Metadata = {
  title: "Reading Practice - Speaktra",
  description: "Read business articles and topics",
};

export default function ReadingPage() {
  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
          Reading <span className="text-secondary">Practice</span>
        </h1>
        <p className="text-muted-foreground mt-2">
          Read business articles and topics
        </p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-card border rounded-xl p-4">
          <p className="text-2xl font-bold text-sky-600 dark:text-sky-400">5</p>
          <p className="text-xs text-muted-foreground mt-1">Total Articles</p>
        </div>
        <div className="bg-card border rounded-xl p-4">
          <p className="text-2xl font-bold text-sky-600 dark:text-sky-400">2</p>
          <p className="text-xs text-muted-foreground mt-1">Completed</p>
        </div>
        <div className="bg-card border rounded-xl p-4">
          <p className="text-2xl font-bold text-orange-500">40%</p>
          <p className="text-xs text-muted-foreground mt-1">Progress</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-4">
        <button className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity cursor-pointer">
          All
        </button>
        <button className="px-4 py-2 text-sm font-medium bg-card border text-muted-foreground rounded-lg hover:bg-muted transition-colors cursor-pointer">
          Article
        </button>
        <button className="px-4 py-2 text-sm font-medium bg-card border text-muted-foreground rounded-lg hover:bg-muted transition-colors cursor-pointer">
          Blog
        </button>
        <button className="px-4 py-2 text-sm font-medium bg-card border text-muted-foreground rounded-lg hover:bg-muted transition-colors cursor-pointer">
          Newsletter
        </button>
      </div>

      <ReadingList />
    </div>
  );
}
