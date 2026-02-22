import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  ChefHat,
  Clock3,
  Download,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
} from "lucide-react";
import FAQAccordion from "@/components/FAQAccordion";
import RecipeAddToCartButton from "@/components/shop/RecipeAddToCartButton";
import {
  buildCanonicalUrl,
  buildOgImageUrl,
  buildPageMetadata,
} from "@/lib/metadata";

const pagePath = "/shop/no-spread-sugar-cookie-recipe";
const recipePrice = "$12";
const recipePriceValue = "12.00";

const benefits = [
  {
    icon: ShieldCheck,
    title: "Zero Spread Results",
    description:
      "Built for decorated sugar cookies that hold crisp edges and clean cutter details after baking.",
  },
  {
    icon: Clock3,
    title: "No Chill Workflow",
    description:
      "Skip the wait time and move from mixing to cutting quickly when you need reliable results.",
  },
  {
    icon: ChefHat,
    title: "Royal Icing Ready",
    description:
      "Designed to create a smooth surface that supports flooding, detailing, and polished final designs.",
  },
  {
    icon: Sparkles,
    title: "Bakery Style Flavor",
    description:
      "Balanced vanilla flavor with a soft bite, so your cookies taste as good as they look.",
  },
];

const includedItems = [
  "1-page printable PDF recipe sheet that stays clean and simple in the kitchen",
  "Exact ingredient measurements in both cups and grams for consistency",
  "Step-by-step process notes from Megan's class workflow",
  "Pro tips for rolling, thickness control, and avoiding common beginner mistakes",
  "Storage and make-ahead notes for parties, holidays, and custom order prep",
];

const whoItsFor = [
  "Home bakers who want cookie shapes that stay sharp and clean",
  "Beginner decorators learning royal icing fundamentals",
  "Parents making decorated cookies for birthdays and school events",
  "Hobby bakers who are tired of trial-and-error recipe testing",
  "Cookie decorators who want a proven base for consistent bakes",
];

const testimonials = [
  {
    name: "Sarah J.",
    context: "Birthday Party Customer",
    quote:
      "Megan's cookies are absolutely magical. The designs were beautiful and the flavor was just as impressive as the detail work.",
  },
  {
    name: "Lisa M.",
    context: "Cookie Class Guest",
    quote:
      "Her class made decorating feel approachable. You can tell she has a repeatable process and clear teaching method.",
  },
  {
    name: "Jessica & David",
    context: "Baby Shower Order",
    quote:
      "Every cookie looked polished, tasted amazing, and felt thoughtfully made from start to finish.",
  },
];

const faqItems = [
  {
    question:
      "What makes this sugar cookie recipe different from free recipes online?",
    answerText:
      "This is the same no-spread recipe used in Rose & Sugar custom orders and classes, refined through real client work.",
    answer:
      "This is the exact no-spread formula Megan uses for Rose & Sugar custom orders and local classes. It is built for decorated cookies, tested in real production runs, and includes practical tips beyond a basic ingredient list.",
  },
  {
    question: "Will these sugar cookies hold their shape for decorating?",
    answerText:
      "Yes. The core purpose of this recipe is to hold shape and stay clean for decorated cut-out cookies.",
    answer:
      "Yes. The recipe is intentionally designed to reduce spread so your cutters keep crisp outlines, making it a dependable base for royal icing work.",
  },
  {
    question: "What is included in the digital download?",
    answerText:
      "You get a PDF recipe with cups and grams, step-by-step notes, and pro tips for consistency and storage.",
    answer:
      "Your purchase includes a digital PDF with the full recipe in cups and grams, step-by-step instructions, class-tested tips, and storage guidance.",
  },
  {
    question: "Can I use this recipe for my own cookie business?",
    answerText:
      "This recipe is sold for personal use. Contact Rose & Sugar for any commercial licensing questions.",
    answer: (
      <>
        The standard purchase is for personal use only. For commercial licensing
        questions, please reach out through the{" "}
        <Link href="/contact" className="text-bakery-pink-dark underline">
          contact page
        </Link>
        .
      </>
    ),
  },
  {
    question: "Is this recipe beginner friendly?",
    answerText:
      "Yes. It is designed to be forgiving and easy to follow for bakers who are new to cookie decorating.",
    answer:
      "Yes. Megan teaches beginner decorators, and this process is written to be clear, repeatable, and practical for first-time decorators.",
  },
  {
    question: "Can I get a refund on a digital download?",
    answerText:
      "Digital products are final sale because access is delivered immediately after purchase.",
    answer:
      "Because this is a digital product with instant delivery, all sales are final. If you have questions before purchasing, send a message first so we can help.",
  },
];

