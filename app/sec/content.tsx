"use client";

import { AnimatePresence, motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import {
  Github, Linkedin, Search, KeyRound, FlaskConical, ShieldCheck, Menu, X,
  Mail, MapPin, GraduationCap, Send, CheckCircle2, Loader2, MessageSquare, ArrowUpRight, Sparkles, ScanFace,
} from 'lucide-react';
import LanguageToggle from '@/components/language-toggle';
import ThemeToggle from '@/components/theme-toggle';
import WhatsappIcon from '@/components/icons/whatsapp';
import { useCopy, useLanguage, type Localized } from '@/lib/i18n';

const GITHUB = 'https://github.com/its-danilo';
const LINKEDIN = 'https://www.linkedin.com/in/danilo-lnkd/';
const EMAIL = 'ads.danilosbleal@gmail.com';
const PHONE = '(84) 99681-4463';
const WHATSAPP = 'https://wa.me/5584996814463';

// Same message flow as the main site: Web3Forms emails the message to the
// address the key was created with, so no backend is needed. The key is public.
const FORM_ENDPOINT = 'https://api.web3forms.com/submit';
const WEB3FORMS_ACCESS_KEY = '824fc08e-930f-4c4c-aba9-d9b804f817e4';

// Where each card leads. An empty link shows the card as "coming soon".
type LinkKey = 'exam-portal' | 'reg-platform' | 'labs' | 'thm' | 'osint';
const LINKS: Record<LinkKey, string> = {
  'exam-portal': 'https://github.com/its-danilo/casos-reais/tree/main/recuperacao-de-conta-com-dados-nao-secretos',
  'reg-platform': 'https://github.com/its-danilo/casos-reais/tree/main/senha-padrao-previsivel',
  labs: 'https://github.com/its-danilo/portswigger-labs/tree/main',
  // TryHackMe has no place for my own write-ups, only the rooms I finished.
  // Once there is a write-ups repo, this can point there instead.
  thm: 'https://tryhackme.com/p/itsdanilo',
  osint: '',
};

// Card cover images, in public/sec. The two real cases use screenshots from
// their write-ups (already blurred there). A card without a cover gets a
// drawn placeholder instead.
const COVERS: Partial<Record<LinkKey, string>> = {
  'exam-portal': '/sec/exam-portal.webp',
  'reg-platform': '/sec/reg-platform.webp',
  labs: '/sec/portswigger-labs.svg',
  thm: '/sec/tryhackme.svg',
};

// The page keeps its own teal tokens. While it is mounted, :has(.sec) also
// points the main site's tokens (body, scrollbar, theme and language toggles)
// at the same palette, so nothing warm shows through. Alpha colors are written
// out here because Tailwind 3.3 cannot add opacity to a CSS variable.
const css = `
.sec,:root:has(.sec){
  --sx-bg:#f6f7f6; --sx-surface:#eef3f1; --sx-alt:#ffffff; --sx-panel:#ffffff; --sx-panel2:#f1f5f4;
  --sx-fg:#141a19; --sx-muted:#5d6865; --sx-faint:#8b9592;
  --sx-line:rgba(15,118,110,.14); --sx-grid:rgba(15,118,110,.06); --sx-glow:rgba(15,118,110,.10);
  --sx-header:rgba(246,247,246,.82); --sx-overlay:rgba(246,247,246,.96);
  --sx-accent:#0f766e; --sx-accent2:#0d9488; --sx-on-accent:#ffffff;
}
.dark .sec,:root.dark:has(.sec){
  --sx-bg:#0b0f0e; --sx-surface:#0f1513; --sx-alt:#0d1311; --sx-panel:#131a18; --sx-panel2:#18211e;
  --sx-fg:#e8efec; --sx-muted:#9aa6a2; --sx-faint:#677572;
  --sx-line:rgba(45,212,191,.14); --sx-grid:rgba(45,212,191,.05); --sx-glow:rgba(45,212,191,.08);
  --sx-header:rgba(11,15,14,.82); --sx-overlay:rgba(11,15,14,.96);
  --sx-accent:#2dd4bf; --sx-accent2:#5eead4; --sx-on-accent:#04120f;
}
:root:has(.sec){ --paper:246 247 246; --foreground:170 13% 9%; --line:15 118 110; }
:root.dark:has(.sec){ --paper:11 15 14; --foreground:153 17% 92%; --line:94 234 212; }
.sec ::selection{background:color-mix(in srgb,var(--sx-accent) 25%,transparent);color:var(--sx-fg);}
.sec .sx-balance{text-wrap:balance;}
.sec .sx-grad{background:linear-gradient(104deg,var(--sx-accent),var(--sx-accent2));-webkit-background-clip:text;background-clip:text;color:transparent;}
.sec .sx-grid{background-image:linear-gradient(to right,var(--sx-grid) 1px,transparent 1px),linear-gradient(to bottom,var(--sx-grid) 1px,transparent 1px);background-size:64px 64px;}
.sec .sx-dots{background-image:radial-gradient(circle,var(--sx-grid) 1px,transparent 1px);background-size:24px 24px;}
.sec .sx-glow-top{background:radial-gradient(ellipse 80% 50% at 50% -20%,var(--sx-glow),transparent);}
.sec .sx-glow-bottom{background:radial-gradient(ellipse 80% 50% at 50% 120%,var(--sx-glow),transparent);}
.sec .sx-blob{background:linear-gradient(to right,color-mix(in srgb,var(--sx-accent) 10%,transparent),color-mix(in srgb,var(--sx-accent2) 10%,transparent));}
.sec .sx-fade{background:linear-gradient(to top,var(--sx-bg),transparent);}
.sec .sx-header{background:var(--sx-header);border-bottom:1px solid var(--sx-line);-webkit-backdrop-filter:blur(24px);backdrop-filter:blur(24px);}
.sec .sx-overlay{background:var(--sx-overlay);-webkit-backdrop-filter:blur(24px);backdrop-filter:blur(24px);}
.sec .sx-underline{background:linear-gradient(to right,var(--sx-accent),var(--sx-accent2));}
.sec .sx-card{position:relative;overflow:hidden;background:var(--sx-panel);border:1px solid var(--sx-line);border-radius:1rem;transition:border-color .5s ease;}
.sec .sx-card::before{content:'';position:absolute;inset:0;pointer-events:none;background:linear-gradient(135deg,color-mix(in srgb,var(--sx-accent) 4%,transparent),transparent 60%);}
.sec .sx-card:hover{border-color:color-mix(in srgb,var(--sx-accent) 40%,transparent);}
.sec .sx-chip{border:1px solid var(--sx-line);background:color-mix(in srgb,var(--sx-accent) 4%,transparent);transition:border-color .3s ease,background-color .3s ease;}
.sec .sx-chip:hover{border-color:color-mix(in srgb,var(--sx-accent) 35%,transparent);background:color-mix(in srgb,var(--sx-accent) 7%,transparent);}
.sec .sx-pill{border:1px solid var(--sx-line);background:color-mix(in srgb,var(--sx-accent) 7%,transparent);-webkit-backdrop-filter:blur(16px);backdrop-filter:blur(16px);}
.sec .sx-box{border:1px solid var(--sx-line);background:color-mix(in srgb,var(--sx-accent) 5%,transparent);}
.sec .sx-box-grad{background:linear-gradient(135deg,color-mix(in srgb,var(--sx-accent) 12%,transparent),color-mix(in srgb,var(--sx-accent2) 12%,transparent));transition:background .3s ease;}
.sec .group:hover .sx-box-grad{background:linear-gradient(135deg,color-mix(in srgb,var(--sx-accent) 22%,transparent),color-mix(in srgb,var(--sx-accent2) 22%,transparent));}
.sec .sx-btn{background:linear-gradient(to right,var(--sx-accent),var(--sx-accent2));color:var(--sx-on-accent);transition:box-shadow .3s ease;}
.sec .sx-btn:hover{box-shadow:0 10px 25px -5px color-mix(in srgb,var(--sx-accent) 35%,transparent);}
.sec .sx-btn-ghost{border:1px solid var(--sx-line);background:color-mix(in srgb,var(--sx-accent) 4%,transparent);color:var(--sx-fg);transition:border-color .3s ease,background-color .3s ease;}
.sec .sx-btn-ghost:hover{border-color:color-mix(in srgb,var(--sx-accent) 35%,transparent);background:color-mix(in srgb,var(--sx-accent) 7%,transparent);}
.sec .sx-ink{background:var(--sx-fg);color:var(--sx-bg);transition:opacity .3s ease;}
.sec .sx-ink:hover{opacity:.9;}
.sec .sx-cover-empty{background:radial-gradient(ellipse 70% 60% at 30% 20%,color-mix(in srgb,var(--sx-accent) 30%,transparent),transparent),radial-gradient(ellipse 60% 60% at 90% 100%,color-mix(in srgb,var(--sx-accent2) 22%,transparent),transparent),var(--sx-panel2);}
.sec .sx-input{width:100%;border-radius:.75rem;padding:.75rem 1rem;background:color-mix(in srgb,var(--sx-accent) 3%,transparent);border:1px solid var(--sx-line);color:var(--sx-fg);transition:border-color .3s ease,background-color .3s ease;}
.sec .sx-input::placeholder{color:var(--sx-faint);}
.sec .sx-input:focus{outline:none;border-color:color-mix(in srgb,var(--sx-accent) 50%,transparent);background:color-mix(in srgb,var(--sx-accent) 5%,transparent);}
`;

type Caso = { tags: string[]; link: LinkKey; cta: string; title: string; summary: string; meta: string };
type Tile = { label: string; desc: string };
type Status = 'idle' | 'sending' | 'sent' | 'error';

const en = {
  navContact: 'Contact',
  navCta: 'Get in Touch',
  heroBadge: 'Open to internships and new projects',
  heroTop: 'Offensive security and',
  heroAccent: 'digital investigation',
  heroIntro:
    'I look for access-control flaws, follow trails across open sources, and report everything responsibly. My focus is digital forensics.',
  heroWork: 'See write-ups',
  heroContact: 'Get in touch',

  researchEyebrow: 'Write-ups',
  researchTitle: 'Write-ups and demos',
  researchIntro: 'Real cases, labs and studies, always with sensitive data blurred out.',
  soon: 'Coming soon',
  githubAll: 'View all projects on GitHub',
  casos: [
    {
      tags: ['Real case'],
      link: 'exam-portal', cta: 'Read the write-up',
      title: 'Public-exam portal',
      summary:
        'With data anyone can find online, you could reset any applicant’s password and even see the current one in plain text. Three small flaws that, together, exposed the personal data of everyone enrolled.',
      meta: '2026 · reported to the owner',
    },
    {
      tags: ['Real case'],
      link: 'reg-platform', cta: 'Read the write-up',
      title: 'Web registration platform',
      summary:
        'Every user’s default password was public information, and the login used a number shown on their own profile. Any account that never changed its first password was open to anyone.',
      meta: '2024 · reported to the owner',
    },
    {
      tags: ['PortSwigger'],
      link: 'labs', cta: 'See the track',
      title: 'PortSwigger labs',
      summary:
        'My track through PortSwigger’s Web Security Academy, with write-ups grouped by vulnerability type. Each one shows the steps, the root cause and how to fix it.',
      meta: 'Track in progress',
    },
    {
      tags: ['TryHackMe'],
      link: 'thm', cta: 'See my profile',
      title: 'TryHackMe track',
      summary:
        'My TryHackMe track, with hands-on rooms on real virtual machines. The profile keeps every room I finish.',
      meta: 'Track in progress',
    },
    {
      tags: ['Digital exposure', 'OpSec'],
      link: 'osint', cta: 'Watch the video',
      title: 'Personal-exposure mapping',
      summary:
        'How much can you find out about someone without leaving your chair? I tested it on myself, the way an attacker with no limits would, using only what I found online.',
      meta: 'Personal study',
    },
  ] as Caso[],

  approachEyebrow: 'Approach',
  approachTitle: 'How I work',
  approachText:
    'I follow the same path on every finding. I start from what is exposed, map how the app handles access and authentication, confirm the flaw with the least possible, and take the problem to whoever owns it, always with a fix to go with it.',
  facts: [
    { icon: 'cert', text: 'Specialist in Information Security, UNINASSAU, 2025' },
    { icon: 'grad', text: 'Studying Science and Technology at UFRN' },
    { icon: 'pin', text: 'Natal, Rio Grande do Norte' },
  ],
  toolsLabel: 'Tools',
  tiles: [
    { label: 'Reconnaissance', desc: 'Open sources and public surface' },
    { label: 'Access control', desc: 'IDOR and authentication' },
    { label: 'Proof of concept', desc: 'The least it takes to confirm' },
    { label: 'Report', desc: 'Sent to the owner, with the fix' },
  ] as Tile[],

  contactBadge: 'Let’s talk',
  contactTop: 'Open to',
  contactAccent: 'new opportunities',
  contactIntro: 'I am available to talk about work in security and digital forensics, be it an internship, a project or a collaboration. Send a message here or reach me directly.',
  emailLabel: 'Email me at',
  phoneLabel: 'Message me on WhatsApp',
  name: 'Name',
  namePlaceholder: 'Your name',
  email: 'Email',
  emailPlaceholder: 'email@example.com',
  message: 'Message',
  messagePlaceholder: 'What would you like to talk about?',
  send: 'Send message',
  sending: 'Sending',
  sentTitle: 'Message sent',
  sentText: 'Thanks for reaching out. I will reply by email soon.',
  sendAnother: 'Send another message',
  errorBefore: 'The message did not go through. ',
  errorLink: 'Email it to me directly',
  errorAfter: ' instead.',
  subject: (name: string) => `Security portfolio: message from ${name}`,
  rights: 'All rights reserved.',
  top: 'Back to top ↑',
  openMenu: 'Open menu',
  closeMenu: 'Close menu',
};

const copy: Localized<typeof en> = {
  en,
  pt: {
    navContact: 'Contato',
    navCta: 'Fale comigo',
    heroBadge: 'Aberto a estágio e novos projetos',
    heroTop: 'Segurança ofensiva e',
    heroAccent: 'investigação digital',
    heroIntro:
      'Procuro falhas de controle de acesso, sigo rastros em fontes abertas e reporto tudo de forma responsável. Meu foco é perícia e forense digital.',
    heroWork: 'Ver writeups',
    heroContact: 'Fale comigo',

    researchEyebrow: 'Writeups',
    researchTitle: 'Writeups e demonstrações',
    researchIntro: 'Casos reais, labs e estudos, sempre com os dados sensíveis censurados.',
    soon: 'Em breve',
    githubAll: 'Ver todos os projetos no GitHub',
    casos: [
      {
        tags: ['Caso real'],
        link: 'exam-portal', cta: 'Ler o writeup',
        title: 'Portal de concurso público',
        summary:
          'Com dados que qualquer um acha na internet, dava para redefinir a senha de qualquer candidato e ainda ver a senha atual em texto puro. Três falhas pequenas que, juntas, expunham os dados pessoais de todos os inscritos.',
        meta: '2026 · reportado ao responsável',
      },
      {
        tags: ['Caso real'],
        link: 'reg-platform', cta: 'Ler o writeup',
        title: 'Plataforma de cadastro web',
        summary:
          'A senha padrão de cada usuário era uma informação pública, e o login usava um número que aparecia no próprio perfil. Toda conta que nunca trocou a primeira senha estava aberta para qualquer pessoa.',
        meta: '2024 · reportado ao responsável',
      },
      {
        tags: ['PortSwigger'],
        link: 'labs', cta: 'Ver a trilha',
        title: 'Labs da PortSwigger',
        summary:
          'Minha trilha na Web Security Academy da PortSwigger, com writeups separados por tipo de vulnerabilidade. Cada um mostra o passo a passo, a causa da falha e como corrigir.',
        meta: 'Trilha em andamento',
      },
      {
        tags: ['TryHackMe'],
        link: 'thm', cta: 'Ver meu perfil',
        title: 'Trilha no TryHackMe',
        summary:
          'Minha trilha no TryHackMe, com salas práticas em máquinas virtuais de verdade. O perfil guarda cada sala que eu concluo.',
        meta: 'Trilha em andamento',
      },
      {
        tags: ['Exposição digital', 'OpSec'],
        link: 'osint', cta: 'Assistir ao vídeo',
        title: 'Mapeamento de exposição pessoal',
        summary:
          'Quanto dá para descobrir sobre alguém sem sair da cadeira? Testei em mim mesmo, como um atacante sem limites faria, só com o que encontrei na internet.',
        meta: 'Estudo próprio',
      },
    ],

    approachEyebrow: 'Abordagem',
    approachTitle: 'Como eu trabalho',
    approachText:
      'Sigo o mesmo caminho em todo achado. Começo pelo que está exposto, mapeio como a aplicação trata acesso e autenticação, confirmo a falha com o mínimo possível e levo o problema para quem é responsável, sempre com uma recomendação de correção junto.',
    facts: [
      { icon: 'cert', text: 'Especialista em Segurança da Informação, UNINASSAU, 2025' },
      { icon: 'grad', text: 'Graduando em Ciência e Tecnologia na UFRN' },
      { icon: 'pin', text: 'Natal, Rio Grande do Norte' },
    ],
    toolsLabel: 'Ferramentas',
    tiles: [
      { label: 'Reconhecimento', desc: 'Fontes abertas e superfície pública' },
      { label: 'Controle de acesso', desc: 'IDOR e autenticação' },
      { label: 'Prova de conceito', desc: 'O mínimo para confirmar' },
      { label: 'Relato', desc: 'Aviso ao responsável, com a correção' },
    ],

    contactBadge: 'Vamos conversar',
    contactTop: 'Aberto a',
    contactAccent: 'novas oportunidades',
    contactIntro: 'Estou à disposição para conversar sobre segurança e perícia digital, seja um estágio, um projeto ou uma colaboração. Mande uma mensagem aqui ou fale comigo direto.',
    emailLabel: 'Mande um e-mail para',
    phoneLabel: 'Chame no WhatsApp',
    name: 'Nome',
    namePlaceholder: 'Seu nome',
    email: 'E-mail',
    emailPlaceholder: 'email@exemplo.com',
    message: 'Mensagem',
    messagePlaceholder: 'Sobre o que você quer falar?',
    send: 'Enviar mensagem',
    sending: 'Enviando',
    sentTitle: 'Mensagem enviada',
    sentText: 'Obrigado pelo contato. Respondo por e-mail em breve.',
    sendAnother: 'Enviar outra mensagem',
    errorBefore: 'A mensagem não foi enviada. ',
    errorLink: 'Mande direto para o meu e-mail',
    errorAfter: '.',
    subject: (name: string) => `Portfólio de segurança: mensagem de ${name}`,
    rights: 'Todos os direitos reservados.',
    top: 'Voltar ao topo ↑',
    openMenu: 'Abrir menu',
    closeMenu: 'Fechar menu',
  },
};

const TOOLS = ['Burp Suite', 'hashcat', 'John the Ripper', 'Sherlock', 'Maigret', 'TwitchTracker', 'HaveIBeenPwned', 'Google Dorking', 'Linux', 'Python'];
const TILE_ICONS = [Search, KeyRound, FlaskConical, ShieldCheck];
const FACT_ICONS: Record<string, typeof MapPin> = { cert: ShieldCheck, grad: GraduationCap, pin: MapPin };
const SOCIAL = [
  { icon: Github, href: GITHUB, label: 'GitHub' },
  { icon: Linkedin, href: LINKEDIN, label: 'LinkedIn' },
  { icon: WhatsappIcon, href: WHATSAPP, label: 'WhatsApp' },
];

const EASE = [0.16, 1, 0.3, 1] as const;

// Fades a block in once it scrolls into view, like the main site's sections.
function Reveal({ children, delay = 0, y = 40, className = '' }: { children: React.ReactNode; delay?: number; y?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.8, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionHead({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) {
  return (
    <Reveal className="mb-20">
      <span className="mb-4 block text-sm font-medium text-[color:var(--sx-accent)]">{eyebrow}</span>
      <h2 className="sx-balance mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">{title}</h2>
      {intro && <p className="max-w-2xl text-lg text-[color:var(--sx-muted)]">{intro}</p>}
    </Reveal>
  );
}

// Same shape as the main site's project cards: a 16:10 cover that zooms on
// hover, the tags floating over it, and the text below.
function CaseCard({ c, soon }: { c: Caso; soon: string }) {
  const href = LINKS[c.link];
  const cover = COVERS[c.link];
  const body = (
    <div className="relative z-10 flex h-full flex-col">
      <div className="relative aspect-[16/10] overflow-hidden border-b border-[color:var(--sx-line)]">
        {cover ? (
          <>
            <img
              src={cover}
              alt={c.title}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center sx-cover-empty sx-dots">
            <ScanFace className="h-20 w-20 text-[color:var(--sx-accent)] opacity-70" strokeWidth={1.25} />
          </div>
        )}
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          {c.tags.map((tag) => (
            <span key={tag} className="rounded-full border border-white/10 bg-black/40 px-3 py-1.5 text-xs font-medium text-white/90 backdrop-blur-md">{tag}</span>
          ))}
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="mb-2 text-xl font-semibold transition-colors duration-300 group-hover:text-[color:var(--sx-accent)]">{c.title}</h3>
        <p className="text-sm leading-relaxed text-[color:var(--sx-muted)]">{c.summary}</p>        <div className="mt-auto pt-6">
          <div className="flex items-center justify-between gap-4 border-t border-[color:var(--sx-line)] pt-4">
            <span className="text-xs text-[color:var(--sx-faint)]">{c.meta}</span>
            {href ? (
              <span className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-[color:var(--sx-accent)]">
                {c.cta}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            ) : (
              <span className="shrink-0 text-sm text-[color:var(--sx-faint)]">{soon}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className="group block h-full sx-card">{body}</a>
  ) : (
    <article className="h-full sx-card">{body}</article>
  );
}

function ContactForm({ t }: { t: typeof en }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<Status>('idle');
  // A field people never see. Bots fill every input, so a value here means
  // the message is not from a person.
  const [honey, setHoney] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'sending') return;
    if (honey) { setStatus('sent'); return; }
    setStatus('sending');
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: form.name,
          email: form.email,
          message: form.message,
          subject: t.subject(form.name),
          from_name: 'Danilo Leal',
        }),
      });
      const result = await res.json().catch(() => null);
      if (!(res.ok && result?.success === true)) throw new Error('failed');
      setStatus('sent');
      setForm({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  // If sending fails, the visitor can still reach me with what they wrote.
  const mailtoFallback = `mailto:${EMAIL}?subject=${encodeURIComponent(t.subject(form.name))}&body=${encodeURIComponent(form.message)}`;

  if (status === 'sent') {
    return (
      <div className="sx-card">
        <div className="relative z-10 flex flex-col items-center px-8 py-16 text-center" role="status">
          <CheckCircle2 className="mb-5 h-12 w-12 text-[color:var(--sx-accent)]" />
          <h3 className="mb-2 text-2xl font-semibold">{t.sentTitle}</h3>
          <p className="mb-8 max-w-sm text-[color:var(--sx-muted)]">{t.sentText}</p>
          <button type="button" onClick={() => setStatus('idle')} className="text-sm text-[color:var(--sx-muted)] transition-colors hover:text-[color:var(--sx-accent)]">{t.sendAnother}</button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="sx-card">
      <div className="relative z-10 space-y-6 p-8">
        <input type="text" name="_honey" value={honey} onChange={(e) => setHoney(e.target.value)} tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
        <div>
          <label htmlFor="sec-name" className="mb-2 block text-sm font-medium text-[color:var(--sx-muted)]">{t.name}</label>
          <input id="sec-name" type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder={t.namePlaceholder} className="sx-input" />
        </div>
        <div>
          <label htmlFor="sec-email" className="mb-2 block text-sm font-medium text-[color:var(--sx-muted)]">{t.email}</label>
          <input id="sec-email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder={t.emailPlaceholder} className="sx-input" />
        </div>
        <div>
          <label htmlFor="sec-message" className="mb-2 block text-sm font-medium text-[color:var(--sx-muted)]">{t.message}</label>
          <textarea id="sec-message" required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder={t.messagePlaceholder} className="sx-input resize-none" />
        </div>
        {status === 'error' && (
          <p className="text-sm text-red-500" role="alert">
            {t.errorBefore}<a href={mailtoFallback} className="underline hover:text-[color:var(--sx-accent)]">{t.errorLink}</a>{t.errorAfter}
          </p>
        )}
        <motion.button
          type="submit"
          disabled={status === 'sending'}
          whileHover={status === 'sending' ? undefined : { scale: 1.02, y: -2 }}
          whileTap={status === 'sending' ? undefined : { scale: 0.98 }}
          className="group inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3 text-base font-medium sx-btn disabled:cursor-wait disabled:opacity-70"
        >
          {status === 'sending'
            ? (<><span>{t.sending}</span><Loader2 className="h-4 w-4 animate-spin" /></>)
            : (<><span>{t.send}</span><Send className="h-4 w-4 transition-transform group-hover:translate-x-1" /></>)}
        </motion.button>
      </div>
    </form>
  );
}

export default function SecContent() {
  const t = useCopy(copy);
  const { lang } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const nav = [
    { label: t.researchEyebrow, href: '#writeups' },
    { label: t.approachEyebrow, href: '#abordagem' },
    { label: t.navContact, href: '#contato' },
  ];

  return (
    <div className="sec min-h-screen bg-[color:var(--sx-bg)] text-[color:var(--sx-fg)]">
      <style dangerouslySetInnerHTML={{ __html: css }} />

      {/* header */}
      <motion.header
        initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.8, ease: EASE }}
        className={`fixed inset-x-0 top-0 z-50 border-b border-transparent transition-all duration-500 ${scrolled ? 'sx-header' : ''}`}
      >
        <nav className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <a href="#top" className="relative z-10">
              <motion.div whileHover={{ scale: 1.02 }} className="flex items-center gap-2">
                <div className="h-9 w-9 overflow-hidden rounded-full bg-gradient-to-br from-[color:var(--sx-accent)] to-[color:var(--sx-accent2)]">
                  <img src="/avatar-sec.webp" alt="" width={36} height={36} className="h-full w-full object-cover" />
                </div>
                <span className="text-lg font-semibold tracking-tight">Danilo Leal</span>
              </motion.div>
            </a>

            <div className="hidden flex-1 items-center justify-center md:flex">
              <div className="flex items-center gap-8">
                {nav.map((item, index) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * index, duration: 0.5 }}
                    className="group relative text-sm text-[color:var(--sx-muted)] transition-colors duration-300 hover:text-[color:var(--sx-fg)]"
                  >
                    {item.label}
                    <span className="absolute -bottom-1 left-0 h-px w-0 transition-all duration-300 group-hover:w-full sx-underline" />
                  </motion.a>
                ))}
              </div>
            </div>

            <div className="hidden items-center gap-6 md:flex">
              <div className="flex items-center gap-4">
                {SOCIAL.map((s) => (
                  <motion.a
                    key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                    whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.95 }}
                    className="text-[color:var(--sx-muted)] transition-colors hover:text-[color:var(--sx-fg)]"
                  >
                    <s.icon className="h-5 w-5" />
                  </motion.a>
                ))}
              </div>
              <motion.a
                href="#contato"
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                className="rounded-lg px-5 py-2.5 text-sm font-medium sx-ink"
              >
                {t.navCta}
              </motion.a>
              <div className="flex items-center gap-4">
                <LanguageToggle />
                <ThemeToggle />
              </div>
            </div>

            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? t.closeMenu : t.openMenu}
              aria-expanded={menuOpen}
              className="relative z-10 md:hidden"
            >
              <AnimatePresence mode="wait">
                {menuOpen ? (
                  <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <X className="h-6 w-6" />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Menu className="h-6 w-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </nav>
      </motion.header>

      {/* mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden sx-overlay"
          >
            <motion.nav
              initial="closed" animate="open" exit="closed"
              variants={{ open: { transition: { staggerChildren: 0.1 } }, closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } } }}
              className="flex h-full flex-col items-center justify-center gap-8"
            >
              {nav.map((item) => (
                <motion.a
                  key={item.href} href={item.href} onClick={() => setMenuOpen(false)}
                  variants={{ open: { opacity: 1, y: 0 }, closed: { opacity: 0, y: 20 } }}
                  className="text-3xl font-medium transition-colors hover:text-[color:var(--sx-accent)]"
                >
                  {item.label}
                </motion.a>
              ))}
              <motion.div variants={{ open: { opacity: 1, y: 0 }, closed: { opacity: 0, y: 20 } }} className="mt-8 flex items-center gap-6">
                {SOCIAL.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="text-[color:var(--sx-muted)] transition-colors hover:text-[color:var(--sx-fg)]">
                    <s.icon className="h-6 w-6" />
                  </a>
                ))}
                <LanguageToggle iconClassName="w-[32px] h-[28px]" />
                <ThemeToggle iconClassName="w-6 h-6" />
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* hero */}
      <section id="top" className="relative flex min-h-screen items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 sx-glow-top" />
          <div className="absolute inset-0 sx-grid" />
          <motion.div
            animate={{ y: [0, -30, 0], x: [0, 15, 0] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-[color:var(--sx-accent)] opacity-[0.08] blur-3xl"
          />
          <motion.div
            animate={{ y: [0, 30, 0], x: [0, -20, 0] }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-[color:var(--sx-accent2)] opacity-[0.08] blur-3xl"
          />
          <motion.div
            animate={{ y: [0, -20, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute right-1/3 top-1/3 h-64 w-64 rounded-full bg-[color:var(--sx-accent2)] opacity-[0.06] blur-3xl"
          />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 text-center lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }}
            className="mb-8 inline-flex items-center gap-2 rounded-full px-4 py-2 sx-pill"
          >
            <Sparkles className="h-4 w-4 text-[color:var(--sx-accent)]" />
            <span className="text-sm font-medium text-[color:var(--sx-muted)]">{t.heroBadge}</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 1, ease: EASE }}
            className="mb-6 text-5xl font-bold leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl xl:text-8xl"
          >
            <span>{t.heroTop}</span>
            <br />
            <motion.span initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6, duration: 1 }} className="sx-grad">
              {t.heroAccent}
            </motion.span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.8 }}
            className="mx-auto mb-12 max-w-2xl text-lg leading-relaxed text-[color:var(--sx-muted)] md:text-xl"
          >
            {t.heroIntro}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.8 }}
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <motion.a href="#writeups" whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }} className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-base font-medium sx-btn">
              {t.heroWork}
            </motion.a>
            <motion.a href="#contato" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-base font-medium sx-btn-ghost">
              {t.heroContact}
            </motion.a>
          </motion.div>
        </div>

        <div className="absolute inset-x-0 bottom-0 h-32 sx-fade" />
      </section>

      {/* write-ups */}
      <section id="writeups" className="relative scroll-mt-20 overflow-hidden py-32">
        <div className="absolute inset-0 bg-[color:var(--sx-surface)]">
          <div className="absolute inset-0 sx-dots" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHead eyebrow={t.researchEyebrow} title={t.researchTitle} intro={t.researchIntro} />
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {t.casos.map((c, i) => (
              <Reveal key={c.link} delay={i * 0.15} y={60}>
                <CaseCard c={c} soon={t.soon} />
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.3} y={20} className="mt-16 text-center">
            <a href={GITHUB} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 text-[color:var(--sx-muted)] transition-colors hover:text-[color:var(--sx-accent)]">
              <Github className="h-5 w-5" />
              <span className="font-medium">{t.githubAll}</span>
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </Reveal>
        </div>
      </section>

      {/* approach */}
      <section id="abordagem" className="relative scroll-mt-20 overflow-hidden py-32">
        <div className="absolute inset-0 bg-[color:var(--sx-alt)]">
          <div className="absolute inset-0 sx-glow-bottom" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHead eyebrow={t.approachEyebrow} title={t.approachTitle} />
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
            <Reveal delay={0.1} y={0}>
              <p className="mb-8 text-lg leading-relaxed text-[color:var(--sx-muted)]">{t.approachText}</p>
              <div className="mb-12 space-y-4">
                {t.facts.map((f) => {
                  const Icon = FACT_ICONS[f.icon] ?? MapPin;
                  return (
                    <div key={f.icon} className="flex items-center gap-3 text-[color:var(--sx-muted)]">
                      <div className="rounded-lg p-2.5 sx-box"><Icon className="h-4 w-4 text-[color:var(--sx-accent)]" /></div>
                      <span>{f.text}</span>
                    </div>
                  );
                })}
              </div>
              <h3 className="mb-4 text-sm font-medium uppercase tracking-wider text-[color:var(--sx-faint)]">{t.toolsLabel}</h3>
              <div className="flex flex-wrap gap-2">
                {TOOLS.map((tool) => (
                  <span key={tool} className="rounded-lg px-4 py-2 text-sm text-[color:var(--sx-muted)] sx-chip">{tool}</span>
                ))}
              </div>
            </Reveal>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {t.tiles.map((tile, i) => {
                const Icon = TILE_ICONS[i];
                return (
                  <Reveal key={tile.label} delay={0.4 + i * 0.1}>
                    <div className="group h-full sx-card">
                      <div className="relative z-10 p-6">
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl sx-box-grad">
                          <Icon className="h-6 w-6 text-[color:var(--sx-accent)]" />
                        </div>
                        <h3 className="mb-1 text-lg font-semibold">{tile.label}</h3>
                        <p className="text-sm text-[color:var(--sx-muted)]">{tile.desc}</p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* contact */}
      <section id="contato" className="relative scroll-mt-20 overflow-hidden py-32">
        <div className="absolute inset-0">
          <div className="absolute inset-0 opacity-50 sx-grid" />
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.4, 0.3] }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl sx-blob"
          />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            <Reveal y={0}>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 sx-pill">
                <MessageSquare className="h-4 w-4 text-[color:var(--sx-accent)]" />
                <span className="text-sm font-medium text-[color:var(--sx-muted)]">{t.contactBadge}</span>
              </div>
              <h2 className="mb-6 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
                {t.contactTop}
                <br />
                <span className="sx-grad">{t.contactAccent}</span>
              </h2>
              <p className="mb-8 max-w-md text-lg text-[color:var(--sx-muted)]">{t.contactIntro}</p>
              <div className="flex items-center gap-3">
                <div className="rounded-xl p-3 sx-box"><Mail className="h-5 w-5 text-[color:var(--sx-accent)]" /></div>
                <div>
                  <p className="mb-1 text-sm text-[color:var(--sx-faint)]">{t.emailLabel}</p>
                  <a href={`mailto:${EMAIL}`} className="transition-colors hover:text-[color:var(--sx-accent)]">{EMAIL}</a>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-3">
                <div className="rounded-xl p-3 sx-box"><WhatsappIcon className="h-5 w-5 text-[color:var(--sx-accent)]" /></div>
                <div>
                  <p className="mb-1 text-sm text-[color:var(--sx-faint)]">{t.phoneLabel}</p>
                  <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[color:var(--sx-accent)]">
                    {/* Brazilians know the number is Brazilian; the flag is for everyone else. */}
                    {lang === 'en' && <span aria-hidden="true">🇧🇷 </span>}
                    {PHONE}
                  </a>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.3} y={0}>
              <ContactForm t={t} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* footer */}
      <footer className="relative border-t border-[color:var(--sx-line)] py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            <div className="flex flex-col items-center gap-4 md:items-start">
              <motion.div whileHover={{ scale: 1.02 }} className="flex items-center gap-2">
                <div className="h-7 w-7 overflow-hidden rounded-full bg-gradient-to-br from-[color:var(--sx-accent)] to-[color:var(--sx-accent2)]">
                  <img src="/avatar-sec.webp" alt="" width={28} height={28} className="h-full w-full object-cover" />
                </div>
                <span className="text-base font-semibold tracking-tight">Danilo Leal</span>
              </motion.div>
              <p className="text-sm text-[color:var(--sx-faint)]">© {new Date().getFullYear()} {t.rights}</p>
            </div>
            <div className="flex items-center gap-4">
              {SOCIAL.map((s) => (
                <motion.a
                  key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                  whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.95 }}
                  className="rounded-lg p-2.5 text-[color:var(--sx-muted)] transition-colors hover:text-[color:var(--sx-fg)] sx-chip"
                >
                  <s.icon className="h-4 w-4" />
                </motion.a>
              ))}
            </div>
          </div>
          <div className="mt-12 text-center">
            <a href="#top" className="text-xs text-[color:var(--sx-faint)] transition-colors hover:text-[color:var(--sx-muted)]">{t.top}</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
