import type { Metadata } from 'next';
import SecContent from './content';

export const metadata: Metadata = {
  title: 'Security · Danilo Leal',
  description:
    'Portfólio de segurança ofensiva, OSINT e divulgação responsável — foco em estágio de perícia e forense digital.',
  // Unlisted: reachable by direct link, kept out of search indexes.
  robots: { index: false, follow: false },
};

export default function SecPage() {
  return <SecContent />;
}
