import Link from "next/link";
import SectionDivider from "@/components/ui/sectionDivider";
import { recipes } from "@/lib/recipes";

const catalogIntro = [
  "Each recipe mirrors what you experience in our custom cookie sets and decorating workshops.",
  "Browse the catalog, pick your flavor, and jump into the detailed guide for ingredients, timing, and decorating notes.",
];

const RecipesPage = () => {
  return (
    <div className="page-wrapper">
      <main className="page-content">
        <div className="container-custom">
          <h1 className="page-heading">Recipes &amp; Decorating Guides</h1>

          <section className="mb-16">
            <div className="flex flex-col lg:flex-row items-center gap-10">
              <div className="w-full lg:w-1/2">
                <div className="relative">
                  <div className="absolute -top-6 -left-6 w-32 h-32 bg-bakery-pink-light/50 rounded-full blur-3xl"></div>
                  <div className="absolute -bottom-8 -right-10 w-40 h-40 bg-bakery-cream/60 rounded-full blur-2xl"></div>
                  <img
                    src="/gallery/weddingCookies2.jpg"
                    alt="Decorated sugar cookies arranged on a tray"
                    className="image-wrapper"
                  />
                </div>
              </div>
              <div className="w-full lg:w-1/2">
                <span className="inline-block bg-bakery-peach/70 text-bakery-pink-dark px-4 py-1 rounded-full text-sm font-medium mb-4">
                  Bake Along With Us
                </span>
                <h2 className="section-subheading">Our Recipe Catalog</h2>
                <div className="space-y-4 text-gray-700">
                  {catalogIntro.map((paragraph) => (
                    <p key={paragraph} className="body-text">
                      {paragraph}
                    </p>
                  ))}
                  <p className="body-text">
                    Save your favorites, share your bakes with{" "}
                    <span className="text-bakery-pink-dark font-semibold">
                      #roseandsugarcookies
                    </span>
                    , and join a class for live technique demos.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <SectionDivider icon="chefHat" />

          <section className="mt-16">
            <h2 className="section-subheading text-center">
              Recipes At A Glance
            </h2>
            <p className="text-center text-gray-600 max-w-2xl mx-auto">
              Click any recipe card to view the full ingredient list, timing, and
              decorating method we rely on for client orders and classes.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
              {recipes.map((recipe) => (
                <Link
                  key={recipe.slug}
                  href={`/recipes/${recipe.slug}`}
                  className="content-card group flex flex-col gap-6 transition-transform duration-300 hover:-translate-y-1"
                >
                  <div className="relative overflow-hidden rounded-lg">
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                  </div>
                  <div>
                    <h3 className="section-subheading mb-2 flex items-center justify-between">
                      {recipe.title}
                      <span className="text-sm font-medium text-bakery-pink-dark group-hover:underline">
                        View Recipe
                      </span>
                    </h3>
                    <p className="text-gray-700">{recipe.description}</p>
                  </div>
                  <p className="text-sm font-medium text-bakery-pink-dark">
                    {recipe.prep}
                  </p>
                </Link>
              ))}
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

export default RecipesPage;
