"use client";

import { motion } from 'framer-motion';
import {
  Shield, Github, Linkedin, Mail, Phone, ArrowUpRight,
  Search, Crosshair, Bug, FlaskConical, Scale, Megaphone, Copy, Check,
} from 'lucide-react';
import { useState } from 'react';
import LanguageToggle from '@/components/language-toggle';
import ThemeToggle from '@/components/theme-toggle';
import { useCopy, type Localized } from '@/lib/i18n';

const GITHUB = 'https://github.com/its-danilo';
const LINKEDIN = 'https://www.linkedin.com/in/danilo-lnkd/';
const EMAIL = 'danilo.leal.117@ufrn.edu.br';
const PHONE = '(84) 99681-4463';

// Scoped security identity (teal on near-black / soft paper). Driven by the
// site's `.dark` class so the theme toggle keeps working on this page too.
const css = `
.sec{
  --sx-bg:#f6f7f6; --sx-panel:#ffffff; --sx-panel2:#eef2f1;
  --sx-fg:#161b1a; --sx-muted:#5a6563; --sx-faint:#8a9492;
  --sx-line:#dde3e1; --sx-accent:#0f766e; --sx-accent2:#14b8a6; --sx-crit:#b4321f;
}
.dark .sec{
  --sx-bg:#0c100f; --sx-panel:#141a18; --sx-panel2:#1b2320;
  --sx-fg:#e6ece9; --sx-muted:#9aa6a2; --sx-faint:#6b7572;
  --sx-line:#242e2b; --sx-accent:#2dd4bf; --sx-accent2:#14b8a6; --sx-crit:#f0795f;
}
.sec ::selection{background:var(--sx-accent2);color:#06100e;}
`;

type Card = {
  title: string; impact?: string; impactCrit?: boolean; cls: string; year: string;
  summary: string; rows?: { k: string; v: string }[]; note: string;
};

const en = {
  badge: 'Security Portfolio',
  role: 'Vulnerability research · OSINT · Digital forensics',
  lead:
    "Security specialist focused on access-control flaws, open-source investigation and responsible disclosure. Investigative mindset, evidence-driven method and respect for legal limits.",
  github: 'GitHub', linkedin: 'LinkedIn', contact: 'Contact',
  researchTitle: 'Research & Projects',
  researchIntro:
    'Each item is described by the class of flaw, its impact and the fix — never by victim data or a ready-made recipe. Real cases appear anonymized; full details went only to the parties responsible.',
  cards: [
    {
      title: 'Responsible disclosure — public-exam portal',
      impact: 'High impact', impactCrit: true, cls: 'Broken Access Control / Account Takeover', year: '2024',
      summary: 'A chain of flaws in an enrollment portal that would allow account takeover and exposure of personal data at scale.',
      rows: [
        { k: 'Flaw', v: 'User enumeration, account recovery from publicly derivable factors, cleartext password storage and no password policy.' },
        { k: 'Impact', v: 'Unauthorized access to applicants’ sensitive registration data.' },
        { k: 'Fix', v: 'Generic login responses, recovery token over a non-public channel, password hashing, minimum policy and MFA.' },
      ],
      note: 'Reported to the owner — no reply. Published anonymized, with no third-party data and no reproducible proof-of-concept against the target.',
    },
    {
      title: 'Responsible disclosure — web registration platform',
      impact: 'High impact', impactCrit: true, cls: 'Predictable credential / Access Control', year: '2024',
      summary: 'A default password derivable from public information and sent by email, combined with a public user identifier.',
      rows: [
        { k: 'Flaw', v: 'Predictable initial credential never forced to change; secret sent over an insecure channel.' },
        { k: 'Impact', v: 'Access to accounts of users who kept the default credential.' },
        { k: 'Fix', v: 'Mandatory change on first login, random initial secret, no passwords by email, and rate limiting.' },
      ],
      note: 'Reported to the owner — no reply. Kept at the vulnerability-class level, with no exploitation recipe.',
    },
    {
      title: 'Web Security Academy — Broken Access Control / IDOR',
      cls: 'PortSwigger · Burp Suite', year: 'Completed track',
      summary: 'Completed the IDOR and access-control track with reproducible write-ups (interception, Repeater, Intruder) — the technical base behind the cases above.',
      note: 'Write-ups published on GitHub → github.com/its-danilo',
    },
    {
      title: 'OSINT — exposure-surface footprinting',
      cls: 'Target: the author (consented)', year: 'Demonstration',
      summary: 'A demonstration of how much personal information is reconstructable from a first name and a photo, using open-source reconnaissance and identity correlation. Educational goal: show the risk and guide exposure reduction.',
      note: 'Not published, as it contains the author’s sensitive data; methodology available on request.',
    },
  ] as Card[],
  methodTitle: 'How I work',
  methodIntro: 'The same flow on every finding — from collection to delivery, with proof-of-concept always kept to the legal minimum.',
  steps: [
    { t: 'Reconnaissance (OSINT)', d: 'Mapping open sources, identifiers and the target’s public surface.' },
    { t: 'Surface mapping', d: 'Authentication flows, access control and the application’s entry points.' },
    { t: 'Flaw identification', d: 'Hypothesis, verification and isolation of the root cause.' },
    { t: 'Minimal, ethical PoC', d: 'Proof limited to my own account or a controlled environment — no third-party data retained.' },
    { t: 'Impact rating', d: 'Severity by impact × ease, framed against LGPD and best practice.' },
    { t: 'Responsible disclosure', d: 'Notify the owner before any publication, with remediation advice.' },
  ],
  stackTitle: 'Stack & background',
  toolsLabel: 'Tools', skillsLabel: 'Skills', eduLabel: 'Education & certs', devLabel: 'Development', inProgLabel: 'In progress',
  skills: ['IDOR / Access Control', 'OSINT', 'Enumeration', 'Cryptography', 'Responsible disclosure', 'LGPD'],
  edu: [
    'Specialist in Information Security — UNINASSAU · 2025 (completed)',
    'Science & Technology — UFRN · 2025–2027',
    'Technologist in Systems Analysis — UNINASSAU · 2023–2024',
    'Embedded Systems (FIC+) — IFRN · 160h',
    'PCI DSS · NIST CSF — introduction',
    'English C1 (EFSET) · French B1 (DELF)',
  ],
  inProg: ['Forensics (Autopsy/Volatility)', 'CTF', 'eJPT'],
  contactTitle: 'Contact',
  contactLead: 'Available for an internship in digital forensics and offensive security.',
  copied: 'copied',
  location: 'Natal, RN · Brazil',
};

