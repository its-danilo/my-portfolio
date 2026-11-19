"use client";

import CaseNav from '@/components/case-nav';
import Footer from '@/components/footer';
import { useLanguage, type Localized } from '@/lib/i18n';

const stack = ['Python', 'go2rtc', 'ONVIF', 'Tailscale', 'WebGL', 'OpenCV', 'Piper TTS', 'Vosk', 'faster-whisper', 'YAMNet', 'GTK 4', 'Kotlin', 'Jetpack Compose', 'ffmpeg', 'systemd'];

const en = {
  category: 'Smart home / Computer vision',
  intro:
    "A cheap Wi-Fi pan-and-tilt camera, mounted on the ceiling of a shared bedroom, turned into a private smart room. Everything the official app does still works, but through my own service, and on top of it I built more than a dozen features the app doesn't have, all running at home with no cloud.",
  originTitle: 'How it started',
  origin:
    "My mom bought this camera to put outside the house, and when it was time to install it she found out it wasn't allowed. It sat in a drawer for a while, until I picked it up to see what a cheap camera could really do. Everything on this page grew out of that.",
  flow: ['Camera', 'TV box service', 'go2rtc', 'Web page + desktop app', 'PC for the heavy work', 'Phone alerts'],
  note: 'Every image of the room on this page is pixelated on purpose: it is a real bedroom where people sleep. The code lives in private repositories, and addresses, names and credentials are left out.',
  facts: [
    { value: '0', label: 'calls from my service to the vendor cloud, and no ports open on the router' },
    { value: '15+', label: 'features the official app does not have' },
    { value: '160 MB', label: 'memory cap for the service on a 1 GB TV box' },
  ],
  videoCaption: 'The guided tour of the desktop app, all 16 steps (the app is in Portuguese; data is made up and the video is pixelated).',
  screensTitle: 'The web page',
  appTitle: 'The desktop app',
  appText:
    'A native GTK 4 app replaced the web page on the PC. It has a guided tour for first-time users, and it shows the same reports, reminders, recordings and settings. All data in these screenshots is made up and the video is a pixelated stand-in.',
  extrasTitle: 'What the official app can’t do, and how I built it',
  parts: [
    {
      title: 'One session, held by a TV box',
      text: 'The camera firmware accepts a single login and locks itself for 30 minutes after a few failed ones, so nothing talks to it directly except one Python service on my home server. It holds the only session, re-streams video and audio through go2rtc for any number of viewers, and finds the camera by its MAC address whenever the router hands it a new IP.',
    },
    {
      title: 'It knows when I am home',
      text: 'Presence comes from three signals: my phone on the home Wi-Fi, a geofence reported by OwnTracks over Tailscale, and whether my PC is in use. Away, it turns on person detection and recording; home, it turns them off. A rolling buffer in RAM keeps the last seconds of video, so each recording starts at least ten seconds before the movement that triggered it. Privacy mode tilts the lens away and later returns it to the exact spot it was looking at.',
    },
    {
      title: 'The room as a sphere',
      text: 'The camera sweeps the room in 32 photos and a WebGL page stitches them into a sphere you can drag around. The PC calibrates the lens with SIFT features and a robust per-photo fit, which took the median seam error from 12 px to 1.9 px. Double-tap any spot and the camera turns to look at it.',
    },
    {
      title: 'Spoken reminders',
      text: 'Reminders for water, meals and bedtime are spoken through the camera speaker, with an optional heads-up minutes before. The voice is Piper, an offline text-to-speech model running on the PC, filtered for the 8 kHz speaker. The bedtime reminder speaks very quietly, so it never wakes anyone else in the room.',
    },
    {
      title: 'An offline voice assistant',
      text: 'The camera microphone streams to the PC, where Vosk listens for the wake word and short commands, and faster-whisper handles full sentences. Asking for a reminder creates it right away, answers out loud and sends a phone notification with an Undo button. As soon as it understands a request, a notification shows what it heard, so I never stand there wondering whether it caught me. Nothing is sent to a cloud speech service.',
    },
    {
      title: 'Listening for the house',
      text: 'YAMNet, a small audio classifier, runs on the camera audio and sends a phone alert when it starts raining. A watchdog counts audio packets and warns when the firmware freezes the microphone, a bug only a camera reboot fixes.',
    },
    {
      title: 'Reports that push for better sleep',
      text: 'The service logs movement, light and comings and goings, and a daily job turns that into reports. The morning summary is built around one goal, being in bed by a set time: it shows whether last night made it, the current streak and record, and 7- and 30-night averages. Waking up for ten minutes or more is subtracted from the sleep time, and a night recording is scored with OpenCV and YAMNet for movement and sounds. A timelapse and a 30-second summary of the busiest minutes record the day.',
    },
    {
      title: 'An Android app',
      text: 'A Kotlin and Jetpack Compose app for when I am out: live view, talk, privacy, reminders, reports and a morning card with the sleep goal. A hold-to-talk button, also a home-screen shortcut, sends audio from the phone microphone to the voice assistant, much clearer than the 8 kHz camera mic, and the phone reads the answer aloud. Recordings stay on the PC and stream to the phone over Tailscale with range requests, so a long video can be skipped through without downloading it.',
    },
    {
      title: 'Lights that mean something',
      text: 'The camera status LED turns on only while someone is watching live or recording, so the people in the room can tell, and stays off at night. A key on my keyboard mirrors the same state through OpenAurum, my RGB keyboard app.',
    },
    {
      title: 'Intrusion watch',
      text: 'The service keeps tripwires that would catch someone else using the camera: the lens moving without a command from it, the vendor logo coming back on screen, a rejected password. Any of them sends an alert with a one-tap privacy button.',
    },
    {
      title: 'A desktop app and a backup plan',
      text: 'A native GTK 4 app on the PC plays video with sound without WebRTC, by pulling an MP4 stream with FLAC audio through ffmpeg. If the TV box goes down, the PC takes over as a fallback service and keeps the camera watched.',
    },
  ],
};

