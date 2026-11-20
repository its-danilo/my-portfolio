"use client";

import CaseNav from '@/components/case-nav';
import Footer from '@/components/footer';
import RelatedProjects, { type RelatedProject } from '@/components/related-projects';
import { useLanguage, type Localized } from '@/lib/i18n';

const stack = ['Arch Linux', 'Hyprland', 'Lua', 'Bash', 'Python', 'GTK 4', 'systemd', 'PipeWire', 'XKB', 'evdev / uinput', 'Tailscale', 'Blender', 'Cairo', 'ffmpeg'];

const UPSTREAM = 'https://github.com/criticalart/calos';
const FAN_UPSTREAM = 'https://github.com/cemkaya-mpi/Dell-G-Series-Controller';

// Parts with a key get their own row with pictures; the rest share the text grid.
type PartKey = 'theming' | 'fans' | 'night';
type Part = { title: string; text: string; key?: PartKey; link?: { label: string; href: string } };

type Shot = { image: string; w: number; h: number; title: Localized; text: Localized };

const en = {
  category: 'Linux / Desktop',
  title: 'My Desktop',
  intro:
    'The Arch Linux and Hyprland desktop I use every day, on a gaming laptop with a TV right above it. It started from CalOS, a clean Hyprland setup, and in about ten weeks grew into roughly a hundred commands of my own. A theme now reaches apps that were never meant to be themed, the two screens behave like one, my phone drives the PC, and the bugs I ran into in other projects were patched or reported upstream.',
  videoCaption: 'Five themes in about thirty seconds, recorded live on the laptop screen: bar, terminal, system monitor, WhatsApp, music player and wallpaper change together.',
  flow: ['Laptop', 'TV above it', 'RGB keyboard', 'Phone', 'Home server', 'Room camera'],
  note: 'The code lives in a private repository, because it is a snapshot of a real machine. Every screen here is a real capture. The WhatsApp chat list is folded away with a panel toggle I added to the app.',
  baseTitle: 'Built on CalOS',
  base: 'The starting point is CalOS (CaliburnOS) by criticalart, a light Hyprland setup for Arch Linux. It gave me the bar, the menu, the themes and the first scripts. Everything on this page is what I built on top of it.',
  baseLink: 'CalOS on GitHub',
  facts: [
    { value: '96', label: 'of the 128 desktop commands written by me, about 15,000 lines of Bash and Python' },
    { value: '20', label: 'apps and devices that follow one theme switch, keyboard LEDs included' },
    { value: '43', label: 'services, timers and file watchers of my own running in the background' },
  ],
  sections: {
    theme: {
      title: 'One theme, everywhere',
      text: 'Each of the 17 themes is a folder with a terminal palette, a bar stylesheet and a few wallpapers. On a switch, a chain of my scripts derives the rest from those colors: GTK and Qt palettes, a KDE color scheme, a Telegram theme file, CSS for Discord, the browser and WhatsApp, the lock screen, the audio visualizer, the clock, the camera page on my home server and the LEDs of my keyboard. Most running apps pick it up live.',
    },
    span: {
      title: 'Two screens, one picture',
      text: 'The TV sits above the laptop, so I made wallpapers that cross both. The script reads each screen’s physical size from its EDID, lays them out in millimetres with the real gap between them, and crops one image so a black hole’s beam leaves the TV and lands in the lake on the laptop. A preview mode renders both screens to scale before anything is applied.',
      caption: 'Preview at physical scale: TV on top, laptop below, the gap between them in black.',
    },
    keyboard: {
      title: 'A keyboard I can relearn',
      text: 'I am learning Colemak-DH on a 60% ABNT2 keyboard without relearning every shortcut. A custom XKB layout keeps Ctrl shortcuts on the printed letters, and vim-style keys in Neovim, the file manager and the music player stay on their old physical keys, all driven by one table. The terminal map is drawn from the live keymap.',
    },
    phone: {
      title: 'The phone as a remote',
      text: 'A small Python server, reachable only through my private Tailscale network, turns any Android phone on my account into a remote: media, per-screen sound and brightness, a virtual touchpad and keyboard, clipboard both ways, a cinema mode, a timer that fades the volume and shuts down, and on-demand remote desktop. The second page is a live station: temperatures, power draw, fans and notifications.',
    },
    gift: {
      title: 'A screensaver made as a gift',
      text: 'For my girlfriend: two dragons fly between the TV and the laptop through eight scenes, and a special one plays on our monthly date. Their wing beats are rendered from a rigged 3D model in Blender into sprite sheets, then drawn with Cairo in about 10 ms per frame, with an adaptive frame rate.',
    },
  },
  shots: {
    home: {
      title: 'The home workspace',
      text: 'One key pops up system monitor, WhatsApp, music and audio visualizer over any workspace. Each app has its own corner, so a closed app comes back to the same spot.',
    },
  },
  keyboardShots: [
    {
      title: 'Shortcut cheat sheet',
      text: 'Generated live from the compositor’s own bindings, each with a description, so it can never go out of date.',
    },
    {
      title: 'Key Viewer',
      text: 'An overlay for screen recordings. It shows only shortcuts, never plain typing, so a password typed on camera stays off the video.',
    },
  ],
  phoneShots: ['Remote', 'Station'],
  partsTitle: 'Under the hood',
  parts: [
    {
      key: 'theming',
      title: 'Theming apps that have no themes',
      text: 'WhatsApp’s desktop client has no theme setting and renames its CSS classes often, so a Python hook loads into the app at startup, injects my stylesheet and remaps colors by value instead of by class name. Telegram gets a theme file generated from its night theme, which the app reloads live. GTK, Qt and KDE colors are computed from the terminal palette, down to the nearest libadwaita accent by hue.',
    },
    {
      title: 'Brightness on a TV that has no brightness control',
      text: 'The 2011 TV does not speak DDC, so its brightness is software gamma through a Wayland relay, while the laptop uses its backlight. Brightness and volume keys act on the focused screen, and volume goes to the TV’s own HDMI audio when that is where you are. Below the laptop’s dimmest backlight the keys keep going into software dimming, and one step further they turn the screen off.',
    },
    {
      title: 'Turning a screen off without typing by accident',
      text: 'When a screen goes dark, the keyboard is grabbed at the input-device level, so the key that wakes it is swallowed instead of being typed into whatever window had focus. It waits for held keys to be released first, otherwise the compositor would see a press with no release and repeat it forever.',
    },
    {
      title: 'A remote that only trusts my phones',
      text: 'The server listens only on the PC’s Tailscale address and accepts a device only if Tailscale says it is an Android phone on my own account. It also checks the Host header against DNS rebinding and requires a custom header on every action. The touchpad and keyboard are virtual input devices, and cinema mode saves the keyboard lighting and puts it back afterwards.',
    },
    {
      title: 'Sound that goes where I mean',
      text: 'Plugging in a headset moves every app to it, and unplugging it sends each app back to the output it was on before, using a snapshot of the per-app routing. The audio visualizer follows the app that is actually playing, not the default output. Do Not Disturb also mutes the chat apps’ own sounds, which never go through the notification daemon.',
    },
    {
      key: 'fans',
      title: 'Fans and heat',
      text: 'Fan speed is written straight to the laptop’s hardware interface. In auto mode a watcher raises the fans to 35% or 100% under sustained heat and hands control back once it cools. If the PC is hot and nobody is at it, my phone gets an alert with buttons to act on it. The fan window started from cemkaya-mpi’s open-source Dell G-Series Controller: I redrew it to work fully from the keyboard, since the original only saved a fan value on mouse release, and later moved it onto the kernel’s own driver, so it runs without root.',
      link: { label: 'Dell G-Series Controller by cemkaya-mpi', href: FAN_UPSTREAM },
    },
    {
      title: 'Fixing what upstream has not fixed yet',
      text: 'The bar’s tray menus opened empty on the first click and its media title froze: I keep a patched build of the bar, and every system update checks for it and offers to rebuild it when the distro package replaces it. A compositor crash turned out to be two threads parsing a cursor theme through one global pointer, which I fixed with a patch to the cursor plugin, rebuilt automatically after each Hyprland update. WhatsApp screen sharing failed in two separate ways; I found both causes and reported them to the app with the fix.',
    },
    {
      title: 'Two GPUs, each app on the right one',
      text: 'The laptop has an Intel GPU for its own screen and an NVIDIA GPU wired to the TV. Apps that rendered on the wrong one stuttered or crashed, so the ones that live on the laptop screen are pinned to the Intel GPU, and the screen recorder encodes on whichever GPU drives the monitor being recorded.',
    },
    {
      key: 'night',
      title: 'Built for the night',
      text: 'Cave mode warms the screens, enlarges terminal and app text and the cursor, and turns the keyboard dark red. When I go to bed, a big clock opens on the TV by itself, once the PC sits idle late at night, or earlier if the room camera sees the light go off. It brightens at 5:30 so I can read it in the morning.',
    },
    {
      title: 'Rebuilt from scratch in one command',
      text: 'A backup script snapshots configs, packages, services and the system files I touched into a repository; the installer rebuilds the machine in phases, with a dry run, and copies everything it replaces to a timestamped backup first. Patched packages are recompiled on a fresh install.',
    },
  ] as Part[],
  partShots: {
    zapzap: 'WhatsApp (ZapZap), Communities tab',
    ayugram: 'Telegram (AyuGram), chat settings',
    normal: 'Normal',
    cave: 'Cave mode',
    caveNote: 'The same screen in both modes. The warm tint is applied on the way to the display, so screenshots miss it; this one was recolored with the same color matrix the compositor uses at 2700 K.',
  },
};

