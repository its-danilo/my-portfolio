"use client";

import CaseNav from '@/components/case-nav';
import Footer from '@/components/footer';
import { useLanguage, type Localized } from '@/lib/i18n';

const stack = ['Python', 'Playwright', 'tkinter', 'PyInstaller', 'openpyxl', 'python-dotenv', 'rich'];

const en = {
  category: 'Automation (RPA)',
  intro:
    "Legal-process automation I built from scratch during my internship at the Federal Justice of Rio Grande do Norte (JFRN). It takes over the repetitive clerical work court staff do every day in PJe, Brazil's electronic judicial system: triaging cases, issuing citations and notices, filling in forms and moving each case to its next step.",
  flow: ['Pick a workflow', 'Open the browser', 'Log in to PJe', 'Work through each case', 'Log every step'],
  note: 'Rodribot is a private, closed-source tool that runs against a real court system at the JFRN, so there is no public demo. Instead, here is its flow-selector menu, in Brazilian Portuguese like the app itself.',
  facts: [
    { value: '20+', label: 'court workflows automated' },
    { value: '1', label: 'standalone Windows app, no Python needed' },
    { value: 'PJe2X', label: 'migration it made possible' },
  ],
  holdsUpTitle: 'How it holds up',
  holdsUp: [
    "PJe is a heavy web app full of iframes and slow background requests, so the automation can't just click and hope. Every interaction goes through helpers that wait for the page to settle, rebuild their selectors when a frame reloads and retry before giving up.",
    'Operators stay in control: a background thread checks a remote switch, and turning it off closes the browser right away. Every run writes a log, and the whole bot ships as a standalone Windows app built with PyInstaller, so court staff can run it without installing Python.',
    "When Windows 11's Smart App Control started blocking the .NET library behind the old pywebview menu, I rebuilt the menu in tkinter, which ships with Python. The build renders the original HTML menu in Chrome and the tkinter window reuses those images, so it still looks exactly like the screens below. The build also leaves out unused packages like numpy, whose unsigned DLLs would get blocked too.",
  ],
};

const copy: Localized<typeof en> = {
  en,
  pt: {
    category: 'Automação (RPA)',
    intro:
      'Automação de processos judiciais que criei do zero durante meu estágio na Justiça Federal do Rio Grande do Norte (JFRN). Ela assume o trabalho repetitivo de secretaria que os servidores fazem todo dia no PJe, o sistema judicial eletrônico do Brasil: triar processos, expedir citações e intimações, preencher formulários e levar cada processo para a próxima etapa.',
    flow: ['Escolher um fluxo', 'Abrir o navegador', 'Entrar no PJe', 'Percorrer cada processo', 'Registrar cada passo'],
    note: 'O Rodribot é uma ferramenta privada, de código fechado, que roda num sistema judicial real da JFRN, então não há demo pública. Em vez disso, aqui está o menu de seleção de fluxos, em português como o próprio app.',
    facts: [
      { value: '20+', label: 'fluxos judiciais automatizados' },
      { value: '1', label: 'app de Windows independente, sem precisar de Python' },
      { value: 'PJe2X', label: 'a migração que ele tornou possível' },
    ],
    holdsUpTitle: 'Como ele se mantém estável',
    holdsUp: [
      'O PJe é um app web pesado, cheio de iframes e de requisições lentas em segundo plano, então a automação não pode simplesmente clicar e torcer. Toda interação passa por funções auxiliares que esperam a página estabilizar, reconstroem os seletores quando um frame recarrega e tentam de novo antes de desistir.',
      'Os operadores continuam no controle: uma thread em segundo plano consulta um interruptor remoto, e desligá-lo fecha o navegador na hora. Toda execução grava um log, e o bot inteiro é distribuído como um app de Windows independente, gerado com PyInstaller, então os servidores rodam sem instalar Python.',
      'Quando o Smart App Control do Windows 11 começou a bloquear a biblioteca .NET por trás do antigo menu em pywebview, refiz o menu em tkinter, que já vem com o Python. O build renderiza o menu HTML original no Chrome e a janela em tkinter reaproveita essas imagens, então ele continua idêntico às telas abaixo. O build também deixa de fora pacotes sem uso, como o numpy, cujas DLLs sem assinatura também seriam bloqueadas.',
    ],
  },
};

