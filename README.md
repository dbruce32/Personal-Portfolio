# Personal Portfolio

My portfolio site, built with **Next.js 14**, **TypeScript**, and **CSS Modules**, statically exported and deployed to GitHub Pages with GitHub Actions.

**Live site:** [dbruce32.github.io/Personal-Portfolio](https://dbruce32.github.io/Personal-Portfolio/)

## Pages

| Page | What's on it |
|---|---|
| **Home** | Name, "Currently" list, live Atlanta clock, Voronoi background, and a photo you can click to send bouncing around the screen |
| **Professional** | Education, Awards & Activities, and an Experience timeline split into Industry, Research & Teaching, and Earlier. Role photos enlarge on click. Sticky "On this page" index with sub-sections |
| **Skills** | Languages, then an editorial list of skill groups, each noting where those skills were used |
| **Projects** | Current, Research, and Past Projects in two columns, with embedded demo video, live-site previews, and a sticky section index |
| **Contact** | Email, LinkedIn, and GitHub, local time, and a macOS-style terminal that answers commands (`help`, `about`, `email`, `linkedin`, `github`, `clear`) |

## Tech stack

- **Framework:** Next.js 14 (App Router, static export)
- **Language:** TypeScript
- **Styling:** CSS Modules + CSS variables (`src/styles/globals.css`)
- **Testing:** Jest + React Testing Library
- **CI/CD:** GitHub Actions
- **Hosting:** GitHub Pages
- **Node:** 24 (pinned in `.nvmrc`)

## Getting started

```bash
npm install        # install dependencies
npm run dev        # dev server at http://localhost:3000
npm test           # run tests
npm run lint       # ESLint
npx tsc --noEmit   # typecheck
npm run build      # static export to out/
```

Locally the site runs at `/`. Production builds add the `/Personal-Portfolio` base path for GitHub Pages (see `next.config.js`). Reference images and files with `getAssetPath()` from `src/lib/basePath.ts` so they work in both.

## Project structure

```
src/
├── app/                     # Pages (App Router)
│   ├── layout.tsx           # Root layout and metadata
│   ├── page.tsx             # Home
│   ├── professional/        # Education, awards, experience timeline
│   ├── skills/              # Skills
│   ├── projects/            # Projects
│   ├── contact/             # Contact + terminal
│   ├── icon.png             # Favicon ("DB." mark)
│   └── apple-icon.png       # iOS home-screen icon
├── components/
│   ├── Navbar/              # Top navigation
│   ├── Footer/
│   ├── SectionNav/          # Sticky "On this page" index (supports sub-sections)
│   ├── ZoomableImage/       # Click-to-enlarge photo
│   ├── ContourBackground/   # Voronoi background (home)
│   ├── BouncyPhoto/         # Click-to-bounce profile photo (home)
│   ├── LiveClock/           # Atlanta time
│   ├── Magnetic/            # Cursor-following hover effect
│   └── FadeInOnScroll/      # Fade-in as content scrolls into view
├── lib/basePath.ts          # getAssetPath() for the GitHub Pages base path
└── styles/globals.css       # Colors, fonts, navbar height, resets

public/
├── documents/               # Resume PDF
└── images/                  # Logos, project previews, roles/ (experience photos)

__tests__/pages/             # One test file per page
```

## Editing content

Page content lives as plain data at the top of each page file, so most updates don't touch layout code.

- **Experience:** the `experiences` array in `src/app/professional/page.tsx`. Each entry has a `group` (`industry`, `academic`, or `earlier`) that decides which timeline it appears in. Entries are listed newest first.
- **Role photos:** add an optional `photo` to an experience entry. Leave `src` unset to show a "Photo coming soon" placeholder.
  - Put images in `public/images/roles/`.
  - Landscape photos (4:3) fit the frame best.
  - Convert iPhone HEIC files to JPEG, resize to about 1600px wide, and strip metadata (GPS location) before committing.
- **Projects:** the `current`, `research`, and `projects` arrays in `src/app/projects/page.tsx`. Optional fields add a "My role" note (`role`), bullet `highlights`, a YouTube embed (`youtubeId`), or a live-site preview (`liveUrl` + `previewImage`).
- **Skills:** `primaryLanguages`, `otherLanguages`, and `categories` in `src/app/skills/page.tsx`.
- **Contact:** the `contacts` and `responses` objects in `src/app/contact/page.tsx`. The terminal commands come from `responses`.
- **Home "Currently" list:** the `currently` array in `src/app/page.tsx`.
- **Resume:** replace `public/documents/dylan_bruce_resume.pdf`, keeping the file name.

## CI/CD

**CI** (`.github/workflows/ci.yml`) runs on every pull request into `main`. Three jobs run in parallel, so one failure doesn't hide another:

| Job | Checks |
|---|---|
| **Lint & typecheck** | ESLint, then `tsc --noEmit` |
| **Test** | Jest with coverage. The report is saved as a `coverage` artifact. |
| **Build** | Static export. The site is saved as a `site` artifact. |

Artifacts can be downloaded from the run page for 7 days. A new push to a PR cancels that PR's previous run.

**Deploy** (`.github/workflows/deploy.yml`) runs on every push to `main`, and can also be started by hand from the Actions tab. It reuses the CI workflow, so nothing goes live unless lint, typecheck, tests, and build all pass. It then publishes the exact `site` artifact CI built.

### GitHub Pages setup

1. Go to the repository's **Settings → Pages**.
2. Set **Source** to **GitHub Actions**.
