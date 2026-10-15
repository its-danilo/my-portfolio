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
    <footer className="relative py-16 border-t border-line/[0.08]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col items-center md:items-start gap-4">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-2"
            >
              <div className="w-7 h-7 rounded-full overflow-hidden bg-gradient-to-br from-terra to-amber">
                <img src="/avatar.webp" alt="" width={28} height={28} className="w-full h-full object-cover" />
              </div>
              <span className="text-base font-semibold tracking-tight text-foreground">
                Danilo Leal
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
                className="p-2.5 text-foreground/50 hover:text-foreground bg-line/[0.05] hover:bg-line/[0.08] rounded-lg border border-line/[0.08] hover:border-line/[0.12] transition-all duration-300"
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
