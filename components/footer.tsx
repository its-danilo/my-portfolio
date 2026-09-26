"use client";

import { motion } from 'framer-motion';
import { Github, Linkedin } from 'lucide-react';

const socialLinks = [
  { icon: Github, href: 'https://github.com/its-danilo', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/danilo-lnkd/', label: 'LinkedIn' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-16 border-t border-[#8B7355]/[0.08]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col items-center md:items-start gap-4">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-2"
            >
              <div className="relative w-6 h-6">
                <div className="absolute inset-0 bg-gradient-to-br from-[#D4654A] to-[#F4A261] rounded-md rotate-45 transform" />
                <div className="absolute inset-0.5 bg-[#FFFBF7] rounded-sm rotate-45 transform" />
              </div>
              <span className="text-base font-semibold tracking-tight text-foreground">
                Portfolio
              </span>
            </motion.div>
            <p className="text-sm text-foreground/50">
              © {currentYear} All rights reserved.
            </p>
          </div>

          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="p-2.5 text-foreground/50 hover:text-foreground bg-[#8B7355]/[0.05] hover:bg-[#8B7355]/[0.08] rounded-lg border border-[#8B7355]/[0.08] hover:border-[#8B7355]/[0.12] transition-all duration-300"
              >
                <social.icon className="w-4 h-4" />
              </motion.a>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12 text-center"
        >
          <a
            href="#"
            className="text-xs text-foreground/40 hover:text-foreground/70 transition-colors"
          >
            Back to top ↑
          </a>
        </motion.div>
      </div>
    </footer>
  );
}
