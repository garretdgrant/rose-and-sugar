# Adding a New Blog Post

Follow this recipe to add a blog entry that matches the existing styling and SEO patterns.

IMPORTANT: Before writing or editing any blog content, load and follow both `docs/agent/blog/blog-seo-structure.md` and `docs/agent/blog/blog-writing-style.md`.

For writing style guidance, see `docs/agent/blog/blog-writing-style.md`.
For blog architecture and internal linking requirements, see `docs/agent/blog/blog-seo-structure.md`.

1. Pick a slug and metadata

- Create a URL-safe slug (kebab case) and add it to both the index list (`src/app/blog/page.tsx`) and the detail map (`src/app/blog/[id]/page.tsx`).
- Keep the slug concise and meaningful for SEO—use primary keywords without unnecessary filler words.
- Set `title`, `excerpt`, `category`, `date` (Month DD, YYYY), `readTime`, `author`, and `image` (reuse an existing asset if a new one isn’t ready).

2. Update the blog index card

- In `src/app/blog/page.tsx`, add a new object at the top of the `posts` array with the slug and metadata so it appears in the listing.
- Reuse an existing image import if needed; swap later when the final asset is available.

3. Add the article content

- In `src/app/blog/[id]/page.tsx`, add a new entry to the `blogPosts` object keyed by your slug with the same metadata fields.
- Build the `content` array using the existing block types: `paragraph`, `heading`, `subheading`, `list`, and `quote`. This keeps styling consistent.
- Include at least one `quote` block as a styled excerpt to mirror other posts (e.g., a concise takeaway or memorable line).

4. Verify metadata and JSON-LD

- Ensure `generateStaticParams` picks up the new slug (it maps over the `blogPosts` keys—no extra change needed if the key is added).
- `generateMetadata` already uses the `blogPosts` data; confirm your excerpt reads well as an SEO description (~150 chars).
- The article JSON-LD (`getArticleJsonLd`) will auto-use your data once the entry exists.

5. Update the sitemap

- Add the new slug to `blogSlugs` in `src/app/api/sitemap.xml/route.ts` so the sitemap includes the article URL.

6. Final checks

- Confirm slugs and links match between index and detail pages.
- Run `pnpm prettier` before committing.
- If you add a new image, place it in `src/assets` and import it in both the index and detail files.
