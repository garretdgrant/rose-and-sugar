import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  Check,
  CheckCircle2,
  Cookie,
  FileDown,
  Globe2,
  HeartHandshake,
  Info,
  Lightbulb,
  MessageSquareText,
  MonitorSmartphone,
  ShoppingBag,
  Sparkles,
  Store,
} from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ourWebsitePageData } from "@/lib/page-data/about/our-website.data";
import { buildCanonicalUrl, buildPageMetadata } from "@/lib/metadata";

const data = ourWebsitePageData;

const baseMetadata = buildPageMetadata({
  title: data.metadata.title,
  description: data.metadata.description,
  path: data.metadata.canonicalPath,
  type: "article",
});

export const metadata: Metadata = {
  ...baseMetadata,
  openGraph: {
    title: data.metadata.ogTitle,
    description: data.metadata.ogDescription,
    url: buildCanonicalUrl(data.metadata.canonicalPath),
    type: "article",
    publishedTime: data.datePublished,
    modifiedTime: data.dateModified,
    images: ["/singleCookie.webp"],
  },
  twitter: {
    card: "summary_large_image",
    title: data.metadata.ogTitle,
    description: data.metadata.ogDescription,
    images: ["/singleCookie.webp"],
  },
};

type ContentBlock = (typeof data.sections)[number]["blocks"][number];

const customerPathIcons = [
  ShoppingBag,
  MessageSquareText,
  CalendarDays,
  FileDown,
] as const;

const heroPaths = [
  { icon: Cookie, label: "Cookie sets" },
  { icon: MessageSquareText, label: "Custom orders" },
  { icon: CalendarDays, label: "Classes" },
  { icon: FileDown, label: "Digital recipe" },
] as const;

function renderInlineLinks(text: string): ReactNode[] {
  const linkPattern = /\[([^\]]+)\]\(([^)]+)\)/g;
  const nodes: ReactNode[] = [];
  let lastIndex = 0;

  for (const match of text.matchAll(linkPattern)) {
    const matchIndex = match.index ?? 0;
    const [fullMatch, label, href] = match;

    if (matchIndex > lastIndex) {
      nodes.push(text.slice(lastIndex, matchIndex));
    }

    if (href.startsWith("http")) {
      nodes.push(
        <a
          key={`${matchIndex}-${href}`}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-bakery-pink-dark underline decoration-bakery-pink-light decoration-2 underline-offset-4 transition-colors hover:text-gray-900"
        >
          {label}
        </a>,
      );
    } else {
      nodes.push(
        <Link
          key={`${matchIndex}-${href}`}
          href={href}
          className="font-medium text-bakery-pink-dark underline decoration-bakery-pink-light decoration-2 underline-offset-4 transition-colors hover:text-gray-900"
        >
          {label}
        </Link>,
      );
    }

    lastIndex = matchIndex + fullMatch.length;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
}

