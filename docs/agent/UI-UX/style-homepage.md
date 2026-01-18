# Homepage UI/UX Style Guide

This document captures the visual language and interaction patterns of the
homepage. It excludes navbar and footer. Use it to match the same vibe on
future pages or redesigns.

## Overall Vibe

- Light, airy, and handcrafted with soft gradients and warm neutrals.
- Large, editorial typography paired with clean, readable body copy.
- Depth comes from layered gradients, blurred blobs, shadowed cards, and glassy
  surfaces.
- Motion is gentle: fade/slide reveals, floating accents, slow spins, and soft
  hover lifts.

## Typography System

- **Primary display**: Bebas Neue (used on hero and section headings).
- **Body**: Poppins (default body font).
- **Accent editorial**: Playfair Display (testimonials + pull quotes).
- **Hierarchy**:
  - H1/H2: `font-bebas`, tight tracking, very large sizes with a gradient
    keyword or line.
  - Body: `font-poppins`, 16-20px, relaxed leading.
  - Quotes: `font-playfair`, italic, elevated size for emphasis.

## Color & Gradients

Homepage is built on the bakery palette defined in Tailwind (e.g.
`bakery-pink`, `bakery-pink-light`, `bakery-peach`, `bakery-cream`,
`bakery-brown`). The most common patterns:

- **Section backgrounds**: Soft gradients like
  - `from-bakery-cream via-white to-bakery-peach/30` (Hero)
  - `from-white via-bakery-cream/50 to-bakery-pink-light/40` (About)
  - `from-bakery-pink-light/40 via-bakery-cream/30 to-white` (Testimonials)
  - `from-white via-bakery-cream/50 to-bakery-pink-light/60` (CTA)
- **Gradient text**: `from-bakery-pink-dark via-bakery-pink to-bakery-brown`.
- **Badges/CTAs**: `from-bakery-pink-dark to-bakery-pink` or
  `from-bakery-brown to-bakery-peach`.
- **Overlays**: dark gradient overlays with 20–70% black on imagery.

## Motion & Animation

The page uses mount-based reveals and subtle continuous motion:

- **Section entry**: `opacity` + `translate` transitions on mount (typically
  700–1000ms, staggered by 200–800ms).
- **Floating accents**: `float` keyframe animation on dots/badges.
- **Spin**: Hero ring uses a 60s infinite spin.
- **Hover**: cards lift/scale, shadows intensify, icons nudge, and overlays fade.
- **Global**: `page-transition` is a soft fade-in for the whole page.

## Layout & Spacing

- Sections follow `py-24 md:py-32` or `section-padding` for breathing room.
- `container-custom` = centered with `max-w-7xl` and responsive padding.
- Most sections are structured as a **two-column grid on lg** and a single
  column on mobile.
- Cards often use **rounded-2xl/3xl** with soft borders and layered shadows.

## Common UI Patterns

### Gradient Text Emphasis

- Headlines usually have one line/word in gradient text.
- Example classes: `bg-gradient-to-r ... bg-clip-text text-transparent`.

### Pill Badges

- Rounded full badges with subtle borders and backdrops:
  `bg-white/80 backdrop-blur-sm border border-bakery-pink-light/50`.
- Icons inside badges are small (4–5px size).

### Cards

- Elevated by default (`shadow-lg`) with a light border and hover lift.
- Use organic corner decorations and gradient accents in corners.
- Glass-like cards: `bg-white/80` or `bg-white/60` + `backdrop-blur-sm`.

### CTA Buttons

- Primary: gradient pill (`from-bakery-pink-dark to-bakery-pink`), strong shadow.
- Secondary: white/glass pill with border and subtle hover tint.
- Always `rounded-full` or `rounded-2xl`, with icon arrows that nudge on hover.

## Section-by-Section Breakdown

### Hero (Full-bleed intro)

- **Layout**: Two-column, left copy + right image composition.
- **Background**: layered gradient (`cream → white → peach`) with large blurred
  blobs (top-right and bottom-left).
- **Ambient details**: tiny floating dots with `float` animation and a subtle
  noise texture overlay (`opacity-[0.015]`).
- **Text**:
  - H1 = 3 lines, last line gradient.
  - Body text is max width `~md` for tight, elegant blocks.
