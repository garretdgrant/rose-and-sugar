import { getClasses } from "@/lib/getClasses";
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

export interface ClassItem {
  _id: string;
  title: string;
  month: string;
  day?: string;
  time?: string;
  price?: string;
  description?: string;
  address?: string;
  link?: string;
  _createdAt?: string;
  _updatedAt?: string;
  _rev?: string;
  _type?: string;
}

const ClassesPage = async () => {
  const upcomingClasses = await getClasses();

  upcomingClasses.sort((a: ClassItem, b: ClassItem) => {
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
