"use client";

import CaseNav from '@/components/case-nav';
import Footer from '@/components/footer';
import RelatedProjects, { type RelatedProject } from '@/components/related-projects';
import { useLanguage, type Localized } from '@/lib/i18n';

const stack = ['Godot 4', 'GDScript', 'Blender (Python)', 'glTF', 'three.js', 'Python', 'numpy', 'ffmpeg', 'Hyprland', 'Bash'];

const related: RelatedProject[] = [
  { title: { en: 'Room Camera', pt: 'Câmera do quarto' }, text: { en: 'the sleep reports, the live view and the light the game mirrors', pt: 'os relatórios de sono, o ao vivo e a luz que o jogo espelha' }, href: '/camera' },
  { title: { en: 'My Desktop', pt: 'Meu Desktop' }, text: { en: 'the PC sensors and the phone remote the game uses to drive the TV', pt: 'os sensores do PC e o controle remoto que o jogo usa para comandar a TV' }, href: '/desktop' },
  { title: 'OpenAurum', text: { en: 'my keyboard app: the game shows the real color of the keys', pt: 'meu app do teclado: o jogo mostra a cor real das teclas' }, href: 'https://github.com/its-danilo/openaurum' },
];

const en = {
  category: 'Game / Digital twin / Smart home',
  title: '3D Room',
  intro:
    "A playable digital twin of my bedroom. I measured every wall and piece of furniture with a tape measure, a Python script turns those numbers into a 3D model, and a game built in Godot lets me walk through it in first person. The room in the game mirrors the real one: the TV and laptop show what is on my real screens, the keyboard has its real colors, daylight follows the clock, and pointing at an object shows live data or lets me control it.",
  videoCaption:
    'The game driving itself through a scripted tour, recorded frame by frame by Godot. The game is in Portuguese; all data is made up and the screens show a wallpaper.',
  flow: ['Tape measure', 'ficha.json', 'Blender (Python)', 'glTF', 'Godot game + web viewer', 'Local bridge', 'PC · keyboard · camera · TV'],
  note: 'There are no photos of the room on this page: everything you see is generated from measurements. The code lives in a private repository.',
  originTitle: 'Why a game',
  origin:
    "I already had a camera, a PC, a keyboard and a TV in my room that I could talk to from code, each one with its own app. I wanted one fun place to see and touch all of them, and the most natural interface for a room is the room itself. So I rebuilt it as a game: walk to the laptop to see its temperature, look at the TV to switch its sound, look at the bed to see how I slept.",
  facts: [
    { value: '4 days', label: 'from the first tape-measure number to a playable game with live data (60 commits)' },
    { value: '~80 FPS', label: 'full screen at 1080p with real-time global illumination, on a laptop RTX 3050' },
    { value: '197', label: 'automated checks run before any change reaches me, with the game driving itself' },
  ],
  screensTitle: 'Inside the game',
  visionTitle: 'This is 1% of what it could be',
  vision: [
    "I built this as a fun way to interact with my own room, but the idea scales to a whole house. With more connected devices, the game would stop being a model and become a live mirror of the home: I could watch the robot vacuum move through the rooms in real time, turn on the air conditioner, check whether the electric stove was left on, switch plugs, lights and TVs, all from my desk, by walking to them in the game and clicking.",
    'Anything that allows remote access could be seen and controlled from inside it. Less a game, more a dynamic, interactive and fun control center for my own home.',
    'The foundations are already here: the bridge adds devices one at a time through a closed list of approved actions, the 3D model is generated from measurements, so a new room is a new set of numbers, and the next device is already chosen, an infrared hub so the game can control the air conditioner.',
  ],
  partsTitle: 'How it works',
  parts: [
    {
      title: 'Measured, not drawn',
      text: 'Every size lives in one JSON file, filled in with a tape measure, and nothing is ever typed into the code. A headless Blender script builds the model from it, with procedural textures made in numpy, so there are no downloaded assets. To check it, I rendered the game from the same spot and lens as a phone photo of the room: that comparison found a desk top that was 75 cm, not 65, the reason the first version made me feel like a giant.',
    },
    {
      title: 'A real game engine',
      text: 'The game runs in Godot 4 with real-time light: sun, ceiling lamp, global illumination (SDFGI), ambient occlusion and glow, at about 6.5 ms per frame. I walk, run, jump, crouch and lie down on the beds. Small stutters were measured and removed: highlighting an object used to compile a shader on the spot (a 179 ms freeze), so the effect is now built in from the start and only changes color.',
    },
    {
      title: 'A mirror of the real room',
      text: 'The TV and laptop in the game show my real screens about twice a second, the keyboard shows its real RGB color, and the ceiling lamp follows the real light the room camera sees. Daylight follows the PC clock: in the morning, with the lamp off, the window lights the whole room, the blind dims it as it closes, and at night the sky goes dark.',
    },
    {
      title: 'Live data on every object',
      text: "Pointing at an object opens a card with its real measurements and live data: the laptop's temperatures, fans, battery and disk; the keyboard's lighting mode; and, on each bed, last night's sleep from the camera reports. The bed also opens a sleep panel with nightly, weekly and monthly stats against a bedtime goal.",
    },
    {
      title: 'Actions with guardrails',
      text: "A small Python bridge on the PC feeds the game. It only listens on localhost, only reads by default, and can only run actions from a closed list I approved one by one: cinema mode, TV sound and TV brightness, sent through my desktop's phone remote. Requests need a custom header and there is no CORS. The live camera view runs ffmpeg only while the game asks for frames, and it counts as someone watching, so the people in the room can tell.",
    },
    {
      title: 'Things that open',
      text: 'The door, the wardrobe doors and the drawers open; the desk slides 27 cm with the laptop riding along; the blind comes down and turns its slats; and the bottom bed pulls out from under the bunk. Collision follows the same measurements, so I can climb onto the pulled-out bed but not walk through furniture.',
    },
    {
      title: 'A version for the browser',
      text: 'A three.js viewer shows the same model on any phone. Integrated GPUs could not afford real-time light (15 FPS on my laptop’s Intel GPU), so Blender bakes the lighting into textures: 38 ms per frame became 8 ms. A test keeps the model under 3 MB, 150k triangles and 250 draw calls.',
    },
    {
      title: 'Tested like a product',
      text: 'One command regenerates the model, renders reference images and runs every test: the browser viewer in headless Firefox, the data bridge against fake sources, and the game itself, which drives a hidden copy of itself through walking, collisions, cards, actions and frame-time limits. The tour video above is recorded by the same harness, with fake data.',
    },
  ],
  labTitle: 'An architecture lab',
  labText:
    "The same pipeline can rearrange the room. I described furniture options and layouts on top of the real measurements; the lab draws 2D floor plans with free floor area, storage and walkways (green = where you can walk), and builds each layout in 3D so I can walk through it in the game before buying anything. The minimalist layout I chose frees more floor than today, 5.08 m² instead of 4.74.",
  labImages: [
    { image: '/room-3d/lab-plantas.webp', w: 2000, h: 1266, caption: 'Today vs. three proposals, with the checks for each one (labels in Portuguese).' },
    { image: '/room-3d/lab-c2.webp', w: 1280, h: 800, caption: 'The chosen layout, walkable in the game.' },
  ],
};

