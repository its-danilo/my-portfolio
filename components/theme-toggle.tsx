"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useCopy } from '@/lib/i18n';

interface ThemeToggleProps {
  className?: string;
  iconClassName?: string;
}

const copy = {
  en: { toLight: 'Switch to light mode', light: 'Light mode', toDark: 'Switch to dark mode', dark: 'Dark mode' },
  pt: { toLight: 'Mudar para o modo claro', light: 'Modo claro', toDark: 'Mudar para o modo escuro', dark: 'Modo escuro' },
};

export default function ThemeToggle({ className = '', iconClassName = 'w-5 h-5' }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const t = useCopy(copy);

  // The theme is only known on the client; render a same-size placeholder until then.
  useEffect(() => setMounted(true), []);
  if (!mounted) return <span className={`inline-block ${iconClassName}`} aria-hidden />;

  const isDark = resolvedTheme === 'dark';
  const Icon = isDark ? Sun : Moon;

  return (
    <motion.button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      whileHover={{ scale: 1.1, y: -2 }}
      whileTap={{ scale: 0.95 }}
      aria-label={isDark ? t.toLight : t.toDark}
      title={isDark ? t.light : t.dark}
      className={`inline-flex items-center justify-center text-foreground/50 hover:text-foreground transition-colors ${className}`}
    >
      <Icon className={iconClassName} />
    </motion.button>
  );
}
