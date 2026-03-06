Recommended architecture for recipe

1. Create the recipe as a real Shopify product

In Shopify, make the recipe a normal product.

Suggested structure:

Title: No Spread Sugar Cookie Recipe

Handle: no-spread-sugar-cookie-recipe

Product type: Recipe

Tags:

recipe

digital

maybe featured-recipe if useful later

You do not need some special “recipe checkout object.”
It should just be a Shopify product with at least one variant.

2. Fetch it from Shopify just like your real products

Since your current real flows are Shopify-backed, the recipe page should stop using mock data and instead fetch the recipe product from your backend.

So yes: fetch from your backend.

That keeps your architecture consistent and lets the frontend receive:

product title

price

description

image

variant ID / merchandise ID

handle

tags / productType

3. Use product type for logic, tags for flexibility

You asked whether to add another tag.

My recommendation:

Use both:

productType = Recipe

tags like:

recipe

digital

Why

productType is better for app logic

tags are better for merchandising/filtering later

So yes, add another tag if you want, but the more important field is probably product type.

Best implementation path

You have two clean options.

Option A — Dedicated recipe endpoint

Best if this is mainly one recipe page right now.

Example:

/api/shopify/recipes

or /api/shopify/products/[handle]

The recipe page fetches the real product by handle and uses that response to add to cart.

This is probably the simplest and cleanest.

Option B — Generalize your existing product fetching

Best if you want more digital products later.

For example, create a reusable Shopify fetch layer that can fetch:

classes collection

cookies collection

recipes by tag/productType/handle

Then all product types share one internal shape before hitting cart.

This is the more scalable approach.

How the recipe should behave in cart

It should behave almost exactly like a normal Shopify item.

For recipe cart item:

You likely only need:

product/variant identity

title

price

image

quantity

Unlike class bookings, you probably do not need line item attributes like:

Event Start

Event End

location

So the recipe can use the same addItem flow, just without the class-specific metadata.

Practical recommendation for your codebase

Based on the flow you pasted, here’s what I’d do:

1. Remove mock recipe cart data

Replace mock-no-spread-recipe in:

src/components/shop/RecipeAddToCartButton.tsx

with a real Shopify-backed product object.

2. Fetch recipe product from backend

Either:

create src/app/api/shopify/recipes/route.ts

or better, create a reusable product-by-handle endpoint

Example use:

fetch handle: no-spread-sugar-cookie-recipe

3. Normalize recipe into same cart-ready shape

Like your classes mapper in src/lib/shopifyClasses.ts, make a mapper for recipe products or a shared mapper.

The frontend should receive a consistent object such as:

id

title

handle

image

price

variantId / merchandiseId

productType

tags

That way addItem() doesn’t care whether it’s a class, cookie, or recipe.

4. Add recipe to Zustand cart store

Use the same addItem flow already used by:

ClassProductCard

ProductDetailClient

Recipe should just add a standard line item.

5. Keep checkout API the same

You should still use:

/api/shopify/checkout

No reason to build a separate checkout endpoint.

The only difference is that recipe items won’t include the class-specific attributes.

6. Let webhook/cart completion stay the same

Your existing:

order create webhook

Redis completion status

cart auto-clear watcher

can remain unchanged.

That’s another reason this is the right architecture.

Recommended data model

For the Shopify product:

Title: No Spread Sugar Cookie Recipe

Handle: no-spread-sugar-cookie-recipe

Product type: Recipe

Tags: recipe, digital

Variant: default variant with the real price

For frontend logic:

productType === 'Recipe' → render as digital product

tags can support filtering or sections later
