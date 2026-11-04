"use client";

import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import {
  Shield, Github, Linkedin, Search, KeyRound, FlaskConical, ShieldCheck,
  Mail, Phone, MapPin, GraduationCap, Send, CheckCircle2, Loader2, MessageSquare,
} from 'lucide-react';
import LanguageToggle from '@/components/language-toggle';
import ThemeToggle from '@/components/theme-toggle';
import { useCopy, type Localized } from '@/lib/i18n';

const GITHUB = 'https://github.com/its-danilo';
const LINKEDIN = 'https://www.linkedin.com/in/danilo-lnkd/';
const EMAIL = 'ads.danilosbleal@gmail.com';
const PHONE = '(84) 99681-4463';

// Same message flow as the main site: Web3Forms emails the message to the
// address the key was created with, so no backend is needed. The key is public.
const FORM_ENDPOINT = 'https://api.web3forms.com/submit';
const WEB3FORMS_ACCESS_KEY = '824fc08e-930f-4c4c-aba9-d9b804f817e4';

// A security identity in the teal palette, kept on its own tokens so the warm
// colors of the main site never bleed in. Light and dark follow the site's
// .dark class, so the theme toggle keeps working here.
const css = `
.sec{
  --sx-bg:#f6f7f6; --sx-panel:#ffffff; --sx-panel2:#eef2f1;
  --sx-fg:#141a19; --sx-muted:#5d6865; --sx-faint:#8b9592;
  --sx-line:rgba(15,118,110,.14); --sx-accent:#0f766e; --sx-accent2:#0d9488;
}
.dark .sec{
  --sx-bg:#0b0f0e; --sx-panel:#121816; --sx-panel2:#172019;
  --sx-fg:#e8efec; --sx-muted:#9aa6a2; --sx-faint:#657370;
  --sx-line:rgba(45,212,191,.14); --sx-accent:#2dd4bf; --sx-accent2:#5eead4;
}
.sec ::selection{background:var(--sx-accent);color:#04120f;}
.sec .sx-grad{background:linear-gradient(104deg,var(--sx-accent),var(--sx-accent2));-webkit-background-clip:text;background-clip:text;color:transparent;}
.sec .sx-grid{background-image:linear-gradient(var(--sx-line) 1px,transparent 1px),linear-gradient(90deg,var(--sx-line) 1px,transparent 1px);background-size:68px 68px;-webkit-mask-image:radial-gradient(ellipse 70% 60% at 50% 30%,#000,transparent);mask-image:radial-gradient(ellipse 70% 60% at 50% 30%,#000,transparent);}
.sec .sx-card{background:var(--sx-panel);border:1px solid var(--sx-line);border-radius:18px;transition:border-color .35s ease,transform .35s ease;}
.sec .sx-card:hover{border-color:var(--sx-accent);}
.sec .sx-pill{border:1px solid var(--sx-line);background:color-mix(in srgb,var(--sx-accent) 7%,transparent);}
.sec .sx-ibox{border:1px solid var(--sx-line);background:color-mix(in srgb,var(--sx-accent) 6%,transparent);}
.sec .sx-btn{background:var(--sx-accent);color:#04120f;transition:transform .25s ease,opacity .25s ease;}
.sec .sx-btn:hover{opacity:.9;transform:translateY(-2px);}
.sec .sx-btn-ghost{border:1px solid var(--sx-line);color:var(--sx-fg);transition:border-color .25s ease,transform .25s ease;}
.sec .sx-btn-ghost:hover{border-color:var(--sx-accent);transform:translateY(-2px);}
.sec .sx-input{width:100%;border-radius:12px;padding:12px 16px;background:var(--sx-panel2);border:1px solid var(--sx-line);color:var(--sx-fg);transition:border-color .25s ease;}
.sec .sx-input::placeholder{color:var(--sx-faint);}
.sec .sx-input:focus{outline:none;border-color:var(--sx-accent);}
`;

