"use client";

import { ArrowUpRight, Github } from 'lucide-react';
import CaseNav from '@/components/case-nav';
import Footer from '@/components/footer';
import { useLanguage, type Localized } from '@/lib/i18n';

const en = {
  category: 'Productivity / Full-Stack',
  intro:
    'A personal execution system: one active mission at a time, curiosities parked instead of lost, and progress measured by evidence rather than hours. The discipline lives in the software, and the rules that make it work are enforced by the database, not by the interface.',
  flow: ['Direction', 'Campaign', 'Cycle', 'Mission', 'Sessions', 'Evidence', 'Knowledge'],
  stack: [
    'Next.js 16',
    'React 19',
    'TypeScript',
    'Supabase',
    'PostgreSQL triggers & RLS',
    'Tailwind CSS',
    'Vitest',
    'Playwright',
  ],
  source: 'Source code',
  note: 'Continuum is a single-user app: there is no sign-up, and its data is personal. Instead of a public demo, here is a tour of the real screens, in Brazilian Portuguese like the app itself.',
  whyTitle: 'Why I built it',
  why: [
    "Continuum didn't start as an app. For months I studied how I work: I kept notes on how I plan, where I lose momentum, what pulls my attention away and which conditions help me finish things. Over time those notes became a map of my own patterns — what comes easily, what gets in the way, and what triggers a change of course.",
    'Continuum is that map turned into software. The problem it solves is a common one for curious people: new interests keep opening parallel tracks, and older goals fade without anyone deciding to drop them. So the app makes the right behavior the easy one — one active mission at a time, new ideas parked until the end of the cycle instead of acted on right away, and missions that end on verifiable criteria rather than on hours spent. The name comes from that: keep moving forward, continuously, without drifting.',
    "It was designed for one person, which is why there's no sign-up: it fits people who think the way I do, not everyone. That's also why the rules live in the database — a rule the interface can skip is only a suggestion, and the point was to build something I can't talk myself out of.",
  ],
};

const copy: Localized<typeof en> = {
  en,
  pt: {
    category: 'Produtividade / Full-Stack',
    intro:
      'Um sistema pessoal de execução: uma missão ativa por vez, curiosidades guardadas em vez de perdidas e progresso medido por evidências, não por horas. A disciplina mora no software, e as regras que fazem tudo funcionar são garantidas pelo banco de dados, não pela interface.',
    flow: ['Direção', 'Campanha', 'Ciclo', 'Missão', 'Sessões', 'Evidências', 'Conhecimento'],
    stack: [
      'Next.js 16',
      'React 19',
      'TypeScript',
      'Supabase',
      'Triggers do PostgreSQL e RLS',
      'Tailwind CSS',
      'Vitest',
      'Playwright',
    ],
    source: 'Código-fonte',
    note: 'O Continuum é um app de um usuário só: não tem cadastro, e os dados dele são pessoais. Em vez de uma demo pública, aqui vai um tour pelas telas reais, em português como o próprio app.',
    whyTitle: 'Por que eu criei',
    why: [
      'O Continuum não começou como um app. Durante meses estudei como eu trabalho: anotei como planejo, onde perco o ritmo, o que puxa minha atenção para longe e quais condições me ajudam a terminar as coisas. Com o tempo, essas anotações viraram um mapa dos meus próprios padrões — o que vem fácil, o que atrapalha e o que dispara uma mudança de rumo.',
      'O Continuum é esse mapa transformado em software. O problema que ele resolve é comum entre pessoas curiosas: novos interesses vivem abrindo frentes paralelas, e metas antigas vão sumindo sem que ninguém decida abandoná-las. Então o app torna o comportamento certo o mais fácil — uma missão ativa por vez, ideias novas guardadas até o fim do ciclo em vez de executadas na hora, e missões que terminam por critérios verificáveis, não por horas gastas. O nome vem daí: seguir em frente, continuamente, sem se desviar.',
      'Ele foi pensado para uma pessoa só, e é por isso que não tem cadastro: serve para quem pensa como eu, não para todo mundo. É também por isso que as regras moram no banco de dados — uma regra que a interface pode pular é só uma sugestão, e a ideia era construir algo que eu não conseguisse me convencer a burlar.',
    ],
  },
};

