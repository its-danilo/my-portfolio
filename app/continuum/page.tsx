import type { Metadata } from 'next';
import ContinuumContent from './content';

export const metadata: Metadata = {
  title: 'Continuum | Danilo Leal',
  description:
    'A tour of Continuum, a personal execution system whose rules are enforced by the database itself.',
};

export default function ContinuumPage() {
  return <ContinuumContent />;
}
