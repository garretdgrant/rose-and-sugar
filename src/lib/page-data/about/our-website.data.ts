// src/lib/page-data/about/our-website.data.ts

export const ourWebsitePageData = {
  kind: "about",
  slug: "our-website",
  pageHref: "/about/our-website",
  parentHref: "/about",
  parentLabel: "About",

  datePublished: "2026-08-07",
  dateModified: "2026-08-07",

  metadata: {
    title: "How We Built the Rose & Sugar Website | Behind the Site",
    description:
      "See how the Rose & Sugar website was built around custom cookie orders, decorating classes, signature sets, digital products, and a simple mobile shopping experience.",
    canonicalPath: "/about/our-website",

    ogTitle: "How We Built the Rose & Sugar Website",
    ogDescription:
      "Behind the design, technology, and decisions that power the Rose & Sugar website.",

    focusKeyword: "Rose & Sugar website",
    supportingKeywords: [
      "how Rose & Sugar website was built",
      "Rose & Sugar ecommerce website",
      "headless Shopify bakery website",
      "small business ecommerce website case study",
      "custom ecommerce website case study",
    ],
  },

  seoIntent: {
    primaryIntent:
      "Give customers and other small business owners a first-hand look at why the Rose & Sugar website was built the way it was and how its ecommerce system supports the business.",

    pageOwns: [
      "Rose & Sugar website",
      "how Rose & Sugar website was built",
      "Rose & Sugar ecommerce website",
      "behind the Rose & Sugar website",
      "Rose & Sugar website technology",
      "Rose & Sugar Shopify website",
    ],

    pageDoesNotOwn: [
      "custom cookies Folsom",
      "custom cookies Sacramento",
      "cookie decorating classes Folsom",
      "cookie decorating classes Sacramento",
      "sugar cookie recipe",
      "ecommerce web design Folsom",
      "ecommerce web design Sacramento",
      "Shopify web design Sacramento",
      "web design company Folsom",
    ],
  },

  title: "How We Built the Rose & Sugar Website",

  description:
    "Rose & Sugar is not a normal online store. We sell ready-to-order cookie sets, create fully custom orders, host decorating classes, and offer a digital recipe. Our website was built around those different ways people interact with the business instead of forcing everything into one standard shopping cart.",

  meta: {
    eyebrow: "Behind the Site",
    updatedLabel: "August 2026",
    guideType: "Website Case Study",
  },

  quickSummary: [
    "Rose & Sugar needed several different customer journeys rather than one standard ecommerce checkout.",
    "Shopify manages the commerce side of the business while a custom storefront controls the customer experience.",
    "Signature cookie sets, custom orders, decorating classes, and the digital recipe each have a buying flow designed for that specific product.",
    "The website is structured around real customer questions and mobile use rather than a prebuilt store theme.",
    "Rose & Sugar worked with EDC Web Design in Folsom to design and build the ecommerce experience.",
  ],

  snapshot: [
    {
      label: "Business",
      value: "Rose & Sugar",
    },
    {
      label: "Location",
      value: "Folsom, California",
    },
    {
      label: "Commerce engine",
      value: "Shopify",
    },
    {
      label: "Storefront",
      value: "Custom headless storefront",
    },
    {
      label: "Main customer paths",
      value: "Cookie sets, custom orders, classes, and digital products",
    },
    {
      label: "Website partner",
      value: "EDC Web Design",
    },
  ],

  sections: [
    {
      id: "more-than-a-cookie-store",
      title: "Why Rose & Sugar Needed More Than a Cookie Store",
      tocTitle: "Why we built it",
      blocks: [
        {
          type: "paragraph",
          text: "At first glance, Rose & Sugar looks like a simple cookie business. The website quickly becomes more complicated once you look at how people actually buy from us.",
        },
        {
          type: "paragraph",
          text: "Someone shopping for a signature cookie set can choose a product and order it much like they would from another online store. Someone planning custom cookies for a wedding, baby shower, birthday, or corporate event cannot. We first need to know the date, quantity, theme, colors, packaging preferences, and other details before a final order can be confirmed.",
        },
        {
          type: "paragraph",
          text: "Decorating classes work differently again. A class has a date, location, number of available seats, and its own information about what is included. Our digital sugar cookie recipe is different from all three because there is nothing physical to pick up after purchase.",
        },
        {
          type: "paragraph",
          text: "That gave us the main goal for the website: each type of customer should get the buying experience that makes sense for what they are trying to do.",
        },
      ],
    },

    {
      id: "four-customer-paths",
      title: "One Business, Four Different Ways to Buy",
      tocTitle: "Four customer paths",
      blocks: [
        {
          type: "paragraph",
          text: "Rather than treating everything Rose & Sugar offers as the same type of product, the website separates the experience into four main paths.",
        },
        {
          type: "icon-list",
          items: [
            {
              title: "Signature cookie sets",
              text: "Ready-to-order designs work like traditional ecommerce products. Customers can browse the collection, see what is available, and choose the set they want.",
            },
            {
              title: "Custom cookie orders",
              text: "Custom work starts with a detailed request instead of a normal Add to Cart button. The customer can share the event date, quantity, flavors, packaging, colors, theme, and other details needed to plan the order.",
            },
            {
              title: "Cookie decorating classes",
              text: "Classes are sold as experiences rather than physical products. Customers need to know when and where the class takes place, what they will decorate, what supplies are included, and whether seats are still available.",
            },
            {
              title: "Digital recipe",
              text: "The Rose & Sugar sugar cookie recipe is a digital product. Customers purchase access to the recipe rather than arranging a local pickup for a physical item.",
            },
          ],
        },
        {
          type: "paragraph",
          text: "You can see these different paths throughout the live site in our [signature cookie sets](/cookies/signature-sugar-cookie-sets), [custom cookie order form](/cookies/order-custom-sugar-cookies), [decorating classes](/classes), and [sugar cookie recipe](/sugar-cookie-recipe).",
        },
      ],
    },

    {
      id: "why-not-a-standard-theme",
      title: "Why We Did Not Just Use a Standard Store Theme",
      tocTitle: "Why not a template?",
      blocks: [
        {
          type: "paragraph",
          text: "A standard ecommerce theme works very well when every item follows roughly the same pattern: choose a product, add it to a cart, enter a shipping address, and pay.",
        },
        {
          type: "paragraph",
          text: "That is not how much of Rose & Sugar works. A custom order needs information before the final order is created. A decorating class needs a date and available seats. Local cookie orders need pickup information. A digital recipe needs digital delivery.",
        },
        {
          type: "paragraph",
          text: "We could have installed separate apps and plugins for each problem, but every extra system would have added another piece for customers and for us to manage.",
        },
        {
          type: "summary-card",
          title: "The goal was not to make the website more complicated.",
          text: "The goal was to handle the complicated parts behind the scenes so ordering from Rose & Sugar feels simple.",
        },
      ],
    },

    {
      id: "headless-shopify",
      title: "Why Rose & Sugar Uses a Custom Storefront With Shopify",
      tocTitle: "Headless Shopify",
      blocks: [
        {
          type: "paragraph",
          text: "Rose & Sugar uses Shopify as the commerce engine behind the website. Shopify is good at the jobs it was designed to handle, including products, orders, payments, and the day-to-day work of managing an online store.",
        },
        {
          type: "paragraph",
          text: "The customer-facing website is separate from a normal Shopify theme. This setup is often called headless ecommerce. In simple terms, Shopify runs the store in the background while the website visitors see is custom built.",
        },
        {
          type: "paragraph",
          text: "That gives us two benefits. Rose & Sugar can still use Shopify for the practical store-management work, while the website can be designed around our own products and customer journeys rather than around the limits of a theme.",
        },
        {
          type: "paragraph",
          text: "EDC builds custom storefronts for businesses that need more flexibility than a standard ecommerce theme. You can read more about [EDC Web Design's ecommerce solutions](https://www.edcwebdesign.com/services/ecommerce-solutions), including how they choose between Shopify and simpler checkout systems depending on the type of store.",
        },
        {
          type: "paragraph",
          text: "It also means Megan can manage routine store tasks without needing a developer every time a seasonal set changes or a product needs to be updated.",
        },
      ],
    },

    {
      id: "custom-orders",
      title: "Custom Orders Needed a Conversation, Not Just a Cart",
      tocTitle: "Custom orders",
      blocks: [
        {
          type: "paragraph",
          text: "Custom cookies were one of the clearest examples of why the website needed its own flow.",
        },
        {
          type: "paragraph",
          text: "A customer might know that she needs cookies for a baby shower, but there is no single baby-shower product that covers every order. The number of cookies, date, colors, flavors, packaging, theme, level of detail, and special requests can all change what needs to be made.",
        },
        {
          type: "paragraph",
          text: "Our [custom cookie order page](/cookies/order-custom-sugar-cookies) collects those details in a structured way. That gives Megan the information she needs while giving the customer a much clearer starting point than a blank email.",
        },
        {
          type: "paragraph",
          text: "This is a small example of a larger principle behind the website: the form should follow the real business process instead of making the business change its process to fit the software.",
        },
      ],
    },

    {
      id: "classes",
      title: "Classes Needed Their Own Booking Experience",
      tocTitle: "Class bookings",
      blocks: [
        {
          type: "paragraph",
          text: "Cookie decorating classes create a completely different kind of sale. The product is a seat at an experience, not a box of cookies.",
        },
        {
          type: "paragraph",
          text: "Someone considering a class wants to know the date, location, price, length, skill level, what supplies are included, and what they will take home. That information needs to be easy to understand before the customer reserves a spot.",
        },
        {
          type: "paragraph",
          text: "The [Rose & Sugar classes page](/classes) was built around those questions. It also gives us room for private classes and corporate events without mixing those services into the regular cookie shop.",
        },
      ],
    },

    {
      id: "digital-products",
      title: "The Same Site Can Sell Something Completely Digital",
      tocTitle: "Digital products",
      blocks: [
        {
          type: "paragraph",
          text: "The Rose & Sugar sugar cookie recipe added another useful test for the site. Unlike a cookie set, there is nothing to schedule or pick up. The customer is purchasing a digital resource.",
        },
        {
          type: "paragraph",
          text: "The [sugar cookie recipe page](/sugar-cookie-recipe) can therefore focus on explaining what the recipe includes, who it is for, and what the customer receives after purchasing it.",
        },
        {
          type: "paragraph",
          text: "Being able to support physical products, custom requests, event bookings, and digital products on the same site gives Rose & Sugar room to add new ideas without rebuilding the entire store each time.",
        },
      ],
    },

    {
      id: "local-business-rules",
      title: "The Website Also Has to Match a Local Business",
      tocTitle: "Built for local business",
      blocks: [
        {
          type: "paragraph",
          text: "Rose & Sugar is based in Folsom and much of the business revolves around local customers, local pickup, and decorating classes around the Sacramento area.",
        },
        {
          type: "paragraph",
          text: "That sounds like a small detail, but it changes the website. A store built primarily for products being shipped across the country asks different questions than a local bakery arranging pickups and in-person experiences.",
        },
        {
          type: "paragraph",
          text: "We wanted location and ordering information to appear where customers actually need it instead of making them discover an important limitation at the final step.",
        },
      ],
    },

    {
      id: "mobile-first",
      title: "Designed Around How Customers Actually Browse",
      tocTitle: "Mobile first",
      blocks: [
        {
          type: "paragraph",
          text: "Many Rose & Sugar customers first reach the website from a phone. They may have found a cookie design on Instagram, searched for decorating classes nearby, or looked for custom cookies while planning an event.",
        },
        {
          type: "paragraph",
          text: "That is why the important paths were designed to work well on a small screen from the beginning. Buttons need to be easy to tap, forms need to be understandable without zooming, and important details should not be buried under unnecessary content.",
        },
        {
          type: "paragraph",
          text: "The visual design matters, but the more important question is whether someone can understand what Rose & Sugar offers and reach the right next step without getting lost.",
        },
      ],
    },

    {
      id: "search-structure",
      title:
        "Building the Site for People Also Made the Search Structure Clearer",
      tocTitle: "Search structure",
      blocks: [
        {
          type: "paragraph",
          text: "The website was not built as one enormous page that tries to rank for everything Rose & Sugar does.",
        },
        {
          type: "paragraph",
          text: "Custom cookies have their own page. Classes have their own section. Private classes and corporate events can answer different questions. The recipe has a dedicated page. Our [About page](/about) tells Megan's story instead of trying to sell every product.",
        },
        {
          type: "paragraph",
          text: "That separation is useful for customers because each page can answer one clear need. It also gives search engines a clearer picture of what each page is about.",
        },
        {
          type: "paragraph",
          text: "We try to use search optimization as a way to organize useful information, not as a reason to repeat the same phrases across every page.",
        },
      ],
    },

    {
      id: "day-to-day-management",
      title: "A Custom Website Still Has to Be Easy to Run",
      tocTitle: "Managing the site",
      blocks: [
        {
          type: "paragraph",
          text: "A website is not very useful if every small update requires a developer.",
        },
        {
          type: "paragraph",
          text: "Shopify gives Rose & Sugar a familiar dashboard for the store side of the business. Seasonal products can change, orders can be reviewed, and normal ecommerce work can happen without editing the custom website code.",
        },
        {
          type: "paragraph",
          text: "The custom development is there for the parts where it adds value. It should not make ordinary business tasks harder.",
        },
      ],
    },

    {
      id: "lessons-for-small-businesses",
      title: "What We Learned From Building It",
      tocTitle: "What we learned",
      blocks: [
        {
          type: "paragraph",
          text: "The biggest lesson from the Rose & Sugar website is that choosing a platform should come after understanding how the business works.",
        },
        {
          type: "unordered-list",
          items: [
            "Start with the different reasons customers visit the site.",
            "Do not assume every purchase belongs in the same checkout flow.",
            "Keep routine business tasks simple for the person who actually runs the company.",
            "Build mobile experiences around the information customers need most.",
            "Give major services and products their own useful pages instead of forcing everything onto the homepage.",
            "Use custom development where it solves a real problem rather than adding features simply because they are possible.",
          ],
        },
        {
          type: "paragraph",
          text: "Those ideas apply well beyond cookies. Any small business that combines products, custom work, bookings, local fulfillment, or digital goods can run into the same problem.",
        },
      ],
    },

    {
      id: "who-built-the-site",
      title: "Who Built the Rose & Sugar Website?",
      tocTitle: "Who built it",
      blocks: [
        {
          type: "paragraph",
          text: "Rose & Sugar worked with EDC Web Design in Folsom to plan and build the site. The project started with the different ways customers interact with Rose & Sugar and then selected the ecommerce setup around those needs.",
        },
        {
          type: "paragraph",
          text: "Their ecommerce guide also includes Rose & Sugar as a real example of a business where ready-made products, custom requests, classes, local ordering, and digital products all needed to work together.",
        },
        {
          type: "callout",
          tone: "info",
          title: "Why we're sharing this",
          text: "Customers sometimes see only the finished website. We wanted to show the thinking behind it and give other small business owners a useful look at the decisions that happen before a site is built.",
        },
      ],
    },

    {
      id: "still-growing",
      title: "Built to Change as Rose & Sugar Changes",
      tocTitle: "What's next",
      blocks: [
        {
          type: "paragraph",
          text: "Rose & Sugar is still growing. Cookie designs change with the seasons. New classes are added. New locations and event ideas can come along. Digital products give us another way to share Megan's experience with people who may never attend a local class.",
        },
        {
          type: "paragraph",
          text: "The website was built with that change in mind. We can add useful sections and new ways to buy without throwing away the parts that already work.",
        },
        {
          type: "paragraph",
          text: "For us, that is what a good small-business website should do. It should fit the business today without making tomorrow harder.",
        },
      ],
    },
  ],

  faqTitle: "About the Rose & Sugar Website",

  faqs: [
    {
      question: "What platform is the Rose & Sugar website built on?",
      answer:
        "Rose & Sugar uses Shopify as the commerce engine behind a custom storefront. Shopify manages core ecommerce functions while the customer-facing website is built separately so the shopping experience can follow how Rose & Sugar actually operates.",
    },
    {
      question: "What does headless Shopify mean?",
      answer:
        "A headless Shopify site separates the storefront customers see from Shopify's standard theme system. Shopify can still manage products, orders, and payments in the background, while the front end can be designed and developed independently.",
    },
    {
      question: "Why did Rose & Sugar need a custom ecommerce website?",
      answer:
        "Rose & Sugar has several different types of sales. Signature cookie sets can work like normal products, while custom orders need detailed requests, decorating classes need dates and availability, and the recipe is a digital product. A custom site lets each path work differently.",
    },
    {
      question: "Can Rose & Sugar manage the store without a developer?",
      answer:
        "Yes. Shopify handles the everyday store-management side so routine product and order work can be managed through its dashboard. Custom development is used for the customer experience and business-specific flows rather than making basic updates harder.",
    },
    {
      question: "Who designed and built the Rose & Sugar website?",
      answer:
        "Rose & Sugar worked with EDC Web Design in Folsom, California. EDC designed the ecommerce structure around Rose & Sugar's combination of products, custom requests, classes, local customers, and digital sales.",
    },
    {
      question: "Why are custom cookie orders separate from the regular shop?",
      answer:
        "A custom cookie order needs information such as the event date, quantity, theme, colors, flavors, and packaging before the final order can be planned. A dedicated request flow is more useful than treating every custom project like a fixed product.",
    },
  ],

  related: [
    {
      label: "About Rose & Sugar",
      href: "/about",
    },
    {
      label: "Browse Signature Cookie Sets",
      href: "/cookies/signature-sugar-cookie-sets",
    },
    {
      label: "Request Custom Cookies",
      href: "/cookies/order-custom-sugar-cookies",
    },
    {
      label: "Explore Cookie Decorating Classes",
      href: "/classes",
    },
    {
      label: "Rose & Sugar Sugar Cookie Recipe",
      href: "/sugar-cookie-recipe",
    },
  ],

  finalCta: {
    title: "Now See What We Built It For",
    text: "Explore Rose & Sugar's cookies and decorating classes, or learn more about Megan and the story behind the business.",
    href: "/cookies/signature-sugar-cookie-sets",
    label: "Explore Cookies",
    secondaryHref: "/about",
    secondaryLabel: "Meet Megan",
  },
} as const;
