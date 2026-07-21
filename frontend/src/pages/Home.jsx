import Hero from "../components/Hero";
import ServicesSection from "../components/ServicesSection";
import FeaturedProducts from "../components/FeaturedProducts";
import WhyChooseUs from "../components/WhyChooseUs";
import GallerySection from "../components/Gallery";
import Testimonials from "../components/Testimonials";
import TrustDetails from "../components/TrustDetails";
import ContactForm from "../components/ContactForm";
import MapSection from "../components/MapSection";
import PageMeta from "../components/PageMeta";
import ProjectShowcase from "../components/ProjectShowcase";
import ConsultationCta from "../components/ConsultationCta";
import ProcessSection from "../components/ProcessSection";
import FaqSection from "../components/FaqSection";
import ProjectPlanner from "../components/ProjectPlanner";
import BeforeAfterShowcase from "../components/BeforeAfterShowcase";

const Home = () => {
  return (
    <>
      <PageMeta title="Premium Interior Solutions in Magam" description="Modern Homes Interior Decor provides wallpapers, flooring, curtains, blinds, glass solutions, and turnkey interiors from Magam, Jammu & Kashmir." />
      <Hero />
      <ProjectShowcase />
      <ConsultationCta />
      <ServicesSection />
      <FeaturedProducts />
      <ProcessSection />
      <ProjectPlanner />
      <BeforeAfterShowcase />
      <WhyChooseUs />
      <TrustDetails />
      <GallerySection title="Featured Projects" />
      <Testimonials />
      <FaqSection />
      <ContactForm />
      <MapSection />
    </>
  );
};

export default Home;