const copy: Localized<typeof en> = {
  en,
  pt: {
    category: 'Linux / Desktop',
    title: 'Meu Desktop',
    intro:
      'O desktop Arch Linux com Hyprland que eu uso todo dia, num notebook gamer com uma TV logo acima dele. Ele partiu do CalOS, uma configuração enxuta de Hyprland, e em cerca de dez semanas virou mais ou menos cem comandos meus. Hoje o tema chega a apps que nunca foram feitos para ter tema, as duas telas funcionam como uma, o celular controla o PC, e os bugs que encontrei em outros projetos foram corrigidos ou relatados.',
    videoCaption: 'Cinco temas em uns trinta segundos, gravados ao vivo na tela do notebook: barra, terminal, monitor do sistema, WhatsApp, player de música e papel de parede mudam juntos.',
    flow: ['Notebook', 'TV acima dele', 'Teclado RGB', 'Celular', 'Servidor de casa', 'Câmera do quarto'],
    note: 'O código fica num repositório privado, porque é o retrato de uma máquina real. Toda tela aqui é uma captura de verdade. A lista de conversas do WhatsApp está recolhida por um botão de painel que eu adicionei ao app.',
    baseTitle: 'Feito sobre o CalOS',
    base: 'O ponto de partida é o CalOS (CaliburnOS), do criticalart, uma configuração leve de Hyprland para Arch Linux. Dele vieram a barra, o menu, os temas e os primeiros scripts. Tudo nesta página é o que eu construí por cima.',
    baseLink: 'CalOS no GitHub',
    facts: [
      { value: '96', label: 'dos 128 comandos do desktop escritos por mim, cerca de 15 mil linhas de Bash e Python' },
      { value: '20', label: 'apps e aparelhos que seguem uma troca de tema, inclusive os LEDs do teclado' },
      { value: '43', label: 'serviços, timers e vigias de arquivos meus rodando em segundo plano' },
    ],
    sections: {
      theme: {
        title: 'Um tema, em todo lugar',
        text: 'Cada um dos 17 temas é uma pasta com a paleta do terminal, o estilo da barra e alguns papéis de parede. Na troca, uma sequência de scripts meus deriva o resto dessas cores: paletas do GTK e do Qt, um esquema de cores do KDE, um arquivo de tema do Telegram, CSS para o Discord, o navegador e o WhatsApp, a tela de bloqueio, o visualizador de áudio, o relógio, a página da câmera no meu servidor de casa e os LEDs do teclado. A maioria dos apps abertos muda na hora.',
      },
      span: {
        title: 'Duas telas, uma imagem',
        text: 'A TV fica em cima do notebook, então fiz papéis de parede que atravessam as duas. O script lê o tamanho físico de cada tela pelo EDID, monta as duas em milímetros com o vão real entre elas e recorta uma imagem só, para o feixe de um buraco negro sair da TV e cair no lago do notebook. Um modo de prévia desenha as duas telas em escala antes de aplicar qualquer coisa.',
        caption: 'Prévia em escala física: a TV em cima, o notebook embaixo e o vão entre eles em preto.',
      },
      keyboard: {
        title: 'Um teclado que dá para reaprender',
        text: 'Estou aprendendo Colemak-DH num teclado 60% ABNT2 sem reaprender todos os atalhos. Um layout XKB próprio deixa o Ctrl nas letras impressas, e as teclas no estilo vim do Neovim, do gerenciador de arquivos e do player de música ficam nas mesmas teclas físicas de antes, tudo a partir de uma tabela só. O mapa no terminal é desenhado a partir do layout ativo.',
      },
      phone: {
        title: 'O celular como controle',
        text: 'Um servidorzinho em Python, acessível só pela minha rede privada do Tailscale, transforma qualquer Android da minha conta num controle: mídia, som e brilho por tela, touchpad e teclado virtuais, área de transferência nos dois sentidos, modo cinema, um timer que baixa o volume e desliga, e desktop remoto sob demanda. A segunda página é uma estação ao vivo: temperaturas, consumo, ventoinhas e notificações.',
      },
      gift: {
        title: 'Um protetor de tela feito de presente',
        text: 'Para a minha namorada: dois dragões voam entre a TV e o notebook em oito cenas, e uma cena especial aparece no nosso mesversário. A batida das asas vem de um modelo 3D com esqueleto, renderizado no Blender em sequências de sprites e desenhado com Cairo em cerca de 10 ms por quadro, com taxa de quadros adaptativa.',
      },
    },
    shots: {
      home: {
        title: 'O workspace home',
        text: 'Uma tecla abre monitor do sistema, WhatsApp, música e visualizador de áudio por cima de qualquer workspace. Cada app tem seu canto, então um app fechado volta para o mesmo lugar.',
      },
    },
    keyboardShots: [
      {
        title: 'Cola de atalhos',
        text: 'Gerada ao vivo a partir dos atalhos do próprio compositor, cada um com sua descrição, então nunca fica desatualizada.',
      },
      {
        title: 'Key Viewer',
        text: 'Uma sobreposição para gravações de tela. Ela mostra só atalhos, nunca o que é digitado, então uma senha digitada durante a gravação não aparece no vídeo.',
      },
    ],
    phoneShots: ['Controle', 'Estação'],
    partsTitle: 'Por dentro',
    parts: [
      {
        key: 'theming',
        title: 'Tema em apps que não têm tema',
        text: 'O cliente de WhatsApp para desktop não tem opção de tema e troca os nomes das classes CSS com frequência, então um gancho em Python entra no app ao abrir, injeta meu estilo e troca as cores pelo valor, e não pelo nome da classe. O Telegram ganha um arquivo de tema gerado a partir do tema noturno dele, que o app recarrega na hora. As cores do GTK, Qt e KDE são calculadas a partir da paleta do terminal, até o destaque do libadwaita mais próximo pelo matiz.',
      },
      {
        title: 'Brilho numa TV sem controle de brilho',
        text: 'A TV de 2011 não fala DDC, então o brilho dela é gama por software através de um relay do Wayland, enquanto o notebook usa a luz de fundo. As teclas de brilho e volume agem na tela focada, e o volume vai para o áudio HDMI da TV quando é nela que você está. Abaixo da luz mais fraca do notebook, as teclas continuam num escurecimento por software e, um passo depois, apagam a tela.',
      },
      {
        title: 'Apagar a tela sem digitar sem querer',
        text: 'Quando uma tela apaga, o teclado é capturado no nível do dispositivo de entrada, então a tecla que acorda a tela é engolida em vez de ser digitada na janela que estava em foco. Antes disso o script espera soltar as teclas pressionadas, senão o compositor veria um aperto sem soltura e repetiria a tecla para sempre.',
      },
      {
        title: 'Um controle que só confia nos meus celulares',
        text: 'O servidor escuta só no endereço do PC no Tailscale e aceita um aparelho só se o Tailscale disser que é um Android da minha própria conta. Ele também confere o cabeçalho Host contra DNS rebinding e exige um cabeçalho próprio em toda ação. O touchpad e o teclado são dispositivos de entrada virtuais, e o modo cinema guarda a iluminação do teclado e devolve depois.',
      },
      {
        title: 'O som vai para onde eu quero',
        text: 'Conectar um fone leva todos os apps para ele, e desconectar devolve cada app para a saída em que estava antes, a partir de um retrato do roteamento de cada um. O visualizador de áudio segue o app que está tocando de verdade, e não a saída padrão. O Não perturbe também silencia os sons próprios dos apps de conversa, que nunca passam pelo serviço de notificações.',
      },
      {
        key: 'fans',
        title: 'Ventoinhas e calor',
        text: 'A velocidade das ventoinhas é gravada direto na interface de hardware do notebook. No modo automático, um vigia sobe as ventoinhas para 35% ou 100% com calor contínuo e devolve o controle quando esfria. Se o PC está quente e não tem ninguém nele, o celular recebe um alerta com botões para agir. A janela das ventoinhas partiu do Dell G-Series Controller, de código aberto, criado por cemkaya-mpi: redesenhei a janela para funcionar inteira pelo teclado, já que o original só salvava o valor ao soltar o mouse, e depois passei a usar o driver do próprio kernel, então ela roda sem root.',
        link: { label: 'Dell G-Series Controller, de cemkaya-mpi', href: FAN_UPSTREAM },
      },
      {
        title: 'Consertando o que o upstream ainda não consertou',
        text: 'Os menus da bandeja abriam vazios no primeiro clique e o título da mídia travava: mantenho um build corrigido da barra, e toda atualização do sistema confere se ele continua lá e oferece recompilar quando o pacote da distro o substitui. Um travamento do compositor era duas threads lendo um tema de cursor pelo mesmo ponteiro global; corrigi com um patch no plugin de cursor, recompilado automaticamente a cada atualização do Hyprland. O compartilhamento de tela do WhatsApp falhava por dois motivos diferentes; achei os dois e relatei ao projeto do app junto com a correção.',
      },
      {
        title: 'Duas GPUs, cada app na certa',
        text: 'O notebook tem uma GPU Intel para a própria tela e uma NVIDIA ligada à TV. Apps que renderizavam na errada engasgavam ou travavam, então os que ficam na tela do notebook são presos à GPU Intel, e o gravador de tela codifica na GPU que controla o monitor gravado.',
      },
      {
        key: 'night',
        title: 'Feito para a noite',
        text: 'O modo Cave esquenta a cor das telas, aumenta o texto dos terminais e dos apps e o cursor, e deixa o teclado vermelho-escuro. Na hora de dormir, um relógio grande abre sozinho na TV quando o PC fica parado tarde da noite, ou antes, se a câmera do quarto vê a luz apagar. Às 5h30 ele clareia para eu conseguir ler de manhã.',
      },
      {
        title: 'Reconstruído do zero com um comando',
        text: 'Um script de backup guarda configurações, pacotes, serviços e os arquivos de sistema que eu mexi num repositório; o instalador reconstrói a máquina em fases, com simulação, e copia antes tudo o que vai substituir para um backup com data. Os pacotes corrigidos são recompilados numa instalação nova.',
      },
    ],
    partShots: {
      zapzap: 'WhatsApp (ZapZap), aba Comunidades',
      ayugram: 'Telegram (AyuGram), configurações de chat',
      normal: 'Normal',
      cave: 'Modo Cave',
      caveNote: 'A mesma tela nos dois modos. A cor quente é aplicada no caminho até a tela, então os prints não a pegam; este foi recolorido com a mesma matriz de cor que o compositor usa a 2700 K.',
    },
  },
};