const copy: Localized<typeof en> = {
  en,
  pt: {
    badge: 'Portfólio de Segurança',
    role: 'Análise de vulnerabilidades · OSINT · Forense digital',
    lead:
      'Especialista em Segurança da Informação com foco em falhas de controle de acesso, investigação de fonte aberta e divulgação responsável. Mentalidade investigativa, método orientado a evidências e respeito a limites legais.',
    github: 'GitHub', linkedin: 'LinkedIn', contact: 'Contato',
    researchTitle: 'Pesquisa & Projetos',
    researchIntro:
      'Cada item é descrito pela classe da falha, pelo impacto e pela correção — nunca por dados de vítimas ou passo-a-passo pronto. Casos reais aparecem anonimizados; os detalhes completos foram comunicados apenas aos responsáveis.',
    cards: [
      {
        title: 'Divulgação responsável — portal de concurso público',
        impact: 'Impacto alto', impactCrit: true, cls: 'Broken Access Control / Account Takeover', year: '2024',
        summary: 'Cadeia de falhas em portal de inscrições que permitiria tomada de conta e exposição de dados pessoais em escala.',
        rows: [
          { k: 'Falha', v: 'Enumeração de usuário, recuperação de conta por fatores publicamente deriváveis, senha em texto claro e política de senha inexistente.' },
          { k: 'Impacto', v: 'Acesso não autorizado a dados cadastrais sensíveis de participantes.' },
          { k: 'Correção', v: 'Respostas genéricas de login, token de recuperação por canal não público, hashing de senhas, política mínima e MFA.' },
        ],
        note: 'Reportado ao responsável — sem retorno. Publicado de forma anonimizada, sem dados de terceiros e sem prova de conceito reproduzível contra o alvo.',
      },
      {
        title: 'Divulgação responsável — plataforma de cadastro web',
        impact: 'Impacto alto', impactCrit: true, cls: 'Credencial previsível / Access Control', year: '2024',
        summary: 'Senha padrão derivável de informação pública e enviada por e-mail, combinada a identificador de usuário público.',
        rows: [
          { k: 'Falha', v: 'Credencial inicial previsível e nunca forçada a troca; segredo trafegado por canal inseguro.' },
          { k: 'Impacto', v: 'Acesso a contas de usuários que mantinham a credencial padrão.' },
          { k: 'Correção', v: 'Troca obrigatória no primeiro acesso, segredo inicial aleatório, fim do envio de senha por e-mail e limitação de tentativas.' },
        ],
        note: 'Reportado ao responsável — sem retorno. Mantido em nível de classe de vulnerabilidade, sem receita de exploração.',
      },
      {
        title: 'Web Security Academy — Broken Access Control / IDOR',
        cls: 'PortSwigger · Burp Suite', year: 'Trilha concluída',
        summary: 'Conclusão da trilha de IDOR e controle de acesso, com writeups reproduzíveis (interceptação, Repeater, Intruder) — a base técnica por trás dos casos acima.',
        note: 'Writeups publicados no GitHub → github.com/its-danilo',
      },
      {
        title: 'OSINT — footprinting de superfície de exposição',
        cls: 'Alvo: o próprio autor (consentido)', year: 'Demonstração',
        summary: 'Demonstração de quanta informação pessoal é reconstruível a partir de um primeiro nome e uma fotografia, usando reconhecimento de fonte aberta e correlação de identidades. Objetivo educativo: evidenciar risco e orientar redução de exposição.',
        note: 'Não publicado por conter dados sensíveis do autor; metodologia disponível sob solicitação.',
      },
    ],
    methodTitle: 'Método de trabalho',
    methodIntro: 'O mesmo fluxo em todo achado — da coleta à entrega, com a prova de conceito sempre no mínimo legal necessário.',
    steps: [
      { t: 'Reconhecimento (OSINT)', d: 'Mapeamento de fontes abertas, identificadores e superfície pública do alvo.' },
      { t: 'Mapeamento de superfície', d: 'Fluxos de autenticação, controle de acesso e pontos de entrada da aplicação.' },
      { t: 'Identificação da falha', d: 'Hipótese, verificação e isolamento da causa-raiz.' },
      { t: 'PoC mínima e ética', d: 'Prova limitada a conta própria ou ambiente controlado — sem reter dados de terceiros.' },
      { t: 'Classificação de impacto', d: 'Severidade por impacto × facilidade, com enquadramento em LGPD e boas práticas.' },
      { t: 'Divulgação responsável', d: 'Comunicação ao responsável antes de qualquer publicação, com recomendações de mitigação.' },
    ],
    stackTitle: 'Stack & formação',
    toolsLabel: 'Ferramentas', skillsLabel: 'Competências', eduLabel: 'Formação & certs', devLabel: 'Desenvolvimento', inProgLabel: 'Em desenvolvimento',
    skills: ['IDOR / Access Control', 'OSINT', 'Enumeração', 'Criptografia', 'Divulgação responsável', 'LGPD'],
    edu: [
      'Especialista em Segurança da Informação — UNINASSAU · 2025 (concluída)',
      'Ciências e Tecnologia — UFRN · 2025–2027',
      'Tecnólogo em Análise e Desenvolvimento de Sistemas — UNINASSAU · 2023–2024',
      'Sistemas Embarcados (FIC+) — IFRN · 160h',
      'PCI DSS · NIST CSF — introdução',
      'Inglês C1 (EFSET) · Francês B1 (DELF)',
    ],
    inProg: ['Forense (Autopsy/Volatility)', 'CTF', 'eJPT'],
    contactTitle: 'Contato',
    contactLead: 'Disponível para estágio em perícia / forense digital e segurança ofensiva.',
    copied: 'copiado',
    location: 'Natal, RN · Brasil',
  },
};

