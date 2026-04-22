import { Metadata } from "next";
import { ArticleDetail } from "../_components/article-detail";

interface ReadingPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Reading Detail - Speaktra`,
    description: "Read article content for your professional practice",
  };
}

export default async function ReadingDetailPage({ params }: ReadingPageProps) {
  const { id } = await params;

  return (
    <div className="container mx-auto max-w-7xl py-6 px-4">
      <ArticleDetail id={id} />
    </div>
  );
}