const related: RelatedProject[] = [
  { title: { en: 'Room Camera', pt: 'Câmera do quarto' }, text: { en: 'the camera the night clock listens to', pt: 'a câmera que o relógio da noite escuta' }, href: '/camera' },
  { title: 'TVBox Lab', text: { en: 'the home server that wakes this PC over Wi-Fi', pt: 'o servidor de casa que acorda este PC pelo Wi-Fi' }, href: '/tvbox-lab' },
  { title: 'OpenAurum', text: { en: 'the app behind the keyboard LEDs', pt: 'o app por trás dos LEDs do teclado' }, href: 'https://github.com/its-danilo/openaurum' },
];

const themingShots = [
  { image: '/desktop/zapzap.webp', w: 1284, h: 804, caption: 'zapzap' },
  { image: '/desktop/ayugram.webp', w: 392, h: 850, caption: 'ayugram' },
] as const;

const caveShots = [
  { image: '/desktop/cave-normal.webp', caption: 'normal' },
  { image: '/desktop/cave.webp', caption: 'cave' },
] as const;

const keyboardShots: Omit<Shot, 'title' | 'text'>[] = [
  { image: '/desktop/keybinds.webp', w: 800, h: 600 },
  { image: '/desktop/keyviz.webp', w: 500, h: 300 },
];

