<div align="center">

# ✦ Dhruvin's Portfolio ✦

### *An immersive 3D developer portfolio with interactive animations, cinematic scroll effects, and a space-themed aesthetic*

[![Next.js](https://img.shields.io/badge/Next.js_16-000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=000)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org/)
[![Tailwind](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Deployed_on_Vercel-000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Dhruvinpatel06/Dhruvin-s_portfolio)

</div>

---

## ⚡ Overview

A jaw-dropping developer portfolio packed with interactive 3D animations, buttery smooth transitions, and a space-themed aesthetic. It features a **fully interactive 3D keyboard** where each keycap represents a skill — hover or press to reveal details with sound effects. Every section is scroll-animated, theme-aware, and responsive across all devices.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🎹 **Interactive 3D Keyboard** | Custom Spline keyboard — each keycap reveals skill details on hover/press with sound effects |
| 🎬 **Cinematic Animations** | GSAP + Framer Motion powered scroll, hover, and reveal animations |
| 🌌 **Space Theme** | Floating particles on a dark canvas for an immersive cosmic vibe |
| 🌗 **Light & Dark Mode** | Full theme support with smooth transitions |
| 📱 **Fully Responsive** | Optimized for desktop, tablet, and mobile |
| 📬 **Contact Form** | Email delivery via Resend with rate limiting and Zod validation |
| 🖼️ **Project Showcase** | Scrolling preview cards with auto-panning screenshots and slideshow support |
| 📊 **Analytics** _(optional)_ | Umami analytics integration |
| 🔴 **Live Cursors** _(optional)_ | See other visitors' cursors in realtime |
| 💬 **Live Chat** _(optional)_ | Chat between visitors in realtime |

---

## 🛠️ Tech Stack

```
┌─────────────────────────────────────────────────────────┐
│  Framework    │  Next.js 16 · React 19 · TypeScript     │
│  Styling      │  Tailwind CSS · Shadcn UI · Aceternity  │
│  Animation    │  GSAP · Framer Motion · Lenis           │
│  3D Engine    │  Spline Runtime                         │
│  Email        │  Resend                                 │
│  Validation   │  Zod                                    │
│  Theming      │  next-themes                            │
│  Analytics    │  Umami (optional)                       │
└─────────────────────────────────────────────────────────┘
```

---

## 🏗️ Featured Projects

| # | Project | Category | Stack |
|---|---------|----------|-------|
| 1 | **F1 Universe** | Interactive Formula 1 Web Experience | HTML5 · CSS3 · JavaScript |
| 2 | **BrandMirror** | AI-Powered Brand Intelligence Platform | React · Vite · FastAPI · Groq |
| 3 | **Gumbalup** | Real-time Quiz Platform | Next.js · tRPC · PartyKit · PostgreSQL |
| 4 | **Waku** | Dynamic Image Rendering Platform | Next.js · tRPC · Satori · Turborepo |
| 5 | **CareerFlow** | AI-Powered Career & Recruitment Platform | Django · Python · SQLite · Bootstrap |
| 6 | **NexaFlow AI** | AI-Powered Productivity & Workflow Platform | Next.js · React · Tailwind · Motion |
| 7 | **L&K Store** | Full Stack E-Commerce Website | JavaScript |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18+
- **pnpm** (recommended), npm, or yarn

### Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/Dhruvinpatel06/Dhruvin-s_portfolio.git
cd Dhruvin-s_portfolio

# 2. Install dependencies
pnpm install

# 3. Set up environment variables
cp .env.example .env.local

# 4. Start the development server
pnpm dev
```

Open **[http://localhost:3000](http://localhost:3000)** and see the magic ✨

### Environment Variables

| Variable | Required | Description |
|---|:---:|---|
| `RESEND_API_KEY` | ✅ | API key from [Resend](https://resend.com) for the contact form |
| `NEXT_PUBLIC_WS_URL` | ❌ | WebSocket server URL for realtime features (cursors, chat, presence) |
| `UMAMI_DOMAIN` | ❌ | Umami analytics script URL |
| `UMAMI_SITE_ID` | ❌ | Umami website ID |

---

## 📁 Project Structure

```
src/
├── app/                        # Next.js App Router pages
│   ├── api/send/               # Contact form email API route
│   └── page.tsx                # Main portfolio page
│
├── components/
│   ├── sections/               # Page sections (hero, about, skills, experience, projects, contact)
│   ├── footer/                 # Footer component and config
│   ├── header/                 # Navigation header with animated menu
│   ├── animated-background.tsx # 3D keyboard scene controller
│   └── ContactForm.tsx         # Contact form with validation
│
├── data/
│   ├── config.ts               # Site-wide configuration (name, socials, email)
│   ├── constants.ts            # Skills, experience, and keyboard data
│   └── projects.tsx            # Project cards data and content
│
└── public/
    └── assets/                 # Images, OG image, backgrounds, screenshots
```

---

## 🎨 Customization

All personal info is centralized in **[`src/data/config.ts`](src/data/config.ts)**:

```ts
const config = {
  title: "Dhruvin Patel | Full-Stack Developer",
  author: "Dhruvin Patel",
  email: "pateldhruvin2506@gmail.com",
  social: {
    twitter: "https://x.com/PatelDhruvin_",
    linkedin: "https://www.linkedin.com/in/dhruvin-patel-14a741310/",
    instagram: "https://www.instagram.com/dhruvinpatel_25/",
    github: "https://github.com/Dhruvinpatel06",
  },
};
```

### Key Files to Customize

| File | What to Change |
|---|---|
| `src/data/projects.tsx` | Projects, screenshots, descriptions, and tech stacks |
| `src/data/constants.ts` | Skills list (name, description, icon) and work experience |
| `public/assets/` | Images, OG image, backgrounds, and project screenshots |

---

## ⌨️ Updating the 3D Keyboard Skills

The 3D keyboard keycaps are baked into a Spline file. To update:

1. **Import** the `public/assets/skills-keyboard.spline` file into [Spline](https://spline.design/)
2. **Unhide** the keycap objects you want to edit
3. **Update** the logo images on each keycap to your new skill icons
4. **Rename** each keycap object to match the skill's `name` field in `src/data/constants.ts`
5. **Hide** all keycap objects again
6. **Export** the scene and overwrite `public/assets/skills-keyboard.spline`

> [!IMPORTANT]
> The `SkillNames` enum, `SKILLS` record, and the Spline keycap names must all stay in sync for keyboard interactions to work correctly.

---

## 🔌 Realtime Features *(Optional)*

The portfolio supports optional realtime features powered by a separate backend API:

| Feature | Description |
|---|---|
| 🖱️ **Live Cursors** | See other visitors' cursors in realtime |
| 👥 **Online Presence** | Shows who's currently on the site |
| 💬 **Live Chat** | Chat between visitors |

These features activate automatically when `NEXT_PUBLIC_WS_URL` is set. Without it, the portfolio works perfectly as a static site.

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

Contributions are welcome! If you'd like to improve this project:

1. **Fork** the repository
2. **Create** your feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">

**Built with ❤️ by [Dhruvin Patel](https://github.com/Dhruvinpatel06)**

If you use this portfolio, a credit or link back to the [original repo](https://github.com/Dhruvinpatel06/Dhruvin-s_portfolio) would be much appreciated ❤️

⭐ **Star this repo if you found it helpful!** ⭐

</div>
