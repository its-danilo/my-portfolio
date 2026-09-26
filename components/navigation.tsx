"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Menu, X } from 'lucide-react';

const navItems = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

const socialLinks = [
  { icon: Github, href: 'https://github.com/its-danilo', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/danilo-lnkd/', label: 'LinkedIn' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#FFFBF7]/80 backdrop-blur-2xl border-b border-[#8B7355]/[0.08]'
            : 'bg-transparent'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a href="#" className="relative z-10">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-2"
              >
                <div className="relative w-8 h-8">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#D4654A] to-[#E07B5D] rounded-lg rotate-45 transform" />
                  <div className="absolute inset-1 bg-[#FFFBF7] rounded-md rotate-45 transform" />
                </div>
                <span className="text-lg font-semibold tracking-tight text-foreground">
                  Portfolio
                </span>
              </motion.div>
            </a>

            {/* Centered Navigation */}
            <div className="hidden md:flex items-center justify-center flex-1">
              <div className="flex items-center gap-8">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.5 }}
                    className="relative text-sm text-foreground/60 hover:text-foreground transition-colors duration-300 group"
                  >
                    {item.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-[#D4654A] to-[#F4A261] group-hover:w-full transition-all duration-300" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Desktop Social + CTA */}
            <div className="hidden md:flex items-center gap-6">
              <div className="flex items-center gap-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-foreground/50 hover:text-foreground transition-colors"
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>

              <motion.a
                href="#contact"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-5 py-2.5 bg-[#3D2914] text-[#FFFBF7] text-sm font-medium rounded-lg hover:bg-[#3D2914]/90 transition-colors"
              >
                Get in Touch
              </motion.a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden relative z-10 text-foreground"
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#FFFBF7]/95 backdrop-blur-2xl md:hidden"
          >
            <motion.nav
              initial="closed"
              animate="open"
              exit="closed"
              variants={{
                open: {
                  transition: { staggerChildren: 0.1 },
                },
                closed: {
                  transition: { staggerChildren: 0.05, staggerDirection: -1 },
                },
              }}
              className="flex flex-col items-center justify-center h-full gap-8"
            >
              {navItems.map((item) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  variants={{
                    open: { opacity: 1, y: 0 },
                    closed: { opacity: 0, y: 20 },
                  }}
                  className="text-3xl font-medium text-foreground hover:text-[#D4654A] transition-colors"
                >
                  {item.label}
                </motion.a>
              ))}

              <motion.div
                variants={{
                  open: { opacity: 1, y: 0 },
                  closed: { opacity: 0, y: 20 },
                }}
                className="flex items-center gap-6 mt-8"
              >
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground/60 hover:text-foreground transition-colors"
                  >
                    <social.icon className="w-6 h-6" />
                  </a>
                ))}
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
