import { Metadata } from "next";
import { ReadingDetail } from "../_components/reading-detail";

interface ReadingPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: ReadingPageProps): Promise<Metadata> {
  await params;
  return {
    title: "Reading Detail - Speaktra",
    description: "Read article content",
  };
}

export default async function ReadingDetailPage({ params }: ReadingPageProps) {
  const { id } = await params;

  return (
    <div className="container mx-auto max-w-4xl py-6 px-4">
      <ReadingDetail articleId={id} />
    </div>
  );
}
