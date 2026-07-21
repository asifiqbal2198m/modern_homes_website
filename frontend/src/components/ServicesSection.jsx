import ServiceCard from "./ServiceCard";

import wallpaper from "../assets/images/products/wallpaper.jpg";
import flooring from "../assets/images/products/flooring.jpg";
import curtains from "../assets/images/products/curtains.jpg";
import blinds from "../assets/images/products/blinds.jpg";
import carpets from "../assets/images/products/carpets.jpg";
import grass from "../assets/images/products/grass.jpg";

const services = [
  {
    title: "Premium Wallpapers",
    description:
      "Modern wallpaper collections for homes and commercial spaces.",
    image: wallpaper,
  },
  {
    title: "Wooden Flooring",
    description:
      "Elegant wooden flooring with premium finish and durability.",
    image: flooring,
  },
  {
    title: "Curtains",
    description:
      "Designer curtains in a wide variety of colors and fabrics.",
    image: curtains,
  },
  {
    title: "Window Blinds",
    description:
      "Roller, Roman, Zebra and Vertical blinds for every interior.",
    image: blinds,
  },
  {
    title: "Luxury Carpets",
    description:
      "Premium carpets and rugs for modern homes and offices.",
    image: carpets,
  },
  {
    title: "Artificial Grass",
    description:
      "High-quality artificial grass for gardens and balconies.",
    image: grass,
  },
];

const ServicesSection = () => {
  return (
    <section className="py-24 bg-luxury-cream border-y border-luxury-gold/15 relative isolate overflow-hidden">
      <div className="gold-glow-blob -left-48 -top-48 w-96 h-96" />
      <div className="gold-glow-blob -right-48 -bottom-48 w-96 h-96" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        <div className="text-center max-w-3xl mx-auto mb-16 reveal-on-scroll">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-luxury-bronze">
            Bespoke Solutions
          </p>
          <h2 className="font-serif text-4xl font-normal text-luxury-charcoal sm:text-5xl">
            Our Core Services
          </h2>
          <p className="text-slate-400 mt-4 font-light">
            We provide complete interior decoration solutions with premium quality products and detailed workmanship.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 reveal-on-scroll">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
              image={service.image}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default ServicesSection;