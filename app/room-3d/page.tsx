import type { Metadata } from 'next';
import Room3DContent from './content';

export const metadata: Metadata = {
  title: '3D Room | Danilo Leal',
  description:
    'A playable digital twin of my bedroom, built from tape-measure numbers: a Godot game with real-time light that mirrors the real room, shows live data from my devices and controls them, plus a vision for a whole-house control center.',
};

export default function Room3DPage() {
  return <Room3DContent />;
}