function ContentBlockView({ block }: { block: ContentBlock }) {
  if (block.type === "paragraph") {
    return (
      <p className="font-poppins text-base leading-8 text-gray-600 md:text-[1.05rem]">
        {renderInlineLinks(block.text)}
      </p>
    );
  }

  if (block.type === "icon-list") {
    return (
      <div className="grid gap-4 sm:grid-cols-2">
        {block.items.map((item, index) => {
          const Icon = customerPathIcons[index % customerPathIcons.length];

          return (
            <article
              key={item.title}
              className="group rounded-[1.5rem] border border-bakery-pink-light/70 bg-gradient-to-br from-white to-bakery-cream/45 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-bakery-pink/10"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-bakery-pink-light/55 text-bakery-pink-dark transition-colors group-hover:bg-bakery-pink-dark group-hover:text-white">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="mb-2 font-bebas text-xl tracking-wide text-gray-800">
                {item.title}
              </h3>
              <p className="font-poppins text-sm leading-6 text-gray-600">
                {item.text}
              </p>
            </article>
          );
        })}
      </div>
    );
  }

  if (block.type === "unordered-list") {
    return (
      <ul className="grid gap-3 sm:grid-cols-2">
        {block.items.map((item) => (
          <li
            key={item}
            className="flex items-start gap-3 rounded-2xl bg-bakery-cream/55 px-4 py-3 font-poppins text-sm leading-6 text-gray-700"
          >
            <CheckCircle2
              className="mt-0.5 h-5 w-5 shrink-0 text-bakery-pink-dark"
              aria-hidden="true"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    );
  }

  if (block.type === "summary-card") {
    return (
      <aside className="relative overflow-hidden rounded-[1.75rem] border border-bakery-pink/35 bg-gradient-to-br from-bakery-pink-light/55 via-white to-bakery-peach/55 p-6 md:p-8">
        <div className="absolute -right-6 -top-6 h-28 w-28 rounded-full border-[18px] border-white/50" />
        <Lightbulb
          className="mb-4 h-7 w-7 text-bakery-pink-dark"
          aria-hidden="true"
        />
        <h3 className="relative mb-2 font-playfair text-xl font-semibold text-gray-800 md:text-2xl">
          {block.title}
        </h3>
        <p className="relative font-poppins leading-7 text-gray-600">
          {block.text}
        </p>
      </aside>
    );
  }

  if (block.type === "callout") {
    return (
      <aside className="rounded-[1.75rem] border-l-4 border-bakery-pink-dark bg-gray-900 p-6 text-white shadow-xl shadow-gray-900/10 md:p-8">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10">
            <Info
              className="h-5 w-5 text-bakery-pink-light"
              aria-hidden="true"
            />
          </div>
          <div>
            <h3 className="mb-2 font-playfair text-xl font-semibold">
              {block.title}
            </h3>
            <p className="font-poppins text-sm leading-7 text-gray-300 md:text-base">
              {block.text}
            </p>
          </div>
        </div>
      </aside>
    );
  }

  return null;
}

export default function OurWebsitePage() {
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
        name: data.parentLabel,
        item: buildCanonicalUrl(data.parentHref),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: data.title,
        item: buildCanonicalUrl(data.pageHref),
      },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: data.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <main className="relative overflow-x-clip bg-white">
      <script
        id="breadcrumbs-jsonld-our-website"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        id="faq-jsonld-our-website"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <section className="relative isolate overflow-hidden bg-bakery-cream pb-24 pt-32 md:pb-32 md:pt-40">
        <div
          className="absolute inset-0 -z-20 opacity-50"
          style={{
            backgroundImage:
              "linear-gradient(rgba(210,134,160,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(210,134,160,.08) 1px, transparent 1px)",
            backgroundSize: "42px 42px",
          }}
        />
        <div className="absolute -right-32 -top-24 -z-10 h-[32rem] w-[32rem] rounded-full bg-bakery-pink-light/75 blur-3xl" />
        <div className="absolute -bottom-40 -left-32 -z-10 h-[28rem] w-[28rem] rounded-full bg-bakery-peach/80 blur-3xl" />

        <div className="container-custom">
          <div className="mb-10 animate-fade-in">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/">Home</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href={data.parentHref}>{data.parentLabel}</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{data.title}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className="grid items-center gap-14 lg:grid-cols-[1.08fr_.92fr] lg:gap-20">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-bakery-pink/45 bg-white/80 px-4 py-2 shadow-sm backdrop-blur-sm">
                <Sparkles
                  className="h-4 w-4 text-bakery-pink-dark"
                  aria-hidden="true"
                />
                <span className="font-poppins text-xs font-semibold uppercase tracking-[0.18em] text-gray-700">
                  {data.meta.eyebrow}
                </span>
              </div>

              <h1 className="max-w-4xl font-bebas text-6xl leading-[0.9] tracking-tight text-gray-900 sm:text-7xl md:text-8xl lg:text-[6.4rem]">
                How We Built the
                <span className="mt-2 block font-cookie text-[.76em] font-normal leading-none tracking-normal text-bakery-pink-dark">
                  Rose &amp; Sugar
                </span>
                Website
              </h1>

              <p className="mt-8 max-w-2xl font-poppins text-lg leading-8 text-gray-600 md:text-xl">
                {data.description}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 font-poppins text-sm text-gray-500">
                <span className="inline-flex items-center gap-2">
                  <BookOpen className="h-4 w-4" aria-hidden="true" />
                  {data.meta.guideType}
                </span>
                <span className="h-1 w-1 rounded-full bg-bakery-pink-dark" />
                <span>Updated {data.meta.updatedLabel}</span>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-xl lg:mx-0">
              <div className="absolute -inset-5 rotate-3 rounded-[2.25rem] bg-bakery-pink-light/70" />
              <div className="relative -rotate-1 overflow-hidden rounded-[1.75rem] border border-white/80 bg-white shadow-2xl shadow-bakery-pink/20 transition-transform duration-500 hover:rotate-0">
                <div className="flex items-center gap-2 border-b border-gray-100 bg-gray-50 px-5 py-4">
                  <span className="h-3 w-3 rounded-full bg-[#ef8da5]" />
                  <span className="h-3 w-3 rounded-full bg-[#f3c795]" />
                  <span className="h-3 w-3 rounded-full bg-[#a9d2b1]" />
                  <div className="ml-3 flex-1 rounded-full bg-white px-4 py-2 font-poppins text-[11px] text-gray-400 shadow-inner">
                    roseandsugar.com
                  </div>
                </div>
                <div className="relative min-h-[390px] overflow-hidden bg-gradient-to-br from-white via-bakery-cream/50 to-bakery-peach/45 p-7 sm:p-9">
                  <div className="absolute -right-14 -top-14 h-44 w-44 rounded-full bg-bakery-pink-light/70 blur-2xl" />
                  <div className="relative">
                    <div className="mb-12 flex items-center justify-between">
                      <span className="font-cookie text-3xl text-bakery-pink-dark">
                        Rose &amp; Sugar
                      </span>
                      <div className="flex gap-2">
                        <span className="h-2 w-10 rounded-full bg-gray-200" />
                        <span className="h-2 w-7 rounded-full bg-bakery-pink-light" />
                      </div>
                    </div>
                    <p className="font-bebas text-5xl leading-[.9] text-gray-800 sm:text-6xl">
                      Built for every
                      <span className="block text-bakery-pink-dark">
                        sweet idea.
                      </span>
                    </p>
                    <div className="mt-8 grid grid-cols-2 gap-3">
                      {heroPaths.map((item) => (
                        <div
                          key={item.label}
                          className="rounded-2xl border border-white bg-white/85 p-4 shadow-sm"
                        >
                          <item.icon
                            className="mb-3 h-5 w-5 text-bakery-pink-dark"
                            aria-hidden="true"
                          />
                          <span className="font-poppins text-xs font-medium text-gray-600">
                            {item.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-7 -left-5 flex rotate-2 items-center gap-3 rounded-2xl bg-gray-900 px-5 py-4 text-white shadow-xl sm:-left-8">
                <MonitorSmartphone
                  className="h-5 w-5 text-bakery-pink-light"
                  aria-hidden="true"
                />
                <span className="font-poppins text-xs font-semibold uppercase tracking-wider">
                  Custom from cart to class
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 -mt-8 pb-20 md:-mt-12 md:pb-28">
        <div className="container-custom">
          <div className="grid gap-6 lg:grid-cols-[1.25fr_.75fr]">
            <div className="rounded-[2rem] border border-bakery-pink-light/70 bg-white p-7 shadow-xl shadow-bakery-pink/10 md:p-10">
              <div className="mb-7 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-bakery-pink-light/60">
                  <Lightbulb
                    className="h-5 w-5 text-bakery-pink-dark"
                    aria-hidden="true"
                  />
                </div>
                <h2 className="font-bebas text-3xl tracking-wide text-gray-800">
                  The short version
                </h2>
              </div>
              <ul className="grid gap-4 sm:grid-cols-2">
                {data.quickSummary.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 font-poppins text-sm leading-6 text-gray-600"
                  >
                    <Check
                      className="mt-0.5 h-5 w-5 shrink-0 text-bakery-pink-dark"
                      strokeWidth={2.5}
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[2rem] bg-gray-900 p-7 text-white shadow-xl md:p-10">
              <div className="mb-7 flex items-center gap-3">
                <Globe2
                  className="h-6 w-6 text-bakery-pink-light"
                  aria-hidden="true"
                />
                <h2 className="font-bebas text-3xl tracking-wide">
                  Site snapshot
                </h2>
              </div>
              <dl className="space-y-4">
                {data.snapshot.map((item) => (
                  <div
                    key={item.label}
                    className="border-b border-white/10 pb-4 last:border-0 last:pb-0"
                  >
                    <dt className="font-poppins text-[11px] font-semibold uppercase tracking-[0.16em] text-bakery-pink-light">
                      {item.label}
                    </dt>
                    <dd className="mt-1 font-poppins text-sm leading-6 text-gray-200">
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-white via-bakery-cream/35 to-white py-20 md:py-28">
        <div className="container-custom grid items-start gap-12 lg:grid-cols-[17rem_minmax(0,1fr)] lg:gap-16">
          <aside className="lg:sticky lg:top-28 lg:max-h-[calc(100vh-8rem)] lg:self-start lg:overflow-y-auto lg:pr-2">
            <p className="mb-4 font-poppins text-xs font-semibold uppercase tracking-[0.2em] text-bakery-pink-dark">
              On this page
            </p>
            <nav aria-label="Table of contents">
              <ol className="space-y-1 border-l border-bakery-pink-light pl-4">
                {data.sections.map((section, index) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="group flex items-start gap-3 rounded-r-xl px-3 py-2 font-poppins text-xs leading-5 text-gray-500 transition-colors hover:bg-white hover:text-bakery-pink-dark"
                    >
                      <span className="font-bebas text-sm tracking-wide text-bakery-brown group-hover:text-bakery-pink-dark">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span>{section.tocTitle}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          <div className="space-y-8 md:space-y-10">
            {data.sections.map((section, sectionIndex) => (
              <article
                key={section.id}
                id={section.id}
                className="scroll-mt-32 rounded-[2rem] border border-gray-100 bg-white p-7 shadow-sm md:p-10 lg:p-12"
              >
                <div className="mb-7 flex items-start gap-5">
                  <span className="font-bebas text-xl tracking-wider text-bakery-pink-dark/70">
                    {String(sectionIndex + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <div className="mb-3 h-1 w-12 rounded-full bg-gradient-to-r from-bakery-pink-dark to-bakery-peach" />
                    <h2 className="max-w-3xl font-bebas text-4xl leading-none tracking-tight text-gray-800 md:text-5xl">
                      {section.title}
                    </h2>
                  </div>
                </div>

                <div className="space-y-6 md:pl-10">
                  {section.blocks.map((block, blockIndex) => (
                    <ContentBlockView
                      key={`${section.id}-${blockIndex}`}
                      block={block}
                    />
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-gray-900 py-20 text-white md:py-28">
        <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-bakery-pink-dark/20 blur-3xl" />
        <div className="absolute -bottom-24 -left-20 h-80 w-80 rounded-full bg-bakery-peach/10 blur-3xl" />
        <div className="container-custom relative">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2">
              <HeartHandshake
                className="h-4 w-4 text-bakery-pink-light"
                aria-hidden="true"
              />
              <span className="font-poppins text-xs font-semibold uppercase tracking-[0.18em] text-gray-200">
                Questions, answered
              </span>
            </div>
            <h2 className="font-bebas text-5xl leading-none tracking-tight md:text-6xl">
              {data.faqTitle}
            </h2>
          </div>

          <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2">
            {data.faqs.map((faq, index) => (
              <article
                key={faq.question}
                className="rounded-[1.75rem] border border-white/10 bg-white/[0.06] p-6 backdrop-blur-sm md:p-8"
              >
                <div className="mb-4 flex items-start gap-4">
                  <span className="font-bebas text-lg tracking-wider text-bakery-pink-light">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-playfair text-xl font-semibold leading-7 text-white">
                    {faq.question}
                  </h3>
                </div>
                <p className="pl-10 font-poppins text-sm leading-7 text-gray-300">
                  {faq.answer}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 md:py-28">
        <div className="container-custom">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="mb-3 font-poppins text-xs font-semibold uppercase tracking-[0.2em] text-bakery-pink-dark">
                  Keep exploring
                </p>
                <h2 className="font-bebas text-5xl leading-none text-gray-800 md:text-6xl">
                  See the site in action
                </h2>
              </div>
              <Store
                className="hidden h-10 w-10 text-bakery-pink-light sm:block"
                aria-hidden="true"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {data.related.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex min-h-36 flex-col justify-between rounded-[1.5rem] border border-bakery-pink-light/55 bg-bakery-cream/35 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-bakery-pink hover:bg-white hover:shadow-lg hover:shadow-bakery-pink/10"
                >
                  <span className="font-bebas text-lg tracking-wider text-bakery-pink-dark/60">
                    0{index + 1}
                  </span>
                  <span className="flex items-end justify-between gap-3 font-poppins text-sm font-semibold leading-5 text-gray-700">
                    {item.label}
                    <ArrowRight
                      className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              ))}
            </div>

            <div className="relative mt-16 overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-bakery-pink-dark via-[#c97995] to-bakery-brown p-8 text-white shadow-2xl shadow-bakery-pink/25 md:p-14">
              <div className="absolute -right-16 -top-24 h-72 w-72 rounded-full border-[42px] border-white/10" />
              <div className="absolute -bottom-20 right-1/3 h-48 w-48 rounded-full bg-bakery-peach/20 blur-2xl" />
              <div className="relative max-w-3xl">
                <Sparkles className="mb-5 h-7 w-7" aria-hidden="true" />
                <h2 className="font-bebas text-5xl leading-none md:text-6xl">
                  {data.finalCta.title}
                </h2>
                <p className="mt-5 max-w-2xl font-poppins text-base leading-7 text-white/90 md:text-lg">
                  {data.finalCta.text}
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href={data.finalCta.href}
                    className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-poppins text-sm font-semibold text-bakery-pink-dark shadow-lg transition-transform hover:-translate-y-0.5"
                  >
                    {data.finalCta.label}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                  <Link
                    href={data.finalCta.secondaryHref}
                    className="inline-flex items-center gap-2 rounded-full border border-white/45 bg-white/10 px-6 py-3 font-poppins text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                  >
                    {data.finalCta.secondaryLabel}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