const copy: Localized<typeof en> = {
  en,
  pt: {
    category: 'Casa inteligente / Visão computacional',
    intro:
      'Uma câmera Wi-Fi barata, com giro e inclinação, presa no teto de um quarto compartilhado e transformada num quarto inteligente e privado. Tudo o que o app oficial faz continua funcionando, mas pelo meu próprio serviço, e por cima dele criei mais de uma dúzia de funções que o app não tem, todas rodando em casa, sem nuvem.',
    originTitle: 'Como começou',
    origin:
      'Minha mãe comprou essa câmera para colocar do lado de fora de casa e, na hora de instalar, descobriu que não era permitido. Ela ficou guardada por um tempo, até eu pegar para explorar o que uma câmera barata conseguia fazer de verdade. Tudo nesta página nasceu daí.',
    flow: ['Câmera', 'Serviço na TV box', 'go2rtc', 'Página web + app de desktop', 'PC para o trabalho pesado', 'Alertas no celular'],
    note: 'Toda imagem do quarto nesta página está pixelada de propósito: é um quarto de verdade, onde pessoas dormem. O código fica em repositórios privados, e endereços, nomes e credenciais ficaram de fora.',
    facts: [
      { value: '0', label: 'chamadas do meu serviço à nuvem do fabricante, e nenhuma porta aberta no roteador' },
      { value: '15+', label: 'funções que o app oficial não tem' },
      { value: '160 MB', label: 'de limite de memória para o serviço numa TV box de 1 GB' },
    ],
    videoCaption: 'O tour guiado do app de desktop, os 16 passos (dados inventados e vídeo pixelado).',
    screensTitle: 'A página web',
    appTitle: 'O app de desktop',
    appText:
      'Um app nativo em GTK 4 substituiu a página web no PC. Ele tem um tour guiado para quem abre pela primeira vez e mostra os mesmos relatórios, lembretes, gravações e ajustes. Todos os dados destes prints são inventados e o vídeo é uma imagem pixelada no lugar da câmera.',
    extrasTitle: 'O que o app oficial não faz, e como eu fiz',
    parts: [
      {
        title: 'Uma sessão só, guardada por uma TV box',
        text: 'O firmware da câmera aceita um único login e se bloqueia por 30 minutos depois de algumas tentativas erradas, então nada fala com ela diretamente além de um serviço em Python no meu servidor de casa. Ele guarda a única sessão, retransmite vídeo e áudio pelo go2rtc para quantos espectadores houver e acha a câmera pelo endereço MAC sempre que o roteador dá um IP novo a ela.',
      },
      {
        title: 'Ela sabe quando estou em casa',
        text: 'A presença vem de três sinais: o celular no Wi-Fi de casa, uma cerca geográfica informada pelo OwnTracks via Tailscale e se o PC está em uso. Fora de casa, ela liga a detecção de pessoas e a gravação; em casa, desliga. Um buffer na RAM guarda os últimos segundos de vídeo, então cada gravação começa pelo menos dez segundos antes do movimento que a disparou. O modo privacidade vira a lente para longe e depois a devolve exatamente para onde ela estava olhando.',
      },
      {
        title: 'O quarto numa esfera',
        text: 'A câmera varre o quarto em 32 fotos e uma página em WebGL costura tudo numa esfera que dá para arrastar. O PC calibra a lente com pontos SIFT e um ajuste robusto por foto, que levou o erro mediano das emendas de 12 px para 1,9 px. Um toque duplo em qualquer ponto e a câmera gira para olhar lá.',
      },
      {
        title: 'Lembretes falados',
        text: 'Lembretes de água, refeições e hora de dormir são falados pelo alto-falante da câmera, com um aviso opcional minutos antes. A voz é o Piper, um modelo de voz offline rodando no PC, filtrado para o alto-falante de 8 kHz. O lembrete de dormir fala bem baixinho, para nunca acordar quem já está dormindo no quarto.',
      },
      {
        title: 'Um assistente de voz offline',
        text: 'O microfone da câmera vai para o PC, onde o Vosk escuta a palavra de ativação e os comandos curtos, e o faster-whisper cuida das frases inteiras. Pedir um lembrete cria ele na hora, responde em voz alta e manda uma notificação no celular com um botão Desfazer. Assim que entende um pedido, uma notificação mostra o que ele ouviu, então nunca fico parado sem saber se ele me escutou. Nada vai para um serviço de voz na nuvem.',
      },
      {
        title: 'Ouvindo a casa',
        text: 'O YAMNet, um classificador de áudio pequeno, roda sobre o som da câmera e manda um alerta no celular quando começa a chover. Um vigia conta os pacotes de áudio e avisa quando o firmware trava o microfone, um bug que só reiniciar a câmera resolve.',
      },
      {
        title: 'Relatórios que puxam por um sono melhor',
        text: 'O serviço registra movimento, luz e idas e vindas, e uma tarefa diária transforma isso em relatórios. O resumo da manhã gira em torno de uma meta, estar deitado até um horário: mostra se a última noite cumpriu, a sequência atual e o recorde, e as médias de 7 e 30 noites. Levantar por dez minutos ou mais sai do tempo de sono, e uma gravação da noite é analisada com OpenCV e YAMNet para movimentos e sons. Um timelapse e um resumo de 30 segundos com os minutos mais agitados registram o dia.',
      },
      {
        title: 'Um app Android',
        text: 'Um app em Kotlin e Jetpack Compose para quando estou fora: ao vivo, falar, privacidade, lembretes, relatórios e um card de bom dia com a meta de sono. Um botão de segurar e falar, também como atalho na tela inicial, manda o microfone do celular para o assistente de voz, bem mais claro que o microfone de 8 kHz da câmera, e o celular lê a resposta em voz alta. As gravações ficam no PC e vão para o celular pelo Tailscale com requisições por faixa, então dá para pular um vídeo longo sem baixar tudo.',
      },
      {
        title: 'Luzes que querem dizer algo',
        text: 'O LED de status da câmera só acende enquanto alguém assiste ao vivo ou grava, para quem está no quarto saber, e fica apagado à noite. Uma tecla do meu teclado mostra o mesmo estado pelo OpenAurum, meu app de RGB para o teclado.',
      },
      {
        title: 'Vigia de intrusão',
        text: 'O serviço mantém armadilhas que pegariam outra pessoa usando a câmera: a lente se mexer sem comando dele, o logo do fabricante voltar à tela, uma senha recusada. Qualquer uma manda um alerta com um botão de privacidade a um toque.',
      },
      {
        title: 'Um app de desktop e um plano B',
        text: 'Um app nativo em GTK 4 no PC mostra vídeo com som sem WebRTC, puxando um stream MP4 com áudio FLAC pelo ffmpeg. Se a TV box cair, o PC assume como serviço reserva e a câmera continua vigiada.',
      },
    ],
  },
};

