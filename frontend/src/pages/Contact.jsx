import ContactForm from "../components/ContactForm";
import PageMeta from "../components/PageMeta";

const Contact = () => {
  return (
    <div className="py-10">
      <PageMeta title="Contact & Free Consultation" description="Contact Modern Homes Interior Decor in Magam for premium wallpapers, flooring, curtains, blinds, glass, and interior consultation." />
      <ContactForm />
    </div>
  );
};

export default Contact;
