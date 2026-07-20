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
    <section className="py-20 bg-slate-100">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center">

          <h2 className="text-4xl font-bold">
            Our Services
          </h2>

          <p className="text-gray-600 mt-4">
            We provide complete interior decoration solutions with premium quality products.
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-14">

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