const screens: { image: string; title: Localized; text: Localized }[] = [
  {
    image: '/camera/vivo.webp',
    title: { en: 'Live view', pt: 'Ao vivo' },
    text: {
      en: 'The main page: drag the video to turn the camera, privacy, audio-only, talk, light, photo and recording. The eye badge counts who is watching right now.',
      pt: 'A página principal: arrastar o vídeo gira a câmera, privacidade, só áudio, falar, luz, foto e gravação. O selo do olho conta quem está assistindo agora.',
    },
  },
  {
    image: '/camera/esfera.webp',
    title: { en: 'The sphere', pt: 'A esfera' },
    text: {
      en: 'The room stitched from 32 photos. Drag to look around, or tilt the phone; double-tap a spot and the camera turns there.',
      pt: 'O quarto costurado a partir de 32 fotos. Arraste para olhar em volta, ou incline o celular; toque duas vezes num ponto e a câmera gira para lá.',
    },
  },
  {
    image: '/camera/lembretes.webp',
    title: { en: 'Reminders', pt: 'Lembretes' },
    text: {
      en: 'Daily, weekly, one-off or every N minutes, each with its own heads-up and volume. The next 48 hours are listed on top.',
      pt: 'Diários, por dia da semana, pontuais ou a cada N minutos, cada um com seu aviso antecipado e volume. As próximas 48 horas aparecem no topo.',
    },
  },
];

