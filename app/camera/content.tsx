"use client";

import CaseNav from '@/components/case-nav';
import Footer from '@/components/footer';
import { useLanguage, type Localized } from '@/lib/i18n';

const stack = ['Python', 'go2rtc', 'ONVIF', 'Tailscale', 'WebGL', 'OpenCV', 'Piper TTS', 'Vosk', 'faster-whisper', 'YAMNet', 'GTK 4', 'ffmpeg', 'systemd'];

const en = {
  category: 'Smart home / Computer vision',
  intro:
    "A cheap Wi-Fi pan-and-tilt camera, mounted on the ceiling of a shared bedroom, turned into a private smart room. Everything the official app does still works, but through my own service, and on top of it I built more than a dozen features the app doesn't have, all running at home with no cloud.",
  flow: ['Camera', 'TV box service', 'go2rtc', 'Web page + desktop app', 'PC for the heavy work', 'Phone alerts'],
  note: 'Every image of the room on this page is pixelated on purpose: it is a real bedroom where people sleep. The code lives in private repositories, and addresses, names and credentials are left out.',
  facts: [
    { value: '0', label: 'calls from my service to the vendor cloud, and no ports open on the router' },
    { value: '15+', label: 'features the official app does not have' },
    { value: '160 MB', label: 'memory cap for the service on a 1 GB TV box' },
  ],
  screensTitle: 'What it looks like',
  extrasTitle: 'What the official app can’t do, and how I built it',
  parts: [
    {
      title: 'One session, held by a TV box',
      text: 'The camera firmware accepts a single login and locks itself for 30 minutes after a few failed ones, so nothing talks to it directly except one Python service on my home server. It holds the only session, re-streams video and audio through go2rtc for any number of viewers, and finds the camera by its MAC address whenever the router hands it a new IP.',
    },
    {
      title: 'It knows when I am home',
      text: 'Presence comes from three signals: my phone on the home Wi-Fi, a geofence reported by OwnTracks over Tailscale, and whether my PC is in use. Away, it turns on person detection and recording; home, it turns them off. Privacy mode tilts the lens away and later returns it to the exact spot it was looking at.',
    },
    {
      title: 'The room as a sphere',
      text: 'The camera sweeps the room in 32 photos and a WebGL page stitches them into a sphere you can drag around. The PC calibrates the lens with SIFT features and a robust per-photo fit, which took the median seam error from 12 px to 1.9 px. Double-tap any spot and the camera turns to look at it.',
    },
    {
      title: 'Spoken reminders',
      text: 'Reminders for water, meals and bedtime are spoken through the camera speaker, with an optional heads-up minutes before. The voice is Piper, an offline text-to-speech model running on the PC, filtered for the 8 kHz speaker. The alarm clock tones are synthesized with ffmpeg, from a bell arpeggio to birdsong, rising slowly in volume.',
    },
    {
      title: 'An offline voice assistant',
      text: 'The camera microphone streams to the PC, where Vosk listens for the wake word and short commands, and faster-whisper handles full sentences. Asking for a reminder creates it right away, answers out loud and sends a phone notification with an Undo button. Nothing is sent to a cloud speech service.',
    },
    {
      title: 'Listening for the house',
      text: 'YAMNet, a small audio classifier, runs on the camera audio and sends a phone alert when it starts raining. A watchdog counts audio packets and warns when the firmware freezes the microphone, a bug only a camera reboot fixes.',
    },
    {
      title: 'Daily reports',
      text: 'The service logs movement, light and comings and goings. A daily job turns that into reports: sleep window, movement per hour at night, nights with the light on, time away from home. A timelapse records the day, a photo of the empty room is picked each afternoon, and OpenCV scores the busiest minutes into a 30-second summary.',
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
    flow: ['Câmera', 'Serviço na TV box', 'go2rtc', 'Página web + app de desktop', 'PC para o trabalho pesado', 'Alertas no celular'],
    note: 'Toda imagem do quarto nesta página está pixelada de propósito: é um quarto de verdade, onde pessoas dormem. O código fica em repositórios privados, e endereços, nomes e credenciais ficaram de fora.',
    facts: [
      { value: '0', label: 'chamadas do meu serviço à nuvem do fabricante, e nenhuma porta aberta no roteador' },
      { value: '15+', label: 'funções que o app oficial não tem' },
      { value: '160 MB', label: 'de limite de memória para o serviço numa TV box de 1 GB' },
    ],
    screensTitle: 'Como ficou',
    extrasTitle: 'O que o app oficial não faz, e como eu fiz',
    parts: [
      {
        title: 'Uma sessão só, guardada por uma TV box',
        text: 'O firmware da câmera aceita um único login e se bloqueia por 30 minutos depois de algumas tentativas erradas, então nada fala com ela diretamente além de um serviço em Python no meu servidor de casa. Ele guarda a única sessão, retransmite vídeo e áudio pelo go2rtc para quantos espectadores houver e acha a câmera pelo endereço MAC sempre que o roteador dá um IP novo a ela.',
      },
      {
        title: 'Ela sabe quando estou em casa',
        text: 'A presença vem de três sinais: o celular no Wi-Fi de casa, uma cerca geográfica informada pelo OwnTracks via Tailscale e se o PC está em uso. Fora de casa, ela liga a detecção de pessoas e a gravação; em casa, desliga. O modo privacidade vira a lente para longe e depois a devolve exatamente para onde ela estava olhando.',
      },
      {
        title: 'O quarto numa esfera',
        text: 'A câmera varre o quarto em 32 fotos e uma página em WebGL costura tudo numa esfera que dá para arrastar. O PC calibra a lente com pontos SIFT e um ajuste robusto por foto, que levou o erro mediano das emendas de 12 px para 1,9 px. Um toque duplo em qualquer ponto e a câmera gira para olhar lá.',
      },
      {
        title: 'Lembretes falados',
        text: 'Lembretes de água, refeições e hora de dormir são falados pelo alto-falante da câmera, com um aviso opcional minutos antes. A voz é o Piper, um modelo de voz offline rodando no PC, filtrado para o alto-falante de 8 kHz. Os toques do despertador são sintetizados com o ffmpeg, de um arpejo de sino a um canto de passarinho, subindo o volume aos poucos.',
      },
      {
        title: 'Um assistente de voz offline',
        text: 'O microfone da câmera vai para o PC, onde o Vosk escuta a palavra de ativação e os comandos curtos, e o faster-whisper cuida das frases inteiras. Pedir um lembrete cria ele na hora, responde em voz alta e manda uma notificação no celular com um botão Desfazer. Nada vai para um serviço de voz na nuvem.',
      },
      {
        title: 'Ouvindo a casa',
        text: 'O YAMNet, um classificador de áudio pequeno, roda sobre o som da câmera e manda um alerta no celular quando começa a chover. Um vigia conta os pacotes de áudio e avisa quando o firmware trava o microfone, um bug que só reiniciar a câmera resolve.',
      },
      {
        title: 'Relatórios diários',
        text: 'O serviço registra movimento, luz e idas e vindas. Uma tarefa diária transforma isso em relatórios: janela de sono, movimento por hora à noite, noites com a luz acesa, tempo fora de casa. Um timelapse registra o dia, uma foto do quarto vazio é escolhida toda tarde e o OpenCV pontua os minutos mais agitados num resumo de 30 segundos.',
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
