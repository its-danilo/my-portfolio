import type { Metadata } from 'next';
import CameraContent from './content';

export const metadata: Metadata = {
  title: 'calOS Camera | Danilo Leal',
  description:
    'A cheap Wi-Fi PTZ camera turned into a local-only smart room: presence detection, a 360° sphere of the room, spoken reminders, an offline voice assistant and daily reports, with no cloud.',
};

export default function CameraPage() {
  return <CameraContent />;
}