const appWide: { image: string; title: Localized; text: Localized; w: number; h: number }[] = [
  {
    image: '/camera/app-vivo.webp', w: 1280, h: 1038,
    title: { en: 'Live view', pt: 'Ao vivo' },
    text: {
      en: 'Video with sound through ffmpeg, the controls under it, saved viewpoints, and on the right who is home and how the camera is doing.',
      pt: 'Vídeo com som pelo ffmpeg, os controles embaixo, os pontos de visão salvos e, à direita, quem está em casa e como a câmera está.',
    },
  },
  {
    image: '/camera/app-tutorial.webp', w: 1280, h: 970,
    title: { en: 'Guided tour', pt: 'Tour guiado' },
    text: {
      en: 'Sixteen steps that dim the window and point at one control at a time, starting with how the project began.',
      pt: 'Dezesseis passos que escurecem a janela e apontam um controle por vez, começando pela história do projeto.',
    },
  },
];

const appPanels: { image: string; title: Localized }[] = [
  { image: '/camera/app-relatorios.webp', title: { en: 'Morning summary and sleep goal', pt: 'Bom dia e meta de sono' } },
  { image: '/camera/app-lembretes.webp', title: { en: 'Spoken reminders', pt: 'Lembretes falados' } },
  { image: '/camera/app-gravacoes.webp', title: { en: 'Recordings', pt: 'Gravações' } },
  { image: '/camera/app-ajustes.webp', title: { en: 'Camera settings', pt: 'Ajustes da câmera' } },
];

export default function CameraContent() {
  const { lang } = useLanguage();
  const t = copy[lang];

  return (
    <main className="relative min-h-screen bg-paper overflow-hidden">
      <div className="absolute inset-0 dot-pattern pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 pt-16 pb-24">
        <CaseNav />

        <header className="mt-10 mb-16">
          <span className="text-sm font-medium text-terra mb-4 block">{t.category}</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">{lang === 'pt' ? 'Câmera do quarto' : 'Room Camera'}</h1>
          <p className="max-w-3xl text-lg text-foreground/60 leading-relaxed">{t.intro}</p>

          <figure className="mt-10">
            <div className="premium-card border border-line/[0.1] shadow-2xl shadow-scrim/20 overflow-hidden">
              <video
                src="/camera/tutorial.mp4"
                poster="/camera/tutorial-poster.webp"
                width={1380}
                height={800}
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

        <section className="mb-16 max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">{t.originTitle}</h2>
          <p className="text-lg text-foreground/70 leading-relaxed">{t.origin}</p>
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

        <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-8">{t.screensTitle}</h2>
        <div className="mb-20 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {screens.map((screen) => (
            <section key={screen.image}>
              <div className="premium-card border border-line/[0.1] shadow-xl shadow-scrim/10 mb-4">
                <img
                  src={screen.image}
                  alt={screen.title[lang]}
                  width={561}
                  height={1227}
                  loading="lazy"
                  className="w-full h-auto block"
                />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-1">{screen.title[lang]}</h3>
              <p className="text-sm text-foreground/60 leading-relaxed">{screen.text[lang]}</p>
            </section>
          ))}
        </div>

        <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">{t.appTitle}</h2>
        <p className="max-w-3xl text-foreground/60 leading-relaxed mb-8">{t.appText}</p>
        <div className="mb-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {appWide.map((screen) => (
            <section key={screen.image}>
              <div className="premium-card border border-line/[0.1] shadow-xl shadow-scrim/10 mb-4">
                <img src={screen.image} alt={screen.title[lang]} width={screen.w} height={screen.h} loading="lazy" className="w-full h-auto block" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-1">{screen.title[lang]}</h3>
              <p className="text-sm text-foreground/60 leading-relaxed">{screen.text[lang]}</p>
            </section>
          ))}
        </div>
        <div className="mb-20 grid grid-cols-2 md:grid-cols-4 gap-4">
          {appPanels.map((screen) => (
            <section key={screen.image}>
              <div className="premium-card border border-line/[0.1] shadow-xl shadow-scrim/10 mb-3">
                <img src={screen.image} alt={screen.title[lang]} width={420} height={960} loading="lazy" className="w-full h-auto block" />
              </div>
              <h3 className="text-sm font-semibold text-foreground">{screen.title[lang]}</h3>
            </section>
          ))}
        </div>

        <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-8">{t.extrasTitle}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-12">
          {t.parts.map((part) => (
            <section key={part.title}>
              <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-3">{part.title}</h3>
              <p className="text-foreground/60 leading-relaxed">{part.text}</p>
            </section>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}
