import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import HeroSection from '../components/sections/HeroSection';
import AboutSection from '../components/sections/AboutSection';
import RulesSection from '../components/sections/RulesSection';
import CardsGallery from '../components/sections/CardsGallery';

export default function LandingPage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <RulesSection />
        <CardsGallery />
      </main>
      <Footer />
    </>
  );
}