- **CTAs**:
  - Primary gradient pill.
  - Secondary glass pill (white/80 with border).
- **Image**:
  - Large rounded 2.5rem image, slightly rotated.
  - Gradient overlay for depth.
  - Decorative dashed ring around image.
  - Two floating badges (top-right and bottom-left) with `float`.
- **Scroll indicator**: centered at bottom, fade-in after mount.

### About (Meet the artist)

- **Background**: white → cream → pink-light gradient, soft blurred blobs and
  floating dots.
- **Image stack**: rotated image with a pastel background shape and a floating
  quote card.
- **Copy**:
  - Bebas heading with gradient line.
  - Two body paragraphs.
  - Pull quote in Playfair with left border.
- **Stats**: 3-up cards with blur, borders, icons, hover lift.
- **Divider**: bottom SVG wave in white.

### Services (Asymmetric two-card layout)

- **Background**: white base with a subtle dot pattern.
- **Layout**: 7/5 column split on lg for asymmetry.
- **Custom Cookies card (left)**:
  - Large gradient card with corner accent.
  - Icon in a gradient square, scales/rotates on hover.
  - Feature chips in a 2x2 grid.
  - Primary CTA gradient pill.
- **Classes card (right)**:
  - Image strip at top with overlay and floating price badge.
  - Darker brown accent palette for class theme.
  - Compact feature list + full-width CTA.

### Featured Shop (Classes + Cookies)

- **Background**: pastel gradient + blurred corner blobs + subtle dot pattern.
- **Header**: centered badge + Bebas title + Poppins subhead.
- **Left**: Featured class card:
  - Full image, gradient overlay, date badge, featured badge, price badge.
  - Card body with meta chips and a bold CTA button.
- **Right**: 2x2 cookie grid:
  - Image cards with hover zoom and quick-add overlay.
  - Price pill anchored top-right.
  - Bottom CTA “Browse All Cookie Designs” as a full-width outlined pill.
- **Bottom**: custom cookie CTA banner with dark gradient, white button.

### Testimonials (Editorial proof)

- **Background**: pink-light → cream → white gradient with large quote glyphs.
- **Layout**: 7/5 split, one featured quote + stacked smaller quotes.
- **Typography**: Playfair italic for lead quote; Poppins for body.
- **Cards**: white rounded-3xl, left gradient bar, hover border intensity.
- **Trust strip**: 3 numeric callouts with thin dividers.

### Gallery (Masonry collage)

- **Background**: white base with light noise texture and pastel blobs.
- **Grid**: 1/2/4 columns with masonry-like row spans and auto-rows.
- **Interaction**:
  - Hover zoom + gradient overlay.
  - Caption slides up from bottom.
  - Corner accent dot appears on hover.
- **CTA**: soft gradient pill container with a “Book a Class” button.

### FAQ (Inline on homepage)

- **Section bg**: white → cream → pink-light gradient.
- **Decor**: blurred pastel orbs in corners.
- **Container**: glassy white card with blur, rounded-3xl, soft shadow.
- **Accordion**:
  - Question text in bakery pink shades.
  - Answer sits on a light pink block with rounded bottom corners.

### Call to Action (Final section)

- **Background**: white → cream → pink-light gradient with floating dots.
- **Headline**: Bebas with gradient word/line.
- **Action cards**:
  - 3 cards with gradient corner accent.
  - Large icon in a gradient square.
  - Hover lift, border glow, arrow indicator reveals.
- **Trust line**: Playfair italic with animated heart icons (`pulse`).

## Motion & Interaction Notes

- Almost every section uses a `mounted` state for staged entrance.
- Hover effects are deliberate but not flashy: slight lifts, icon nudges,
  shadow upgrades, and opacity shifts.
- Gradients are never harsh; they fade softly and are always paired with blur.

## Usage Guidance

When building new sections:

- Lead with a soft gradient background and at least one blurred blob.
- Use Bebas for headings and Poppins for body; use Playfair for quotes.
- Favor rounded-2xl/3xl shapes, soft borders, and glass-like surfaces.
- Add subtle motion: fade/slide-in on mount and gentle hover lifts.
- Use gradient text for one emphasis line per major heading.
