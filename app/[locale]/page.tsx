import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import SocialProof from '@/components/SocialProof';
import AudienceSplit from '@/components/AudienceSplit';
import BenefitsGrid from '@/components/BenefitsGrid';
import ProductTour from '@/components/ProductTour';
import Testimonials from '@/components/Testimonials';
import ImpactSection from '@/components/ImpactSection';
import Pricing from '@/components/Pricing';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';

export default function Page() {
  return (
    <div>
      <Navbar />
      <Hero />
      <SocialProof />
      <AudienceSplit />
      <BenefitsGrid />
      <ProductTour />
      <Testimonials />
      <ImpactSection />
      <Pricing />
      <ContactForm />
      <Footer />
    </div>
  );
}
