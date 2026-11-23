# The Systems Connector — interactive rotational portfolio

> 18 Months. 3 Rotations. Multiple Perspectives. One Connected Vision.

A premium, presentation-ready web portfolio for an 18-month rotational programme, with a
built-in content editor so it can be updated from any device without touching code.

| Where | What |
|---|---|
| `/` | The five-section portfolio: Introduction, The Journey, Projects & Impact, Growth & Feedback, What's Next |
| `/present` | Presentation mode: one section per slide, full-screen, no editing controls |
| `/summary` | One-page executive summary, print / save-as-PDF friendly |
| `/rotations/1` … `/3` | Dedicated rotation portfolio pages |
| `/projects/<id>` | Deep link to a single case study |
| `/edit` | Password-protected content editor (never linked from the viewer) |

---

## 1. Running it locally

```bash
npm install
cp .env.example .env.local      # then set EDIT_PASSWORD (and AUTH_SECRET)
npm run dev                     # http://localhost:3000
```

Locally, content is stored in `data/content.json` (git-ignored) and image uploads go to
`public/uploads/`. Open `http://localhost:3000/edit` and sign in with `EDIT_PASSWORD`.

---

## 2. Deploying to a stable, shareable URL (Vercel)

The app is a standard Next.js 15 project and deploys to Vercel with zero configuration.
It takes about five minutes.

1. **Import the repository.** Go to <https://vercel.com/new>, pick
   `SaandeepB/StartIT-Journey` (the repo is private — that is fine; Vercel reads it through
   your GitHub login). Framework preset: *Next.js* (auto-detected). Leave build settings as they are.
2. **Add environment variables** before the first deploy (Project → Settings → Environment Variables):

   | Variable | Required | Value |
   |---|---|---|
   | `EDIT_PASSWORD` | yes | a long passphrase only you know |
   | `AUTH_SECRET` | yes | output of `openssl rand -base64 32` |
   | `VIEW_PASSWORD` | optional | set only if viewers must enter a password (see §5) |

3. **Deploy.** You get a stable URL such as `https://startit-journey.vercel.app`. Every later
   content edit happens through `/edit` and never changes the URL; code pushes to `main`
   redeploy automatically, still at the same URL.
4. **Connect the database (1 click).** Project → *Storage* → *Create database* →
   **Upstash for Redis** (free tier is plenty) → connect it to the project. Vercel injects
   `KV_REST_API_URL` / `KV_REST_API_TOKEN` automatically. Redeploy once (Deployments → ⋯ → Redeploy).
   Until this is done the editor shows a yellow banner: saves work but live only in server memory.
5. **(Optional) Image uploads.** Project → *Storage* → **Blob** → connect. `BLOB_READ_WRITE_TOKEN`
   is injected automatically. Without it you can still paste image URLs into the editor.
6. **(Optional) Custom domain.** Project → Settings → Domains.

One-click alternative (pre-fills the env-var prompts):

```
https://vercel.com/new/clone?repository-url=https://github.com/SaandeepB/StartIT-Journey&env=EDIT_PASSWORD,AUTH_SECRET&envDescription=EDIT_PASSWORD%20unlocks%20/edit.%20AUTH_SECRET%20signs%20login%20cookies.&project-name=startit-journey
```

Other hosts (Netlify, Render, Fly.io, a company Kubernetes cluster) work too: it is a Node 18+/
Next.js app. Provide the same environment variables, and point `KV_REST_API_URL` /
`KV_REST_API_TOKEN` at any Upstash Redis database (or `UPSTASH_REDIS_REST_URL` / `_TOKEN`).

---

## 3. Editing content

Open `https://<your-url>/edit` and sign in with `EDIT_PASSWORD`. The editor is generated
from the content schema, so every field in every section is editable:

| Section | What you can change |
|---|---|
| Profile & introduction | name, designation, programme, dates, headline, narrative, key capabilities, photo, contact |
| Rotations | team, function, dates, manager / mentor, responsibilities, technologies, learnings, your ranking and why |
| Projects | full 12-part case studies, ownership type, status, metrics, images, featured flag |
| Performance reviews | rating, scale, numeric value, category, manager feedback, strengths, development areas, examples |
| Feedback themes | recurring strengths / improvements / development areas and which rotations they appeared in |
| Learning curve | capabilities per domain with the level reached in each rotation |
| Highs, lows & turning points | moments, with the lesson or adaptation — shown inside the rotation they belong to |
| Beyond the rotations | roles outside the rotations and memories, with photos |
| AI initiatives | the 8-part structure plus before/after workflows and status |
| Connecting the dots | pillars, insight, synthesis, cross-boundary opportunities |
| Proposed role | title, positioning, pillars, 30-60-90 roadmap, closing message |
| Executive summary | headline, summary, highlights |
| Settings | placeholder highlighting, sample badges, empty-metric display |

How it works:

- **Lists** (projects, rotations, tools…) have *Add*, reorder (▲ ▼), duplicate and delete.
- **Placeholders** are any `[bracketed text]`. They are outlined in amber on the live site
  until replaced, and the editor sidebar counts how many remain per section. Turn off
  *Settings → Highlight placeholders* before presenting if some are intentionally blank.
- **Sample content** (illustrative projects, tools, moments, AI initiatives) carries a
  *Sample* badge until you untick “Sample content” on the item or delete it.
- **Metrics** have a label and a value. Leave the value blank until you can verify it; the
  site shows “To be measured” rather than inventing a number.
- **Ratings** are entered exactly as written on the review, with the scale. The numeric
  comparison chart only appears when every rotation has a numeric value on an identical scale.
- **Save** with the button or ⌘S / Ctrl+S. Saves are versioned; if someone saved from another
  device in the meantime you get a conflict notice instead of overwriting them.
- **Safety nets:** unsaved edits are kept in the browser as a draft; the ⋯ menu offers
  *Export JSON backup*, *Import JSON*, *Version history* (last 10 saves) and *Reset to sample content*.
- **Images:** upload (with Blob connected) or paste any image URL. Max 5 MB, PNG/JPEG/WebP/GIF/SVG.

Changes are live immediately for everyone with the link — no redeploy, no URL change.

---

## 4. Presenting

- Click **Start presentation** on the landing page or open `/present`.
- `→` `←` `Space` `PageUp/Down` move between the five sections; `Home` / `End` jump;
  `F` toggles full screen; `Esc` returns to the portfolio. Controls fade after a few seconds
  so a shared screen shows only the slide. The slide number is kept in the URL (`/present#4`)
  so you can resume where you left off.
- Case studies still open inside presentation mode (click any project).
- On the main page, `→ / ←` (or `J / K`) jump between sections, `P` opens presentation mode,
  `S` opens the summary, `?` lists the shortcuts.
- `/summary` → **Print / save as PDF** gives a light, paginated one-pager.

---

## 5. Sharing, privacy and access control

**Unlisted vs restricted — the honest distinction**

- *Unlisted* (default) means nobody will find the portfolio unless they have the link: the site
  sends `X-Robots-Tag: noindex, nofollow, noarchive`, serves a `robots.txt` that disallows
  everything, adds `<meta name="robots" content="noindex">`, and is not listed in any
  directory or gallery. **It does not stop forwarding.** Anyone who receives the link can open
  it and pass it on.
- *Restricted* means a viewer must prove something before seeing the content. Set
  `VIEW_PASSWORD` to turn on the built-in password gate: every page and the content API
  redirect to `/unlock` until the password is entered (remembered for 30 days on that device).
  Give the password separately from the link. This is simple, shared-secret protection:
  good for “leadership and mentors only”, not a substitute for company SSO.
- For genuinely confidential material, host inside the company network or behind your
  identity provider (Vercel’s paid *Deployment Protection* or an SSO proxy), and keep
  performance ratings and manager feedback out of the public copy.

**What is and isn’t exposed**

- Editing is a separate, cookie-authenticated role. The viewer never shows editing controls
  and `/edit` is not linked anywhere on the site.
- Database and Blob credentials exist only as server environment variables and are used by
  server-side route handlers. The browser only ever receives rendered content JSON.
