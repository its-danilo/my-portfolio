import type { Metadata } from 'next';
import InputForgeContent from './content';

export const metadata: Metadata = {
  title: 'InputForge | Danilo Leal',
  description:
    'An autoclicker, macro recorder and per-game key remapper for Linux on Hyprland, with macros that watch the screen and a native GTK 4 interface.',
};

export default function InputForgePage() {
  return <InputForgeContent />;
}
