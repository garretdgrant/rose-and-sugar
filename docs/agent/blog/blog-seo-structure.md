# Blog SEO Structure Guide (for a Coding Agent)

Goal: Implement a blog architecture that ranks, scales, and converts by using a pillar + cluster model, consistent internal linking, and clean technical SEO.

This document tells you exactly how to structure routes, metadata, sitemaps, internal links, and content relationships.

---

## 0) Definitions (Must Understand)

### Pillar Page

A pillar is a broad, authoritative guide that targets a major topic/keyword and links out to supporting posts.

- Example: /blog/free-website-builder-vs-professional-web-design

### Cluster Post

A cluster is a narrower article targeting a specific long-tail query that links back to its pillar.

- Example: /blog/hidden-costs-of-free-website-builders

### Topic Cluster

A cluster is a set of cluster posts connected to 1 pillar.

- Pillar <-> Cluster posts (bi-directional links)
- Cluster <-> Cluster posts (only when highly relevant)

### Money Pages

Your conversion pages (Services, Pricing, Contact). Blog posts should link to these strategically.

---

## 1) Site Architecture

### URL structure (recommended)

- Blog index: /blog
- Posts: /blog/[slug]
- Optional categories (only if you will use them consistently):
  - Category index: /blog/category/[categorySlug]

### Canonical URLs

- Every page must have a canonical URL pointing to itself.
- Avoid duplicate content via multiple routes or query params.

### Breadcrumbs (optional but recommended)

- Blog index -> post
- If using categories: Blog index -> category -> post

---

## 2) Content Model (Data Structures)

### Required frontmatter/metadata for every post

Store as MDX frontmatter or database fields:

- title (string)
- description (string)
- slug (string, unique)
- datePublished (ISO string)
- dateModified (ISO string)
- authorName (string) (e.g., "Garret Grant")
- readingTime (number or computed)
- featuredImage (OG image URL)
- tags (string[])
- category (string) (optional)
- pillar (object | null):
  - isPillar (boolean)
  - pillarSlug (string | null) // for cluster posts
  - clusterSlugs (string[]) // for pillar pages
- draft (boolean)

### Relationship rules

- Each cluster post must reference exactly 1 pillar (pillarSlug).
- Each pillar should list its cluster posts (clusterSlugs) or compute them by querying posts where pillarSlug === pillar.slug.

---

## 3) Pillar + Cluster Internal Linking Rules (Non-negotiable)

### Pillar page linking rules

Pillar pages MUST:

- Link to every cluster post in a dedicated "Related guides" section near the top (above the fold if possible).
- Link to cluster posts naturally throughout the content (contextual links).
- Link to at least 1 relevant money page (Services/Pricing/Contact) after delivering value.

### Cluster post linking rules

Each cluster post MUST:

- Link back to its pillar in the first ~200 words.
  - Use descriptive anchor text like:
    - "free website builders vs professional design"
    - "local SEO for small business guide"
- Include 2-6 contextual internal links to other relevant cluster posts (not forced).
- Include 1-2 links to money pages if the post has buyer intent.

### Anchor text rules

- Avoid "click here".
- Use descriptive anchors that match the destination topic.
- Keep anchors natural (no exact-match stuffing).

### Link count guidance (per post)

- Outbound internal links: 3-8
- Inbound internal links: update 2-5 older posts to link to the new post (this is mandatory for fast indexing).

---

## 4) Avoid Orphan Pages (Crawlability)

A post is "orphaned" if no internal page links to it.

Implementation requirements:

- /blog index MUST list latest posts (and optionally category filters).
- Every post MUST appear somewhere reachable from /blog:
  - Latest feed
  - Category page
  - Pillar related section
- Add a build-time check:
  - For each post slug, ensure it is referenced by:
    - blog index OR category index OR pillar cluster list

---

## 5) Suggested Page Components (UX + SEO)

### Blog index (/blog)