const phoneShots = [
  { image: '/desktop/remote.webp', w: 824, h: 1690 },
  { image: '/desktop/station.webp', w: 824, h: 1690 },
];

function PartText({ part }: { part: Part }) {
  return (
    <>
      <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-3">{part.title}</h3>
      <p className="text-foreground/60 leading-relaxed">{part.text}</p>
      {part.link && (
        <a
          href={part.link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-block text-sm font-medium text-terra hover:text-terra-2 transition-colors"
        >
          {part.link.label} ↗
        </a>
      )}
    </>
  );
}

function Figure({ image, w, h, alt, eager }: { image: string; w: number; h: number; alt: string; eager?: boolean }) {
  return (
    <div className="premium-card border border-line/[0.1] shadow-xl shadow-scrim/10">
      <img
        src={image}
        alt={alt}
        width={w}
        height={h}
        loading={eager ? undefined : 'lazy'}
        className="w-full h-auto block"
      />
    </div>
  );
}

export default function DesktopContent() {
  const { lang } = useLanguage();
  const t = copy[lang];
  const s = t.sections;

  return (
    <main className="relative min-h-screen bg-paper overflow-hidden">
      <div className="absolute inset-0 dot-pattern pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 pt-16 pb-24">
        <CaseNav />

        <header className="mt-10 mb-16">
          <span className="text-sm font-medium text-terra mb-4 block">{t.category}</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">{t.title}</h1>
          <p className="max-w-3xl text-lg text-foreground/60 leading-relaxed">{t.intro}</p>

          <figure className="mt-10">
            <div className="premium-card border border-line/[0.1] shadow-2xl shadow-scrim/20 overflow-hidden">
              <video
                src="/desktop/themes.mp4"
                poster="/desktop/themes-poster.webp"
                width={1440}
                height={810}
                autoPlay
                muted
                loop
                playsInline
                controls
                preload="metadata"
                className="w-full h-auto block"
              />
            </div>
            <figcaption className="mt-3 text-sm text-foreground/50">{t.videoCaption}</figcaption>
          </figure>

          <div className="mt-8 flex flex-wrap items-center gap-2 text-sm text-foreground/60">
            {t.flow.map((step, i) => (
              <span key={step} className="inline-flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-line/[0.06] border border-line/[0.1] text-foreground/70">
                  {step}
                </span>
                {i < t.flow.length - 1 && <span className="text-terra">·</span>}
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

        <section className="mb-16 max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">{t.baseTitle}</h2>
          <p className="text-lg text-foreground/70 leading-relaxed">{t.base}</p>
          <a
            href={UPSTREAM}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block text-sm font-medium text-terra hover:text-terra-2 transition-colors"
          >
            {t.baseLink} ↗
          </a>
        </section>

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
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">{s.theme.title}</h2>
          <p className="max-w-3xl text-foreground/60 leading-relaxed mb-8">{s.theme.text}</p>
          <Figure image="/desktop/themes-grid.webp" w={1920} h={1080} alt={s.theme.title} />
          <div className="mt-10 grid grid-cols-1 md:grid-cols-5 gap-6 items-start">
            <div className="md:col-span-3">
              <Figure image="/desktop/home.webp" w={1920} h={1080} alt={t.shots.home.title} />
            </div>
            <div className="md:col-span-2">
              <h3 className="text-lg font-semibold text-foreground mb-1">{t.shots.home.title}</h3>
              <p className="text-sm text-foreground/60 leading-relaxed">{t.shots.home.text}</p>
            </div>
          </div>
        </section>

        <section className="mb-20 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <figure>
            <Figure image="/desktop/span.webp" w={1044} h={1049} alt={s.span.title} />
            <figcaption className="mt-3 text-sm text-foreground/50">{s.span.caption}</figcaption>
          </figure>
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">{s.span.title}</h2>
            <p className="text-foreground/60 leading-relaxed">{s.span.text}</p>
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">{s.keyboard.title}</h2>
          <p className="max-w-3xl text-foreground/60 leading-relaxed mb-8">{s.keyboard.text}</p>
          <Figure image="/desktop/terminals.webp" w={1920} h={1080} alt={s.keyboard.title} />
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            {keyboardShots.map((shot, i) => (
              <section key={shot.image}>
                <div className="mb-4">
                  <Figure image={shot.image} w={shot.w} h={shot.h} alt={t.keyboardShots[i].title} />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-1">{t.keyboardShots[i].title}</h3>
                <p className="text-sm text-foreground/60 leading-relaxed">{t.keyboardShots[i].text}</p>
              </section>
            ))}
          </div>
        </section>

        <section className="mb-20 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">{s.phone.title}</h2>
            <p className="text-foreground/60 leading-relaxed">{s.phone.text}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {phoneShots.map((shot, i) => (
              <figure key={shot.image}>
                <Figure image={shot.image} w={shot.w} h={shot.h} alt={t.phoneShots[i]} />
                <figcaption className="mt-2 text-sm font-semibold text-foreground">{t.phoneShots[i]}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-8">{t.partsTitle}</h2>
        {t.parts.map((part) => {
          if (part.key === 'theming') {
            return (
              <section key={part.key} className="mb-16">
                <div className="max-w-3xl mb-8">
                  <PartText part={part} />
                </div>
                {/* flex-grow = aspect ratio, so both pictures end up the same height */}
                <div className="flex gap-4 sm:gap-6 items-start">
                  {themingShots.map((shot) => (
                    <figure key={shot.image} className="min-w-0" style={{ flexGrow: shot.w / shot.h, flexBasis: 0 }}>
                      <Figure image={shot.image} w={shot.w} h={shot.h} alt={t.partShots[shot.caption]} />
                      <figcaption className="mt-2 text-xs sm:text-sm text-foreground/50">{t.partShots[shot.caption]}</figcaption>
                    </figure>
                  ))}
                </div>
              </section>
            );
          }
          if (part.key === 'fans') {
            return (
              <section key={part.key} className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <PartText part={part} />
                </div>
                <Figure image="/desktop/fan.webp" w={1400} h={560} alt={part.title} />
              </section>
            );
          }
          if (part.key === 'night') {
            return (
              <section key={part.key} className="mb-16">
                <div className="max-w-3xl mb-8">
                  <PartText part={part} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {caveShots.map((shot) => (
                    <figure key={shot.image}>
                      <Figure image={shot.image} w={1200} h={675} alt={t.partShots[shot.caption]} />
                      <figcaption className="mt-2 text-sm font-semibold text-foreground">{t.partShots[shot.caption]}</figcaption>
                    </figure>
                  ))}
                </div>
                <p className="mt-4 max-w-3xl text-sm text-foreground/50">{t.partShots.caveNote}</p>
              </section>
            );
          }
          return null;
        })}
        <div className="mb-20 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-12">
          {t.parts
            .filter((part) => !part.key)
            .map((part) => (
              <section key={part.title}>
                <PartText part={part} />
              </section>
            ))}
        </div>

        <section className="mb-20 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <Figure image="/desktop/dragons.webp" w={960} h={965} alt={s.gift.title} />
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">{s.gift.title}</h2>
            <p className="text-foreground/60 leading-relaxed">{s.gift.text}</p>
          </div>
        </section>

        <RelatedProjects items={related} />
      </div>

      <Footer />
    </main>
  );
}
