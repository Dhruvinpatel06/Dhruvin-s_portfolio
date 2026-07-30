import AceTernityLogo from "@/components/logos/aceternity";
import SlideShow from "@/components/slide-show";
import { Button } from "@/components/ui/button";
import { TypographyH3, TypographyP } from "@/components/ui/typography";
import { ArrowUpRight, ExternalLink, Link2, MoveUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
// Spline has no thesvg entry — keep the Three.js mark as its stand-in.
import { SiThreedotjs } from "react-icons/si";
const BASE_PATH = "/assets/projects-screenshots";

// Renders a brand SVG from /public as a monochrome glyph that inherits the
// surrounding text color (the skill dock styles every icon via currentColor),
// so full-color marks like Mistral flatten to match the rest of the set.
const MaskIcon = ({ src, title }: { src: string; title?: string }) => (
  <span
    role="img"
    aria-label={title}
    className="block bg-current"
    style={{
      width: "1em",
      height: "1em",
      WebkitMaskImage: `url(${src})`,
      maskImage: `url(${src})`,
      WebkitMaskRepeat: "no-repeat",
      maskRepeat: "no-repeat",
      WebkitMaskPosition: "center",
      maskPosition: "center",
      WebkitMaskSize: "contain",
      maskSize: "contain",
    }}
  />
);

const ProjectsLinks = ({ live, repo }: { live?: string; repo?: string }) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-start gap-3 my-3 mb-8">
      {live && live !== "#" && (
        <Link
          className="font-mono underline flex gap-2"
          rel="noopener"
          target="_new"
          href={live}
        >
          <Button variant={"default"} size={"sm"}>
            Visit Website
            <ArrowUpRight className="ml-3 w-5 h-5" />
          </Button>
        </Link>
      )}
      {repo && repo !== "#" && (
        <Link
          className="font-mono underline flex gap-2"
          rel="noopener"
          target="_new"
          href={repo}
        >
          <Button variant={"default"} size={"sm"}>
            Github
            <ArrowUpRight className="ml-3 w-5 h-5" />
          </Button>
        </Link>
      )}
    </div>
  );
};

