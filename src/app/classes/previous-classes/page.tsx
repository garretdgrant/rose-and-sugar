import ClientPreviousClasses from "@/components/ClientPreviousClasses";
import { buildPageMetadata } from "@/lib/metadata";

export async function generateMetadata() {
  return buildPageMetadata({
    title: "Previous Cookie Decorating Classes | Rose & Sugar",
    description:
      "View past cookie decorating classes from Rose & Sugar. Explore our collection of completed sessions and the creative designs from our small-group cookie decorating workshops.",
    path: "/classes/previous-classes",
    imagePath: "/roseSugarClassCropped.webp",
  });
}

const PreviousClassesPage = async () => {
  return <ClientPreviousClasses />;
};

export default PreviousClassesPage;
