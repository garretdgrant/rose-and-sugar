import ClientClasses from "@/components/ClientClasses";
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
  return <ClientClasses />;
};

export default ClassesPage;
