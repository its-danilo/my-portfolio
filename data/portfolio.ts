import type { Localized } from '@/lib/language';

export interface Project {
  id: string;
  title: string;
  description: Localized;
  category: Localized;
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
  description: Localized;
  email: string;
  location: Localized;
  availability: Localized;
  skills: Localized<string[]>;
  social: SocialLink[];
}

export const personalInfo: PersonalInfo = {
  name: "Danilo Leal",
  role: "Full Stack & Automation Developer",
  tagline: "Web apps, bots and automations",
  description: {
    en: "I build web systems, automations and bots that solve real problems. I work across front-end and back-end, with a strong focus on process automation (RPA) and fast, tested delivery using modern tools and AI. Based in Brazil, available for freelance work worldwide.",
    pt: "Crio sistemas web, automações e bots que resolvem problemas reais. Trabalho no front-end e no back-end, com foco forte em automação de processos (RPA) e entregas rápidas e testadas, usando ferramentas modernas e IA. Moro no Brasil e atendo como freelancer no mundo todo.",
  },
  email: "danilodsbleal@gmail.com",
  location: { en: "Natal, RN, Brazil", pt: "Natal, RN, Brasil" },
  availability: { en: "Open to freelance work", pt: "Aberto a trabalhos freelance" },
  skills: {
    en: [
      "Next.js & React",
      "TypeScript",
      "Python",
      "Playwright / RPA",
      "Supabase & PostgreSQL",
      "Node.js & REST APIs",
      "Git & CI/CD",
      "AI-assisted development",
    ],
    pt: [
      "Next.js e React",
      "TypeScript",
      "Python",
      "Playwright / RPA",
      "Supabase e PostgreSQL",
      "Node.js e APIs REST",
      "Git e CI/CD",
      "Desenvolvimento assistido por IA",
    ],
  },
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
    id: "3",
    title: "Rodribot",
    description: {
      en: "Legal-process automation (RPA) I built from scratch during my internship. It drives 20+ repetitive clerical workflows in Brazil's PJe judicial system, from case triage to issuing citations, with resilient browser automation and a remote kill switch, and ships as a standalone Windows app. It enabled the team's migration to the new PJe2X, moving cases over straight from a spreadsheet. Private, closed-source project.",
      pt: "Automação de processos judiciais (RPA) que criei do zero durante meu estágio. Ela executa mais de 20 fluxos repetitivos de secretaria no PJe, o sistema judicial eletrônico do Brasil, da triagem de processos à expedição de citações, com automação de navegador resiliente e um botão de desligamento remoto, e roda como um app de Windows independente. Foi ela que viabilizou a migração da equipe para o novo PJe2X, movendo os processos direto de uma planilha. Projeto privado, de código fechado.",
    },
    category: { en: "Automation (RPA)", pt: "Automação (RPA)" },
    image: "/rodribot.png",
    technologies: ["Python", "Playwright", "tkinter", "PyInstaller"],
    link: "/rodribot",
    featured: true,
  },
  {
    id: "7",
    title: "Kinetree",
    description: {
      en: "A calisthenics app that turns training into an RPG: an onboarding interview places your level and builds a weekly training plan, a skill tree maps the progressions, and an RPG profile shows your attributes and an anatomical muscle-load heatmap. Work in progress.",
      pt: "Um app de calistenia que transforma o treino em RPG: uma entrevista inicial define seu nível e monta um plano de treino semanal, uma árvore de habilidades mapeia as progressões e um perfil de RPG mostra seus atributos e um mapa de calor anatômico da carga muscular. Em desenvolvimento.",
    },
    category: { en: "Mobile / Flutter · WIP", pt: "Mobile / Flutter · Em andamento" },
    image: "/kinetree.png",
    technologies: ["Flutter", "Dart", "Riverpod", "Supabase"],
    link: "https://kinetree.vercel.app",
    featured: true,
  },
  {
    id: "6",
    title: "Continuum",
    description: {
      en: "A personal execution system built from months of notes on my own working patterns: one active mission at a time, curiosities parked instead of lost, and progress measured by evidence rather than hours. Its rules are enforced by the database itself (Postgres triggers and Row-Level Security), backed by a SQL invariant test suite.",
      pt: "Um sistema pessoal de execução criado a partir de meses de anotações sobre meus próprios padrões de trabalho: uma missão ativa por vez, curiosidades guardadas em vez de perdidas e progresso medido por evidências, não por horas. As regras são garantidas pelo próprio banco de dados (triggers do Postgres e Row-Level Security), com uma suíte de testes SQL de invariantes.",
    },
    category: { en: "Productivity / Full-Stack", pt: "Produtividade / Full-Stack" },
    image: "/continuum.png",
    technologies: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "Playwright"],
    link: "/continuum",
    github: "https://github.com/John28389/Continuum",
    featured: true,
  },
  {
    id: "4",
    title: "OpenAurum",
    description: {
      en: "An open-source Linux app to control the RGB lighting of the Pichau Aurum V60 keyboard, which only had a Windows app. I reverse-engineered the USB protocol and built a GTK 4 app plus a CLI: all 16 firmware effects, per-key painting, 40+ ready-made scenes and theme sync with the desktop.",
      pt: "Um app de código aberto para Linux que controla a iluminação RGB do teclado Pichau Aurum V60, que só tinha app para Windows. Fiz a engenharia reversa do protocolo USB e criei um app em GTK 4 e uma CLI: os 16 efeitos do firmware, pintura tecla por tecla, mais de 40 cenas prontas e sincronização de tema com o desktop.",
    },
    category: { en: "Open Source / Desktop", pt: "Código aberto / Desktop" },
    image: "/openaurum.png",
    technologies: ["Python", "GTK 4", "libadwaita", "USB HID"],
    link: "https://github.com/its-danilo/openaurum",
    github: "https://github.com/its-danilo/openaurum",
    featured: true,
  },
  {
    id: "8",
    title: "TVBox Lab",
    description: {
      en: "A home server on a cheap 1 GB Android TV box running Armbian: DNS ad and tracker filtering for the whole house, a self-hosted password vault, status monitoring with phone alerts and a button that wakes my PC over Wi-Fi. Reachable only through Tailscale, with no ports open on the router.",
      pt: "Um servidor caseiro numa TV box Android barata, com 1 GB de RAM, rodando Armbian: filtro de DNS contra anúncios e rastreadores para a casa toda, um cofre de senhas auto-hospedado, monitoramento com alertas no celular e um botão que acorda meu PC pelo Wi-Fi. Acessível só pelo Tailscale, sem nenhuma porta aberta no roteador.",
    },
    category: { en: "Self-hosting / Linux", pt: "Self-hosting / Linux" },
    image: "/tvbox-lab.png",
    technologies: ["Linux", "Docker", "Tailscale", "Bash", "Python"],
    link: "/tvbox-lab",
    featured: true,
  },
  {
    id: "5",
    title: "Agenda",
    description: {
      en: "A personal planner for short, medium and long-term goals, built around a focus limit: only what is active and due today shows up. Offline-first PWA that syncs across phone and PC through Supabase, with streaks that only count the days a goal was actually due.",
      pt: "Um planner pessoal para metas de curto, médio e longo prazo, construído em torno de um limite de foco: só aparece o que está ativo e vence hoje. PWA offline-first que sincroniza celular e PC pelo Supabase, com sequências que só contam os dias em que a meta estava de fato programada.",
    },
    category: { en: "PWA / Productivity", pt: "PWA / Produtividade" },
    image: "/agenda.png",
    technologies: ["React", "TypeScript", "Supabase", "Zustand", "PWA"],
    link: "https://agenda-danilo.vercel.app/?demo",
    github: "https://github.com/its-danilo/agenda",
    featured: true,
  },
  {
    id: "1",
    title: "Linkfolio",
    description: {
      en: "A link-in-bio SaaS: one shareable page for all your links, with click analytics and monthly subscriptions. Multi-tenant, with authentication and per-user data isolation using Postgres Row-Level Security.",
      pt: "Um SaaS de link na bio: uma página para compartilhar todos os seus links, com análise de cliques e assinaturas mensais. Multi-tenant, com autenticação e isolamento dos dados de cada usuário usando Row-Level Security do Postgres.",
    },
    category: { en: "SaaS / Full-Stack", pt: "SaaS / Full-Stack" },
    image: "/linkfolio.png",
    technologies: ["Next.js", "TypeScript", "Supabase", "Stripe", "Tailwind"],
    link: "https://linkfolio-name-6af4.vercel.app",
    github: "https://github.com/its-danilo/linkfolio",
    featured: true,
  },
  {
    id: "2",
    title: "Pricewatch",
    description: {
      en: "A price and stock monitor: track any product page and get alerted on price drops or restocks. Backed by a scheduled Python worker with resilient scraping (JSON-LD parsing, with a Playwright fallback for JavaScript pages).",
      pt: "Um monitor de preço e estoque: acompanhe qualquer página de produto e receba um alerta quando o preço cair ou o produto voltar ao estoque. Usa um worker Python agendado com scraping resiliente (leitura de JSON-LD, com Playwright de reserva para páginas em JavaScript).",
    },
    category: { en: "Automation / SaaS", pt: "Automação / SaaS" },
    image: "/pricewatch.png",
    technologies: ["Python", "Playwright", "Next.js", "Supabase", "GitHub Actions"],
    link: "https://pricewatch-me.vercel.app",
    github: "https://github.com/its-danilo/pricewatch",
    featured: true,
  },
];
