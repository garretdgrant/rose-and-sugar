import { FetchedClass, getClasses } from "@/lib/fetchSanity";
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
const monthOrder = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];

const ClassesPage = async () => {
  const upcomingClasses = await getClasses();
  upcomingClasses.sort((a: FetchedClass, b: FetchedClass) => {
    // Normalize & lookup month index
    const monthIndexA = monthOrder.indexOf((a.month || "").toLowerCase());
    const monthIndexB = monthOrder.indexOf((b.month || "").toLowerCase());

    // Compare month positions
    if (monthIndexA !== monthIndexB) return monthIndexA - monthIndexB;

    // If months are equal, compare days
    const dayA = parseInt(a.day || "0", 10);
    const dayB = parseInt(b.day || "0", 10);

    return dayA - dayB;
  });
  return <ClientClasses upcomingClasses={upcomingClasses} />;
};

export default ClassesPage;
