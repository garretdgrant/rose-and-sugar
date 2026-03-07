import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import FAQAccordion from "@/components/FAQAccordion";
import RecipeAddToCartButton from "@/components/shop/RecipeAddToCartButton";
import { buildCanonicalUrl, buildOgImageUrl } from "@/lib/metadata";
import {
  fetchRecipeByHandle,
  mapRecipeToShopifyProduct,
} from "@/lib/shopifyRecipes";

const pagePath = "/sugar-cookie-recipe";
const pageUrl = buildCanonicalUrl(pagePath);
const ogImageUrl = buildOgImageUrl("/recipe/recipe.webp");
const recipeImage1x1 = buildOgImageUrl("/images/sugar-cookie-recipe-1x1.jpg");
const recipeImage4x3 = buildOgImageUrl("/images/sugar-cookie-recipe-4x3.jpg");
const recipeImage16x9 = buildOgImageUrl("/images/sugar-cookie-recipe-16x9.jpg");
const productImageUrl = buildOgImageUrl(
  "/images/sugar-cookie-recipe-product.jpg",
);

const recipeHandle = "sugar-cookie-recipe";
const recipePriceLabel = "$12";
const recipePriceValue = "12.00";
const publishDate = "2026-03-06";
const priceValidUntil = "2027-03-06";

const toPriceLabel = (amount: string) => {
  const parsed = Number.parseFloat(amount);
  if (Number.isNaN(parsed)) return recipePriceLabel;
  return `$${parsed.toFixed(parsed % 1 === 0 ? 0 : 2)}`;
};

const trustBadges = [
  "Instant PDF Download",
  "Includes Gluten-Free Option",
  "Gram + Volume Measurements",
  "Tested 500+ Times in Production",
];

const recipePreviewIngredients = [
  "All-purpose flour or 1:1 gluten-free substitute",
  "Unsalted butter",
  "Granulated sugar",
  "Vanilla extract",
  "+ more",
];

const meganStats = [
  { value: "200+", label: "Happy Customers" },
  { value: "5 Years", label: "Crafting" },
  { value: "25+", label: "Classes Taught" },
];

type FaqItem = {
  question: string;
  answer: string;
};

const faqItems: FaqItem[] = [
  {
    question:
      "What makes this sugar cookie recipe different from free recipes online?",
    answer:
      "This is the exact recipe Megan uses for Rose & Sugar's custom cookie orders and decorating classes. It's been tested hundreds of times in real production, not just a blog recipe. The cookies hold their shape perfectly for detailed cookie cutter designs and are specifically formulated to pair with royal icing decoration. You're getting a professional cookie artist's working recipe, not a home baker's experiment.",
  },
  {
    question: "Is this recipe gluten-free?",
    answer:
      "Yes! The recipe includes instructions for a 1:1 gluten-free flour substitute that works seamlessly. Megan has tested the gluten-free version extensively and it produces the same results: cookies that hold their shape, taste delicious, and decorate beautifully.",
  },
  {
    question: "Will these cookies hold their shape with cookie cutters?",
    answer:
      "Absolutely. This recipe was specifically developed for cut-out cookies that maintain crisp, clean edges. The combination of chilling the dough and the precise butter-to-flour ratio ensures your cookies come out exactly the shape you cut them every single time. This is the same recipe used for Rose & Sugar's detailed custom cookie orders.",
  },
  {
    question: "What do I get when I purchase?",
    answer:
      "You'll receive an instant PDF download of the complete Rose & Sugar sugar cookie recipe card. It includes the full ingredient list with both volume and gram measurements, step-by-step instructions, the gluten-free substitution guide, optional flavor variations (almond, lemon, and maple), and Megan's professional tips for perfect cookies every time.",
  },
  {
    question: "Can I use this recipe for my cookie business?",
    answer:
      "The recipe is sold for personal use. If you're starting a cookie business and want hands-on training, Rose & Sugar offers private cookie decorating classes and corporate events where Megan teaches her techniques in person. Visit our Classes page to learn more.",
  },
  {
    question: "How many cookies does this recipe make?",
    answer:
      "The recipe yields approximately 24 cookies using a 3.5-inch cookie cutter. Smaller cutters will yield more cookies, and larger cutters will yield fewer. A standard baking sheet can hold about 12 cookies at a time.",
  },
  {
    question: "Why do my sugar cookies spread when baking?",
    answer:
      "Cookie spreading is usually caused by butter that's too warm, not enough chilling time, or too much sugar relative to flour. This recipe addresses all three issues: it specifies room temperature (not warm) butter, requires at least one hour of refrigerator chilling, and includes an optional 30-minute freeze step before baking for extra insurance against spreading.",
  },
];

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Professional Sugar Cookie Recipe | Rose & Sugar — $12",
    description:
      "The exact sugar cookie recipe used by Rose & Sugar's cookie artist for custom orders & decorating classes. Holds shape perfectly. Instant PDF download — $12.",
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title:
        "Rose & Sugar's Professional Sugar Cookie Recipe — $12 Digital Download",
      description:
        "The exact recipe Megan uses for her custom cookie orders and decorating classes in Folsom, CA. Perfect for cut-outs, holds shape, gluten-free option included.",
      url: pageUrl,
      siteName: "Rose & Sugar",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Professional Sugar Cookie Recipe | Rose & Sugar",
      description:
        "The exact recipe used for custom orders & classes. Holds shape, GF option. Instant PDF — $12.",
      images: [ogImageUrl],
    },
  };
}

