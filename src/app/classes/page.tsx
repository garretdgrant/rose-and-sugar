import { getClasses } from "@/lib/getClasses";
import ClientClasses from "@/components/ClientClasses";

const ClassesPage = async () => {
  const upcomingClasses = await getClasses();

  return <ClientClasses upcomingClasses={upcomingClasses} />;
};

export default ClassesPage;