const screens: { image: string; title: Localized; text: Localized }[] = [
  {
    image: '/rodribot/main.png',
    title: { en: 'One menu for every workflow', pt: 'Um menu para todos os fluxos' },
    text: {
      en: 'Rodribot opens a small frameless window with the workflows it can run, including Migração, which reads a spreadsheet of case numbers and moves each case to PJe2X. Picking one starts the automation and the menu closes itself.',
      pt: 'O Rodribot abre uma pequena janela sem bordas com os fluxos que ele sabe executar, incluindo o Migração, que lê uma planilha de números de processo e move cada processo para o PJe2X. Escolher um inicia a automação, e o menu se fecha sozinho.',
    },
  },
  {
    image: '/rodribot/folder.png',
    title: { en: 'Workflows grouped by case type', pt: 'Fluxos agrupados por tipo de processo' },
    text: {
      en: '“Gestão de agrupadores” holds 15 workflows that work through PJe’s case groupings: appeals, court costs, pending documents, petitions and more.',
      pt: '“Gestão de agrupadores” reúne 15 fluxos que percorrem os agrupadores de processos do PJe: recursos, custas, documentos pendentes, petições e mais.',
    },
  },
  {
    image: '/rodribot/starting.png',
    title: { en: 'Starting a run', pt: 'Iniciando uma execução' },
    text: {
      en: 'The chosen button turns green and the window fades out. Rodribot then opens Chrome through Playwright (Firefox for the migration) and runs the workflow step by step inside PJe.',
      pt: 'O botão escolhido fica verde e a janela some aos poucos. Então o Rodribot abre o Chrome pelo Playwright (o Firefox, na migração) e executa o fluxo passo a passo dentro do PJe.',
    },
  },
  {
    image: '/rodribot/unavailable.png',
    title: { en: 'Work in progress stays visible', pt: 'O que está em construção fica visível' },
    text: {
      en: 'Workflows still being built live under “Em desenvolvimento”. Clicking one shakes the button and shows “Indisponível…” instead of running half-finished automation.',
      pt: 'Os fluxos ainda em construção ficam em “Em desenvolvimento”. Clicar em um deles faz o botão tremer e mostra “Indisponível…” em vez de rodar uma automação pela metade.',
    },
  },
];

export default function RodribotContent() {
  const { lang } = useLanguage();
  const t = copy[lang];

  return (
    <main className="relative min-h-screen bg-paper overflow-hidden">
      <div className="absolute inset-0 dot-pattern pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 pt-16 pb-24">
        <CaseNav />

        <header className="mt-10 mb-16">
          <span className="text-sm font-medium text-terra mb-4 block">{t.category}</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">Rodribot</h1>
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
            {stack.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 text-xs font-medium text-foreground/60 bg-line/[0.06] rounded-md border border-line/[0.1]"
              >
                {tech}
              </span>
            ))}
          </div>

          <p className="mt-6 max-w-3xl text-sm text-foreground/50">{t.note}</p>
        </header>

        <section className="mb-20 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {t.facts.map((fact) => (
            <div key={fact.value} className="premium-card p-6">
              <div className="relative z-10">
                <p className="text-3xl font-bold text-terra mb-1">{fact.value}</p>
                <p className="text-sm text-foreground/60">{fact.label}</p>
              </div>
            </div>
          ))}
        </section>

        <section className="mb-20 max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">{t.holdsUpTitle}</h2>
          <div className="flex flex-col gap-5 text-foreground/60 leading-relaxed">
            {t.holdsUp.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-16">
          {screens.map((screen) => (
            <section key={screen.image}>
              <div className="premium-card border border-line/[0.1] shadow-xl shadow-scrim/10 mb-6">
                <img
                  src={screen.image}
                  alt={screen.title[lang]}
                  width={1180}
                  height={1630}
                  loading="lazy"
                  className="w-full h-auto block"
                />
              </div>
              <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-2">{screen.title[lang]}</h2>
              <p className="text-foreground/60 leading-relaxed">{screen.text[lang]}</p>
            </section>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}
