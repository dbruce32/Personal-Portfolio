# Personal Portfolio

A modern portfolio website built with **Next.js 14**, **TypeScript**, and **CSS Modules**, statically exported and deployed to GitHub Pages via GitHub Actions.

🔗 **Live Site:** [https://dbruce32.github.io/Personal-Portfolio/](https://dbruce32.github.io/Personal-Portfolio/)

## Tech Stack

- **Framework:** Next.js 14 (App Router, static export)
- **Language:** TypeScript
- **Styling:** CSS Modules + CSS Variables
- **Testing:** Jest + React Testing Library
- **CI/CD:** GitHub Actions
- **Hosting:** GitHub Pages

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Run tests
npm test

# Lint
npm run lint
```

## Project Structure

```
src/
├── app/                    # Next.js pages (App Router)
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   ├── projects/           # Projects page
│   ├── professional/       # Professional timeline page
│   ├── skills/             # Skills page
│   └── contact/            # Contact page
├── components/             # Reusable React components
│   ├── AnimatedBackground/
│   ├── ParticleCanvas/
│   ├── IntroAnimation/
│   ├── PanelCard/
│   ├── Navbar/
│   ├── ProjectCard/
│   ├── TimelineItem/
│   ├── SkillCategory/
│   └── Footer/
└── styles/
    └── globals.css         # Global styles and CSS variables
```

## CI/CD

- **CI Workflow** (`ci.yml`): Runs lint, tests, and build on pull requests to `main`
- **Deploy Workflow** (`deploy.yml`): Builds and deploys to GitHub Pages on push to `main`

## Deployment

The site is automatically deployed to GitHub Pages when changes are pushed to the `main` branch. The deployment uses Next.js static export (`output: 'export'`) to generate static HTML files.

To configure GitHub Pages:
1. Go to your repository Settings → Pages
2. Set Source to "GitHub Actions"