const copy: Localized<typeof en> = {
  en,
  pt: {
    category: 'Jogo / Gêmeo digital / Casa inteligente',
    title: 'Quarto 3D',
    intro:
      'Um gêmeo digital jogável do meu quarto. Medi cada parede e cada móvel com uma trena, um script em Python transforma esses números num modelo 3D e um jogo feito em Godot me deixa andar por ele em primeira pessoa. O quarto do jogo espelha o real: a TV e o notebook mostram o que está nas minhas telas de verdade, o teclado tem as cores reais, a luz do dia segue o relógio e mirar num objeto mostra dados ao vivo ou deixa controlá-lo.',
    videoCaption:
      'O jogo se dirigindo sozinho num tour roteirizado, gravado quadro a quadro pelo próprio Godot. Todos os dados são inventados e as telas mostram um papel de parede.',
    flow: ['Trena', 'ficha.json', 'Blender (Python)', 'glTF', 'Jogo Godot + visualizador web', 'Ponte local', 'PC · teclado · câmera · TV'],
    note: 'Não há fotos do quarto nesta página: tudo o que aparece é gerado a partir das medidas. O código fica num repositório privado.',
    originTitle: 'Por que um jogo',
    origin:
      'Eu já tinha no quarto uma câmera, um PC, um teclado e uma TV com que conseguia conversar por código, cada um com o seu app. Queria um lugar divertido para ver e mexer em todos eles, e a interface mais natural para um quarto é o próprio quarto. Então recriei ele como um jogo: ando até o notebook para ver a temperatura, olho para a TV para trocar o som, olho para a cama para ver como dormi.',
    facts: [
      { value: '4 dias', label: 'do primeiro número da trena a um jogo jogável com dados ao vivo (60 commits)' },
      { value: '~80 FPS', label: 'em tela cheia, 1080p, com iluminação global em tempo real numa RTX 3050 de notebook' },
      { value: '197', label: 'verificações automáticas antes de qualquer mudança chegar a mim, com o jogo se dirigindo sozinho' },
    ],
    screensTitle: 'Dentro do jogo',
    visionTitle: 'Isto é 1% do que poderia ser',
    vision: [
      'Fiz isto como uma maneira divertida de interagir com o meu quarto, mas a ideia cresce para a casa inteira. Com mais dispositivos conectados, o jogo deixaria de ser uma maquete e viraria um espelho vivo da casa: eu veria o robô de limpeza andando pelos cômodos em tempo real, ligaria o ar-condicionado, conferiria se o fogão elétrico ficou ligado, mexeria em tomadas, luzes e TVs, tudo sentado no computador, andando até eles no jogo e clicando.',
      'Tudo o que permitisse acesso remoto poderia ser visto e controlado de dentro dele. Menos um jogo, mais um centro de controle dinâmico, interativo e divertido da minha própria casa.',
      'A base já está aqui: a ponte adiciona aparelhos um por vez, por uma lista fechada de ações aprovadas; o modelo 3D é gerado a partir de medidas, então um cômodo novo é só um novo conjunto de números; e o próximo aparelho já está escolhido, um hub infravermelho para o jogo controlar o ar-condicionado.',
    ],
    partsTitle: 'Como funciona',
    parts: [
      {
        title: 'Medido, não desenhado',
        text: 'Toda medida mora num único arquivo JSON, preenchido com a trena, e nada é digitado no código. Um script do Blender, sem interface, monta o modelo a partir dele, com texturas procedurais feitas em numpy, então não há nenhum asset baixado. Para conferir, renderizei o jogo do mesmo ponto e com a mesma lente de uma foto do quarto tirada no celular: essa comparação achou um tampo de mesa com 75 cm, não 65, o motivo de a primeira versão me fazer sentir um gigante.',
      },
      {
        title: 'Um motor de jogo de verdade',
        text: 'O jogo roda no Godot 4 com luz em tempo real: sol, lâmpada do teto, iluminação global (SDFGI), oclusão de ambiente e brilho, em cerca de 6,5 ms por quadro. Dá para andar, correr, pular, agachar e deitar nas camas. As pequenas travadas foram medidas e eliminadas: destacar um objeto compilava um shader na hora (179 ms parado), então o efeito agora nasce pronto e só muda de cor.',
      },
      {
        title: 'Um espelho do quarto real',
        text: 'A TV e o notebook do jogo mostram as minhas telas reais cerca de duas vezes por segundo, o teclado mostra a cor RGB real e a lâmpada do teto segue a luz real que a câmera do quarto vê. A luz do dia segue o relógio do PC: de manhã, com a lâmpada apagada, a janela ilumina o quarto inteiro, a persiana escurece conforme fecha e, à noite, o céu escurece.',
      },
      {
        title: 'Dados ao vivo em cada objeto',
        text: 'Mirar num objeto abre um cartão com as medidas reais e dados ao vivo: temperaturas, ventoinhas, bateria e disco do notebook; o modo de iluminação do teclado; e, em cada cama, a última noite de sono pelos relatórios da câmera. A cama também abre um painel de sono com estatísticas da noite, da semana e do mês, comparadas a uma meta de hora de deitar.',
      },
      {
        title: 'Ações com proteção',
        text: 'Uma pequena ponte em Python no PC alimenta o jogo. Ela só escuta no localhost, por padrão só lê, e só executa ações de uma lista fechada que aprovei uma por uma: modo cinema, som e brilho da TV, enviados pelo controle remoto do meu desktop. Os pedidos exigem um cabeçalho próprio e não há CORS. O ao vivo da câmera só roda o ffmpeg enquanto o jogo pede quadros e conta como alguém assistindo, para quem está no quarto saber.',
      },
      {
        title: 'Coisas que abrem',
        text: 'A porta, as portas do guarda-roupa e as gavetas abrem; a escrivaninha corre 27 cm levando o notebook junto; a persiana desce e gira as lâminas; e a cama de baixo sai de debaixo da triliche. A colisão segue as mesmas medidas, então dá para subir na cama puxada, mas não atravessar os móveis.',
      },
      {
        title: 'Uma versão para o navegador',
        text: 'Um visualizador em three.js mostra o mesmo modelo em qualquer celular. GPUs integradas não aguentavam luz em tempo real (15 FPS na Intel do meu notebook), então o Blender assa a iluminação nas texturas: 38 ms por quadro viraram 8 ms. Um teste mantém o modelo abaixo de 3 MB, 150 mil triângulos e 250 draw calls.',
      },
      {
        title: 'Testado como produto',
        text: 'Um comando gera o modelo de novo, renderiza imagens de referência e roda todos os testes: o visualizador no Firefox sem interface, a ponte de dados contra fontes falsas e o próprio jogo, que dirige uma cópia escondida de si mesmo por caminhadas, colisões, cartões, ações e limites de tempo por quadro. O vídeo do tour lá em cima é gravado pelo mesmo mecanismo, com dados falsos.',
      },
    ],
    labTitle: 'Um laboratório de arquitetura',
    labText:
      'O mesmo processo consegue reorganizar o quarto. Descrevi opções de móveis e layouts por cima das medidas reais; o laboratório desenha plantas 2D com área livre, armazenamento e passagens (verde = onde dá para andar) e monta cada layout em 3D, para eu andar por ele no jogo antes de comprar qualquer coisa. O layout minimalista que escolhi libera mais chão que o de hoje: 5,08 m² em vez de 4,74.',
    labImages: [
      { image: '/room-3d/lab-plantas.webp', w: 2000, h: 1266, caption: 'Hoje × três propostas, com as verificações de cada uma.' },
      { image: '/room-3d/lab-c2.webp', w: 1280, h: 800, caption: 'O layout escolhido, para andar dentro do jogo.' },
    ],
  },
};

