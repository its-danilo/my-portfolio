"use client";

import { useLanguage, type Localized } from '@/lib/i18n';

// title: a plain string when the name is the same in both languages.
export type RelatedProject = { title: string | Localized; text: Localized; href: string };

const heading: Localized = { en: 'Connected projects', pt: 'Projetos ligados' };

// Closing block of a case page: other projects in this portfolio that work with this one.
export default function RelatedProjects({ items }: { items: RelatedProject[] }) {
  const { lang } = useLanguage();

  return (
    <section className="mt-20">
      <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">{heading[lang]}</h2>
      <div className={`grid grid-cols-1 gap-4 ${items.length > 2 ? 'sm:grid-cols-3' : 'sm:grid-cols-2'}`}>
        {items.map((item) => {
          const external = item.href.startsWith('http');
          return (
            <a
              key={item.href}
              href={item.href}
              {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="premium-card p-6 group"
            >
              <div className="relative z-10">
                <p className="text-lg font-semibold text-foreground group-hover:text-terra transition-colors mb-1">
                  {typeof item.title === 'string' ? item.title : item.title[lang]} {external ? '↗' : '→'}
                </p>
                <p className="text-sm text-foreground/60">{item.text[lang]}</p>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