export async function generateMetadata() {
  return buildPageMetadata({
    title: "Professional No-Spread Sugar Cookie Recipe | Rose & Sugar",
    description:
      "Get the secret bakery-style sugar cookie recipe used in Rose & Sugar's sold-out decorating classes. Perfect cut-outs, no spread. Instant PDF download.",
    path: pagePath,
    imagePath: "/singleCookie.webp",
  });
}

const SecretRecipePage = () => {
  const pageUrl = buildCanonicalUrl(pagePath);
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Megan's Secret No-Spread Sugar Cookie Recipe (Digital Download)",
    description:
      "A professional no-spread sugar cookie recipe digital download by Rose & Sugar, refined through 5 years of custom orders and cookie decorating classes.",
    category: "Digital Download",
    sku: "RS-RECIPE-NS-001",
    brand: {
      "@type": "Brand",
      name: "Rose & Sugar",
    },
    image: [
      buildOgImageUrl("/singleCookie.webp"),
      buildOgImageUrl("/cookies.webp"),
      buildOgImageUrl("/gallery/class1.jpg"),
      buildOgImageUrl("/openDefault.webp"),
    ],
    url: pageUrl,
    offers: {
      "@type": "Offer",
      price: recipePriceValue,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      url: pageUrl,
      seller: {
        "@type": "Organization",
        name: "Rose & Sugar",
        url: buildCanonicalUrl("/"),
      },
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
        text: faq.answerText,
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
        name: "No-Spread Sugar Cookie Recipe",
        item: pageUrl,
      },
    ],
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-white via-bakery-cream/35 to-bakery-pink-light/35 pb-24 md:pb-0">
      <script
        id="product-jsonld-no-spread-recipe"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        id="faq-jsonld-no-spread-recipe"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        id="breadcrumbs-jsonld-no-spread-recipe"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Background texture & blobs */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{ backgroundImage: `url("/paper-texture.svg")` }}
      />
      <div className="absolute -top-40 right-0 h-[460px] w-[460px] rounded-full bg-gradient-to-bl from-bakery-pink-light/45 to-transparent blur-3xl" />
      <div className="absolute bottom-12 -left-32 h-[420px] w-[420px] rounded-full bg-gradient-to-tr from-bakery-peach/35 to-transparent blur-3xl" />

      <main className="relative z-10">
        {/* ─── HERO ─── */}
        <section className="pb-16 pt-28 md:pb-20 md:pt-36">
          <div className="container-custom">
            <nav aria-label="Breadcrumb" className="mb-8">
              <div className="flex flex-wrap items-center gap-2 font-poppins text-sm text-gray-500">
                <Link
                  href="/"
                  className="transition-colors hover:text-bakery-pink-dark"
                >
                  Home
                </Link>
                <span>/</span>
                <span className="text-gray-700">Shop</span>
                <span>/</span>
                <span className="font-medium text-gray-800">
                  No-Spread Recipe
                </span>
              </div>
            </nav>

            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
              {/* ── Left: copy + purchase ── */}
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 rounded-full border border-bakery-pink-light/60 bg-white/80 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm backdrop-blur-sm">
                  <Download className="h-4 w-4 text-bakery-pink-dark" />
                  Instant Digital Download
                </div>

                <h1 className="mt-6 font-bebas text-5xl leading-[0.95] tracking-tight text-gray-900 md:text-6xl lg:text-7xl">
                  Megan&apos;s Secret No-Spread Sugar Cookie Recipe
                  <span className="mt-2 block bg-gradient-to-r from-bakery-pink-dark via-bakery-pink to-bakery-brown bg-clip-text text-transparent">
                    Instant Digital Download
                  </span>
                </h1>

                <p className="mt-6 max-w-3xl font-poppins text-lg leading-relaxed text-gray-700 md:text-xl">
                  The exact recipe behind every Rose & Sugar cookie, refined
                  through 5 years of baking, 200+ custom orders, and 25+ classes
                  in Folsom. If you want clean cut edges, reliable bakes, and
                  professional decorating results at home, this is the formula
                  Megan actually uses.
                </p>

                <p className="mt-4 max-w-3xl font-poppins text-base leading-relaxed text-gray-700 md:text-lg">
                  Tired of dough that spreads, loses sharp details, or bakes up
                  dry? Stop wasting ingredients on trial-and-error recipes. This
                  guide is built specifically for decorated cut-out cookies that
                  stay beautiful and taste bakery quality from first bite to
                  final detail.
                </p>

                {/* Credential stats */}
                <div className="mt-8 flex flex-wrap items-stretch gap-3">
                  {[
                    { stat: "5", label: "Years of Production Testing" },
                    { stat: "200+", label: "Happy Customers" },
                    { stat: "25+", label: "Classes Taught" },
                  ].map(({ stat, label }) => (
                    <div
                      key={stat}
                      className="flex items-center gap-3 rounded-2xl border border-bakery-pink-light/50 bg-white px-4 py-3 shadow-sm"
                    >
                      <span className="font-bebas text-3xl leading-none text-bakery-pink-dark">
                        {stat}
                      </span>
                      <span className="max-w-[5.5rem] font-poppins text-xs leading-snug text-gray-600">
                        {label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Purchase card */}
                <div className="mt-10 overflow-hidden rounded-3xl border border-bakery-pink-light/40 shadow-xl shadow-bakery-pink/10">
                  <div className="h-1.5 bg-gradient-to-r from-bakery-pink-dark via-bakery-pink to-bakery-brown" />
                  <div className="bg-white/90 p-6 backdrop-blur-sm">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <p className="font-poppins text-sm font-semibold uppercase tracking-[0.18em] text-bakery-pink-dark">
                        Recipe Price
                      </p>
                      <p className="font-bebas text-4xl text-gray-900">
                        {recipePrice}
                      </p>
                    </div>
                    <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center">
                      <RecipeAddToCartButton className="w-full sm:w-auto" />
                      <Link
                        href="/classes"
                        className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-bakery-pink-light bg-white px-7 py-4 font-poppins font-semibold text-gray-800 transition-all duration-300 hover:border-bakery-pink hover:bg-bakery-pink-light/40"
                      >
                        Explore Decorating Classes
                        <ArrowRight className="h-5 w-5" />
                      </Link>
                    </div>
                    <p className="mt-4 font-poppins text-sm text-gray-600">
                      Digital PDF download only. No physical item will be
                      shipped.
                    </p>
                    <p className="mt-1 font-poppins text-xs text-gray-500">
                      This adds a mock product to cart. Shopify checkout wiring
                      is pending.
                    </p>
                  </div>
                </div>
              </div>

              {/* ── Right: hero image ── */}
              <div className="lg:col-span-5">
                <div className="relative overflow-hidden rounded-[2rem] border border-bakery-pink-light/40 bg-white p-3 shadow-2xl shadow-bakery-pink/20">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem]">
                    <Image
                      src="/singleCookie.webp"
                      alt="Professional no spread sugar cookie dough and decorated cookie"
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                  </div>
                  <div className="absolute left-8 top-8 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-bakery-pink-dark shadow-lg backdrop-blur-sm">
                    Proven No-Spread Formula
                  </div>
                  <div className="absolute bottom-8 left-8 right-8 rounded-2xl border border-white/70 bg-white/85 p-4 shadow-xl backdrop-blur-sm">
                    <p className="font-bebas text-2xl text-gray-900">
                      What You Can Expect
                    </p>
                    <ul className="mt-3 space-y-2">
                      <li className="flex items-start gap-2 font-poppins text-sm text-gray-700">
                        <BadgeCheck className="mt-0.5 h-4 w-4 text-bakery-pink-dark" />
                        Cleaner cutter lines and flatter cookie tops
                      </li>
                      <li className="flex items-start gap-2 font-poppins text-sm text-gray-700">
                        <BadgeCheck className="mt-0.5 h-4 w-4 text-bakery-pink-dark" />
                        Stable base for flooding and detail piping
                      </li>
                      <li className="flex items-start gap-2 font-poppins text-sm text-gray-700">
                        <BadgeCheck className="mt-0.5 h-4 w-4 text-bakery-pink-dark" />
                        Fast workflow for parties and seasonal sets
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── BENEFITS ─── */}
        <section className="py-16 md:py-20 bg-bakery-cream/40">
          <div className="container-custom">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="font-bebas text-4xl text-gray-900 md:text-5xl">
                Tested, Perfected, and Loved by Hundreds
              </h2>
              <p className="mt-6 font-poppins text-lg leading-relaxed text-gray-700">
                This is not a weekend experiment or recycled blog post. It is
                the production recipe Megan uses to serve custom orders for
                birthdays, weddings, baby showers, holidays, and business
                events. It has been taught in packed local classes, adjusted in
                real kitchens, and built to remove the stress that comes from
                inconsistent dough behavior.
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {benefits.map((benefit) => (
                <article
                  key={benefit.title}
                  className="group overflow-hidden rounded-3xl border border-bakery-pink-light/40 bg-white shadow-md shadow-bakery-pink/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-bakery-pink/10"
                >
                  <div className="h-1 bg-gradient-to-r from-bakery-pink-dark to-bakery-pink transition-all duration-300 group-hover:from-bakery-pink group-hover:to-bakery-peach" />
                  <div className="p-6">
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-bakery-pink-light to-bakery-peach">
                      <benefit.icon className="h-6 w-6 text-bakery-pink-dark" />
                    </div>
                    <h3 className="font-bebas text-3xl text-gray-900">
                      {benefit.title}
                    </h3>
                    <p className="mt-3 font-poppins text-gray-700">
                      {benefit.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ─── WHAT'S INCLUDED ─── */}
        <section className="py-16 md:py-20">
          <div className="container-custom">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
              {/* Images — left column for visual variety */}
              <div className="space-y-5 lg:col-span-5 lg:order-1">
                <figure className="overflow-hidden rounded-[2rem] border border-bakery-pink-light/40 bg-white p-3 shadow-xl shadow-bakery-pink/15">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem]">
                    <Image
                      src="/cookies.webp"
                      alt="Stack of baked bakery style cut out sugar cookies with flat tops"
                      fill
                      sizes="(max-width: 1024px) 100vw, 35vw"
                      className="object-cover"
                    />
                  </div>
                </figure>
                <figure className="overflow-hidden rounded-[2rem] border border-bakery-pink-light/40 bg-white p-3 shadow-xl shadow-bakery-pink/15">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem]">
                    <Image
                      src="/gallery/class1.jpg"
                      alt="Baker rolling out no chill sugar cookie dough for royal icing"
                      fill
                      sizes="(max-width: 1024px) 100vw, 35vw"
                      className="object-cover"
                    />
                  </div>
                </figure>
                <figure className="overflow-hidden rounded-[2rem] border border-bakery-pink-light/40 bg-white p-3 shadow-xl shadow-bakery-pink/15">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem]">
                    <Image
                      src="/openDefault.webp"
                      alt="PDF digital download for secret sugar cookie recipe"
                      fill
                      sizes="(max-width: 1024px) 100vw, 35vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
                    <figcaption className="absolute bottom-4 left-4 rounded-full bg-white/85 px-4 py-2 font-poppins text-xs font-semibold text-gray-800">
                      Digital PDF Preview
                    </figcaption>
                  </div>
                </figure>
              </div>

              {/* Content — right column */}
              <div className="lg:col-span-7 lg:order-2">
                <h2 className="font-bebas text-4xl text-gray-900 md:text-5xl">
                  What&apos;s Included in Your Download
                </h2>
                <p className="mt-5 max-w-3xl font-poppins text-lg leading-relaxed text-gray-700">
                  You get a practical, kitchen-friendly guide that helps you
                  bake with confidence and decorate with consistency. The format
                  is clean, printable, and focused on the exact steps Megan
                  teaches in class so you can avoid common mistakes and get
                  dependable results.
                </p>

                {/* Numbered included items */}
                <ul className="mt-8 space-y-3">
                  {includedItems.map((item, index) => (
                    <li
                      key={item}
                      className="flex items-start gap-4 rounded-2xl border border-bakery-pink-light/30 bg-white/80 p-4 shadow-sm transition-all duration-200 hover:border-bakery-pink-light/60 hover:shadow-md"
                    >
                      <span className="w-7 shrink-0 text-center font-bebas text-2xl leading-none text-bakery-pink-dark/40">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="font-poppins text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-10 overflow-hidden rounded-3xl border border-bakery-pink-light/40 shadow-lg shadow-bakery-pink/10">
                  <div className="h-1 bg-gradient-to-r from-bakery-pink-dark to-bakery-pink" />
                  <div className="bg-gradient-to-r from-white to-bakery-cream/50 p-6">
                    <p className="font-poppins text-sm font-semibold uppercase tracking-[0.16em] text-bakery-pink-dark">
                      Ready to bake
                    </p>
                    <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center">
                      <RecipeAddToCartButton className="w-full sm:w-auto" />
                      <Link
                        href="/cookies/order-custom-sugar-cookies"
                        className="inline-flex items-center justify-center gap-2 rounded-full border border-bakery-pink-light bg-white px-6 py-3 font-poppins font-semibold text-gray-800 transition-all hover:border-bakery-pink hover:bg-bakery-pink-light/40"
                      >
                        Prefer done-for-you cookies?
                      </Link>
                    </div>
                    <p className="mt-3 font-poppins text-xs text-gray-500">
                      Uses a local mock cart item for testing. Shopify product
                      syncing comes next.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── WHO IT'S FOR + TESTIMONIALS ─── */}
        <section className="bg-bakery-cream/40 py-16 md:py-20">
          <div className="container-custom">
            <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
              {/* Who It's For */}
              <div className="lg:col-span-5">
                <div className="overflow-hidden rounded-3xl border border-bakery-pink-light/35 bg-white shadow-md shadow-bakery-pink/5">
                  <div className="h-1 bg-gradient-to-r from-bakery-pink-dark to-bakery-pink" />
                  <div className="p-7">
                    <h2 className="font-bebas text-4xl text-gray-900 md:text-5xl">
                      Who This Is For
                    </h2>
                    <ul className="mt-6 space-y-3">
                      {whoItsFor.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-3 font-poppins text-gray-700"
                        >
                          <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-bakery-pink-light">
                            <Users className="h-3 w-3 text-bakery-pink-dark" />
                          </div>
                          {item}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-6 font-poppins text-gray-700">
                      If you would rather have Megan decorate for your event,
                      explore{" "}
                      <Link
                        href="/cookies/order-custom-sugar-cookies"
                        className="text-bakery-pink-dark underline"
                      >
                        custom cookie orders
                      </Link>
                      . If you want hands-on support, check the{" "}
                      <Link
                        href="/classes"
                        className="text-bakery-pink-dark underline"
                      >
                        upcoming class schedule
                      </Link>
                      .
                    </p>
                  </div>
                </div>
              </div>

              {/* Testimonials */}
              <div className="lg:col-span-7">
                <h2 className="font-bebas text-4xl text-gray-900 md:text-5xl">
                  Social Proof from Rose & Sugar Customers
                </h2>
                <p className="mt-4 max-w-3xl font-poppins text-lg text-gray-700">
                  Rose & Sugar has served 200+ customers and taught 25+ cookie
                  decorating classes. These reviews reflect the same recipe
                  standards now available in this download.
                </p>

                <div className="mt-8 grid gap-5 md:grid-cols-3">
                  {testimonials.map((testimonial) => (
                    <article
                      key={testimonial.name}
                      className="flex flex-col rounded-2xl border border-bakery-pink-light/35 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                    >
                      <div className="mb-3 flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="h-4 w-4 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                      <p className="font-fraunces text-4xl leading-none text-bakery-pink-light select-none">
                        &ldquo;
                      </p>
                      <p className="mt-1 grow font-poppins text-sm leading-relaxed text-gray-700">
                        {testimonial.quote}&rdquo;
                      </p>
                      <div className="mt-4 border-t border-bakery-pink-light/40 pt-3">
                        <p className="font-poppins text-sm font-semibold text-gray-800">
                          {testimonial.name}
                        </p>
                        <p className="font-poppins text-xs text-gray-500">
                          {testimonial.context}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>

                <div className="mt-8 overflow-hidden rounded-3xl border border-bakery-pink-light/40 shadow-lg shadow-bakery-pink/10">
                  <div className="h-1 bg-gradient-to-r from-bakery-pink-dark to-bakery-pink" />
                  <div className="bg-white/90 p-6">
                    <p className="font-poppins text-sm font-medium uppercase tracking-[0.15em] text-bakery-pink-dark">
                      Ready for consistent bakes?
                    </p>
                    <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center">
                      <RecipeAddToCartButton className="w-full sm:w-auto" />
                      <Link
                        href="/about"
                        className="inline-flex items-center justify-center gap-2 rounded-full border border-bakery-pink-light bg-white px-6 py-3 font-poppins font-semibold text-gray-800 transition-all hover:border-bakery-pink hover:bg-bakery-pink-light/40"
                      >
                        Meet Megan
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                    <p className="mt-3 font-poppins text-xs text-gray-500">
                      Cart add is active with a mock product. Checkout
                      integration is still pending.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── FAQ ─── */}
        <section className="py-16 md:py-20">
          <div className="container-custom">
            <div className="mx-auto max-w-4xl overflow-hidden rounded-[2rem] border border-bakery-pink-light/40 bg-white/90 shadow-lg shadow-bakery-pink/10">
              <div className="h-1.5 bg-gradient-to-r from-bakery-pink-dark via-bakery-pink to-bakery-brown" />
              <div className="p-7 md:p-10">
                <h2 className="text-center font-bebas text-4xl text-gray-900 md:text-5xl">
                  Frequently Asked Questions
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-center font-poppins text-gray-700">
                  Clear answers before you buy, including usage terms, download
                  details, and who this recipe is built for.
                </p>
                <FAQAccordion
                  className="mt-8 max-w-none"
                  faqs={faqItems.map((faq) => ({
                    question: faq.question,
                    answer: faq.answer,
                  }))}
                />

                <div className="mt-10 rounded-3xl border border-bakery-pink-light/40 bg-gradient-to-r from-bakery-cream/45 to-white p-6 text-center">
                  <p className="font-poppins text-sm font-semibold uppercase tracking-[0.16em] text-bakery-pink-dark">
                    Final call to action
                  </p>
                  <h3 className="mt-3 font-bebas text-4xl text-gray-900 md:text-5xl">
                    Start Baking Today
                  </h3>
                  <p className="mx-auto mt-3 max-w-2xl font-poppins text-gray-700">
                    Instant digital download. No physical item shipped. This
                    version uses a mock product for cart testing while checkout
                    integration is being finalized.
                  </p>
                  <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <RecipeAddToCartButton className="w-full sm:w-auto" />
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center rounded-full border border-bakery-pink-light bg-white px-6 py-3 font-poppins font-semibold text-gray-800 transition-all hover:border-bakery-pink hover:bg-bakery-pink-light/40"
                    >
                      Ask a Question
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ─── Mobile sticky CTA bar ─── */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-bakery-pink-light/60 bg-white/95 p-3 shadow-[0_-10px_30px_rgba(0,0,0,0.08)] backdrop-blur-sm md:hidden">
        <div className="container-custom flex items-center justify-between gap-3 px-0">
          <div className="min-w-0">
            <p className="font-poppins text-xs uppercase tracking-[0.14em] text-gray-500">
              Instant PDF download
            </p>
            <p className="font-bebas text-3xl leading-none text-gray-900">
              {recipePrice}
            </p>
          </div>
          <RecipeAddToCartButton compact />
        </div>
      </div>
    </div>
  );
};

export default SecretRecipePage;
