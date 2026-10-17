import type { Metadata } from 'next';
import RodribotContent from './content';

export const metadata: Metadata = {
  title: 'Rodribot | Danilo Leal',
  description:
    'A tour of Rodribot, an RPA bot that automates repetitive clerical workflows in Brazil’s PJe judicial system.',
};

export default function RodribotPage() {
  return <RodribotContent />;
}
