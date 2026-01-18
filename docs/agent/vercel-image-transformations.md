# Image & Vercel Transform Audit Guide (for Next.js + Vercel)

## 1. Goal of This Audit

The agent should review the Next.js project and produce:

- A list of image usage patterns that cause **unnecessary Vercel image transformations**
- A set of **specific, code-level recommendations** to:
  - reduce transformations
  - improve Core Web Vitals (LCP, CLS)
  - keep bakery visuals looking premium

This audit is **static**: based on the repo and any info Garret provides, not on live crawling.

---

## 2. Inputs the Agent Needs

The agent should start by collecting:

1. **Project context**
   - Root directory of the Next.js app
   - Next.js version
   - Whether this is using:
     - App Router (`app/`) or Pages Router (`pages/`)

2. **Config files**
   - `next.config.*`
   - Any custom image config (e.g. `lib/image.ts`, UI helpers, design system components)

3. **Optional but helpful (Garret will provide, not the agent)**
   - Screenshot or summary of Vercel “Image Transformations” usage
   - Primary domains and any subdomains (e.g. roseandsugar.com, preview domains)

---

## 3. Step 1 – Inventory All Images

The agent should create an **image inventory**:

- Scan the codebase for:
  - `next/image` imports
  - `<Image …>` usage
  - Raw `<img …>` tags
  - CSS backgrounds that reference `/public` assets

- For each image usage, capture:
  - File path (e.g. `/public/hero/rose-01.jpg`)
  - Component / page where used
  - Whether it uses `<Image>` or `<img>`
  - Whether it’s:
    - hero / LCP candidate
    - product / cookie photo
    - icon / logo / decorative
    - background texture (like the paper noise)

- Identify:
  - **Remote images** (CDN URLs, Shopify, etc.)
  - **Static images** in `/public`

Output: a short table or list summarizing all major image types and where they appear.

---

## 4. Step 2 – Review Next.js Image Configuration

The agent should open `next.config.*` and note:

- `images` config:
  - `domains` / `remotePatterns`
  - `deviceSizes` and `imageSizes`
  - `formats` (e.g. `['image/webp', 'image/avif']` if configured)
  - Whether `unoptimized` is `true` or `false`
- Any custom loaders or image-related plugins

The agent should answer:

- Are `deviceSizes` and `imageSizes` **reasonable and not excessive**?
- Are we allowing **unnecessary very large widths**?
- Are there **remote domains** that are no longer used?

Output: a short explanation of the current image config, with recommendations if:

- sizes arrays are too big,
- formats are missing,
- or remote domains can be trimmed.

---

## 5. Step 3 – Analyze Each `<Image>` Usage

For each `<Image>` usage in the inventory, the agent should check:

1. **Width / height / layout**
   - Does it have explicit `width` and `height` props, or a well-configured `fill + sizes` pattern?
   - Is it using sizes that match real layout breakpoints (not random numbers)?
   - Are we avoiding layout shift (CLS) by always defining the layout constraints?

2. **Sizes diversity**
   - Are we using a small **set of shared widths** (e.g. 320, 640, 1024, 1536) or lots of unique widths?
   - Are we repeating the same pattern across components, or inventing new sizes each time?

3. **Icons and small decorative images**
   - Are we using `<Image>` for icons or tiny UI elements that should be:
     - SVGs
     - inline icons
     - part of a sprite or font?

4. **Backgrounds and textures**
   - Are things like the “paper texture” implemented as:
     - huge raster images, or
     - small SVGs / CSS patterns?
   - Could they be replaced with a **small, reusable asset**?

The agent should flag:

- Any image that uses very large originals (e.g. 4000+ px wide) when the layout never needs that size.
- Any instances of unbounded `fill` without a responsible parent container.
- Any one-off widths that are likely generating unique transformation variants.

---

## 6. Step 4 – Map Patterns to Potential Transform Cost

The agent should connect what they find to Vercel transformation behavior:

- **More unique sizes = more transformations.**
  - If the code uses many slightly different widths or `sizes` expressions, each can create unique variants.
- **Using `<Image>` on small icons = unnecessary transforms.**
- **Remote images** with no caching proxy or consistent sizes can explode variant counts.
- **Background images** that use large assets or multiple breakpoints increase transformations.

The agent should list **concrete patterns** that most likely contribute to extra transforms, such as:

- Components that use `Image` with dynamic width values derived from props.
- Multiple hero components each using different arbitrary widths.
- Icons or badges implemented as `<Image>` instead of inline SVG.

---

## 7. Step 5 – Recommend Changes (Prioritized)

The agent should produce a **prioritized list of changes**, grouped by impact:

### High Impact / Easy Wins

- Consolidate image widths into a small shared set for all baking / product images.
- Convert tiny assets (icons, UI glyphs, some logos) from `<Image>` to **SVG** or inline components.
- Ensure every hero / LCP image has:
  - `priority` prop where appropriate
  - tight `sizes` definition to avoid overfetching

### Medium Impact

- Refactor any `fill` images that depend on auto height and instead give them:
  - a responsive parent with fixed aspect ratio
  - explicit CSS aspect ratio where possible
- Replace large raster backgrounds used only for texture with:
  - a small SVG pattern, or
  - a compressed WebP at realistic resolution

### Lower Impact / Nice to Have

- Clean up unused images in `/public`.
- Remove unused remote image domains from `next.config.*`.
- Standardize an internal helper for product/collection images so everyone uses the same `sizes` and layout.

Each recommendation should be written as:

- what to change
- where in the codebase (file/component)
- why it helps
- whether it’s safe/visual-risky or not

---

## 8. Final Deliverables for the Audit

The agent should output:

1. **Summary**
   - 3–5 bullet “state of images” overview.
2. **Image Inventory**
   - Brief categorized list (heroes, product cookies, classes, icons, textures).
3. **Transform Risk Patterns**
   - List of patterns that likely cause extra Vercel image transformations.
4. **Prioritized Action List**
   - High / Medium / Low impact items with file references.
5. **Optional: Rose & Sugar Specific Notes**
   - Any special considerations for cookie/class photos:
     - suggested maximum widths for hero images
     - suggested widths for product thumbnails and card images
     - guidance on keeping the “subtle paper texture” cheap and reusable.

The goal: after the agent runs this audit, Garret should have a clear, actionable checklist to reduce Vercel image transformations and improve performance while keeping the bakery’s visuals high quality.
