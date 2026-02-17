# Turbopack Build Fix for Dox Template

## Problem

Running `npm run build` with Next.js 16 (Turbopack) fails with:

```
Error: loader …/node_modules/@next/mdx/mdx-js-loader.js for match "{*,next-mdx-rule}"
does not have serializable options. Ensure that options passed are plain JavaScript
objects and values.
```

## Root Cause

The `@next/mdx` `createMDX()` wrapper in `next.config.ts` registers a webpack/Turbopack loader and passes the rehype and remark plugin arrays as loader options. These arrays contain **JavaScript function references** (e.g. `rehypeParseCodeBlocks`, `rehypeShiki`, `remarkGfm`) and a **RegExp** (`/\.mdx?$/`) — none of which are JSON-serializable.

Webpack tolerates non-serializable loader options, but **Turbopack requires all loader options to be plain JSON-serializable values** (strings, numbers, booleans, plain objects, arrays). This is a known incompatibility: https://github.com/vercel/next.js/issues/71819

## Why the Loader Was Unnecessary

The Dox template does **not** use file-based MDX pages (no `.mdx` files in `src/app/`). All MDX content lives in `src/content/` and is compiled at runtime via `compileMDX` from `next-mdx-remote/rsc` in `src/data/get-doc.ts`. That call already receives the rehype/remark plugins directly:

```ts
// src/data/get-doc.ts
const { content, frontmatter } = await compileMDX<DocFrontmatter>({
  source: cleanedSource,
  components,
  options: {
    parseFrontmatter: true,
    mdxOptions: {
      remarkPlugins,
      rehypePlugins,
    },
  },
})
```

The `@next/mdx` loader (which handles `.mdx` file imports at the bundler level) was therefore doing nothing useful — it was only adding a non-functional loader rule that broke Turbopack.

## Fix 1: Remove `@next/mdx` from `next.config.ts`

**Before:**

```ts
import createMDX from '@next/mdx'
import type { NextConfig } from 'next'

import { rehypePlugins } from './src/mdx/rehype'
import { remarkPlugins } from './src/mdx/remark'

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins,
    rehypePlugins,
  },
})

const nextConfig: NextConfig = {
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  experimental: {
    externalDir: true,
  },
}

export default withMDX(nextConfig)
```

**After:**

```ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  pageExtensions: ['ts', 'tsx'],
  experimental: {
    externalDir: true,
  },
}

export default nextConfig
```

**What changed:**
- Removed the `createMDX` wrapper and its imports entirely.
- Removed `'md'` and `'mdx'` from `pageExtensions` since no file-based MDX pages exist.

## Fix 2: Move `@import` before `@tailwind` in `globals.css`

After fixing the MDX loader issue, a second Turbopack error surfaced:

```
@import rules must precede all rules aside from @charset and @layer statements
```

The `@import '../styles/brand.css'` was placed after the `@tailwind` directives. When Tailwind expands those directives during the build, the `@import` ends up in the middle of thousands of lines of generated CSS, violating the CSS spec. Webpack was lenient about this; Turbopack is not.

**Before:**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
@import '../styles/brand.css';
```

**After:**

```css
@import '../styles/brand.css';
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Fix 3: Upgrade `next-mdx-remote` from v5 to v6

After the first two fixes, the Next.js build itself succeeds, but **Vercel blocks the deployment** with:

```
Error: Vulnerable version of next-mdx-remote detected (5.0.0).
Please update to version 6.0.0 or later.
Learn More: https://vercel.link/CVE-2026-0969
```

This is a security policy enforced by Vercel's build pipeline — `next-mdx-remote` v5 has a known CVE.

**Fix:**

```bash
npm install next-mdx-remote@6
```

**Breaking changes in v6 (minimal):**
- New `blockJS` and `blockDangerousJS` parameters (both default to `true`) — blocks JavaScript expressions inside MDX content for security. If your MDX content uses inline JS expressions like `{1 + 1}` or `{process.env.FOO}`, you'll need to explicitly opt out by passing `blockJS: false` to `compileMDX`.
- Updated `unist-util-remove` to `^4.0.0`.

No changes to `compileMDX` call signatures or component APIs — the upgrade is a drop-in replacement for typical usage.

## Summary

| Issue | Cause | Fix |
|---|---|---|
| Non-serializable MDX loader options | `createMDX()` passes function refs to Turbopack loader | Remove `@next/mdx` wrapper (unused — MDX is compiled via `next-mdx-remote/rsc`) |
| CSS `@import` ordering | `@import` placed after `@tailwind` directives | Move `@import` to the top of `globals.css` |
| Vercel CVE block (CVE-2026-0969) | `next-mdx-remote` v5 has a known vulnerability | Upgrade to `next-mdx-remote@6` |

The first two issues only manifest with Turbopack (the default bundler in Next.js 16). The `--webpack` flag in the dev script masked them during development. The third issue is enforced by Vercel regardless of bundler.
