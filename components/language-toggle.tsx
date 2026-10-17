"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage, type Lang } from '@/lib/i18n';

interface LanguageToggleProps {
  className?: string;
  iconClassName?: string;
}

// Two overlapping boxes, like Google Translate's icon: the current language is
// the filled one in front, and clicking swaps them.
const BACK = { x: 1, y: 1 };
const FRONT = { x: 13, y: 12 };
const BOX = { width: 18, height: 15 };

const labels: Record<Lang, { code: string; switchTo: string; lang: string }> = {
  en: { code: 'EN', switchTo: 'View in English', lang: 'en' },
  pt: { code: 'PT', switchTo: 'Ver em português', lang: 'pt-BR' },
};

export default function LanguageToggle({ className = '', iconClassName = 'w-[28px] h-[26px]' }: LanguageToggleProps) {
  const { lang, setLang } = useLanguage();
  // Only a click animates the swap, not the switch to the saved language on load.
  const [clicked, setClicked] = useState(false);
  const other: Lang = lang === 'en' ? 'pt' : 'en';
  const target = labels[other];

  return (
    <motion.button
      type="button"
      onClick={() => {
        setClicked(true);
        setLang(other);
      }}
      whileHover={{ scale: 1.1, y: -2 }}
      whileTap={{ scale: 0.95 }}
      aria-label={target.switchTo}
      title={target.switchTo}
      lang={target.lang}
      // opacity instead of a translucent color, so the front box hides the back one's outline
      className={`inline-flex items-center justify-center text-foreground opacity-50 hover:opacity-100 transition-opacity ${className}`}
    >
      <svg viewBox="0 0 32 28" className={iconClassName} aria-hidden>
        {/* The back box is drawn first, so the front one covers its corner. */}
        {[other, lang].map((code) => {
          const front = code === lang;
          const at = front ? FRONT : BACK;
          return (
            <motion.g
              key={code}
              initial={false}
              animate={{ x: at.x, y: at.y }}
              transition={clicked ? { type: 'spring', stiffness: 380, damping: 26 } : { duration: 0 }}
            >
              <rect
                x={0.75}
                y={0.75}
                width={BOX.width - 1.5}
                height={BOX.height - 1.5}
                rx={3}
                strokeWidth={1.5}
                className={front ? 'fill-current stroke-current' : 'fill-none stroke-current'}
              />
              <text
                x={BOX.width / 2}
                y={BOX.height / 2 + 0.5}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize={8}
                fontWeight={700}
                className={front ? 'fill-paper' : 'fill-current'}
              >
                {labels[code].code}
              </text>
            </motion.g>
          );
        })}
      </svg>
    </motion.button>
  );
}