type Caso = { tag: string; title: string; summary: string; fix?: string; meta: string };
type Tile = { label: string; desc: string };
type Status = 'idle' | 'sending' | 'sent' | 'error';

const en = {
  heroTop: 'Offensive security and',
  heroAccent: 'digital investigation',
  heroIntro:
    'I look for access-control flaws, follow trails across open sources, and report everything responsibly. My focus is digital forensics.',
  heroWork: 'See my research',
  heroContact: 'Get in touch',

  researchEyebrow: 'Research',
  researchTitle: 'What I work on',
  researchIntro: 'A few real cases and studies that show how I think. Each one covers the class of flaw, its impact, and the fix.',
  casos: [
    {
      tag: 'Responsible disclosure',
      title: 'Public-exam portal',
      summary:
        'An enrollment portal let anyone tell which accounts existed, reset a password from public data, and on top of that stored passwords in plain text. Together these opened the door to the personal data of every applicant.',
      fix: 'Fix: generic login responses, recovery over a private channel, hashed passwords, and two-step sign-in.',
      meta: '2024 · reported to the owner',
    },
    {
      tag: 'Responsible disclosure',
      title: 'Web registration platform',
      summary:
        'Each user’s default password was a piece of public information, sent by email. Since the login also used a public identifier, you could reach any account that never changed its first password.',
      fix: 'Fix: a forced change on first login, a random initial password, and no passwords sent by email.',
      meta: '2024 · reported to the owner',
    },
    {
      tag: 'PortSwigger',
      title: 'Access-control labs',
      summary:
        'I finished the IDOR and access-control track on the Web Security Academy with Burp Suite. It is the technical base behind the cases above, and the write-ups live on my GitHub.',
      meta: 'Track completed',
    },
    {
      tag: 'OSINT',
      title: 'Personal-exposure mapping',
      summary:
        'I tested on myself how much you can rebuild from a first name and a photo, using open-source search and reverse face matching. It is meant to show the risk and guide people on cutting their own exposure.',
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
    { label: 'Disclosure', desc: 'A report with the fix' },
  ] as Tile[],

  contactBadge: 'Let’s talk',
  contactTop: 'Looking for an internship',
  contactAccent: 'in digital forensics',
  contactIntro: 'If the profile fits your team, I would be glad to talk. Send a message here or reach me directly.',
  emailLabel: 'Email me at',
  phoneLabel: 'Call or message at',
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
  errorAfter: '.',
  subject: (name: string) => `Security portfolio: message from ${name}`,
  rights: 'All rights reserved.',
  top: 'Back to top',
};

const copy: Localized<typeof en> = {
  en,
  pt: {
    heroTop: 'Segurança ofensiva e',
    heroAccent: 'investigação digital',
    heroIntro:
      'Procuro falhas de controle de acesso, sigo rastros em fontes abertas e reporto tudo de forma responsável. Meu foco é perícia e forense digital.',
    heroWork: 'Ver minha pesquisa',
    heroContact: 'Falar comigo',

    researchEyebrow: 'Pesquisa',
    researchTitle: 'No que eu trabalho',
    researchIntro: 'Alguns casos reais e estudos que mostram como eu penso. Cada um traz a classe da falha, o impacto e a correção.',
    casos: [
      {
        tag: 'Divulgação responsável',
        title: 'Portal de concurso público',
        summary:
          'Um portal de inscrições deixava qualquer pessoa saber quais contas existiam, redefinir a senha a partir de dados públicos e ainda guardava as senhas em texto puro. Juntas, essas falhas abriam caminho para os dados pessoais de todos os candidatos.',
        fix: 'Correção: respostas de login genéricas, recuperação por canal privado, senhas com hash e login em duas etapas.',
        meta: '2024 · reportado ao responsável',
      },
      {
        tag: 'Divulgação responsável',
        title: 'Plataforma de cadastro web',
        summary:
          'A senha padrão de cada usuário era uma informação pública, enviada por e-mail. Como o login também usava um identificador público, dava para entrar em qualquer conta que nunca trocou a primeira senha.',
        fix: 'Correção: troca obrigatória no primeiro acesso, senha inicial aleatória e fim do envio por e-mail.',
        meta: '2024 · reportado ao responsável',
      },
      {
        tag: 'PortSwigger',
        title: 'Laboratórios de controle de acesso',
        summary:
          'Terminei a trilha de IDOR e controle de acesso da Web Security Academy usando o Burp Suite. É a base técnica por trás dos casos acima, e os writeups ficam no meu GitHub.',
        meta: 'Trilha concluída',
      },
      {
        tag: 'OSINT',
        title: 'Mapeamento de exposição pessoal',
        summary:
          'Testei em mim mesmo quanta coisa dá para reconstruir a partir de um primeiro nome e uma foto, com busca em fontes abertas e reconhecimento facial reverso. Serve para mostrar o risco e orientar como reduzir a própria exposição.',
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
      { label: 'Divulgação', desc: 'Um report com a correção' },
    ],

    contactBadge: 'Vamos conversar',
    contactTop: 'Procuro estágio',
    contactAccent: 'em perícia digital',
    contactIntro: 'Se o perfil faz sentido para a sua equipe, fico à disposição. Mande uma mensagem aqui ou fale comigo direto.',
    emailLabel: 'Meu e-mail',
    phoneLabel: 'Telefone ou mensagem',
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
    top: 'Voltar ao topo',
  },
};

const TOOLS = ['Burp Suite', 'hashcat', 'John the Ripper', 'Sherlock', 'HaveIBeenPwned', 'Google Dorking', 'Linux', 'Python'];
const TILE_ICONS = [Search, KeyRound, FlaskConical, ShieldCheck];
const FACT_ICONS: Record<string, typeof MapPin> = { cert: ShieldCheck, grad: GraduationCap, pin: MapPin };

const EASE = [0.16, 1, 0.3, 1] as const;

function Reveal({ children, delay = 0, y = 32, className = '' }: { children: React.ReactNode; delay?: number; y?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.7, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function ContactForm({ t }: { t: typeof en }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<Status>('idle');
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

  const mailtoFallback = `mailto:${EMAIL}?subject=${encodeURIComponent(t.subject(form.name))}&body=${encodeURIComponent(form.message)}`;

  if (status === 'sent') {
    return (
      <div className="flex flex-col items-center p-8 text-center sx-card" role="status">
        <CheckCircle2 className="mb-5 h-12 w-12 text-[color:var(--sx-accent)]" />
        <h3 className="text-2xl font-semibold">{t.sentTitle}</h3>
        <p className="mt-2 max-w-sm text-[color:var(--sx-muted)]">{t.sentText}</p>
        <button type="button" onClick={() => setStatus('idle')} className="mt-7 text-sm text-[color:var(--sx-muted)] transition-colors hover:text-[color:var(--sx-accent)]">{t.sendAnother}</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 p-8 sx-card">
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
      <button type="submit" disabled={status === 'sending'} className="inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3 text-base font-semibold sx-btn disabled:cursor-wait disabled:opacity-70">
        {status === 'sending' ? (<><span>{t.sending}</span><Loader2 className="h-4 w-4 animate-spin" /></>) : (<><span>{t.send}</span><Send className="h-4 w-4" /></>)}
      </button>
    </form>
  );
}

export default function SecContent() {
  const t = useCopy(copy);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const nav = [
    { label: t.researchEyebrow, href: '#pesquisa' },
    { label: t.approachEyebrow, href: '#abordagem' },
    { label: t.contactBadge, href: '#contato' },
  ];

  return (
    <div className="sec min-h-screen bg-[var(--sx-bg)] text-[color:var(--sx-fg)] antialiased">
      <style dangerouslySetInnerHTML={{ __html: css }} />

      {/* header */}
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? 'border-b border-[color:var(--sx-line)] bg-[var(--sx-bg)]/80 backdrop-blur-xl' : 'bg-transparent'}`}>
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <a href="#top" className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg sx-ibox">
              <Shield className="h-4 w-4 text-[color:var(--sx-accent)]" />
            </span>
            <span className="text-[15px] font-semibold tracking-tight">Danilo Leal</span>
          </a>
          <div className="hidden items-center gap-8 md:flex">
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="text-sm text-[color:var(--sx-muted)] transition-colors hover:text-[color:var(--sx-fg)]">{n.label}</a>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <a href={GITHUB} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-[color:var(--sx-muted)] transition-colors hover:text-[color:var(--sx-fg)]"><Github className="h-[18px] w-[18px]" /></a>
            <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-[color:var(--sx-muted)] transition-colors hover:text-[color:var(--sx-fg)]"><Linkedin className="h-[18px] w-[18px]" /></a>
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </nav>
      </header>

      {/* hero */}
      <section id="top" className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">
        <div className="absolute inset-0 sx-grid opacity-70" />
        <motion.div
          animate={{ y: [0, -28, 0], x: [0, 16, 0] }} transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute left-[18%] top-[22%] h-80 w-80 rounded-full bg-[color:var(--sx-accent)] opacity-[0.10] blur-3xl"
        />
        <motion.div
          animate={{ y: [0, 26, 0], x: [0, -18, 0] }} transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-[20%] right-[16%] h-72 w-72 rounded-full bg-[color:var(--sx-accent2)] opacity-[0.10] blur-3xl"
        />
        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <motion.h1
            initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: EASE }}
            className="text-balance text-5xl font-bold leading-[1.02] tracking-tight sm:text-6xl md:text-7xl"
          >
            {t.heroTop}<br /><span className="sx-grad">{t.heroAccent}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
            className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-[color:var(--sx-muted)]"
          >
            {t.heroIntro}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.35, ease: EASE }}
            className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <a href="#pesquisa" className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-base font-semibold sx-btn">{t.heroWork}</a>
            <a href="#contato" className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-base font-medium sx-btn-ghost">{t.heroContact}</a>
          </motion.div>
        </div>
      </section>

      {/* research */}
      <section id="pesquisa" className="scroll-mt-24 px-6 py-28">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mb-16 max-w-2xl">
            <span className="mb-4 block text-sm font-semibold text-[color:var(--sx-accent)]">{t.researchEyebrow}</span>
            <h2 className="text-4xl font-bold tracking-tight md:text-5xl">{t.researchTitle}</h2>
            <p className="mt-5 text-lg text-[color:var(--sx-muted)]">{t.researchIntro}</p>
          </Reveal>
          <div className="grid gap-6 lg:grid-cols-2">
            {t.casos.map((c, i) => (
              <Reveal key={i} delay={(i % 2) * 0.12}>
                <article className="flex h-full flex-col p-7 sx-card">
                  <span className="mb-4 inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-medium text-[color:var(--sx-accent)] sx-pill">{c.tag}</span>
                  <h3 className="text-xl font-semibold">{c.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-[color:var(--sx-muted)]">{c.summary}</p>
                  {c.fix && (
                    <p className="mt-4 rounded-xl border border-[color:var(--sx-line)] bg-[var(--sx-panel2)] px-4 py-3 text-sm text-[color:var(--sx-fg)]">{c.fix}</p>
                  )}
                  <p className="mt-5 border-t border-[color:var(--sx-line)] pt-4 text-xs text-[color:var(--sx-faint)]">{c.meta}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* approach */}
      <section id="abordagem" className="scroll-mt-24 bg-[var(--sx-panel)]/40 px-6 py-28">
        <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <span className="mb-4 block text-sm font-semibold text-[color:var(--sx-accent)]">{t.approachEyebrow}</span>
            <h2 className="text-4xl font-bold tracking-tight md:text-5xl">{t.approachTitle}</h2>
            <p className="mt-6 text-lg leading-relaxed text-[color:var(--sx-muted)]">{t.approachText}</p>
            <div className="mt-8 space-y-3">
              {t.facts.map((f, i) => {
                const Icon = FACT_ICONS[f.icon] ?? MapPin;
                return (
                  <div key={i} className="flex items-center gap-3 text-[color:var(--sx-muted)]">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg sx-ibox"><Icon className="h-4 w-4 text-[color:var(--sx-accent)]" /></span>
                    <span className="text-[15px]">{f.text}</span>
                  </div>
                );
              })}
            </div>
            <div className="mt-8">
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-[color:var(--sx-faint)]">{t.toolsLabel}</h3>
              <div className="flex flex-wrap gap-2">
                {TOOLS.map((tool) => (
                  <span key={tool} className="rounded-lg px-3 py-1.5 text-sm text-[color:var(--sx-muted)] sx-card">{tool}</span>
                ))}
              </div>
            </div>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            {t.tiles.map((tile, i) => {
              const Icon = TILE_ICONS[i];
              return (
                <Reveal key={i} delay={0.1 + i * 0.08}>
                  <div className="h-full p-6 sx-card">
                    <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl sx-ibox"><Icon className="h-5 w-5 text-[color:var(--sx-accent)]" /></span>
                    <h4 className="text-base font-semibold">{tile.label}</h4>
                    <p className="mt-1 text-sm text-[color:var(--sx-muted)]">{tile.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* contact */}
      <section id="contato" className="scroll-mt-24 px-6 py-28">
        <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <span className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-[color:var(--sx-muted)] sx-pill">
              <MessageSquare className="h-4 w-4 text-[color:var(--sx-accent)]" />{t.contactBadge}
            </span>
            <h2 className="text-4xl font-bold leading-tight tracking-tight md:text-5xl">
              {t.contactTop}<br /><span className="sx-grad">{t.contactAccent}</span>
            </h2>
            <p className="mt-6 max-w-md text-lg text-[color:var(--sx-muted)]">{t.contactIntro}</p>
            <div className="mt-9 space-y-5">
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl sx-ibox"><Mail className="h-5 w-5 text-[color:var(--sx-accent)]" /></span>
                <div>
                  <p className="text-sm text-[color:var(--sx-faint)]">{t.emailLabel}</p>
                  <a href={`mailto:${EMAIL}`} className="text-[color:var(--sx-fg)] transition-colors hover:text-[color:var(--sx-accent)]">{EMAIL}</a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl sx-ibox"><Phone className="h-5 w-5 text-[color:var(--sx-accent)]" /></span>
                <div>
                  <p className="text-sm text-[color:var(--sx-faint)]">{t.phoneLabel}</p>
                  <a href={`tel:+55${PHONE.replace(/\D/g, '')}`} className="text-[color:var(--sx-fg)] transition-colors hover:text-[color:var(--sx-accent)]">{PHONE}</a>
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <ContactForm t={t} />
          </Reveal>
        </div>
      </section>

      {/* footer */}
      <footer className="border-t border-[color:var(--sx-line)] px-6 py-14">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            <div className="flex flex-col items-center gap-3 md:items-start">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-[color:var(--sx-accent)] to-[color:var(--sx-accent2)]">
                  <Shield className="h-4 w-4 text-[#04120f]" />
                </span>
                <span className="text-base font-semibold tracking-tight">Danilo Leal</span>
              </div>
              <p className="text-sm text-[color:var(--sx-faint)]">© {new Date().getFullYear()} {t.rights}</p>
            </div>
            <div className="flex items-center gap-3">
              <a href={GITHUB} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="rounded-lg p-2.5 text-[color:var(--sx-muted)] transition-colors hover:text-[color:var(--sx-fg)] sx-card"><Github className="h-4 w-4" /></a>
              <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="rounded-lg p-2.5 text-[color:var(--sx-muted)] transition-colors hover:text-[color:var(--sx-fg)] sx-card"><Linkedin className="h-4 w-4" /></a>
            </div>
          </div>
          <div className="mt-10 text-center">
            <a href="#top" className="text-xs text-[color:var(--sx-faint)] transition-colors hover:text-[color:var(--sx-accent)]">{t.top} ↑</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
