export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  technologies: string[];
  link?: string;
  github?: string;
  featured?: boolean;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface PersonalInfo {
  name: string;
  role: string;
  tagline: string;
  description: string;
  email: string;
  location: string;
  availability: string;
  skills: string[];
  social: SocialLink[];
}

export const personalInfo: PersonalInfo = {
  name: "Danilo Leal",
  role: "Full Stack & Automation Developer",
  tagline: "Web apps, bots and automations",
  description:
    "I build web systems, automations and bots that solve real problems. I work across front-end and back-end, with a strong focus on process automation (RPA) and fast, tested delivery using modern tools and AI. Based in Brazil, available for freelance work worldwide.",
  email: "danilodsbleal@gmail.com",
  location: "Natal, RN, Brazil",
  availability: "Open to freelance work",
  skills: [
    "Next.js & React",
    "TypeScript",
    "Python",
    "Playwright / RPA",
    "Supabase & PostgreSQL",
    "Node.js & REST APIs",
    "Git & CI/CD",
    "AI-assisted development",
  ],
  social: [
    {
      name: "GitHub",
      url: "https://github.com/its-danilo",
      icon: "github",
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/danilo-lnkd/",
      icon: "linkedin",
    },
  ],
};

export const projects: Project[] = [
  {
    id: "4",
    title: "OpenAurum",
    description:
      "An open-source Linux app to control the RGB lighting of the Pichau Aurum V60 keyboard, which only had a Windows app. I reverse-engineered the USB protocol and built a GTK 4 app plus a CLI: all 16 firmware effects, per-key painting, 40+ ready-made scenes and theme sync with the desktop.",
    category: "Open Source / Desktop",
    image: "/openaurum.png",
    technologies: ["Python", "GTK 4", "libadwaita", "USB HID"],
    link: "https://github.com/its-danilo/openaurum",
    github: "https://github.com/its-danilo/openaurum",
    featured: true,
  },
  {
    id: "6",
    title: "Continuum",
    description:
      "A personal execution system: one active mission at a time, curiosities parked instead of lost, and progress measured by evidence rather than hours. Its rules are enforced by the database itself (Postgres triggers and Row-Level Security), backed by a SQL invariant test suite.",
    category: "Productivity / Full-Stack",
    image: "/continuum.png",
    technologies: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "Playwright"],
    link: "https://continuum-danilo.vercel.app",
    github: "https://github.com/John28389/Continuum",
    featured: true,
  },
  {
    id: "5",
    title: "Agenda",
    description:
      "A personal planner for short, medium and long-term goals, built around a focus limit: only what is active and due today shows up. Offline-first PWA that syncs across phone and PC through Supabase, with streaks that only count the days a goal was actually due.",
    category: "PWA / Productivity",
    image: "/agenda.png",
    technologies: ["React", "TypeScript", "Supabase", "Zustand", "PWA"],
    link: "https://agenda-danilo.vercel.app/?demo",
    github: "https://github.com/its-danilo/agenda",
    featured: true,
  },
  {
    id: "1",
    title: "linkfolio",
    description:
      "A link-in-bio SaaS: one shareable page for all your links, with click analytics and monthly subscriptions. Multi-tenant, with authentication and per-user data isolation using Postgres Row-Level Security.",
    category: "SaaS / Full-Stack",
    image: "/linkfolio.png",
    technologies: ["Next.js", "TypeScript", "Supabase", "Stripe", "Tailwind"],
    link: "https://linkfolio-name-6af4.vercel.app",
    github: "https://github.com/its-danilo/linkfolio",
    featured: true,
  },
  {
    id: "2",
    title: "pricewatch",
    description:
      "A price and stock monitor: track any product page and get alerted on price drops or restocks. Backed by a scheduled Python worker with resilient scraping (JSON-LD parsing, with a Playwright fallback for JavaScript pages).",
    category: "Automation / SaaS",
    image: "/pricewatch.png",
    technologies: ["Python", "Playwright", "Next.js", "Supabase", "GitHub Actions"],
    link: "https://pricewatch-kohl.vercel.app",
    github: "https://github.com/its-danilo/pricewatch",
    featured: true,
  },
  {
    id: "3",
    title: "Rodribot",
    description:
      "Legal-process automation (RPA) I built from scratch during my internship. It automates repetitive workflows in Brazil's PJe judicial system and enabled the team's migration to the new PJe2X. Private, closed-source project.",
    category: "Automation (RPA)",
    image:
      "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    technologies: ["Python", "Playwright", "WebView", "Scrum"],
    featured: true,
  },
];