const screens: { image: string; title: Localized; text: Localized }[] = [
  {
    image: '/continuum/dashboard.webp',
    title: { en: 'Dashboard: what is running now', pt: 'Painel: o que está em execução agora' },
    text: {
      en: 'One active mission at a time, the hours logged against its minimum and target load, and how much of the monthly cycle has already passed.',
      pt: 'Uma missão ativa por vez, as horas registradas em relação à carga mínima e à carga-alvo dela, e quanto do ciclo mensal já passou.',
    },
  },
  {
    image: '/continuum/mission.webp',
    title: { en: 'A mission is finished by criteria, not by hours', pt: 'Uma missão termina por critérios, não por horas' },
    text: {
      en: 'Every mission has a definition of done. Completion only unlocks when every criterion is satisfied, and an advisory rule (RULE-101) flags criteria too vague to verify.',
      pt: 'Toda missão tem uma definição de pronto. A conclusão só é liberada quando todos os critérios são satisfeitos, e uma regra de alerta (RULE-101) aponta critérios vagos demais para serem verificados.',
    },
  },
  {
    image: '/continuum/sessions.webp',
    title: { en: 'Sessions: effort as an input metric', pt: 'Sessões: esforço como métrica de entrada' },
    text: {
      en: 'Work is logged with a timer or as a past session. The database refuses sessions that overlap, end in the future or belong to a mission that is not active.',
      pt: 'O trabalho é registrado com um cronômetro ou como uma sessão passada. O banco de dados recusa sessões que se sobrepõem, terminam no futuro ou pertencem a uma missão que não está ativa.',
    },
  },
  {
    image: '/continuum/history.webp',
    title: { en: 'History: an append-only record', pt: 'Histórico: um registro que só cresce' },
    text: {
      en: 'Every decision is written by database triggers into a read-only timeline, filterable by type, period and cycle. Nothing can be edited after it happens.',
      pt: 'Cada decisão é gravada por triggers do banco de dados numa linha do tempo somente leitura, que pode ser filtrada por tipo, período e ciclo. Nada pode ser editado depois que acontece.',
    },
  },
  {
    image: '/continuum/history-cycles.webp',
    title: { en: 'Monthly cycles', pt: 'Ciclos mensais' },
    text: {
      en: 'Each cycle groups the missions it carried, so it is easy to see what a month was actually spent on.',
      pt: 'Cada ciclo agrupa as missões que teve, então fica fácil ver com o que um mês foi realmente gasto.',
    },
  },
  {
    image: '/continuum/rules.webp',
    title: { en: 'Rules enforced by the database', pt: 'Regras garantidas pelo banco de dados' },
    text: {
      en: 'Each rule explains why it exists, its exceptions and its recent occurrences. The blocking ones are Postgres constraints and triggers, so no screen, shortcut or script can get around them.',
      pt: 'Cada regra explica por que existe, suas exceções e suas ocorrências recentes. As que bloqueiam são constraints e triggers do Postgres, então nenhuma tela, atalho ou script consegue contorná-las.',
    },
  },
];

export default function ContinuumContent() {
  const { lang } = useLanguage();
  const t = copy[lang];

  return (
    <main className="relative min-h-screen bg-paper overflow-hidden">
      <div className="absolute inset-0 dot-pattern pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 pt-16 pb-24">
        <CaseNav />

        <header className="mt-10 mb-16">
          <span className="text-sm font-medium text-terra mb-4 block">{t.category}</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">Continuum</h1>
          <p className="max-w-3xl text-lg text-foreground/60 leading-relaxed">{t.intro}</p>

          <div className="mt-8 flex flex-wrap items-center gap-2 text-sm text-foreground/60">
            {t.flow.map((step, i) => (
              <span key={step} className="inline-flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-line/[0.06] border border-line/[0.1] text-foreground/70">
                  {step}
                </span>
                {i < t.flow.length - 1 && <span className="text-terra">→</span>}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {t.stack.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 text-xs font-medium text-foreground/60 bg-line/[0.06] rounded-md border border-line/[0.1]"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="https://github.com/John28389/Continuum"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-premium"
            >
              <Github className="w-4 h-4" />
              {t.source}
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          <p className="mt-6 max-w-3xl text-sm text-foreground/50">{t.note}</p>
        </header>

        <section className="mb-20 max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">{t.whyTitle}</h2>
          <div className="flex flex-col gap-5 text-foreground/60 leading-relaxed">
            {t.why.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>

        <div className="flex flex-col gap-20">
          {screens.map((screen) => (
            <section key={screen.image}>
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-3">{screen.title[lang]}</h2>
              <p className="max-w-3xl text-foreground/60 leading-relaxed mb-6">{screen.text[lang]}</p>
              <div className="premium-card border border-line/[0.1] shadow-xl shadow-scrim/10">
                <img
                  src={screen.image}
                  alt={screen.title[lang]}
                  width={1200}
                  height={1080}
                  loading="lazy"
                  className="w-full h-auto block"
                />
              </div>
            </section>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}
