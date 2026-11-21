"use client";

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';
import { projects, projectGroups, type Project, type ProjectGroup } from '@/data/portfolio';
import { useLanguage } from '@/lib/i18n';

const copy = {
  en: {
    eyebrow: 'Selected Work',
    title: 'Projects',
    intro: 'Products, tools and home projects I built end to end. Start with the highlights, or pick an area.',
    featured: 'Highlights',
    tabs: 'Project areas',
    view: 'View Project',
    viewNamed: (title: string) => `View ${title}`,
    github: 'View all projects on GitHub',
  },
  pt: {
    eyebrow: 'Trabalhos selecionados',
    title: 'Projetos',
    intro: 'Produtos, ferramentas e projetos de casa que construí de ponta a ponta. Comece pelos destaques ou escolha uma área.',
    featured: 'Destaques',
    tabs: 'Áreas dos projetos',
    view: 'Ver projeto',
    viewNamed: (title: string) => `Ver ${title}`,
    github: 'Ver todos os projetos no GitHub',
  },
};

interface ProjectCardProps {
  project: Project;
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });
  const { lang } = useLanguage();
  const t = copy[lang];
  const title = typeof project.title === 'string' ? project.title : project.title[lang];
  // Pages of this site open in place; other sites in a new tab.
  const linkProps = project.link?.startsWith('http')
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {};

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative"
    >
      <div className="premium-card h-full">
        <div className="relative aspect-[16/10] overflow-hidden">
          {project.link && (
            <a
              href={project.link}
              {...linkProps}
              aria-label={t.viewNamed(title)}
              className="absolute inset-0 z-[1]"
            />
          )}
          <motion.div
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <img
              src={project.image}
              alt={title}
              className="w-full h-full object-cover"
            />
          </motion.div>

          <div className="absolute inset-0 bg-gradient-to-t from-scrim/80 via-scrim/40 to-transparent opacity-80" />

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="absolute top-4 left-4"
          >
            <span className="px-3 py-1.5 text-xs font-medium text-white/90 bg-scrim/30 backdrop-blur-md rounded-full border border-white/[0.1]">
              {project.category[lang]}
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="absolute top-4 right-4 z-[2] flex items-center gap-2"
          >
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-scrim/30 backdrop-blur-md rounded-lg border border-white/[0.1] hover:bg-scrim/40 transition-colors"
              >
                <Github className="w-4 h-4 text-white" />
              </a>
            )}
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-scrim/30 backdrop-blur-md rounded-lg border border-white/[0.1] hover:bg-scrim/40 transition-colors"
              >
                <ExternalLink className="w-4 h-4 text-white" />
              </a>
            )}
          </motion.div>
        </div>

        <div className="p-6">
          <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-terra transition-colors duration-300">
            {project.link ? (
              <a href={project.link} {...linkProps}>
                {title}
              </a>
            ) : (
              title
            )}
          </h3>

          <p className="text-sm text-foreground/50 leading-relaxed mb-4">
            {project.description[lang]}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 text-xs font-medium text-foreground/60 bg-line/[0.06] rounded-md border border-line/[0.1]"
              >
                {tech}
              </span>
            ))}
          </div>

          {project.link && (
            <div className="mt-6 pt-4 border-t border-line/[0.1]">
              <a
                href={project.link}
                {...linkProps}
                className="inline-flex items-center gap-2 text-sm font-medium text-terra hover:text-terra-2 transition-colors group/link"
              >
                {t.view}
                <ArrowUpRight className="w-4 h-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const t = copy[useLanguage().lang];

  const [tab, setTab] = useState<'featured' | ProjectGroup>('featured');
  const { lang } = useLanguage();
  const tabs = [
    { id: 'featured' as const, label: t.featured, count: projects.filter(p => p.featured).length },
    ...projectGroups.map(g => ({ id: g.id, label: g.label[lang], count: projects.filter(p => p.group === g.id).length })),
  ];
  const shown = projects.filter(p => (tab === 'featured' ? p.featured : p.group === tab));

  return (
    <section id="work" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-surface">
        <div className="absolute inset-0 dot-pattern" />
      </div>

      <div ref={sectionRef} className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-sm font-medium text-terra mb-4 block"
          >
            {t.eyebrow}
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            {t.title}
          </h2>
          <p className="max-w-2xl text-lg text-foreground/50">
            {t.intro}
          </p>
        </motion.div>

        {/* Tabs: they scroll sideways on a phone instead of wrapping into a wall of buttons. */}
        <div className="-mx-6 px-6 lg:mx-0 lg:px-0 mb-10 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div role="tablist" aria-label={t.tabs} className="flex w-max gap-2">
            {tabs.map(item => {
              const active = item.id === tab;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  id={`tab-${item.id}`}
                  aria-selected={active}
                  aria-controls="work-panel"
                  onClick={() => setTab(item.id)}
                  className={`inline-flex items-center gap-2 whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                    active
                      ? 'bg-terra text-white border-terra'
                      : 'text-foreground/60 border-line/[0.12] bg-line/[0.04] hover:text-foreground hover:border-line/[0.25]'
                  }`}
                >
                  {item.label}
                  <span className={`text-xs tabular-nums ${active ? 'text-white/80' : 'text-foreground/40'}`}>{item.count}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div
          id="work-panel"
          role="tabpanel"
          aria-labelledby={`tab-${tab}`}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {shown.map((project, index) => (
            <ProjectCard key={`${tab}-${project.id}`} project={project} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-center mt-16"
        >
          <a
            href="https://github.com/its-danilo"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-foreground/60 hover:text-terra transition-colors group"
          >
            <Github className="w-5 h-5" />
            <span className="font-medium">{t.github}</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
