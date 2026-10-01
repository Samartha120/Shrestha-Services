import HeroSection from "@/components/home/HeroSection";
import FeaturedServices from "@/components/home/FeaturedServices";
import Statistics from "@/components/home/Statistics";
import HomeGallery from "@/components/home/HomeGallery";
import TestimonialsPreview from "@/components/home/TestimonialsPreview";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import PrintPass from "@/components/home/PrintPass";
import Partners from "@/components/home/Partners";
import ContactCTA from "@/components/home/ContactCTA";

export default function HomePage() {
  return (
    <div className="space-y-0">
      <HeroSection />
      <FeaturedServices />
      <Statistics />
      <WhyChooseUs />
      <PrintPass />
      <HomeGallery />
      <TestimonialsPreview />
      <Partners />
      <ContactCTA />
    </div>
  );
}
