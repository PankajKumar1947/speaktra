import { Metadata } from "next";
import { ReadingDetail } from "./_components/reading-detail";

export const metadata: Metadata = {
  title: "Reading Practice - Speaktra",
  description: "Read business articles and topics",
};

export default function ReadingPage() {
  return <ReadingDetail />;
}