const TOOLS = ['Burp Suite', 'hashcat', 'John the Ripper', 'Sherlock', 'HaveIBeenPwned', 'Google Dorking', 'Linux', 'Git', 'Python', 'C / C++'];
const STEP_ICONS = [Search, Crosshair, Bug, FlaskConical, Scale, Megaphone];

function CopyButton({ value, label, copiedLabel, icon: Icon }: { value: string; label: string; copiedLabel: string; icon: typeof Mail }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      onClick={() => {
        const finish = () => { setDone(true); setTimeout(() => setDone(false), 1400); };
        if (navigator.clipboard?.writeText) navigator.clipboard.writeText(value).then(finish).catch(finish);
        else finish();
      }}
      className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-mono transition-colors border-[color:var(--sx-line)] bg-[var(--sx-panel)] text-[color:var(--sx-fg)] hover:border-[color:var(--sx-accent)]"
    >
      {done ? <Check className="h-4 w-4 text-[color:var(--sx-accent)]" /> : <Icon className="h-4 w-4 text-[color:var(--sx-faint)]" />}
      <span className="text-[color:var(--sx-faint)]">{label}</span>
      <span>{done ? copiedLabel : value}</span>
    </button>
  );
}

export default function SecContent() {
  const t = useCopy(copy);

  return (
    <div className="sec min-h-screen bg-[var(--sx-bg)] text-[color:var(--sx-fg)]">
      <style dangerouslySetInnerHTML={{ __html: css }} />

      {/* top bar */}
      <div className="sticky top-0 z-20 border-b border-[color:var(--sx-line)] bg-[var(--sx-bg)]/85 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 px-5 py-3">
          <span className="flex items-center gap-2 font-mono text-sm font-bold">
            <Shield className="h-4 w-4 text-[color:var(--sx-accent)]" />
            danilo<span className="text-[color:var(--sx-accent)]">.</span>leal
            <span className="text-[color:var(--sx-faint)]">/ sec</span>
          </span>
          <div className="flex items-center gap-4">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-5">

        {/* hero */}
        <motion.header
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="border-b border-[color:var(--sx-line)] py-14"
        >
          <div className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[color:var(--sx-accent)]">
            <span className="h-px w-6 bg-[color:var(--sx-accent)]" />{t.badge}
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Danilo Leal</h1>
          <p className="mt-2 font-mono text-[color:var(--sx-accent)] sm:text-lg">{t.role}</p>
          <p className="mt-5 max-w-xl text-[color:var(--sx-muted)]">{t.lead}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href={GITHUB} target="_blank" rel="noopener noreferrer"
               className="inline-flex items-center gap-2 rounded-lg px-4 py-2 font-mono text-sm font-semibold text-[#06100e] bg-[color:var(--sx-accent)] hover:bg-[color:var(--sx-accent2)] transition-colors">
              <Github className="h-4 w-4" />{t.github}
            </a>
            <a href={LINKEDIN} target="_blank" rel="noopener noreferrer"
               className="inline-flex items-center gap-2 rounded-lg border border-[color:var(--sx-line)] px-4 py-2 font-mono text-sm hover:border-[color:var(--sx-accent)] transition-colors">
              <Linkedin className="h-4 w-4" />{t.linkedin}
            </a>
            <a href="#contato"
               className="inline-flex items-center gap-2 rounded-lg border border-[color:var(--sx-line)] px-4 py-2 font-mono text-sm hover:border-[color:var(--sx-accent)] transition-colors">
              {t.contact}
            </a>
          </div>
        </motion.header>

        {/* research */}
        <section className="border-b border-[color:var(--sx-line)] py-12">
          <SecHead n="01" title={t.researchTitle} />
          <p className="mb-6 max-w-2xl text-[color:var(--sx-muted)]">{t.researchIntro}</p>
          <div className="grid gap-4">
            {t.cards.map((c, i) => (
              <article key={i} className="rounded-xl border border-[color:var(--sx-line)] bg-[var(--sx-panel)] p-5">
                <h3 className="text-lg font-semibold">{c.title}</h3>
                <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] text-[color:var(--sx-faint)]">
                  {c.impact && (
                    <span className="rounded-full border px-2 py-0.5"
                          style={{ color: c.impactCrit ? 'var(--sx-crit)' : 'var(--sx-faint)', borderColor: 'var(--sx-line)' }}>
                      {c.impact}
                    </span>
                  )}
                  <span>{c.cls}</span><span>{c.year}</span>
                </div>
                <p className="mt-3 text-sm text-[color:var(--sx-muted)]">{c.summary}</p>
                {c.rows && (
                  <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-sm">
                    {c.rows.map((r, j) => (
                      <div key={j} className="contents">
                        <dt className="pt-0.5 font-mono text-[11px] uppercase tracking-wide text-[color:var(--sx-accent)]">{r.k}</dt>
                        <dd className="text-[color:var(--sx-muted)]">{r.v}</dd>
                      </div>
                    ))}
                  </dl>
                )}
                <p className="mt-3 border-t border-dashed border-[color:var(--sx-line)] pt-2.5 text-xs italic text-[color:var(--sx-faint)]">{c.note}</p>
              </article>
            ))}
          </div>
        </section>

        {/* method */}
        <section className="border-b border-[color:var(--sx-line)] py-12">
          <SecHead n="02" title={t.methodTitle} />
          <p className="mb-6 max-w-2xl text-[color:var(--sx-muted)]">{t.methodIntro}</p>
          <div className="grid gap-2.5">
            {t.steps.map((s, i) => {
              const Icon = STEP_ICONS[i];
              return (
                <div key={i} className="flex items-start gap-3 rounded-lg border border-[color:var(--sx-line)] bg-[var(--sx-panel)] p-4">
                  <div className="mt-0.5 flex items-center gap-2 font-mono text-xs font-bold text-[color:var(--sx-accent)]">
                    <span>0{i + 1}</span><Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold">{s.t}</h4>
                    <p className="text-sm text-[color:var(--sx-muted)]">{s.d}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* stack */}
        <section className="border-b border-[color:var(--sx-line)] py-12">
          <SecHead n="03" title={t.stackTitle} />
          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <ColLabel>{t.toolsLabel}</ColLabel>
              <Chips items={TOOLS} />
              <div className="mt-5"><ColLabel>{t.skillsLabel}</ColLabel><Chips items={t.skills} /></div>
            </div>
            <div>
              <ColLabel>{t.eduLabel}</ColLabel>
              <ul className="grid gap-2">
                {t.edu.map((e, i) => (
                  <li key={i} className="flex gap-2 text-sm text-[color:var(--sx-muted)]">
                    <span className="font-mono text-[color:var(--sx-accent)]">›</span><span>{e}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5"><ColLabel>{t.inProgLabel}</ColLabel><Chips items={t.inProg} /></div>
            </div>
          </div>
        </section>

        {/* contact */}
        <section id="contato" className="py-12">
          <SecHead n="04" title={t.contactTitle} />
          <p className="mb-4 max-w-2xl text-[color:var(--sx-muted)]">{t.contactLead}</p>
          <div className="flex flex-wrap items-center gap-2.5">
            <CopyButton value={EMAIL} label="e-mail" copiedLabel={t.copied} icon={Mail} />
            <CopyButton value={PHONE} label="tel" copiedLabel={t.copied} icon={Phone} />
            <a href={GITHUB} target="_blank" rel="noopener noreferrer"
               className="inline-flex items-center gap-2 rounded-lg border border-[color:var(--sx-line)] px-3 py-2 font-mono text-sm hover:border-[color:var(--sx-accent)] transition-colors">
              <Github className="h-4 w-4" />GitHub<ArrowUpRight className="h-3 w-3" />
            </a>
            <a href={LINKEDIN} target="_blank" rel="noopener noreferrer"
               className="inline-flex items-center gap-2 rounded-lg border border-[color:var(--sx-line)] px-3 py-2 font-mono text-sm hover:border-[color:var(--sx-accent)] transition-colors">
              <Linkedin className="h-4 w-4" />LinkedIn<ArrowUpRight className="h-3 w-3" />
            </a>
          </div>
          <p className="mt-4 font-mono text-xs text-[color:var(--sx-faint)]">{t.location}</p>
        </section>

        <footer className="flex flex-wrap justify-between gap-2 border-t border-[color:var(--sx-line)] py-7 font-mono text-xs text-[color:var(--sx-faint)]">
          <span>© {new Date().getFullYear()} Danilo Leal</span>
          <span>Ética · Evidência · Divulgação responsável</span>
        </footer>
      </div>
    </div>
  );
}

function SecHead({ n, title }: { n: string; title: string }) {
  return (
    <div className="mb-5 flex items-baseline gap-3">
      <span className="font-mono text-xs text-[color:var(--sx-faint)]">{n}</span>
      <h2 className="text-2xl font-semibold">{title}</h2>
    </div>
  );
}

function ColLabel({ children }: { children: React.ReactNode }) {
  return <h3 className="mb-3 font-mono text-xs uppercase tracking-widest text-[color:var(--sx-accent)]">{children}</h3>;
}

function Chips({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((it) => (
        <span key={it} className="rounded-md border border-[color:var(--sx-line)] bg-[var(--sx-panel2)] px-2.5 py-1 font-mono text-xs">{it}</span>
      ))}
    </div>
  );
}
