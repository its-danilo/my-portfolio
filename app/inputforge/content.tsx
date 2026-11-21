"use client";

import CaseNav from '@/components/case-nav';
import Footer from '@/components/footer';
import RelatedProjects, { type RelatedProject } from '@/components/related-projects';
import { useLanguage, type Localized } from '@/lib/i18n';

const stack = ['Python', 'GTK 4', 'libadwaita', 'gtk4-layer-shell', 'evdev', 'uinput', 'Hyprland IPC', 'grim', 'systemd'];

const related: RelatedProject[] = [
  { title: { en: 'My Desktop', pt: 'Meu Desktop' }, text: { en: 'the desktop it lives in: shortcut, bar icon and theme', pt: 'o desktop onde ele mora: atalho, ícone na barra e tema' }, href: '/desktop' },
  { title: 'OpenAurum', text: { en: 'lights up the keyboard while a macro runs', pt: 'acende o teclado enquanto uma macro roda' }, href: 'https://github.com/its-danilo/openaurum' },
];

// Real screenshots of the app (the profile is one of my Roblox games).
const shots = [
  { image: '/inputforge/perfil.webp', w: 941, h: 1014 },
  { image: '/inputforge/atalho.webp', w: 941, h: 1014 },
];

const en = {
  category: 'Linux / Desktop app',
  intro:
    'An autoclicker, macro recorder and per-game key remapper for Linux on Hyprland. I built it for the games I play on Linux, where blind timer macros kept failing. Its macros can look at the screen, so they react to the game instead of guessing.',
  flow: ['Keyboard & mouse', 'Kernel (evdev)', 'Engine', 'Profile of the focused game', 'Virtual devices (uinput)', 'Game'],
  note: 'The repository is private for now. The screenshots are the real app, themed by my desktop.',
  facts: [
    { value: '4', label: 'shortcut kinds: autoclicker, macro, remap and command' },
    { value: '15/s', label: 'screen captures, only while a macro is watching' },
    { value: '0', label: 'games taken out of fullscreen to open it' },
  ],
  shotsTitle: 'The app',
  shotCaptions: [
    'A game profile: it arms itself when the game window gets focus. Below, the screen regions it watches.',
    'A macro that watches the screen: “if Slot E looks ready, press E”, then the same for R, F and C.',
  ],
  parts: [
    {
      title: 'Below the compositor',
      text: 'A background engine reads the keyboard and mouse straight from the kernel (evdev) and types through a virtual keyboard and mouse (uinput). That is why shortcuts work in the middle of a fullscreen game, even when the compositor blocks its own. Keys are grabbed only for remaps, through cloned devices, with a watchdog that lets go if anything gets stuck.',
    },
    {
      title: 'Macros that look at the screen',
      text: 'Mark a piece of the screen (a skill slot, a health bar, a button) while it shows the state you care about. That becomes the reference, stored as an 8×8 signature. Macros can then wait until the region matches, branch on it, or fire on their own when it changes. Timer-based rotations failed in my games: about 0.4 s of latency, skills blocking each other, early presses ignored. A rotation that checks each slot fixed all three.',
    },
    {
      title: 'One profile per game',
      text: 'Profiles arm themselves when a game’s window gets focus, matched by window class and title. Several profiles can share one window (every Roblox game runs inside the same app), so you pick which one counts and the choice is remembered per game. Anything running pauses when the game loses focus, and holding Esc stops everything.',
    },
    {
      title: 'On top of a fullscreen game',
      text: 'Taking a game out of fullscreen can crash it, so InputForge never does. Its quick panel and its full editor open as layers over the game. The game keeps running and stays playable, and macros pause only while the cursor is over the panel.',
    },
    {
      title: 'A recorder that writes steps',
      text: 'Press record, play, and every key, click and pause becomes a macro step with its real timing, ready to edit. Steps cover keys, combos, clicks, relative mouse moves for 3D cameras, scrolling, typed text with accents and shell commands, with optional random variation on every wait.',
    },
    {
      title: 'Native and part of the desktop',
      text: 'The interface is GTK 4 with libadwaita and follows the desktop theme live. The HUD and the quick panel use layer-shell. A systemd user service starts the engine with the session, and the tests drive the engine against fake devices, a fake Hyprland and a fake screen, so they never send real input while a game is open.',
    },
  ],
};

