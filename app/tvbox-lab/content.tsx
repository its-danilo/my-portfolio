"use client";

import CaseNav from '@/components/case-nav';
import Footer from '@/components/footer';
import { useLanguage, type Localized } from '@/lib/i18n';

const stack = ['Armbian (Debian 13)', 'AdGuard Home', 'Tailscale', 'Docker Compose', 'Vaultwarden', 'Gatus', 'Homer', 'ntfy', 'systemd', 'Bash', 'Python'];

// Measured on the box with everything running (787 MB usable).
const memory: { name: Localized; mb: number; note?: Localized }[] = [
  { name: { en: 'AdGuard Home', pt: 'AdGuard Home' }, mb: 96 },
  { name: { en: 'Tailscale', pt: 'Tailscale' }, mb: 73 },
  { name: { en: 'Docker', pt: 'Docker' }, mb: 64 },
  { name: { en: 'Vaultwarden', pt: 'Vaultwarden' }, mb: 31, note: { en: 'capped at 128 MB', pt: 'limite de 128 MB' } },
  { name: { en: 'Gatus', pt: 'Gatus' }, mb: 18, note: { en: 'capped at 96 MB', pt: 'limite de 96 MB' } },
  { name: { en: 'Wake-on-WLAN button', pt: 'Botão Wake-on-WLAN' }, mb: 15 },
];
const free = 280;

const en = {
  category: 'Self-hosting / Linux',
  intro:
    "A home server built on a cheap Android TV box with 1 GB of RAM. I replaced Android with Linux and turned it into the house's DNS filter, private VPN, password vault, status monitor and a button that wakes my PC over Wi-Fi, running day and night on hardware that was headed for a drawer.",
  flow: ['Android TV box', 'Armbian on the eMMC', 'DNS for the house', 'Private VPN', 'Containers', 'Alerts on the phone'],
  note: 'The repository is private: it describes a real home network. This page leaves out every address, name and credential, and shows the parts that matter instead.',
  facts: [
    { value: '1 GB', label: 'of RAM, on an Amlogic S905X TV box' },
    { value: '~280 MB', label: 'still free with every service running' },
    { value: '0', label: 'ports open on the router' },
  ],
  memoryTitle: 'The memory budget',
  memoryIntro: 'With 787 MB usable, every service has to earn its place. Measured with everything running:',
  stillFree: 'Still free',
  parts: [
    {
      title: 'From Android to Debian',
      text: 'I backed up the stock Android, then installed Armbian on the box’s 8 GB internal storage, with zram swap to stretch the RAM. The hardware fought back: both cheap microSD cards I tried were bad, so the install goes through a USB stick, and a small USB fan took the box from 69 to 49 °C.',
    },
    {
      title: 'DNS for the whole house',
      text: 'AdGuard Home answers every device’s DNS, blocking ads and trackers, with an adult-content filter per device. A bypass blocklist (DNS-over-HTTPS, VPN and proxy endpoints) stops browsers from quietly routing around it, and the PC falls back to a filtered public resolver when the box is down.',
    },
    {
      title: 'Private by default',
      text: 'Everything with a screen is reachable only inside a Tailscale network, with HTTPS certificates issued automatically. Nothing is exposed to the internet and nothing needs port forwarding. The box also works as an exit node, so the phone browses through the home connection and its filters when away.',
    },
    {
      title: 'Services on a memory budget',
      text: 'Vaultwarden (a self-hosted, Bitwarden-compatible password vault) and Gatus (status monitoring) run in Docker with hard memory limits. The vault is backed up every day and the backup is pulled to the PC. Gatus watches my live sites and the house, and alerts the phone through ntfy, along with failed backups and IP changes.',
    },
    {
      title: 'Waking the PC over Wi-Fi',
      text: 'A button on the box wakes my PC from suspend over Wi-Fi (WoWLAN), with no network cable. Getting it reliable took a udev rule and a watcher on the PC that re-arms wake-up after every resume, and raising the router’s group rekey interval, which was dropping the sleeping PC off the network.',
    },
    {
      title: 'A manual anyone can follow',
      text: 'The repository is a 14-chapter manual that rebuilds the whole setup from scratch, with the real configuration files and secrets swapped for examples. Every chapter ends with checks that prove the step worked, and a health-check script tells at any time whether everything is up.',
    },
  ],
};

