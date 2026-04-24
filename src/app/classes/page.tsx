import ClientClasses from "@/components/ClientClasses";
import QueryProvider from "@/components/QueryProvider";
import ClassesMarketingShell from "@/components/classes/ClassesMarketingShell";
import { Sparkles } from "lucide-react";
import { buildPageMetadata } from "@/lib/metadata";

export async function generateMetadata() {
  return buildPageMetadata({
    title: "Cookie Decorating Classes | Rose & Sugar",
    description:
      "Join hands on cookie decorating classes led by Rose & Sugar. Small-group sessions with seasonal themes, beginner-friendly instruction, and sweet takeaways.",
    path: "/classes",
  });
}
const ClassesPage = async () => {
  return (
    <ClassesMarketingShell
      badgeIcon={Sparkles}
      badgeText="Learn Cookie Decorating"
      ctaHref="#book-class"
      ctaLabel="View Upcoming Classes"
      description={
        <>
          Join Megan for a fun, creative cookie decorating experience.
          Small-group classes designed for all skill levels in a warm,
          supportive environment.
        </>
      }
      titleLead="Cookie Decorating"
      titleAccent="Classes"
    >
      <QueryProvider>
        <ClientClasses />
      </QueryProvider>
    </ClassesMarketingShell>
  );
};

export default ClassesPage;
