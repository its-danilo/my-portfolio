import Navigation from '@/components/navigation';
import HeroSection from '@/components/hero';
import ProjectsSection from '@/components/projects';
import AboutSection from '@/components/about';
import ContactSection from '@/components/contact';
import Footer from '@/components/footer';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#FAF7F2] overflow-hidden">
      <Navigation />
      <HeroSection />
      <ProjectsSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
