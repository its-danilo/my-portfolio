import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, Github } from 'lucide-react';
import Footer from '@/components/footer';

export const metadata: Metadata = {
  title: 'Continuum | Danilo Leal',
  description:
    'A tour of Continuum, a personal execution system whose rules are enforced by the database itself.',
};

const flow = ['Direction', 'Campaign', 'Cycle', 'Mission', 'Sessions', 'Evidence', 'Knowledge'];

const stack = [
  'Next.js 16',
  'React 19',
  'TypeScript',
  'Supabase',
  'PostgreSQL triggers & RLS',
  'Tailwind CSS',
  'Vitest',
  'Playwright',
];

const screens = [
  {
    image: '/continuum/dashboard.webp',
    title: 'Dashboard: what is running now',
    text: 'One active mission at a time, the hours logged against its minimum and target load, and how much of the monthly cycle has already passed.',
  },
  {
    image: '/continuum/mission.webp',
    title: 'A mission is finished by criteria, not by hours',
    text: 'Every mission has a definition of done. Completion only unlocks when every criterion is satisfied, and an advisory rule (RULE-101) flags criteria too vague to verify.',
  },
  {
    image: '/continuum/sessions.webp',
    title: 'Sessions: effort as an input metric',
    text: 'Work is logged with a timer or as a past session. The database refuses sessions that overlap, end in the future or belong to a mission that is not active.',
  },
  {
    image: '/continuum/history.webp',
    title: 'History: an append-only record',
    text: 'Every decision is written by database triggers into a read-only timeline, filterable by type, period and cycle. Nothing can be edited after it happens.',
  },
  {
    image: '/continuum/history-cycles.webp',
    title: 'Monthly cycles',
    text: 'Each cycle groups the missions it carried, so it is easy to see what a month was actually spent on.',
  },
  {
    image: '/continuum/rules.webp',
    title: 'Rules enforced by the database',
    text: 'Each rule explains why it exists, its exceptions and its recent occurrences. The blocking ones are Postgres constraints and triggers, so no screen, shortcut or script can get around them.',
  },
];

export default function ContinuumPage() {
  return (
    <main className="relative min-h-screen bg-[#FAF7F2] overflow-hidden">
      <div className="absolute inset-0 dot-pattern pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 pt-16 pb-24">
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 text-sm text-foreground/60 hover:text-[#D4654A] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to projects
        </Link>

        <header className="mt-10 mb-16">
          <span className="text-sm font-medium text-[#D4654A] mb-4 block">Productivity / Full-Stack</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">Continuum</h1>
          <p className="max-w-3xl text-lg text-foreground/60 leading-relaxed">
            A personal execution system: one active mission at a time, curiosities parked instead of lost, and
            progress measured by evidence rather than hours. The discipline lives in the software, and the rules
            that make it work are enforced by the database, not by the interface.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-2 text-sm text-foreground/60">
            {flow.map((step, i) => (
              <span key={step} className="inline-flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-[#8B7355]/[0.06] border border-[#8B7355]/[0.1] text-foreground/70">
                  {step}
                </span>
                {i < flow.length - 1 && <span className="text-[#D4654A]">→</span>}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {stack.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 text-xs font-medium text-foreground/60 bg-[#8B7355]/[0.06] rounded-md border border-[#8B7355]/[0.1]"
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
              Source code
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          <p className="mt-6 max-w-3xl text-sm text-foreground/50">
            Continuum is a single-user app: there is no sign-up, and its data is personal. Instead of a public demo,
            here is a tour of the real screens, in Brazilian Portuguese like the app itself.
          </p>
        </header>

        <div className="flex flex-col gap-20">
          {screens.map((screen) => (
            <section key={screen.image}>
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-3">{screen.title}</h2>
              <p className="max-w-3xl text-foreground/60 leading-relaxed mb-6">{screen.text}</p>
              <div className="premium-card border border-[#8B7355]/[0.1] shadow-xl shadow-[#3D2914]/10">
                <img
                  src={screen.image}
                  alt={screen.title}
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
