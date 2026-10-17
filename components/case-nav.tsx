"use client";

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import LanguageToggle from '@/components/language-toggle';
import ThemeToggle from '@/components/theme-toggle';
import { useCopy } from '@/lib/i18n';

const copy = {
  en: { back: 'Back to projects' },
  pt: { back: 'Voltar aos projetos' },
};

// Top row of the project pages: the way back, plus the language and theme
// buttons of the home page's navigation, for visitors who land here directly.
export default function CaseNav() {
  const t = useCopy(copy);

  return (
    <div className="flex items-center justify-between gap-4">
      <Link
        href="/#work"
        className="inline-flex items-center gap-2 text-sm text-foreground/60 hover:text-terra transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        {t.back}
      </Link>
      <div className="flex items-center gap-4">
        <LanguageToggle />
        <ThemeToggle />
      </div>
    </div>
  );
}
