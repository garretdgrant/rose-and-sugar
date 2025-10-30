export type Recipe = {
  slug: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  prep: string;
  ingredients: string[];
  steps: string[];
};

export const recipes: Recipe[] = [
  {
    slug: "vanilla-bean-sugar-cookies",
    title: "Vanilla Bean Sugar Cookies",
    description:
      "Soft centers, crisp edges, and a sturdy crumb that holds its shape for intricate decorating.",
    image: "/gallery/weddingCookies.jpg",
    tags: ["Signature", "Makes 24"],
    prep: "Prep 30 min · Chill 2 hr · Bake 10 min",
    ingredients: [
      "1 cup unsalted butter, room temperature",
      "1 1/2 cups granulated sugar",
      "2 large eggs, room temperature",
      "2 tsp vanilla bean paste",
      "3 1/2 cups all-purpose flour",
      "2 tsp baking powder",
      "1/2 tsp fine sea salt",
    ],
    steps: [
      "Cream butter and sugar for 3 minutes until light and fluffy.",
      "Beat in eggs and vanilla, scraping the bowl between additions.",
      "Whisk flour, baking powder, and salt; fold into butter mixture until just combined.",
      "Divide dough, wrap, and chill at least 2 hours for clean cut edges.",
      "Roll to 1/4 in thickness, cut shapes, and bake at 350°F for 9-10 minutes.",
      "Cool completely on racks before decorating.",
    ],
  },
  {
    slug: "strawberry-royal-icing",
    title: "Strawberry Royal Icing",
    description:
      "A glossy, pipeable finish that layers beautifully and dries with a soft bite.",
    image: "/gallery/donuts.jpg",
    tags: ["Decorating", "Naturally Flavored"],
    prep: "Prep 15 min · Rest 30 min",
    ingredients: [
      "4 cups powdered sugar, sifted",
      "3 tbsp meringue powder",
      "1/2 cup room-temperature water",
      "2 tbsp strawberry purée, strained",
      "1 tsp lemon juice",
      "Gel color as desired",
    ],
    steps: [
      "Whisk powdered sugar and meringue powder to remove clumps.",
      "Beat in water on low until combined, then increase speed for 2 minutes.",
      "Add strawberry purée and lemon juice; mix until silky.",
      "Adjust consistency with drops of water (for flood) or sugar (for detail).",
      "Tint in small batches, keep covered with plastic touching the surface.",
      "Rest 30 minutes to let air bubbles rise; stir gently before use.",
    ],
  },
  {
    slug: "citrus-glaze-drizzle",
    title: "Citrus Glaze Drizzle",
    description:
      "A quick finish for drop cookies or bundt cakes that adds sheen and a bright pop of flavor.",
    image: "/gallery/insects.jpg",
    tags: ["Quick Finish", "Gluten Friendly"],
    prep: "Prep 10 min",
    ingredients: [
      "1 cup powdered sugar, sifted",
      "2 tbsp fresh lemon juice",
      "1 tbsp orange juice",
      "Zest of 1/2 lemon",
      "Pinch fine sea salt",
      "1-2 tsp milk, as needed",
    ],
    steps: [
      "Whisk powdered sugar, citrus juices, zest, and salt until smooth.",
      "Add milk a teaspoon at a time until the glaze ribbons off the whisk.",
      "Use immediately over cooled cookies or cakes in a thin, even stream.",
      "Let set for 20 minutes before packaging to prevent smudging.",
    ],
  },
];

export const getRecipeBySlug = (slug: string) =>
  recipes.find((recipe) => recipe.slug === slug);