export type Skill = {
  title: string;
  bg: string;
  fg: string;
  icon: ReactNode;
};
// Brand chips sourced from thesvg CLI mono SVGs in /public/assets/logos,
// rendered via MaskIcon so each one inherits the dock's currentColor.
const brand = (title: string, file: string): Skill => ({
  title,
  bg: "black",
  fg: "white",
  icon: <MaskIcon src={`/assets/logos/${file}`} title={title} />,
});
const PROJECT_SKILLS = {
  next: brand("Next.js", "nextdotjs-mono.svg"),
  chakra: brand("Chakra UI", "chakra-ui-mono.svg"),
  node: brand("Node.js", "nodedotjs-mono.svg"),
  python: brand("Python", "python-mono.svg"),
  prisma: brand("Prisma", "prisma-mono.svg"),
  postgres: brand("PostgreSQL", "postgresql-mono.svg"),
  mongo: brand("MongoDB", "mongodb-mono.svg"),
  express: brand("Express", "express-mono.svg"),
  reactQuery: brand("React Query", "react-query-mono.svg"),
  shadcn: brand("shadcn/ui", "shadcn-ui-mono.svg"),
  // Not in the thesvg registry — keep the existing custom logo.
  aceternity: {
    title: "Aceternity",
    bg: "black",
    fg: "white",
    icon: <AceTernityLogo />,
  },
  tailwind: brand("Tailwind", "tailwind-css-mono.svg"),
  docker: brand("Docker", "docker-mono.svg"),
  // Not in the thesvg registry — keep the text mark.
  yjs: {
    title: "Y.js",
    bg: "black",
    fg: "white",
    icon: (
      <span>
        <strong>Y</strong>js
      </span>
    ),
  },
  firebase: brand("Firebase", "firebase-mono.svg"),
  sockerio: brand("Socket.io", "socketdotio-mono.svg"),
  js: brand("JavaScript", "javascript-mono.svg"),
  ts: brand("TypeScript", "typescript-mono.svg"),
  html5: brand("HTML5", "html5-mono.svg"),
  css3: brand("CSS3", "css3-mono.svg"),
  vue: brand("Vue.js", "vuedotjs-mono.svg"),
  react: brand("React.js", "react-mono.svg"),
  sanity: brand("Sanity", "sanity-mono.svg"),
  // Not in the thesvg registry — keep the Three.js stand-in.
  spline: {
    title: "Spline",
    bg: "black",
    fg: "white",
    icon: <SiThreedotjs />,
  },
  gsap: brand("GSAP", "gsap-mono.svg"),
  motion: brand("Motion", "motion.svg"),
  supabase: brand("Supabase", "supabase-mono.svg"),
  trpc: brand("tRPC", "trpc-mono.svg"),
  drizzle: brand("Drizzle ORM", "drizzle-mono.svg"),
  hono: brand("Hono", "hono-mono.svg"),
  redis: brand("Redis / BullMQ", "redis-mono.svg"),
  cloudflare: brand("Cloudflare", "cloudflare-mono.svg"),
  // React Native reuses the React mark.
  reactNative: brand("React Native", "react-mono.svg"),
  betterAuth: brand("Better Auth", "better-auth-mono.svg"),
  // Not in the thesvg registry — keep the text marks.
  zustand: {
    title: "Zustand",
    bg: "black",
    fg: "white",
    icon: <span className="text-xs font-bold">Zu</span>,
  },
  partykit: {
    title: "PartyKit",
    bg: "black",
    fg: "white",
    icon: <span className="text-base">🎈</span>,
  },
  hocuspocus: {
    title: "Hocuspocus",
    bg: "black",
    fg: "white",
    icon: <span className="text-xs font-bold">Hp</span>,
  },
  // React Flow ships under the xyflow brand.
  reactFlow: brand("React Flow", "xyflow-mono.svg"),
  codemirror: brand("CodeMirror", "codemirror-mono.svg"),
  // "Satori / sharp" — uses the sharp mark.
  satori: brand("Satori / sharp", "sharp-mono.svg"),
  turborepo: brand("Turborepo", "turborepo-mono.svg"),
  // Vercel AI SDK uses the Vercel mark.
  aiSDK: brand("Vercel AI SDK", "vercel-mono.svg"),
  anthropic: brand("Anthropic Claude", "anthropic-mono.svg"),
  mistral: brand("Mistral AI", "mistral-ai-mono.svg"),
  // Not in the thesvg registry — keep the text mark.
  nextIntl: {
    title: "next-intl",
    bg: "black",
    fg: "white",
    icon: <span className="text-xs font-bold">i18n</span>,
  },
  // Not in the thesvg registry — keep the text marks.
  expo: {
    title: "Expo",
    bg: "black",
    fg: "white",
    icon: <span className="text-xs font-bold">Expo</span>,
  },
  mcp: {
    title: "MCP",
    bg: "black",
    fg: "white",
    icon: <span className="text-xs font-bold">MCP</span>,
  },
  fastapi: brand("FastAPI", "fastapi-mono.svg"),
  vite: brand("Vite", "vite-mono.svg"),
  groq: {
    title: "Groq",
    bg: "black",
    fg: "white",
    icon: <span className="text-xs font-bold">Groq</span>,
  },
  recharts: {
    title: "Recharts",
    bg: "black",
    fg: "white",
    icon: <span className="text-xs font-bold">📊</span>,
  },
  django: {
    title: "Django",
    bg: "black",
    fg: "white",
    icon: <span className="text-xs font-bold">Dj</span>,
  },
  sqlite: {
    title: "SQLite",
    bg: "black",
    fg: "white",
    icon: <span className="text-xs font-bold">SQL</span>,
  },
  bootstrap: {
    title: "Bootstrap",
    bg: "black",
    fg: "white",
    icon: <span className="text-xs font-bold">B</span>,
  },
};
export type Project = {
  id: string;
  category: string;
  title: string;
  src: string;
  screenshots: string[];
  /** Optional: when provided, the card shows a crossfade slideshow instead of a single scrolling image */
  slideshowImages?: string[];
  skills: { frontend: Skill[]; backend: Skill[] };
  content: React.ReactNode | any;
  github?: string;
  live: string;
};
const projects: Project[] = [
  {
    id: "f1universe",
    category: "Interactive Formula 1 Web Experience",
    title: "F1 Universe",
    src: "/assets/projects-screenshots/f1universe/landing.png",
    screenshots: ["landing.png"],
    skills: {
      frontend: [
        PROJECT_SKILLS.html5,
        PROJECT_SKILLS.css3,
        PROJECT_SKILLS.js,
      ],
      backend: [],
    },
    live: "https://dhruvinpatel06.github.io/F1_Universe/",
    github: "https://github.com/Dhruvinpatel06/F1_Universe",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            A modern Formula 1 themed website delivering an immersive racing
            experience through stunning visuals and engaging interactions.
          </TypographyP>
          <TypographyP className="font-mono ">
            F1 Universe is a modern and responsive web application inspired by
            the excitement of Formula 1 racing. The project combines premium
            UI/UX design with interactive animations and smooth navigation to
            create an engaging experience for motorsport enthusiasts. Built with
            a strong focus on performance and responsiveness, the website
            showcases Formula 1 content in a visually appealing way while
            demonstrating modern frontend development skills and creative design
            principles.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />

          <TypographyH3 className="my-4 mt-8">Key Features</TypographyH3>
          <p className="font-mono mb-2">
            Modern Formula 1 inspired UI with a premium dark theme and red-black
            color palette. Fully responsive across all devices — desktop, tablet,
            and mobile. Smooth scrolling and animations with interactive sections
            and navigation. Premium visual effects including speed motion,
            racing lights, and futuristic dashboard elements. Clean and organized
            code structure with optimized performance throughout.
          </p>
          <SlideShow images={[`${BASE_PATH}/f1universe/landing.png`]} />
        </div>
      );
    },
  },
  {
    id: "brandmirror",
    category: "AI-Powered Brand Intelligence Platform",
    title: "BrandMirror",
    src: "/assets/projects-screenshots/brandmirror/landing.png",
    screenshots: ["landing.png", "dashboard.jpg", "hub.png", "sentiment.png", "analysis.png", "audit.png", "chatbot.png"],
    skills: {
      frontend: [
        PROJECT_SKILLS.react,
        PROJECT_SKILLS.vite,
        PROJECT_SKILLS.recharts,
      ],
      backend: [
        PROJECT_SKILLS.fastapi,
        PROJECT_SKILLS.python,
        PROJECT_SKILLS.groq,
      ],
    },
    live: "https://www.linkedin.com/posts/dhruvin-patel-14a741310_ai-llm-fastapi-ugcPost-7469958589051453440-rMUK/",
    github: "https://github.com/Dhruvinpatel06/BrandMirror",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            An AI-powered feedback intelligence platform that analyzes reviews,
            tracks sentiment, and generates actionable insights using LLMs.
          </TypographyP>
          <TypographyP className="font-mono ">
            BrandMirror was developed in just 10 hours during HackBaroda 2026.
            Unlike traditional sentiment analysis tools that only provide a
            snapshot of current feedback, BrandMirror stores historical insights
            in persistent memory — enabling longitudinal analysis, trend
            detection, competitor comparison, and root cause analysis over time.
            The modular architecture allows independent replacement of AI models,
            vector databases, and data sources without affecting the rest of the
            system.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />

          <TypographyH3 className="my-4 mt-8">
            AI-Powered Sentiment Engine
          </TypographyH3>
          <p className="font-mono mb-2">
            The platform automatically collects reviews from multiple public
            sources, analyzes them using Groq-powered Qwen3-32B large language
            models, and generates structured sentiment insights. Persistent
            Hindsight Vector Memory stores every analysis for future comparisons,
            enabling brand health tracking over weeks and months rather than
            one-off snapshots.
          </p>

          <TypographyH3 className="my-4 mt-8">
            Interactive Analytics Dashboard
          </TypographyH3>
          <p className="font-mono mb-2">
            A React + Recharts dashboard presents real-time data visualizations
            including sentiment trends, competitor comparison charts, root cause
            breakdowns, and brand health scores. The interface is designed for
            product managers and brand strategists who need actionable insights
            at a glance.
          </p>

          <TypographyH3 className="my-4 mt-8">
            HackBaroda 2026
          </TypographyH3>
          <p className="font-mono mb-2">
            Built as a complete AI-powered Brand Intelligence Platform within
            10 hours — focusing on long-term sentiment analysis, persistent
            memory architecture, and intelligent business insights powered by
            Groq and Qwen3-32B.
          </p>
          <SlideShow images={[
            `${BASE_PATH}/brandmirror/dashboard.jpg`,
            `${BASE_PATH}/brandmirror/hub.png`,
            `${BASE_PATH}/brandmirror/sentiment.png`,
            `${BASE_PATH}/brandmirror/analysis.png`,
            `${BASE_PATH}/brandmirror/audit.png`,
            `${BASE_PATH}/brandmirror/chatbot.png`,
          ]} />
        </div>
      );
    },
  },
  {
    id: "gumbalup",
    category: "Real-time quiz platform",
    title: "Gumbalup",
    src: "/assets/projects-screenshots/gumbalup/landing.png",
    screenshots: ["landing.png"],
    skills: {
      frontend: [
        PROJECT_SKILLS.ts,
        PROJECT_SKILLS.next,
        PROJECT_SKILLS.react,
        PROJECT_SKILLS.tailwind,
        PROJECT_SKILLS.motion,
      ],
      backend: [
        PROJECT_SKILLS.trpc,
        PROJECT_SKILLS.partykit,
        PROJECT_SKILLS.drizzle,
        PROJECT_SKILLS.postgres,
        PROJECT_SKILLS.betterAuth,
        PROJECT_SKILLS.cloudflare,
        PROJECT_SKILLS.docker,
      ],
    },
    live: "https://gumbalup.com/",
    // Private repo (commercial product) — intentionally no public source link
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            A live, interactive quiz &amp; audience-engagement platform — built
            solo, end-to-end.
          </TypographyP>
          <TypographyP className="font-mono ">
            A production-grade, multi-tenant SaaS where organizations build
            quizzes (manually or with AI) and run live, host-driven games —
            players join from any device via room code / QR and compete on a
            real-time, server-authoritative leaderboard. Also supports async
            self-paced quizzes, team mode, anti-cheat monitoring, analytics,
            billing, and white-labeling. ~43.5K lines of TypeScript across 257
            files.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />

          <TypographyH3 className="my-4 mt-8">
            Server-authoritative game engine
          </TypographyH3>
          <p className="font-mono mb-2">
            A real-time game engine on PartyKit (Cloudflare Durable Objects +
            WebSockets): a per-room in-memory state machine with an authoritative
            1-second timer, speed-rank + streak scoring, deterministic
            tie-broken leaderboards, team mode, and graceful reconnect/replay —
            ~2,800 lines of game logic behind a typed message protocol (42
            discriminated-union variants). Correctness is never sent to clients
            during an active question, so players can&apos;t sniff answers or
            game the clock.
          </p>
          <SlideShow images={[`${BASE_PATH}/gumbalup/dashboard.png`]} />

          <TypographyH3 className="my-4 mt-8">
            Edge-to-DB security boundary &amp; AI authoring
          </TypographyH3>
          <p className="font-mono mb-2">
            The edge worker never connects to Postgres directly — it proxies all
            persistence through a shared-secret internal HTTPS API on Next.js,
            keeping the database unreachable from the public internet while the
            worker stays stateless and edge-deployed. A fully type-safe layer (17
            tRPC routers, 5 authorization tiers, Zod) backs it, with LLM-powered
            quiz authoring (Groq / Llama) from topics or uploaded PDFs, quota-
            metered per org, plus analytics with CSV/Excel/PDF export.
          </p>
          <SlideShow
            images={[
              `${BASE_PATH}/gumbalup/editor.png`,
              `${BASE_PATH}/gumbalup/library.png`,
            ]}
          />
        </div>
      );
    },
  },
  {
    id: "waku",
    category: "Image rendering platform",
    title: "Waku",
    src: "/assets/projects-screenshots/waku/landing.png",
    screenshots: ["landing.png"],
    skills: {
      frontend: [
        PROJECT_SKILLS.ts,
        PROJECT_SKILLS.next,
        PROJECT_SKILLS.react,
        PROJECT_SKILLS.tailwind,
      ],
      backend: [
        PROJECT_SKILLS.trpc,
        PROJECT_SKILLS.drizzle,
        PROJECT_SKILLS.postgres,
        PROJECT_SKILLS.satori,
        PROJECT_SKILLS.betterAuth,
        PROJECT_SKILLS.cloudflare,
        PROJECT_SKILLS.turborepo,
        PROJECT_SKILLS.docker,
      ],
    },
    live: "https://waku.nareshkhatri.site",
    github: "https://github.com/Dhruvinpatel06/waku",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            An on-demand dynamic image-generation service — &quot;design once,
            ship a typed URL endpoint.&quot;
          </TypographyP>
          <TypographyP className="font-mono ">
            Design a template once in a Canva-like editor, then get a typed URL
            that renders images with live, dynamic data on demand (currently
            focused on OG images). Built as a 7-package Turborepo monorepo
            (Next.js 15 / React 19 / TypeScript) — a visual editor, an edge render
            service, a 3-stage rendering engine, typed SDKs, and shared DB/font
            packages. 25K+ LOC, MIT-licensed and self-hostable via
            docker-compose.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />

          <TypographyH3 className="my-4 mt-8">
            Deterministic render pipeline &amp; URL contract
          </TypographyH3>
          <p className="font-mono mb-2">
            A deterministic pipeline (TemplateDocument → Satori → Resvg → sharp)
            compiles a flat node IR to SVG and rasterizes to PNG/WebP/JPEG with
            HTTP Accept-based format negotiation, dynamic font subsetting from a
            CDN (25 families, Latin unicode-range parsing), and retina-aware
            transcoding — served behind an immutable Cache-Control: max-age=1y URL
            contract. Query params are sorted before encoding so any input order
            maps to one cache key; versioned URLs are immutable while published
            URLs 302-redirect to a numbered version, so edits never break
            previously-shared links.
          </p>
          <SlideShow images={[`${BASE_PATH}/waku/preview.png`]} />

          <TypographyH3 className="my-4 mt-8">
            Canva-like editor &amp; AI template generation
          </TypographyH3>
          <p className="font-mono mb-2">
            A visual editor built from scratch (no Figma/tldraw/Fabric) on raw
            pointer events + a Zustand store: edge/center snap guides,
            scroll-anchored + pinch zoom (5%–800%), a 100-entry coalesced
            undo/redo stack, and a parameter-binding system that turns any field
            into a typed URL param. An AI agent generates full templates from a
            prompt, validated against a Zod document schema. The public image
            proxy is also SSRF-hardened (private-IP/CIDR blocking, redirect
            re-validation, streaming size caps, and per-user/IP rate limiting).
          </p>
          <SlideShow
            images={[
              `${BASE_PATH}/waku/editor.png`,
              `${BASE_PATH}/waku/ai.png`,
            ]}
          />
        </div>
      );
    },
  },
  {
    id: "careerflow",
    category: "AI-Powered Career & Recruitment Platform",
    title: "CareerFlow",
    src: "/assets/projects-screenshots/careerflow/landing.png",
    screenshots: ["landing.png"],
    skills: {
      frontend: [
        PROJECT_SKILLS.html5,
        PROJECT_SKILLS.css3,
        PROJECT_SKILLS.js,
        PROJECT_SKILLS.bootstrap,
      ],
      backend: [
        PROJECT_SKILLS.python,
        PROJECT_SKILLS.django,
        PROJECT_SKILLS.sqlite,
      ],
    },
    live: "https://career-flow-pi.vercel.app",
    github: "https://github.com/Dhruvinpatel06/CareerFlow",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            A modern recruitment and career management platform connecting job
            seekers, employers, and administrators — built during my Backend
            Development Internship at CodeAlpha.
          </TypographyP>
          <TypographyP className="font-mono ">
            CareerFlow was developed during my Backend Development Internship at
            CodeAlpha as a full-stack recruitment platform designed to simplify
            the job application and hiring process. The platform provides
            dedicated dashboards for job seekers, employers, and administrators,
            allowing each user to efficiently manage their responsibilities.
            Candidates can explore job opportunities, create professional
            profiles, upload resumes, and submit applications. Employers can
            publish job openings, review applications, and manage recruitment
            workflows, while administrators oversee platform management and user
            operations.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />

          <TypographyH3 className="my-4 mt-8">
            Role-Based Dashboards
          </TypographyH3>
          <p className="font-mono mb-2">
            Three dedicated dashboards for candidates, employers, and
            administrators — each with tailored workflows. Candidates explore
            job listings, build profiles, and upload resumes. Employers post
            openings, review applications, and manage hiring pipelines.
            Administrators oversee platform-wide user management and operations
            through a secure admin panel.
          </p>

          <TypographyH3 className="my-4 mt-8">
            Full-Stack Architecture
          </TypographyH3>
          <p className="font-mono mb-2">
            Built with Django and Python on the backend with SQLite for
            efficient data management. The frontend uses HTML5, CSS3, JavaScript,
            and Bootstrap for a responsive, mobile-friendly experience. Features
            include user authentication with role-based access control, resume
            upload system, job search with filtering, and complete CRUD
            operations across all entities.
          </p>

          <TypographyH3 className="my-4 mt-8">
            Internship Project — CodeAlpha
          </TypographyH3>
          <p className="font-mono mb-2">
            Developed as part of my Backend Development Internship at CodeAlpha,
            this project demonstrates my ability to build complete web
            applications with role-based authentication, database management,
            backend logic, and responsive user interfaces while solving
            real-world recruitment challenges.
          </p>
          <SlideShow images={[`${BASE_PATH}/careerflow/landing.png`]} />
        </div>
      );
    },
  },
  {
    id: "nexaflow",
    category: "AI-Powered Productivity & Workflow Platform",
    title: "NexaFlow AI",
    src: "/assets/projects-screenshots/nexaflow/landing.png",
    screenshots: ["landing.png", "demo.png", "features.png", "pricing.png"],
    skills: {
      frontend: [
        PROJECT_SKILLS.react,
        PROJECT_SKILLS.ts,
        PROJECT_SKILLS.next,
        PROJECT_SKILLS.tailwind,
        PROJECT_SKILLS.motion,
      ],
      backend: [],
    },
    live: "https://nexaflow-ai-kappa.vercel.app",
    github: "https://github.com/Dhruvinpatel06/NexaFlow_AI",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            A premium SaaS landing page for an Autonomous AI Operating System —
            built for Frontend Battle 3.0 at IIT Bhubaneswar.
          </TypographyP>
          <TypographyP className="font-mono ">
            NexaFlow AI is an 8-scene cinematic landing page built with Next.js
            14, React 19, and Tailwind CSS v4. It features a monochromatic
            luxury design system inspired by Apple Vision Pro and Linear — deep
            obsidian black base (#030303), specular edge lighting, glassmorphism
            cards, and zero-neon contrast driven entirely by light, shadow, and
            metallic white typography. Designed and engineered for the IIT
            Bhubaneswar Frontend Battle 3.0 – 2026 hackathon.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />

          <TypographyH3 className="my-4 mt-8">
            8-Scene Camera Travel Architecture
          </TypographyH3>
          <p className="font-mono mb-2">
            The hero opens with a WebGL 3D neural dust particle mesh, a live
            code terminal (nexaflow_init.ts), and real-time telemetry counters
            (12,840+ workflows, 99.98% SLA, sub-15ms latency). Scene 2 features
            a fully interactive prompt simulator with a 4-step execution trace
            timeline and streaming memory logs. Scene 3 delivers 3D glass bento
            cards with specular borders showcasing platform capabilities.
          </p>
          <SlideShow
            images={[
              `${BASE_PATH}/nexaflow/landing.png`,
              `${BASE_PATH}/nexaflow/demo.png`,
            ]}
          />

          <TypographyH3 className="my-4 mt-8">
            Interactive AI Playground & Dynamic Pricing
          </TypographyH3>
          <p className="font-mono mb-2">
            The playground lets users type custom workflow prompts or select
            presets (e.g., &quot;Automate HubSpot Lead Intake → Send Slack
            Notification → Update Notion DB&quot;) and watch a live execution
            trace with per-step latency. The pricing engine supports real-time
            multi-currency conversion (USD, EUR, GBP, INR, JPY, CAD, AUD) with
            monthly/annual billing toggles and automated 20% discount
            calculations — all driven by a clean pricingMatrix.ts +
            pricingEmitter.ts architecture.
          </p>
          <SlideShow
            images={[
              `${BASE_PATH}/nexaflow/features.png`,
              `${BASE_PATH}/nexaflow/pricing.png`,
            ]}
          />

          <TypographyH3 className="my-4 mt-8">
            🏆 Frontend Battle 3.0 – 2026
          </TypographyH3>
          <p className="font-mono mb-2">
            Built for Frontend Battle 3.0 – 2026, the flagship frontend
            competition organized by the Web and Design Society at IIT
            Bhubaneswar. Features a custom single-pointer precision cursor with
            spring physics, 60 FPS GPU-accelerated animations, JSON-LD
            structured data, and 100% static pre-rendering for instant First
            Contentful Paint.
          </p>
        </div>
      );
    },
  },
  {
    id: "lkstore",
    category: "Full Stack E-Commerce Website",
    title: "L&K Store",
    src: "/assets/projects-screenshots/lkstore/landing.png",
    screenshots: ["landing.png"],
    live: "https://dhruvinpatel06.github.io/L-K_store/",
    github: "https://github.com/Dhruvinpatel06/L-K_store",
    skills: {
      frontend: [
        PROJECT_SKILLS.js,
      ],
      backend: [],
    },
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            A modern and responsive e-commerce platform for seamless online
            shopping.
          </TypographyP>
          <TypographyP className="font-mono ">
            L&K Store is a full-stack e-commerce website built using modern web
            technologies. The platform allows users to browse products, explore
            categories, and enjoy a smooth shopping experience through a
            responsive and intuitive interface. The project focuses on clean UI
            design, responsive layouts, and efficient frontend-backend
            integration.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />

          <TypographyH3 className="my-4 mt-8">
            Key Features
          </TypographyH3>
          <p className="font-mono mb-2">
            Responsive design for desktop, tablet, and mobile devices. Product
            catalog with organized categories, interactive and user-friendly
            interface, fast and optimized performance, modern UI/UX design with
            clean navigation, and cross-browser compatibility.
          </p>
          <SlideShow images={[`${BASE_PATH}/lkstore/landing.png`]} />
        </div>
      );
    },
  },
];
export default projects;
