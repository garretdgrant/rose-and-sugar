import Link from "next/link";
import { notFound } from "next/navigation";
import SectionDivider from "@/components/ui/sectionDivider";
import { recipes, getRecipeBySlug } from "@/lib/recipes";
import type { Metadata } from "next";

type RecipePageParams = {
  slug: string;
};

type RecipePageProps = {
  params: Promise<RecipePageParams>;
};

export function generateStaticParams() {
  return recipes.map((recipe) => ({ slug: recipe.slug }));
}

export async function generateMetadata({
  params,
}: RecipePageProps): Promise<Metadata> {
  const { slug } = await params;
  const recipe = getRecipeBySlug(slug);

  if (!recipe) {
    return {
      title: "Recipe Not Found | Rose & Sugar",
    };
  }

  return {
    title: `${recipe.title} Recipe | Rose & Sugar`,
    description: recipe.description,
  };
}

const RecipeDetailPage = async ({ params }: RecipePageProps) => {
  const { slug } = await params;
  const recipe = getRecipeBySlug(slug);

  if (!recipe) {
    notFound();
  }

  return (
    <div className="page-wrapper">
      <main className="page-content">
        <div className="container-custom">
          <nav className="mb-6 text-sm text-bakery-pink-dark">
            <Link
              href="/recipes"
              className="hover:underline inline-flex items-center gap-2"
            >
              <span className="text-lg">&larr;</span> Back to recipes
            </Link>
          </nav>

          <div className="flex flex-col lg:flex-row gap-12 items-start">
            <div className="w-full lg:w-1/2">
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-32 h-32 bg-bakery-pink-light/50 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-8 -right-10 w-40 h-40 bg-bakery-cream/60 rounded-full blur-2xl"></div>
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="image-wrapper"
                />
              </div>
            </div>

            <div className="w-full lg:w-1/2">
              <h1 className="section-heading text-left">{recipe.title}</h1>
              <p className="body-text-large text-gray-700 mb-6">
                {recipe.description}
              </p>
              <p className="text-sm font-medium uppercase tracking-wider text-bakery-pink-dark">
                {recipe.prep}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {recipe.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-full bg-bakery-pink-light/60 px-3 py-1 text-xs font-medium uppercase tracking-wide text-bakery-pink-dark"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <SectionDivider icon="flower2" />

          <section className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-1 content-card">
              <h2 className="section-subheading text-xl mb-4">Ingredients</h2>
              <ul className="space-y-3 text-gray-700">
                {recipe.ingredients.map((ingredient) => (
                  <li key={ingredient} className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-bakery-pink-dark"></span>
                    <span>{ingredient}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-2 content-card">
              <h2 className="section-subheading text-xl mb-4">
                Method &amp; Decorating Notes
              </h2>
              <ol className="space-y-4 text-gray-700 list-decimal list-inside">
                {recipe.steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>

              <div className="mt-10 rounded-lg bg-bakery-peach/40 p-6 text-gray-700">
                <h3 className="font-semibold text-gray-800 mb-2">
                  Rose &amp; Sugar Tip
                </h3>
                <p>
                  Take photos of each stage and compare to the classes gallery so
                  you can troubleshoot texture or color before icing sets. Share
                  your progress with us on Instagram—we love celebrating each
                  milestone!
                </p>
              </div>
            </div>
          </section>

          <SectionDivider icon="pot" />

          <section className="mt-16">
            <div className="content-card text-center">
              <h2 className="section-subheading">Practice With A Pro</h2>
              <p className="text-gray-700 max-w-xl mx-auto">
                Want feedback on piping pressure, color mixing, or packaging?
                Bring your questions to a Rose &amp; Sugar decorating class and
                leave with new techniques plus a box of cookies to share.
              </p>
              <Link href="/classes" className="btn-primary mt-6 inline-block">
                View Upcoming Classes
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default RecipeDetailPage;
