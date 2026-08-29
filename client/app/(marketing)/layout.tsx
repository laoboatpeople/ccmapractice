import type { Metadata } from "next";
import { LocaleProvider } from "@/src/contexts/LocaleContext";
import { StickyCtaBanner } from "@/components/marketing/StickyCtaBanner";

export const metadata: Metadata = {
  title: "CCMAPractice - AI-Powered NHA CCMA Exam Preparation",
  description: "Train smarter, certify faster. The AI-powered web app built for modern medical assistant students pursuing NHA CCMA certification.",
};

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LocaleProvider>
      {children}
      <StickyCtaBanner />
    </LocaleProvider>
  );
}