const copy: Localized<typeof en> = {
  en,
  pt: {
    category: 'Linux / App de desktop',
    intro:
      'Autoclicker, gravador de macros e remapeamento de teclas por jogo para Linux com Hyprland. Criei para os jogos que eu jogo no Linux, onde as macros cegas, por tempo, viviam falhando. As macros dele olham a tela, então reagem ao jogo em vez de adivinhar.',
    flow: ['Teclado e mouse', 'Kernel (evdev)', 'Motor', 'Perfil do jogo em foco', 'Aparelhos virtuais (uinput)', 'Jogo'],
    note: 'O repositório é privado por enquanto. Os prints são do app de verdade, com o tema do meu desktop.',
    facts: [
      { value: '4', label: 'tipos de atalho: autoclicker, macro, remapeamento e comando' },
      { value: '15/s', label: 'capturas de tela, só enquanto uma macro está olhando' },
      { value: '0', label: 'jogos tirados da tela cheia para abri-lo' },
    ],
    shotsTitle: 'O app',
    shotCaptions: [
      'Um perfil de jogo: ele se arma sozinho quando a janela do jogo ganha foco. Embaixo, as regiões da tela que ele observa.',
      'Uma macro que olha a tela: “se o Slot E está pronto, aperta E”, e o mesmo para R, F e C.',
    ],
    parts: [
      {
        title: 'Abaixo do compositor',
        text: 'Um motor em segundo plano lê o teclado e o mouse direto do kernel (evdev) e digita por um teclado e um mouse virtuais (uinput). Por isso os atalhos funcionam no meio de um jogo em tela cheia, até com o compositor bloqueando os atalhos dele. As teclas só são capturadas para remapear, por aparelhos clonados, com um vigia que solta tudo se algo travar.',
      },
      {
        title: 'Macros que olham a tela',
        text: 'Marque um pedaço da tela (um slot de skill, uma barra de vida, um botão) enquanto ele mostra o estado que interessa. Isso vira a referência, guardada como uma assinatura 8×8. As macros podem esperar a região ficar igual, decidir o caminho por ela ou disparar sozinhas quando ela muda. Rotações por tempo falharam nos meus jogos: cerca de 0,4 s de latência, skills bloqueando umas às outras, toques cedo demais ignorados. Uma rotação que confere cada slot resolveu os três.',
      },
      {
        title: 'Um perfil por jogo',
        text: 'Os perfis se armam sozinhos quando a janela de um jogo ganha foco, pela classe e pelo título da janela. Vários perfis podem dividir a mesma janela (todo jogo do Roblox roda dentro do mesmo app), então você escolhe qual vale, e a escolha fica lembrada por jogo. Tudo o que está rodando pausa quando o jogo perde o foco, e segurar Esc para tudo.',
      },
      {
        title: 'Por cima de um jogo em tela cheia',
        text: 'Tirar um jogo da tela cheia pode derrubá-lo, então o InputForge nunca faz isso. O painel rápido e o editor completo abrem como camadas por cima do jogo. O jogo continua rodando e jogável, e as macros pausam só enquanto o cursor está em cima do painel.',
      },
      {
        title: 'Um gravador que escreve passos',
        text: 'Aperte gravar, jogue, e cada tecla, clique e pausa vira um passo da macro com o tempo real, pronto para editar. Os passos cobrem teclas, combos, cliques, movimento relativo do mouse para câmeras 3D, rolagem, texto digitado com acentos e comandos, com variação aleatória opcional em cada espera.',
      },
      {
        title: 'Nativo e parte do desktop',
        text: 'A interface é GTK 4 com libadwaita e segue o tema do desktop ao vivo. O HUD e o painel rápido usam layer-shell. Um serviço de usuário do systemd inicia o motor com a sessão, e os testes rodam o motor contra aparelhos falsos, um Hyprland falso e uma tela falsa, então nunca mandam entrada de verdade com um jogo aberto.',
      },
    ],
  },
};

export default function InputForgeContent() {
  const { lang } = useLanguage();
  const t = copy[lang];

  return (
    <main className="relative min-h-screen bg-paper overflow-hidden">
      <div className="absolute inset-0 dot-pattern pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 pt-16 pb-24">
        <CaseNav />

        <header className="mt-10 mb-16">
          <span className="text-sm font-medium text-terra mb-4 block">{t.category}</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">InputForge</h1>
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

        <section className="mb-20">
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-8">{t.shotsTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {shots.map((shot, i) => (
              <figure key={shot.image}>
                <div className="premium-card border border-line/[0.1] shadow-2xl shadow-scrim/20 overflow-hidden">
                  <img
                    src={shot.image}
                    alt={t.shotCaptions[i]}
                    width={shot.w}
                    height={shot.h}
                    loading="lazy"
                    className="relative z-10 w-full h-auto block"
                  />
                </div>
                <figcaption className="mt-3 text-sm text-foreground/50">{t.shotCaptions[i]}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-12">
          {t.parts.map((part) => (
            <section key={part.title}>
              <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-3">{part.title}</h2>
              <p className="text-foreground/60 leading-relaxed">{part.text}</p>
            </section>
          ))}
        </div>

        <RelatedProjects items={related} />
      </div>

      <Footer />
    </main>
  );
}