const screens: { image: string; title: Localized; text: Localized }[] = [
  {
    image: '/room-3d/vivo-g15.webp',
    title: { en: 'Live data from the PC', pt: 'Dados ao vivo do PC' },
    text: {
      en: "Look at the laptop and its card shows the real measurements and live temperatures, fans, battery and disk. The screens mirror the real ones.",
      pt: 'Olhe para o notebook e o cartão mostra as medidas reais e, ao vivo, temperaturas, ventoinhas, bateria e disco. As telas espelham as de verdade.',
    },
  },
  {
    image: '/room-3d/tv.webp',
    title: { en: 'Controlling the TV', pt: 'Controlando a TV' },
    text: {
      en: 'Cinema mode, sound on the TV or the laptop, and brightness, sent to the real TV in one click.',
      pt: 'Modo cinema, som na TV ou no notebook e brilho, enviados para a TV de verdade num clique.',
    },
  },
  {
    image: '/room-3d/dia.webp',
    title: { en: 'Daylight from the clock', pt: 'Luz do dia pelo relógio' },
    text: {
      en: 'Morning with the lamp off: the window lights the room with warm, soft light, and the blind dims it as it closes.',
      pt: 'Manhã com a lâmpada apagada: a janela ilumina o quarto com uma luz quente e suave, e a persiana escurece conforme fecha.',
    },
  },
  {
    image: '/room-3d/noite.webp',
    title: { en: 'Night', pt: 'Noite' },
    text: {
      en: 'After sunset the sky goes dark and only the mirrored screens and the keyboard glow, until the lamp comes on.',
      pt: 'Depois do pôr do sol o céu escurece e só as telas espelhadas e o teclado brilham, até a lâmpada acender.',
    },
  },
  {
    image: '/room-3d/sono.webp',
    title: { en: 'Sleep stats on the bed', pt: 'Estatísticas do sono na cama' },
    text: {
      en: 'Night, week and month views with a bedtime goal, streaks and a score per night, from the room camera reports.',
      pt: 'Noite, semana e mês com meta de hora de deitar, sequências e nota por noite, pelos relatórios da câmera do quarto.',
    },
  },
  {
    image: '/room-3d/visualizador.webp',
    title: { en: 'The browser viewer', pt: 'O visualizador no navegador' },
    text: {
      en: 'The same model with baked light, light enough for any phone: drag to turn, pinch to zoom, tap an object to see its name.',
      pt: 'O mesmo modelo com a luz assada, leve para qualquer celular: arraste para girar, pince para aproximar, toque num objeto para ver o nome.',
    },
  },
];

