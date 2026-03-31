import { NavBar } from './landing-page-navbar';
import { HeroSection } from './hero-section';
import { DashboardPreview } from './dashboard-preview';
import { CoreFeatures } from './core-features';
import { CTASection } from './cta-section';
import { Footer } from './footer';

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary font-sans">
      <NavBar />

      <HeroSection />

      <DashboardPreview />

      <CoreFeatures />

      <CTASection />

      <Footer />
    </div>
  );
};






export default LandingPage;