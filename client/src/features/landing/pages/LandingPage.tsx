import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/features/landing/components/HeroSection";
import FeaturesSection from "@/features/landing/components/FeaturesSection";
import WhyNoteNest from "@/features/landing/components/WhyNoteNest";
import DetailedFeatures from "@/features/landing/components/DetailedFeatures";
import TargetAudience from "@/features/landing/components/TargetAudience";
import CTASection from "@/features/landing/components/CTASection";
import Footer from "@/features/landing/components/Footer";

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <WhyNoteNest />
        <DetailedFeatures />
        <TargetAudience />
        <CTASection />
      </main>
      <Footer />
    </>
  );
};

export default LandingPage;