const SugarCookieRecipePage = async () => {
  let checkoutProduct = null;
  try {
    const recipeProduct = await fetchRecipeByHandle(recipeHandle);
    checkoutProduct = recipeProduct
      ? mapRecipeToShopifyProduct(recipeProduct)
      : null;
  } catch {
    checkoutProduct = null;
  }

  const checkoutPriceValue =
    checkoutProduct?.node.variants?.edges?.[0]?.node.price.amount ||
    checkoutProduct?.node.priceRange?.minVariantPrice.amount ||
    recipePriceValue;
  const checkoutPriceLabel = toPriceLabel(checkoutPriceValue);

  const recipeJsonLd = {
    "@context": "https://schema.org/",
    "@type": "Recipe",
    name: "Rose & Sugar Professional Sugar Cookie Recipe",
    mainEntityOfPage: pageUrl,
    image: [recipeImage1x1, recipeImage4x3, recipeImage16x9],
    author: {
      "@type": "Person",
      name: "Megan",
      url: buildCanonicalUrl("/about"),
    },
    datePublished: publishDate,
    dateModified: publishDate,
    description:
      "The professional sugar cookie recipe used by Rose & Sugar for custom orders and decorating classes. These cut-out cookies hold their shape perfectly and work beautifully with royal icing. Includes a gluten-free option.",
    recipeCuisine: "American",
    recipeCategory: "Dessert",
    keywords:
      "sugar cookie recipe, cut out sugar cookies, sugar cookies for decorating, professional cookie recipe, bakery sugar cookie recipe, gluten free sugar cookies, sugar cookie recipe that holds shape",
    prepTime: "PT30M",
    cookTime: "PT15M",
    totalTime: "PT2H15M",
    recipeYield: "24 cookies (3.5-inch size)",
    suitableForDiet: "https://schema.org/GlutenFreeDiet",
    recipeIngredient: [
      "4 and 1/4 cups (600g) all-purpose flour or 1:1 gluten-free flour substitute",
      "1 tsp baking powder",
      "1/2 tsp salt",
      "1 and 1/4 cups (2.5 sticks) unsalted butter, room temperature",
      "1 and 1/4 cups (300g) granulated sugar",
      "1/4 cup (45g) light or dark brown sugar",
      "2 eggs, room temperature",
      "3 tsp (15g) vanilla extract",
      "3/4 tsp almond, lemon, or maple extract (optional)",
    ],
    recipeInstructions: [
      {
        "@type": "HowToStep",
        name: "Mix dry ingredients",
        text: "In a medium bowl, whisk together the flour, baking powder, and salt. Set aside.",
      },
      {
        "@type": "HowToStep",
        name: "Cream butter and sugars",
        text: "Using a large bowl with a handheld or standing mixer and paddle attachment, beat together the butter and sugars until just combined and creamy with no lumps, about 2.5 minutes. Scrape down as needed. Add the eggs, vanilla, and any optional extract. Beat for about a minute until combined.",
      },
      {
        "@type": "HowToStep",
        name: "Combine wet and dry",
        text: "Slowly add the dry ingredients to the wet ingredients, 1/4 cup at a time on slow speed until just combined. Do not overmix.",
      },
      {
        "@type": "HowToStep",
        name: "Roll and chill dough",
        text: "Roll out the dough about 1/4 inch thick onto lightly floured parchment paper. Cover with plastic wrap and chill in the refrigerator for at least one hour.",
      },
      {
        "@type": "HowToStep",
        name: "Cut and arrange cookies",
        text: "Line baking sheets with parchment paper or baking mats. Remove dough from fridge, remove plastic wrap, and cut out shapes. Place on baking sheet about 3 inches apart. Re-roll scraps as needed.",
      },
      {
        "@type": "HowToStep",
        name: "Freeze and bake",
        text: "Optionally chill cutout cookies in the freezer for about 30 minutes to prevent spreading. Preheat oven to 350F. Bake for 13-15 minutes until lightly browned with no signs of rawness in the middle. Let cool for at least one hour before decorating.",
      },
    ],
    nutrition: {
      "@type": "NutritionInformation",
      servingSize: "1 cookie (3.5-inch)",
      calories: "220 calories",
    },
  };

  const productJsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: "Rose & Sugar Professional Sugar Cookie Recipe (Digital Download)",
    description:
      "The exact sugar cookie recipe used by Rose & Sugar for custom cookie orders and decorating classes. Includes step-by-step instructions, ingredient list with gram measurements, gluten-free substitution, and pro tips. Delivered as an instant PDF download.",
    image: productImageUrl,
    brand: {
      "@type": "Brand",
      name: "Rose & Sugar",
    },
    offers: {
      "@type": "Offer",
      url: pageUrl,
      priceCurrency: "USD",
      price: checkoutPriceValue,
      availability: "https://schema.org/InStock",
      priceValidUntil,
      seller: {
        "@type": "Organization",
        name: "Rose & Sugar",
      },
    },
    category: "Digital Recipe Download",
    isAccessoryOrSparePartFor: {
      "@type": "Product",
      name: "Rose & Sugar Cookie Decorating Classes",
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: buildCanonicalUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Sugar Cookie Recipe",
        item: pageUrl,
      },
    ],
  };

  return (
    <div className="bg-gradient-to-b from-white via-bakery-cream/25 to-bakery-pink-light/20 pb-16 pt-28 md:pt-36">
      <script
        id="recipe-jsonld-sugar-cookie-recipe"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(recipeJsonLd) }}
      />
      <script
        id="product-jsonld-sugar-cookie-recipe"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        id="faq-jsonld-sugar-cookie-recipe"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        id="breadcrumbs-jsonld-sugar-cookie-recipe"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <section className="container-custom">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-sm text-gray-600">
            <li>
              <Link href="/" className="hover:text-bakery-pink-dark">
                Home
              </Link>
            </li>
            <li>/</li>
            <li className="font-medium text-gray-800">Sugar Cookie Recipe</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
          <div className="lg:col-span-7">
            <h1 className="font-bebas text-5xl leading-[0.95] text-gray-900 md:text-6xl lg:text-7xl">
              The Secret Sugar Cookie Recipe Behind Every Rose & Sugar Cookie
            </h1>
            <p className="mt-5 max-w-3xl font-poppins text-lg leading-relaxed text-gray-700 md:text-xl">
              The exact recipe Megan uses for custom orders, decorating classes,
              and every beautiful cookie that leaves the Rose & Sugar kitchen.
              Now available as an instant digital download.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <RecipeAddToCartButton
                product={checkoutProduct}
                className="w-full sm:w-auto"
                label="Get the Recipe"
              />
            </div>

            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {trustBadges.map((badge) => (
                <li
                  key={badge}
                  className="rounded-2xl border border-bakery-pink-light/50 bg-white px-4 py-3 font-poppins text-sm font-medium text-gray-700 shadow-sm"
                >
                  {badge}
                </li>
              ))}
            </ul>

            <p className="mt-6 font-poppins text-sm text-gray-600">
              Want ready-made cookies too? Browse{" "}
              <Link
                href="/cookies/signature-sugar-cookie-sets"
                className="text-bakery-pink-dark underline"
              >
                signature sugar cookie sets
              </Link>
              .
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="overflow-hidden rounded-[2rem] border border-bakery-pink-light/45 bg-white p-3 shadow-xl shadow-bakery-pink/10">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem]">
                <Image
                  src="/recipe/recipe.webp"
                  alt="Rose & Sugar sugar cookie recipe hero image with decorated cookies"
                  title="Rose & Sugar sugar cookie recipe"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 38vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-custom mt-20">
        <div className="rounded-[2rem] border border-bakery-pink-light/45 bg-white p-7 shadow-md md:p-10">
          <h2 className="font-bebas text-4xl text-gray-900 md:text-5xl">
            Why This Isn&apos;t Just Another Sugar Cookie Recipe
          </h2>
          <div className="mt-6 space-y-5 font-poppins text-lg leading-relaxed text-gray-700">
            <p>
              This is the recipe I use every single day in my cookie business.
              Every custom order. Every class I teach. Every cookie that leaves
              my kitchen starts with this exact recipe.
            </p>
            <p>
              I spent years testing and refining it until it was perfect, not
              perfect for a food blog, but perfect for real production. That
              means cookies that hold their shape no matter what cookie cutter
              you use. Cookies that bake flat for a smooth decorating surface.
              Cookies that taste incredible even before you add a drop of icing.
            </p>
            <p>
              If you&apos;ve ever pulled a tray of cut-out cookies from the oven
              and watched your beautiful shapes melt into sad little blobs, this
              recipe will change everything for you.
            </p>
            <p>
              The ratio of butter to flour to sugar has been calibrated for
              cookies that hold even the most detailed cutter shapes. The
              combination of granulated and brown sugar gives you a cookie
              that&apos;s flavorful, not bland and chalky like so many cut-out
              recipes. And the dough rolls out like a dream without cracking or
              sticking.
            </p>
            <p>
              Whether you&apos;re a home baker who wants bakery-quality results,
              a new cookie artist building a business, or someone who&apos;s
              just tired of disappointing sugar cookie recipes, this is the
              recipe you&apos;ve been looking for.
            </p>
          </div>
        </div>
      </section>

      <section className="container-custom mt-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="font-bebas text-4xl text-gray-900 md:text-5xl">
              What You&apos;ll Get
            </h2>
            <p className="mt-4 max-w-3xl font-poppins text-lg leading-relaxed text-gray-700">
              Your instant PDF download includes the complete Rose & Sugar sugar
              cookie recipe with everything you need to make perfect cookies:
            </p>
            <div className="mt-7 space-y-4">
              <p className="rounded-2xl border border-bakery-pink-light/40 bg-white p-5 font-poppins text-gray-700">
                <strong>The full ingredient list</strong> with both standard
                volume measurements and precise gram weights, so you get
                consistent results whether you measure with cups or a kitchen
                scale.
              </p>
              <p className="rounded-2xl border border-bakery-pink-light/40 bg-white p-5 font-poppins text-gray-700">
                <strong>Step-by-step instructions</strong> from mixing to
                rolling to chilling to baking, with the exact timing,
                temperatures, and techniques I use in production.
              </p>
              <p className="rounded-2xl border border-bakery-pink-light/40 bg-white p-5 font-poppins text-gray-700">
                <strong>The gluten-free variation</strong> using a 1:1 flour
                substitute that produces results indistinguishable from the
                original. Tested and verified.
              </p>
              <p className="rounded-2xl border border-bakery-pink-light/40 bg-white p-5 font-poppins text-gray-700">
                <strong>Three optional flavor add-ins</strong>: almond, lemon,
                and maple extract variations that let you customize the cookie
                base for any theme or season.
              </p>
              <p className="rounded-2xl border border-bakery-pink-light/40 bg-white p-5 font-poppins text-gray-700">
                <strong>Professional tips</strong> including the
                chill-then-freeze method that prevents spreading, the right way
                to roll dough for clean edges, and how many re-rolls you can do
                before the dough toughens.
              </p>
            </div>
          </div>

          <div className="rounded-[2rem] border border-bakery-pink-light/45 bg-white p-6 shadow-md lg:col-span-5">
            <h2 className="font-bebas text-4xl text-gray-900 md:text-5xl">
              A Taste of What You&apos;re Getting
            </h2>

            <dl className="mt-5 grid grid-cols-2 gap-3 font-poppins text-sm">
              <div className="rounded-xl bg-bakery-cream/50 p-3">
                <dt className="font-semibold text-gray-800">Prep Time</dt>
                <dd className="text-gray-700">30 minutes</dd>
              </div>
              <div className="rounded-xl bg-bakery-cream/50 p-3">
                <dt className="font-semibold text-gray-800">Cook Time</dt>
                <dd className="text-gray-700">13-15 minutes</dd>
              </div>
              <div className="rounded-xl bg-bakery-cream/50 p-3">
                <dt className="font-semibold text-gray-800">Chill Time</dt>
                <dd className="text-gray-700">1 hour minimum</dd>
              </div>
              <div className="rounded-xl bg-bakery-cream/50 p-3">
                <dt className="font-semibold text-gray-800">Yield</dt>
                <dd className="text-gray-700">~24 cookies (3.5-inch cutter)</dd>
              </div>
            </dl>

            <p className="mt-4 font-poppins text-sm font-medium text-gray-700">
              Diet: Gluten-free option included
            </p>
            <p className="mt-4 font-poppins text-sm font-semibold uppercase tracking-[0.12em] text-bakery-pink-dark">
              Ingredient Preview
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5 font-poppins text-sm text-gray-700">
              {recipePreviewIngredients.map((ingredient) => (
                <li key={ingredient}>{ingredient}</li>
              ))}
            </ul>

            <div className="mt-6">
              <RecipeAddToCartButton
                product={checkoutProduct}
                className="w-full"
                label="Download the Full Recipe"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="container-custom mt-16">
        <div className="grid grid-cols-1 gap-8 rounded-[2rem] border border-bakery-pink-light/45 bg-white p-7 shadow-md md:p-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <h2 className="font-bebas text-4xl text-gray-900 md:text-5xl">
              Made by Megan - Sacramento&apos;s Cookie Artist
            </h2>
            <p className="mt-5 font-poppins text-lg leading-relaxed text-gray-700">
              Hi, I&apos;m Megan, the creative heart behind Rose & Sugar.
              I&apos;ve been handcrafting custom decorated cookies in Folsom, CA
              for over 5 years, and I&apos;ve taught 25+ decorating classes to
              cookie lovers of all skill levels.
            </p>
            <p className="mt-4 font-poppins text-lg leading-relaxed text-gray-700">
              Every single one of those beautiful cookies starts with this
              recipe. It&apos;s the foundation of everything I do, and I&apos;m
              finally sharing it with you.
            </p>
            <p className="mt-4 font-poppins text-base text-gray-700">
              Learn more on the{" "}
              <Link href="/about" className="text-bakery-pink-dark underline">
                About page
              </Link>
              .
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              {meganStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-bakery-pink-light/45 bg-bakery-cream/40 px-5 py-4"
                >
                  <p className="font-bebas text-3xl text-bakery-pink-dark">
                    {stat.value}
                  </p>
                  <p className="font-poppins text-sm text-gray-700">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="overflow-hidden rounded-[1.75rem] border border-bakery-pink-light/45 p-3">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.25rem]">
                <Image
                  src="/gallery/class1.jpg"
                  alt="Megan decorating sugar cookies during a Rose & Sugar class"
                  title="Megan decorating sugar cookies in class"
                  fill
                  loading="lazy"
                  sizes="(max-width: 1024px) 100vw, 34vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-custom mt-16">
        <div className="rounded-[2rem] border border-bakery-pink-light/45 bg-white p-7 shadow-md md:p-10">
          <h2 className="text-center font-bebas text-4xl text-gray-900 md:text-5xl">
            Common Questions
          </h2>
          <FAQAccordion faqs={faqItems} className="mt-8 max-w-4xl" />
        </div>
      </section>

      <section className="container-custom mt-16">
        <div className="rounded-[2rem] border border-bakery-pink-light/45 bg-white p-8 text-center shadow-lg md:p-12">
          <p className="font-poppins text-sm font-semibold uppercase tracking-[0.16em] text-bakery-pink-dark">
            Ready to Bake Like a Pro?
          </p>
          <h2 className="mt-3 font-bebas text-4xl text-gray-900 md:text-6xl">
            Get the Recipe
          </h2>
          <p className="mx-auto mt-4 max-w-3xl font-poppins text-lg leading-relaxed text-gray-700">
            Stop settling for sugar cookie recipes that spread, crack, or taste
            like cardboard. Get the exact recipe used by a professional cookie
            artist, tested hundreds of times in real production.
          </p>
          <p className="mt-6 font-bebas text-4xl text-bakery-pink-dark md:text-5xl">
            Instant PDF Download
          </p>
          <div className="mt-7 flex justify-center">
            <RecipeAddToCartButton
              product={checkoutProduct}
              className="w-full max-w-md"
              label="Get the Recipe Now"
            />
          </div>
          <p className="mx-auto mt-5 max-w-3xl font-poppins text-sm leading-relaxed text-gray-600">
            Delivered instantly as a PDF. All sales final due to digital nature
            of the product. This recipe is for personal use only, not to be
            duplicated, sold, or redistributed.
          </p>
          <blockquote className="mx-auto mt-6 max-w-3xl rounded-2xl border border-bakery-pink-light/45 bg-bakery-cream/45 p-5 text-left font-poppins text-sm leading-relaxed text-gray-700">
            <strong>Copyright Notice:</strong> This recipe is the intellectual
            property of Rose & Sugar, LLC. All purchases are final due to the
            digital nature of this product. This recipe is not to be duplicated,
            sold, sub-licensed, claimed as your own, or forwarded/gifted to
            others in digital or print form. The copyright remains with Rose &
            Sugar. For personal use only.
          </blockquote>
        </div>
      </section>

      <section className="container-custom mt-16">
        <div className="grid grid-cols-1 gap-5 rounded-[2rem] border border-bakery-pink-light/45 bg-white p-7 shadow-md md:grid-cols-2 md:p-10">
          <article className="rounded-2xl border border-bakery-pink-light/40 bg-bakery-cream/40 p-6">
            <h2 className="font-bebas text-4xl text-gray-900">
              Want hands-on instruction?
            </h2>
            <p className="mt-3 font-poppins text-gray-700">
              Join one of Megan&apos;s cookie decorating classes and learn to
              decorate using this exact recipe. Classes start at $65.
            </p>
            <Link
              href="/classes"
              className="mt-5 inline-flex font-poppins font-semibold text-bakery-pink-dark underline"
            >
              Book a Class -&gt;
            </Link>
          </article>

          <article className="rounded-2xl border border-bakery-pink-light/40 bg-bakery-cream/40 p-6">
            <h2 className="font-bebas text-4xl text-gray-900">
              Need cookies for an event?
            </h2>
            <p className="mt-3 font-poppins text-gray-700">
              Let Rose & Sugar create custom decorated cookies for your
              celebration.
            </p>
            <Link
              href="/cookies/order-custom-sugar-cookies"
              className="mt-5 inline-flex font-poppins font-semibold text-bakery-pink-dark underline"
            >
              Order Custom Cookies -&gt;
            </Link>
          </article>
        </div>
      </section>
    </div>
  );
};

export default SugarCookieRecipePage;
