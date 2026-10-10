import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Footer from '@/components/footer';

export const metadata: Metadata = {
  title: 'Rodribot | Danilo Leal',
  description:
    'A tour of Rodribot, an RPA bot that automates repetitive clerical workflows in Brazil’s PJe judicial system.',
};

const flow = ['Pick a workflow', 'Open Chrome', 'Log in to PJe', 'Work through each case', 'Log every step'];

const stack = ['Python', 'Playwright', 'pywebview (WebView2)', 'PyInstaller', 'python-dotenv', 'rich'];

const facts = [
  { value: '20+', label: 'court workflows automated' },
  { value: '1', label: 'standalone Windows app, no Python needed' },
  { value: 'PJe2X', label: 'migration it made possible' },
];

const screens = [
  {
    image: '/rodribot/main.png',
    title: 'One menu for every workflow',
    text: 'Rodribot opens a small frameless window with the workflows it can run. Picking one starts the automation and the menu closes itself.',
  },
  {
    image: '/rodribot/folder.png',
    title: 'Workflows grouped by case type',
    text: '“Gestão de agrupadores” holds 15 workflows that work through PJe’s case groupings: appeals, court costs, pending documents, petitions and more.',
  },
  {
    image: '/rodribot/starting.png',
    title: 'Starting a run',
    text: 'The chosen button turns green and the window fades out. Python receives the choice, opens Chrome through Playwright and runs the workflow step by step inside PJe.',
  },
  {
    image: '/rodribot/unavailable.png',
    title: 'Work in progress stays visible',
    text: 'Workflows still being built live under “Em desenvolvimento”. Clicking one shakes the button and shows “Indisponível…” instead of running half-finished automation.',
  },
];

export default function RodribotPage() {
  return (
    <main className="relative min-h-screen bg-paper overflow-hidden">
      <div className="absolute inset-0 dot-pattern pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 pt-16 pb-24">
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 text-sm text-foreground/60 hover:text-terra transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to projects
        </Link>

        <header className="mt-10 mb-16">
          <span className="text-sm font-medium text-terra mb-4 block">Automation (RPA)</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">Rodribot</h1>
          <p className="max-w-3xl text-lg text-foreground/60 leading-relaxed">
            Legal-process automation I built from scratch during my internship. It takes over the repetitive
            clerical work court staff do every day in PJe, Brazil&apos;s electronic judicial system: triaging cases,
            issuing citations and notices, filling in forms and moving each case to its next step.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-2 text-sm text-foreground/60">
            {flow.map((step, i) => (
              <span key={step} className="inline-flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-line/[0.06] border border-line/[0.1] text-foreground/70">
                  {step}
                </span>
                {i < flow.length - 1 && <span className="text-terra">→</span>}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {stack.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 text-xs font-medium text-foreground/60 bg-line/[0.06] rounded-md border border-line/[0.1]"
              >
                {tech}
              </span>
            ))}
          </div>

          <p className="mt-6 max-w-3xl text-sm text-foreground/50">
            Rodribot is a private, closed-source tool that runs against a real court system, so there is no public
            demo. Instead, here is its flow-selector menu, in Brazilian Portuguese like the app itself.
          </p>
        </header>

        <section className="mb-20 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {facts.map((fact) => (
            <div key={fact.label} className="premium-card p-6">
              <div className="relative z-10">
                <p className="text-3xl font-bold text-terra mb-1">{fact.value}</p>
                <p className="text-sm text-foreground/60">{fact.label}</p>
              </div>
            </div>
          ))}
        </section>

        <section className="mb-20 max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">How it holds up</h2>
          <div className="flex flex-col gap-5 text-foreground/60 leading-relaxed">
            <p>
              PJe is a heavy web app full of iframes and slow background requests, so the automation can&apos;t just
              click and hope. Every interaction goes through helpers that wait for the page to settle, rebuild their
              selectors when a frame reloads and retry before giving up.
            </p>
            <p>
              Operators stay in control: a background thread checks a remote switch, and turning it off closes the
              browser right away. Every run writes a log, and the whole bot ships as a standalone Windows app built
              with PyInstaller, so court staff can run it without installing Python.
            </p>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-16">
          {screens.map((screen) => (
            <section key={screen.image}>
              <div className="premium-card border border-line/[0.1] shadow-xl shadow-scrim/10 mb-6">
                <img
                  src={screen.image}
                  alt={screen.title}
                  width={1180}
                  height={1630}
                  loading="lazy"
                  className="w-full h-auto block"
                />
              </div>
              <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-2">{screen.title}</h2>
              <p className="text-foreground/60 leading-relaxed">{screen.text}</p>
            </section>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}
