import type { Localized } from '@/lib/language';

export interface Project {
  id: string;
  // A plain string when the name is the same in both languages.
  title: string | Localized;
  description: Localized;
  category: Localized;
  image: string;
  technologies: string[];
  link?: string;
  github?: string;
  // Which tab of the home page lists it.
  group: ProjectGroup;
  // Also shown in the default "Featured" tab.
  featured?: boolean;
}

export type ProjectGroup = 'home' | 'desktop' | 'web' | 'automation';

// Tabs of the projects section, in order (the "Featured" tab comes first).
export const projectGroups: { id: ProjectGroup; label: Localized }[] = [
  { id: 'home', label: { en: 'Smart home & hardware', pt: 'Casa inteligente & hardware' } },
  { id: 'desktop', label: { en: 'Linux & desktop', pt: 'Linux & desktop' } },
  { id: 'web', label: { en: 'Web & apps', pt: 'Web & apps' } },
  { id: 'automation', label: { en: 'Automation', pt: 'Automação' } },
];

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
  phone: string;
  whatsapp: string;
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
  email: "ads.danilosbleal@gmail.com",
  phone: "+55 (84) 99681-4463",
  whatsapp: "https://wa.me/5584996814463",
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
      en: "Legal-process automation (RPA) I built from scratch during my internship at the Federal Justice of Rio Grande do Norte (JFRN). It drives 20+ repetitive clerical workflows in Brazil's PJe judicial system, from case triage to issuing citations, with resilient browser automation and a remote kill switch, and ships as a standalone Windows app. It enabled the team's migration to the new PJe2X, moving cases over straight from a spreadsheet. Private, closed-source project.",
      pt: "Automação de processos judiciais (RPA) que criei do zero durante meu estágio na Justiça Federal do Rio Grande do Norte (JFRN). Ela executa mais de 20 fluxos repetitivos de secretaria no PJe, o sistema judicial eletrônico do Brasil, da triagem de processos à expedição de citações, com automação de navegador resiliente e um botão de desligamento remoto, e roda como um app de Windows independente. Foi ela que viabilizou a migração da equipe para o novo PJe2X, movendo os processos direto de uma planilha. Projeto privado, de código fechado.",
    },
    category: { en: "Automation (RPA)", pt: "Automação (RPA)" },
    image: "/rodribot.png",
    technologies: ["Python", "Playwright", "tkinter", "PyInstaller"],
    link: "/rodribot",
    group: "automation",
    featured: true,
  },
  {
    id: "9",
    title: "Room Camera",
    description: {
      en: "A cheap Wi-Fi pan-and-tilt camera turned into a private smart room, with no cloud. A Python service on my TV box holds the camera's only session; on top of it I built presence detection, a 360° sphere of the room, spoken reminders, an offline voice assistant, rain alerts and daily reports, with the heavy work done on my PC.",
      pt: "Uma câmera Wi-Fi barata, com giro e inclinação, transformada num quarto inteligente e privado, sem nuvem. Um serviço em Python na minha TV box guarda a única sessão da câmera; por cima dele criei detecção de presença, uma esfera 360° do quarto, lembretes falados, um assistente de voz offline, alerta de chuva e relatórios diários, com o trabalho pesado feito no PC.",
    },
    category: { en: "Smart home / Computer vision", pt: "Casa inteligente / Visão computacional" },
    image: "/camera-capa.webp",
    technologies: ["Python", "go2rtc", "OpenCV", "WebGL", "Whisper"],
    link: "/camera",
    group: "home",
    featured: true,
  },
  {
    id: "11",
    title: { en: "3D Room", pt: "Quarto 3D" },
    description: {
      en: "A playable digital twin of my bedroom, built from tape-measure numbers. A Godot game with real-time light mirrors the real room: the TV and laptop show my real screens, daylight follows the clock, and every object shows live data from my devices or controls them, through a local bridge with a closed list of approved actions. A first step toward a game-like control center for the whole house.",
      pt: "Um gêmeo digital jogável do meu quarto, feito a partir das medidas da trena. Um jogo em Godot com luz em tempo real espelha o quarto real: a TV e o notebook mostram as minhas telas de verdade, a luz do dia segue o relógio e cada objeto mostra dados ao vivo dos meus aparelhos ou os controla, por uma ponte local com uma lista fechada de ações aprovadas. Um primeiro passo para um centro de controle da casa inteira em forma de jogo.",
    },
    category: { en: "Game / Digital twin", pt: "Jogo / Gêmeo digital" },
    image: "/room-3d-capa.webp",
    technologies: ["Godot 4", "GDScript", "Blender", "Python", "three.js"],
    link: "/room-3d",
    group: "home",
    featured: true,
  },
  {
    id: "10",
    title: { en: "My Desktop", pt: "Meu Desktop" },
    description: {
      en: "The Arch Linux and Hyprland desktop I use every day, grown from CalOS into about a hundred commands of my own. One theme switch recolors 20 apps and devices, including apps with no theme support and my keyboard's LEDs; a wallpaper crosses the laptop and the TV above it; my phone drives the PC; and the upstream bugs I ran into were patched or reported.",
      pt: "O desktop Arch Linux com Hyprland que eu uso todo dia, que partiu do CalOS e virou cerca de cem comandos meus. Uma troca de tema recolore 20 apps e aparelhos, inclusive apps sem suporte a tema e os LEDs do meu teclado; um papel de parede atravessa o notebook e a TV acima dele; o celular controla o PC; e os bugs que encontrei em outros projetos foram corrigidos ou relatados.",
    },
    category: { en: "Linux / Desktop", pt: "Linux / Desktop" },
    image: "/desktop-capa.webp",
    technologies: ["Hyprland", "Bash", "Python", "Lua", "systemd"],
    link: "/desktop",
    group: "desktop",
    featured: true,
  },
  {
    id: "12",
    title: "Vitrine Potiguar",
    description: {
      en: "Ready-made websites for real-estate brokers in Natal, Brazil. A broker signs up, has their CRECI license checked, picks an address and gets a showcase site with listings, photo galleries, search and contact straight to WhatsApp. Multi-tenant, with each broker's data isolated by Postgres Row-Level Security and every flow covered by end-to-end tests. Live; billing and a custom domain come next.",
      pt: "Sites prontos para corretores de imóveis de Natal. O corretor se cadastra, tem o CRECI verificado, escolhe o endereço e ganha uma vitrine com imóveis, galeria de fotos, busca e contato direto pelo WhatsApp. Multi-tenant, com os dados de cada corretor isolados pelo Row-Level Security do Postgres e todos os fluxos cobertos por testes de ponta a ponta. No ar; a cobrança e o domínio próprio vêm a seguir.",
    },
    category: { en: "SaaS / Full-Stack · WIP", pt: "SaaS / Full-Stack · Em andamento" },
    image: "/vitrine-potiguar-capa.webp",
    technologies: ["Next.js", "TypeScript", "Supabase", "Cloudflare Workers", "Playwright"],
    link: "https://vitrine-potiguar.vitrine-potiguar.workers.dev",
    group: "web",
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
    group: "desktop",
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
    group: "home",
  },
  {
    id: "14",
    title: { en: "Pico W Watchdog", pt: "Vigia Pico W" },
    description: {
      en: "A Raspberry Pi Pico W board in the living room that watches my home server from outside it. When the TV box goes down it beeps once and sends a phone alert with a button that wakes my PC over Wi-Fi, and its 5×5 LED matrix shows the source of the latest alert in that source's color. Updates arrive over Wi-Fi, with automatic rollback if the new version can't reach the alert feed.",
      pt: "Uma placa Raspberry Pi Pico W na sala que vigia meu servidor caseiro de fora dele. Quando a TV box cai, ela bipa uma vez e manda um alerta no celular com um botão que acorda meu PC pelo Wi-Fi, e a matriz de LEDs 5×5 mostra a origem do último alerta na cor dessa origem. As atualizações chegam pelo Wi-Fi, com volta automática se a versão nova não conseguir ler os alertas.",
    },
    category: { en: "Embedded / IoT", pt: "Embarcados / IoT" },
    image: "/pico-capa.webp",
    technologies: ["MicroPython", "Raspberry Pi Pico W", "ntfy", "Wake-on-WLAN"],
    link: "/tvbox-lab#pico",
    group: "home",
  },
  {
    id: "13",
    title: "InputForge",
    description: {
      en: "An autoclicker, macro recorder and per-game key remapper for Linux on Hyprland. A background engine reads the keyboard and mouse straight from the kernel and types through virtual devices, so it works inside fullscreen games. Its macros can watch the screen: \"use each skill as soon as its slot is ready\", with no cooldown timers to guess.",
      pt: "Autoclicker, gravador de macros e remapeamento de teclas por jogo para Linux com Hyprland. Um motor em segundo plano lê o teclado e o mouse direto do kernel e digita por aparelhos virtuais, então funciona dentro de jogos em tela cheia. As macros podem olhar a tela: \"use cada skill assim que o slot dela ficar pronto\", sem adivinhar tempo de recarga.",
    },
    category: { en: "Linux / Desktop app", pt: "Linux / App de desktop" },
    image: "/inputforge-capa.webp",
    technologies: ["Python", "GTK 4", "libadwaita", "evdev / uinput"],
    link: "/inputforge",
    github: "https://github.com/its-danilo/inputforge",
    group: "desktop",
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
    group: "web",
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
    group: "web",
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
    group: "web",
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
    group: "web",
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
    group: "automation",
  },
];
