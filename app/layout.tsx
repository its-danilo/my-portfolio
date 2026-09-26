import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://its-danilo.vercel.app'),
  title: 'Danilo Leal | Full Stack & Automation Developer',
  description: 'I build web systems, automations and bots that solve real problems. Freelance full-stack and automation developer, based in Brazil.',
  openGraph: {
    title: 'Danilo Leal | Full Stack & Automation Developer',
    description: 'I build web systems, automations and bots that solve real problems.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Danilo Leal Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Danilo Leal | Full Stack & Automation Developer',
    description: 'I build web systems, automations and bots that solve real problems.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
