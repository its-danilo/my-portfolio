"use client";

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { MapPin, Mail, Briefcase, Code2, Layers, Zap, Globe } from 'lucide-react';
import { personalInfo } from '@/data/portfolio';

const skills = [
  { icon: Code2, label: 'Modern Frameworks', desc: 'Next.js, React, Vue' },
  { icon: Layers, label: 'System Architecture', desc: 'Scalable solutions' },
  { icon: Zap, label: 'Performance', desc: 'Optimized experiences' },
  { icon: Globe, label: 'Full-Stack', desc: 'End-to-end development' },
];

export default function AboutSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="about" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-white">
        <div className="absolute inset-0 ambient-glow-bottom" />
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
            About Me
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Building the Future
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-lg text-foreground/60 leading-relaxed mb-8">
              {personalInfo.description}
            </p>

            <div className="space-y-4 mb-12">
              <div className="flex items-center gap-3 text-foreground/70">
                <div className="p-2.5 bg-[#8B7355]/[0.05] rounded-lg border border-[#8B7355]/[0.1]">
                  <MapPin className="w-4 h-4 text-[#D4654A]" />
                </div>
                <span>{personalInfo.location}</span>
              </div>

              <div className="flex items-center gap-3 text-foreground/70">
                <div className="p-2.5 bg-[#8B7355]/[0.05] rounded-lg border border-[#8B7355]/[0.1]">
                  <Mail className="w-4 h-4 text-[#D4654A]" />
                </div>
                <a href={`mailto:${personalInfo.email}`} className="hover:text-[#D4654A] transition-colors">
                  {personalInfo.email}
                </a>
              </div>

              <div className="flex items-center gap-3 text-foreground/70">
                <div className="p-2.5 bg-[#8B7355]/[0.05] rounded-lg border border-[#8B7355]/[0.1]">
                  <Briefcase className="w-4 h-4 text-[#D4654A]" />
                </div>
                <span className="text-[#4A7c59]">{personalInfo.availability}</span>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-foreground/50 uppercase tracking-wider mb-4">
                Technologies
              </h3>
              <div className="flex flex-wrap gap-2">
                {personalInfo.skills.map((skill, index) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                    transition={{ delay: 0.5 + index * 0.05, duration: 0.4 }}
                    className="px-4 py-2 text-sm text-foreground/70 bg-[#8B7355]/[0.05] rounded-lg border border-[#8B7355]/[0.1] hover:border-[#D4654A]/30 hover:bg-[#D4654A]/5 transition-all duration-300"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.label}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="premium-card p-6 group hover:border-[#D4654A]/20 transition-all duration-500"
              >
                <div className="relative z-10">
                  <div className="w-12 h-12 mb-4 rounded-xl bg-gradient-to-br from-[#D4654A]/10 to-[#F4A261]/10 flex items-center justify-center group-hover:from-[#D4654A]/20 group-hover:to-[#F4A261]/20 transition-all duration-300">
                    <skill.icon className="w-6 h-6 text-[#D4654A]" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">{skill.label}</h3>
                  <p className="text-sm text-foreground/50">{skill.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