const copy: Localized<typeof en> = {
  en,
  pt: {
    category: 'Self-hosting / Linux',
    intro:
      'Um servidor caseiro montado numa TV box Android barata, com 1 GB de RAM. Troquei o Android por Linux e transformei a caixa no filtro de DNS da casa, VPN privada, cofre de senhas, monitor de status e num botão que acorda meu PC pelo Wi-Fi, rodando dia e noite num hardware que ia parar na gaveta.',
    flow: ['TV box Android', 'Armbian no eMMC', 'DNS da casa', 'VPN privada', 'Contêineres', 'Alertas no celular'],
    note: 'O repositório é privado: ele descreve uma rede doméstica real. Esta página deixa de fora todo endereço, nome e credencial, e mostra o que importa.',
    facts: [
      { value: '1 GB', label: 'de RAM, numa TV box Amlogic S905X' },
      { value: '~280 MB', label: 'ainda livres com todos os serviços rodando' },
      { value: '0', label: 'portas abertas no roteador' },
    ],
    memoryTitle: 'O orçamento de memória',
    memoryIntro: 'Com 787 MB utilizáveis, cada serviço precisa merecer o seu lugar. Medido com tudo rodando:',
    stillFree: 'Ainda livre',
    parts: [
      {
        title: 'Do Android ao Debian',
        text: 'Fiz backup do Android original e instalei o Armbian nos 8 GB de armazenamento interno da caixa, com swap em zram para esticar a RAM. O hardware resistiu: os dois microSD baratos que testei estavam ruins, então a instalação passa por um pendrive, e um pequeno ventilador USB levou a caixa de 69 para 49 °C.',
      },
      {
        title: 'DNS para a casa toda',
        text: 'O AdGuard Home responde o DNS de todos os aparelhos, bloqueando anúncios e rastreadores, com filtro de conteúdo adulto por aparelho. Uma lista de bloqueio de desvios (endereços de DNS sobre HTTPS, VPN e proxy) impede que os navegadores contornem o filtro em silêncio, e o PC recorre a um resolvedor público filtrado quando a caixa está fora do ar.',
      },
      {
        title: 'Privado por padrão',
        text: 'Tudo que tem tela só é acessível dentro de uma rede Tailscale, com certificados HTTPS emitidos automaticamente. Nada fica exposto à internet e nada precisa de redirecionamento de portas. A caixa também funciona como exit node, então, fora de casa, o celular navega pela conexão de casa e pelos filtros dela.',
      },
      {
        title: 'Serviços com orçamento de memória',
        text: 'O Vaultwarden (um cofre de senhas auto-hospedado, compatível com o Bitwarden) e o Gatus (monitoramento de status) rodam no Docker com limites rígidos de memória. O cofre tem backup diário, e o backup é puxado para o PC. O Gatus vigia meus sites no ar e a casa, e avisa o celular pelo ntfy, junto com backups que falharam e mudanças de IP.',
      },
      {
        title: 'Acordando o PC pelo Wi-Fi',
        text: 'Um botão na caixa acorda meu PC da suspensão pelo Wi-Fi (WoWLAN), sem cabo de rede. Deixar isso confiável exigiu uma regra udev e um vigia no PC que rearma o despertar depois de cada retomada, além de aumentar o intervalo de rekey de grupo do roteador, que estava derrubando da rede o PC adormecido.',
      },
      {
        title: 'Um manual que qualquer um consegue seguir',
        text: 'O repositório é um manual de 14 capítulos que reconstrói toda a montagem do zero, com os arquivos de configuração reais e os segredos trocados por exemplos. Cada capítulo termina com verificações que provam que o passo funcionou, e um script de checagem diz a qualquer momento se está tudo no ar.',
      },
    ],
  },
};

export default function TvboxLabContent() {
  const { lang } = useLanguage();
  const t = copy[lang];

  return (
    <main className="relative min-h-screen bg-paper overflow-hidden">
      <div className="absolute inset-0 dot-pattern pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 pt-16 pb-24">
        <CaseNav />

        <header className="mt-10 mb-16">
          <span className="text-sm font-medium text-terra mb-4 block">{t.category}</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">TVBox Lab</h1>
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
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-3">{t.memoryTitle}</h2>
          <p className="text-foreground/60 leading-relaxed mb-8">{t.memoryIntro}</p>
          <div className="premium-card p-6 md:p-8">
            <div className="relative z-10 flex flex-col gap-5">
              {memory.map((item) => (
                <div key={item.name.en}>
                  <div className="flex items-baseline justify-between gap-3 mb-2">
                    <p className="text-sm sm:text-base text-foreground">
                      {item.name[lang]}
                      {item.note && <span className="ml-2 text-xs text-foreground/40">{item.note[lang]}</span>}
                    </p>
                    <p className="shrink-0 text-sm text-foreground/60 tabular-nums">{item.mb} MB</p>
                  </div>
                  <div className="h-2.5 rounded-full bg-line/[0.08] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-terra to-amber"
                      style={{ width: `${(item.mb / free) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
              <div className="h-px bg-line/[0.1]" />
              <div>
                <div className="flex items-baseline justify-between gap-3 mb-2">
                  <p className="text-sm sm:text-base font-medium text-terra">{t.stillFree}</p>
                  <p className="shrink-0 text-sm text-foreground/60 tabular-nums">{free} MB</p>
                </div>
                <div className="h-2.5 rounded-full bg-terra/30" />
              </div>
            </div>
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
      </div>

      <Footer />
    </main>
  );
}
