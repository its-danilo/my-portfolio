import type { Metadata } from 'next';
import SecContent from './content';

export const metadata: Metadata = {
  title: 'Danilo Leal | Security',
  description:
    'Portfólio de segurança ofensiva, OSINT e casos reais, com foco em estágio de perícia e forense digital.',
  // Unlisted: reachable by direct link, kept out of search indexes.
  robots: { index: false, follow: false },
};

export default function SecPage() {
  return <SecContent />;
}
