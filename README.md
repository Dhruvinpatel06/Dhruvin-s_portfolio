# 🚀 Dhruvin's 3D Portfolio

A jaw-dropping developer portfolio packed with interactive 3D animations, buttery smooth transitions, and a space-themed aesthetic. This portfolio features a fully interactive 3D keyboard where each keycap represents a skill — hover or press to reveal details.

## ✨ Features

- **Interactive 3D Keyboard** — Custom Spline keyboard where each keycap represents a skill, revealing titles and descriptions on hover/press with sound effects
- **Buttery Animations** — GSAP + Framer Motion powered scroll, hover, and reveal animations
- **Space Theme** — Floating particles on a dark canvas for a cosmic vibe
- **Light & Dark Mode** — Full theme support with smooth transitions
- **Responsive** — Works across all screen sizes (desktop, tablet, mobile)
- **Contact Form** — Email delivery via Resend with rate limiting and Zod validation
- **Blog** — MDX-powered blog with featured post layout and tag filtering
- **Project Showcase** — Scrolling preview cards with auto-panning screenshots and slideshow support
- **Analytics** _(optional)_ — Umami analytics integration

## 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| **Framework** | Next.js 16, React 19, TypeScript |
| **Styling** | Tailwind CSS, Shadcn UI, Aceternity UI |
| **Animation** | GSAP, Framer Motion |
| **3D** | Spline Runtime |
| **Email** | Resend |
| **Blog** | MDX |
| **Misc** | Lenis (smooth scroll), Zod, next-themes |

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- pnpm (recommended), npm, or yarn

### Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/Dhruvinpatel06/Dhruvin-s_portfolio.git
    cd Dhruvin-s_portfolio
    ```

2. **Install dependencies:**

    ```bash
    pnpm install
    ```

3. **Set up environment variables:**

    Copy `.env.example` to `.env.local` and fill in the values:

    ```bash
    cp .env.example .env.local
    ```

    | Variable | Required | Description |
    |---|---|---|
    | `RESEND_API_KEY` | Yes | API key from [Resend](https://resend.com) for the contact form |
    | `NEXT_PUBLIC_WS_URL` | No | WebSocket server URL for realtime features (cursors, chat, presence) |
    | `UMAMI_DOMAIN` | No | Umami analytics script URL |
    | `UMAMI_SITE_ID` | No | Umami website ID |

4. **Run the development server:**

    ```bash
    pnpm dev
    ```

5. Open [http://localhost:3000](http://localhost:3000) and see the magic ✨

---

## 📁 Project Structure

```
src/
├── app/                  # Next.js App Router pages
│   ├── api/send/         # Contact form email API route
│   ├── blogs/            # Blog listing and detail pages
│   └── page.tsx          # Main portfolio page
├── components/
│   ├── sections/         # Page sections (hero, about, skills, experience, projects, contact)
│   ├── footer/           # Footer component and config
│   ├── header/           # Navigation header with animated menu
│   ├── animated-background.tsx  # 3D keyboard scene controller
│   └── ContactForm.tsx   # Contact form with validation
├── content/
│   └── blogs/            # MDX blog posts
├── data/
│   ├── config.ts         # Site-wide configuration (name, socials, email)
│   ├── constants.ts      # Skills, experience, and keyboard data
│   └── projects.tsx      # Project cards data and content
└── lib/
    └── mdx.ts            # MDX blog processing utilities
```

---

## 🎨 Customization

All personal info is centralized in [`src/data/config.ts`](src/data/config.ts):

```ts
const config = {
  title: "Dhruvin Patel | Full-Stack Developer",
  author: "Dhruvin Patel",
  email: "pateldhruvin2506@gmail.com",
  githubUsername: "Dhruvinpatel06",
  githubRepo: "3d-portfolio",
  social: {
    twitter: "https://x.com/PatelDhruvin_",
    linkedin: "https://www.linkedin.com/in/dhruvin-patel-14a741310/",
    instagram: "https://www.instagram.com/dhruvinpatel_25/",
    github: "https://github.com/Dhruvinpatel06",
  },
};
```

Other key files to customize:

| File | What to change |
|---|---|
| `src/data/projects.tsx` | Projects, screenshots, descriptions, and tech stacks |
| `src/data/constants.ts` | Skills list (name, description, icon) and work experience |
| `src/content/blogs/` | Add `.mdx` blog posts with frontmatter |
| `public/assets/` | Images, OG image, and project screenshots |

---

## ✍️ Adding Blog Posts

Create `.mdx` files in `src/content/blogs/`:

```mdx
---
title: "Your Blog Title"
publishedAt: "2026-07-26"
summary: "A brief summary of your post."
author: "Dhruvin Patel"
tags: ["web-dev", "react"]
---

Your markdown content here...
```

The blog page automatically picks up new posts, sorts by date, and displays a featured post layout.

---

## ⌨️ Updating the 3D Keyboard Skills

The 3D keyboard keycaps are baked into a Spline file. To update the skills displayed on the keyboard:

1. **Import** the `public/assets/skills-keyboard.spline` file into [Spline](https://spline.design/)
2. **Unhide** the keycap objects you want to edit
3. **Update** the logo images on each keycap to your new skill icons
4. **Rename** each keycap object to match the skill's `name` field in `src/data/constants.ts` (e.g. `js`, `react`, `docker`)
5. **Hide** all keycap objects again
6. **Export** the scene and overwrite `public/assets/skills-keyboard.spline`

After updating the Spline file, make sure `src/data/constants.ts` has matching entries for every skill on the keyboard:

```ts
export const SKILLS: Record<SkillNames, Skill> = {
  js: { name: "js", label: "JavaScript", shortDescription: "...", ... },
  react: { name: "react", label: "React", shortDescription: "...", ... },
  // ... add/remove entries to match your keyboard
};
```

The `SkillNames` enum, `SKILLS` record, and the Spline keycap names must all stay in sync for the keyboard interactions to work correctly.

---

## 🔌 Realtime Features (Optional)

The portfolio supports optional realtime features powered by a **separate backend API**:

- 🖱️ **Live cursors** — See other visitors' cursors in realtime
- 👥 **Online presence** — Shows who's currently on the site
- 💬 **Chat** — Live chat between visitors

These features activate automatically when the `NEXT_PUBLIC_WS_URL` environment variable is set. Without it, the portfolio works perfectly fine as a static site — no realtime features, no backend dependency.

> [!NOTE]
> The backend API is **not open source**. This is intentional to keep the live experience unique.

---

## 🚀 Deployment

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Dhruvinpatel06/Dhruvin-s_portfolio)

This site is deployed on **Vercel**. To deploy your own:

1. Push your code to a GitHub repository
2. Connect the repository to [Vercel](https://vercel.com)
3. Add your environment variables (`RESEND_API_KEY`, etc.) in the Vercel dashboard
4. Vercel handles the rest — automatic deployments on every push

---

## 🤝 Contributing

If you'd like to contribute or suggest improvements, feel free to open an issue or submit a pull request. All contributions are welcome!

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

If you use this portfolio, a credit or link back to the [original repo](https://github.com/Dhruvinpatel06/Dhruvin-s_portfolio) would be much appreciated ❤️
