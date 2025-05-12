import { FetchedClass, getClasses } from "@/lib/fetchSanity";
import ClientClasses from "@/components/ClientClasses";
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
