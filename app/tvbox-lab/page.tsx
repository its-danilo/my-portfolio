import type { Metadata } from 'next';
import TvboxLabContent from './content';

export const metadata: Metadata = {
  title: 'TVBox Lab | Danilo Leal',
  description:
    'A home server on a cheap 1 GB Android TV box: Armbian, AdGuard Home, Tailscale, Vaultwarden, Gatus and a Wake-on-WLAN button, with no ports open on the router.',
};

export default function TvboxLabPage() {
  return <TvboxLabContent />;
}
