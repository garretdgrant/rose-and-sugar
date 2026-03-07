# SEO Follow-Ups: Private Cookie Classes

## 1) Replace Placeholder/Default Images

### Task: Dedicated OG image for social sharing

- Intended usage: Open Graph + Twitter image for `/private-cookie-classes-folsom-sacramento`
- Required dimensions/aspect ratio: `1200x630` (1.91:1)
- Target path: `public/images/private-cookie-class-og.jpg`
- Prompt (copy/paste):
  - "Photorealistic overhead composition of a private sugar cookie decorating class setup on a bright table, pastel royal icing bags, decorated floral and birthday cookies, warm natural light, clean premium bakery aesthetic, Sacramento lifestyle vibe, shallow depth of field, no people faces, high detail, no text, no logo, no watermark, 1200x630 horizontal."
- Instruction: Avoid embedded text unless explicitly requested.

### Task: Hero section class-in-action image

- Intended usage: Replace the hero placeholder box on page
- Required dimensions/aspect ratio: `1200x800` (3:2)
- Prompt (copy/paste):
  - "Photorealistic private cookie decorating class in action, hands decorating sugar cookies with pastel royal icing, bright modern indoor setting, joyful event atmosphere, premium bakery brand feel, natural skin tones, high detail, no text overlays, no logos, 1200x800."
- Instruction: Avoid embedded text.

### Task: Kids birthday section image

- Intended usage: Replace kids birthday placeholder
- Required dimensions/aspect ratio: `800x600` (4:3)
- Prompt (copy/paste):
  - "Photorealistic kids cookie decorating birthday party table with colorful icing and festive cookies, cheerful but tasteful styling, bright natural lighting, high detail, no text, no logos, 800x600."
- Instruction: Avoid embedded text.

### Task: Girls' night section image

- Intended usage: Replace girls' night placeholder
- Required dimensions/aspect ratio: `800x600` (4:3)
- Prompt (copy/paste):
  - "Photorealistic group of friends decorating sugar cookies at a stylish private class, warm candid energy, pastel icing palette, bakery workshop environment, shallow depth of field, no text, no logos, 800x600."
- Instruction: Avoid embedded text.

### Task: Bridal shower section image

- Intended usage: Replace bridal/baby shower placeholder
- Required dimensions/aspect ratio: `800x600` (4:3)
- Prompt (copy/paste):
  - "Photorealistic bridal shower cookie decorating scene with elegant floral cookie designs, soft neutral palette, refined table styling, premium event aesthetic, no text, no logos, 800x600."
- Instruction: Avoid embedded text.

### Task: Corporate team building section image

- Intended usage: Replace corporate placeholder
- Required dimensions/aspect ratio: `800x600` (4:3)
- Prompt (copy/paste):
  - "Photorealistic corporate team building cookie decorating event, colleagues collaborating around decorated sugar cookies and icing bags, modern office event setting, polished lifestyle photography, no text, no logos, 800x600."
- Instruction: Avoid embedded text.

### Task: Finished cookies close-up image

- Intended usage: Replace finished-cookies placeholder in What's Included section
- Required dimensions/aspect ratio: `800x600` (4:3)
- Prompt (copy/paste):
  - "Photorealistic close-up of beautifully decorated sugar cookies with royal icing details, vibrant but elegant color palette, crisp texture detail, professional food photography lighting, no text, no logos, 800x600."
- Instruction: Avoid embedded text.

### Task: Supplies flat-lay image

- Intended usage: Replace supplies placeholder in What's Included section
- Required dimensions/aspect ratio: `800x600` (4:3)
- Prompt (copy/paste):
  - "Photorealistic flat-lay of cookie decorating supplies including piping bags, bowls of royal icing, baked sugar cookies, and tools on a clean table, bright natural light, premium bakery aesthetic, no text, no logos, 800x600."
- Instruction: Avoid embedded text.

## 2) Inbound Internal Links (Other Pages)

- Add links to this page from:
  - `/classes` with anchor text "private cookie decorating classes"
  - `/corporate-team-building` with anchor text "private classes for your team"
  - `/` with anchor text "private decorating classes"
  - `/about` with anchor text "book a private class"

## 3) External Validation + Indexing

- Validate updated schema in https://validator.schema.org
- Submit `/private-cookie-classes-folsom-sacramento` in Google Search Console for re-indexing
- Monitor impressions/clicks/CTR and FAQ rich results performance for 30/60/90-day checkpoints

## 4) Image Placement Map (Code Locations)

- File to update: `src/app/private-cookie-classes-folsom-sacramento/PrivateCookieClassesClient.tsx`
- Hero image: already implemented in hero CTA area (`/cookie-class.webp`) in the first section of the page.
- Occasion card images: add an image slot inside each card in the "CELEBRATE ANY OCCASION WITH A COOKIE DECORATING PARTY" grid.
- Target cards for first image pass:
  - Kids & Adult Birthday Parties
  - Girls' Nights & Friend Get-Togethers
  - Bridal Showers & Baby Showers
  - Corporate Team Building & Work Events
- What&apos;s Included supporting images: add a 2-column image row near the end of the "EVERYTHING YOU NEED TO DECORATE WITH CONFIDENCE" card, after the two descriptive paragraphs and before the section closes.
- OG/Twitter image path for metadata: `public/images/private-cookie-class-og.jpg` (used by page metadata in `src/app/private-cookie-classes-folsom-sacramento/page.tsx`).