export default function Room3DContent() {
  const { lang } = useLanguage();
  const t = copy[lang];

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
                src="/room-3d/tour.mp4"
                poster="/room-3d/tour-poster.webp"
                width={1600}
                height={900}
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
        <div className="mb-20 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-10">
          {screens.map((screen) => (
            <section key={screen.image}>
              <div className="premium-card border border-line/[0.1] shadow-xl shadow-scrim/10 mb-4 overflow-hidden">
                <img
                  src={screen.image}
                  alt={screen.title[lang]}
                  width={1600}
                  height={screen.image.endsWith('visualizador.webp') ? 1000 : 900}
                  loading="lazy"
                  className="w-full h-auto block"
                />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-1">{screen.title[lang]}</h3>
              <p className="text-sm text-foreground/60 leading-relaxed">{screen.text[lang]}</p>
            </section>
          ))}
        </div>

        <section className="mb-20 premium-card border border-terra/30 p-8 md:p-10">
          <div className="relative z-10 max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-5">{t.visionTitle}</h2>
            {t.vision.map((paragraph, i) => (
              <p
                key={i}
                className={`leading-relaxed mb-4 last:mb-0 ${i === 1 ? 'text-lg font-medium text-terra' : 'text-foreground/70'}`}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-8">{t.partsTitle}</h2>
        <div className="mb-20 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-12">
          {t.parts.map((part) => (
            <section key={part.title}>
              <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-3">{part.title}</h3>
              <p className="text-foreground/60 leading-relaxed">{part.text}</p>
            </section>
          ))}
        </div>

        <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">{t.labTitle}</h2>
        <p className="max-w-3xl text-foreground/60 leading-relaxed mb-8">{t.labText}</p>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {t.labImages.map((item, i) => (
            <figure key={item.image} className={i === 0 ? 'md:col-span-3' : 'md:col-span-2'}>
              <div className="premium-card border border-line/[0.1] shadow-xl shadow-scrim/10 mb-3 overflow-hidden">
                <img src={item.image} alt={item.caption} width={item.w} height={item.h} loading="lazy" className="w-full h-auto block" />
              </div>
              <figcaption className="text-sm text-foreground/50">{item.caption}</figcaption>
            </figure>
          ))}
        </div>

        <RelatedProjects items={related} />
      </div>

      <Footer />
    </main>
  );
}
