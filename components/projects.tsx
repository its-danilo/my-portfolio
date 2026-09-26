"use client";

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';
import { projects, type Project } from '@/data/portfolio';

interface ProjectCardProps {
  project: Project;
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative"
    >
      <div className="premium-card h-full">
        <div className="relative aspect-[16/10] overflow-hidden">
          <motion.div
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </motion.div>

          <div className="absolute inset-0 bg-gradient-to-t from-[#3D2914]/80 via-[#3D2914]/40 to-transparent opacity-80" />

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="absolute top-4 left-4"
          >
            <span className="px-3 py-1.5 text-xs font-medium text-white/90 bg-[#3D2914]/30 backdrop-blur-md rounded-full border border-white/[0.1]">
              {project.category}
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="absolute top-4 right-4 flex items-center gap-2"
          >
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-[#3D2914]/30 backdrop-blur-md rounded-lg border border-white/[0.1] hover:bg-[#3D2914]/40 transition-colors"
              >
                <Github className="w-4 h-4 text-white" />
              </a>
            )}
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-[#3D2914]/30 backdrop-blur-md rounded-lg border border-white/[0.1] hover:bg-[#3D2914]/40 transition-colors"
              >
                <ExternalLink className="w-4 h-4 text-white" />
              </a>
            )}
          </motion.div>
        </div>

        <div className="p-6">
          <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-[#D4654A] transition-colors duration-300">
            {project.title}
          </h3>

          <p className="text-sm text-foreground/50 leading-relaxed mb-4">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 text-xs font-medium text-foreground/60 bg-[#8B7355]/[0.06] rounded-md border border-[#8B7355]/[0.1]"
              >
                {tech}
              </span>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
            transition={{ duration: 0.3 }}
            className="mt-6 pt-4 border-t border-[#8B7355]/[0.1]"
          >
            <a
              href={project.link || '#'}
              className="inline-flex items-center gap-2 text-sm font-medium text-[#D4654A] hover:text-[#E07B5D] transition-colors group/link"
            >
              View Project
              <ArrowUpRight className="w-4 h-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
            </a>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const featuredProjects = projects.filter(p => p.featured);
  const otherProjects = projects.filter(p => !p.featured);

  return (
    <section id="work" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[#FFFBF7]">
        <div className="absolute inset-0 dot-pattern" />
      </div>

      <div ref={sectionRef} className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-sm font-medium text-[#D4654A] mb-4 block"
          >
            Selected Work
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Featured Projects
          </h2>
          <p className="max-w-2xl text-lg text-foreground/50">
            A curated selection of projects that showcase my expertise in building
            modern, scalable, and beautiful digital products.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index + featuredProjects.length} />
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
            className="inline-flex items-center gap-2 text-foreground/60 hover:text-[#D4654A] transition-colors group"
          >
            <Github className="w-5 h-5" />
            <span className="font-medium">View all projects on GitHub</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
