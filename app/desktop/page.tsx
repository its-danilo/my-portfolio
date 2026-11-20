import type { Metadata } from 'next';
import DesktopContent from './content';

export const metadata: Metadata = {
  title: 'My Desktop | Danilo Leal',
  description:
    'The Arch Linux + Hyprland desktop I use every day: one theme that reaches 20 apps and devices, a wallpaper that crosses two screens, a phone remote, and upstream bugs patched or reported.',
};

export default function DesktopPage() {
  return <DesktopContent />;
}