- Login cookies are HMAC-signed with `AUTH_SECRET`, `httpOnly`, `Secure` in production.
  Password checks are constant-time and throttled (10 attempts / 15 min per IP, per instance).
- Nothing is sent to third parties. Fonts are self-hosted. No analytics.

Follow your organisation’s data-sharing policy for ratings, feedback and internal metrics;
if in doubt, use `VIEW_PASSWORD` and the sample badges to keep sensitive items out until approved.

---

## 6. Architecture

```
app/
  page.tsx                 viewer (server component → client PortfolioViewer)
  present/  summary/       presentation mode, executive summary
  rotations/[n]/  projects/[id]/
  edit/  edit/login/       editor (requires edit cookie)
  unlock/                  viewer password gate (only when VIEW_PASSWORD is set)
  api/content              GET public · PUT editor (validated, versioned)
  api/content/history      last 10 versions · api/content/reset
  api/auth/edit  api/auth/view   password → signed cookie
  api/upload               Vercel Blob (prod) or public/uploads (dev)
  robots.ts  layout.tsx    noindex metadata, fonts, theme
middleware.ts              enforces VIEW_PASSWORD; adds nothing when unset
lib/content/schema.ts      the single zod schema: types + editor hints (widgets, help, multiline)
lib/content/defaults.ts    sample content with [placeholders] and isSample flags
lib/content/store.ts       storage adapters: Upstash/Vercel KV · local file · memory fallback
lib/content/helpers.ts     labels, rotation colours, rating-scale compatibility rule
lib/auth.ts                HMAC tokens (WebCrypto, edge-safe), throttling
components/viewer/         nav, progress, shortcuts, dialog, five sections, presentation, summary
components/editor/         schema-driven form renderer (Field.tsx) and editor shell
```

- **Stack:** Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS 4, Framer Motion,
  zod, Upstash Redis REST client, Vercel Blob. Self-hosted Inter and JetBrains Mono.
- **Content model:** one JSON document validated by `ContentSchema`. Adding a field to the
  schema automatically adds it to the editor; the viewer deep-merges defaults so old
  documents keep working.
- **Storage selection:** `KV_REST_API_URL`+`TOKEN` (or `UPSTASH_REDIS_REST_*`) → Redis;
  otherwise local file in development; otherwise in-memory with a visible warning.

**Design notes.** Dark navy foundation, Inter, electric-blue / violet accents used sparingly.
Data colours were validated with a colour-vision-deficiency checker: rotation identity uses
blue `#3987e5`, teal `#199e70`, amber `#c98500` (passes adjacent and all-pairs checks on the
card surface; violet was rejected as a third series because blue↔violet fails the
normal-vision floor), and capability levels use a single-hue ordinal ramp
`#1c5cab → #3987e5 → #86b6ef`. Every chart has a legend, hover details and a table twin;
bars are ≤ 24 px with 2 px gaps.

---

## 7. Content and accuracy rules built in

- No rating, feedback, outcome, saving, ownership claim or implementation detail is
  pre-filled with a value: all are `[placeholders]`.
- Ownership is a required, visible choice per project: *Owned · Contributed · Collaborated ·
  Identified (not implemented)*.
- AI initiatives carry an explicit status (*Idea · Prototype · Pilot · In production*).
- Ratings are never averaged or charted across different scales.

---

## 8. Troubleshooting

| Symptom | Fix |
|---|---|
| Editor says “Editing is not enabled” | set `EDIT_PASSWORD` (and `AUTH_SECRET`), redeploy / restart |
| Yellow “No database is connected” banner | add Upstash for Redis in Vercel Storage, then redeploy |
| Upload says storage not configured | add Vercel Blob, or paste an image URL |
| “Updated from another device” on save | ⋯ → Export JSON (keep your edits), then *Load the latest version* and re-apply |
| Viewers get `/unlock` unexpectedly | `VIEW_PASSWORD` is set; clear it in Vercel to make the link open |
| Want to start over | ⋯ → Reset to sample content (previous version stays in history) |