- H1: "Blog"
- Intro paragraph (1-2 lines)
- List of posts (paginated)
- Optional topic filters (tags/categories)
- Optional "Start here" section linking to top pillars

### Post page (/blog/[slug])

Must include:

- H1 title
- Author + dates (published + modified)
- Reading time
- Table of contents (TOC) for long posts
- Main content
- "Related posts" section:
  - If cluster: show sibling cluster posts + pillar
  - If pillar: show all cluster posts
- CTA section near end ("Next steps")

---

## 6) Metadata Requirements (Next.js / SEO)

For each blog page:

- title, description
- openGraph:
  - title
  - description
  - url
  - images (1200x630)
- twitter card
- canonical
- JSON-LD:
  - Blog post: BlogPosting
  - Blog index: Blog or CollectionPage

### JSON-LD for BlogPosting (minimum fields)

- @context: "https://schema.org"
- @type: "BlogPosting"
- headline
- description
- datePublished
- dateModified
- author (Person)
- image
- mainEntityOfPage (self URL)

---

## 7) Internal Linking Automation (Recommended)

Implement helpers:

### getRelatedPosts(post)

- If post.pillarSlug exists:
  - return sibling cluster posts (same pillarSlug) + pillar
- If post.isPillar:
  - return cluster posts where pillarSlug === post.slug

### linkSuggestionEngine(post)

At build time, compute:

- Candidate internal links based on:
  - overlapping tags
  - same pillar
  - same category
    Return top 5 suggestions for editors.

---

## 8) Sitemaps + RSS + Robots

### Sitemap

- Include:
  - /blog
  - all /blog/[slug] posts (non-draft)
- Ensure lastmod reflects dateModified.

### RSS feed (optional but recommended)

- /rss.xml or /feed.xml
- Include title, link, description, date.

### Robots

- Ensure blog is not blocked.
- Ensure canonical host is consistent (www vs non-www).

---

## 9) Publishing Workflow (For SEO Momentum)

When publishing a new cluster post:

1. Add it to its pillar's "Related guides" list.
2. Add 2-5 internal links from older related posts to the new post.
3. Add 1 link from the new post back to pillar near top.
4. Verify:
   - page source contains correct <title>, <meta>, OG tags
   - JSON-LD is present server-side
5. Submit URL in Google Search Console (optional but recommended).

---

## 10) Topic Cluster Blueprint (Example)

### Pillar

/blog/free-website-builder-vs-professional-web-design
Targets: "free website builders vs professional web design"

### Clusters

- /blog/hidden-costs-of-free-website-builders
- /blog/do-free-websites-rank-on-google
- /blog/when-to-hire-a-web-designer
- /blog/wix-vs-squarespace-vs-wordpress-small-business

Linking:

- Pillar links to all clusters
- Each cluster links back to pillar + 2 sibling clusters

---

## 11) QA Checklist (Agent Must Validate)

### Content/link checks

- [ ] Every cluster post links to its pillar near the top
- [ ] Pillar links to all cluster posts (dedicated section + contextual)
- [ ] Each post has 3-8 internal links
- [ ] No orphan posts
- [ ] Anchor text is descriptive (no "click here")

### Technical SEO checks

- [ ] Canonical is correct
- [ ] OG image is set (1200x630)
- [ ] JSON-LD present in page source
- [ ] Sitemap includes blog pages
- [ ] Blog index links to all posts through pagination or categories

---

## 12) Implementation Notes (Next.js App Router)

Recommended approach:

- Posts in /content/blog/\*.mdx with frontmatter
- Build-time parsing (e.g., gray-matter)
- Static generation for posts
- generateMetadata() per post
- Server-render JSON-LD in the head/body (not client-only)

Avoid:

- Injecting SEO tags with useEffect
- Rendering JSON-LD only client-side

---

## Done

If you implement everything above, your blog will:

- Be easy to crawl
- Build topical authority
- Pass link equity correctly
- Convert informational traffic into leads
