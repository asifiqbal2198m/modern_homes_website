import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { fetchProducts } from "../services/contentApi";
import wallpaper from "../assets/images/products/wallpaper.jpg";
import flooring from "../assets/images/products/flooring.jpg";
import curtains from "../assets/images/products/curtains.jpg";

const fallbackProducts = [
  {
    image: wallpaper,
    title: "Premium Wallpapers",
    description:
      "Luxury wallpapers with modern textures and elegant designs.",
  },
  {
    image: flooring,
    title: "Wooden Flooring",
    description:
      "Premium wooden flooring that adds warmth and sophistication.",
  },
  {
    image: curtains,
    title: "Curtains & Blinds",
    description:
      "Stylish curtains and blinds for homes, offices and hotels.",
  },
];

const FeaturedProducts = () => {
  const [products, setProducts] = useState(fallbackProducts);

  useEffect(() => {
    let isMounted = true;

    fetchProducts()
      .then((data) => {
        if (isMounted && data.length) {
          setProducts(data);
        }
      })
      .catch(() => {
        if (isMounted) {
          setProducts(fallbackProducts);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="py-24 bg-luxury-cream relative isolate overflow-hidden">
      <div className="gold-glow-blob -right-48 -top-48 w-96 h-96" />
      <div className="gold-glow-blob -left-48 -bottom-48 w-96 h-96" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        <div className="text-center max-w-3xl mx-auto mb-16 reveal-on-scroll">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-luxury-bronze">
            Curated Collection
          </p>
          <h2 className="font-serif text-4xl font-normal text-luxury-charcoal sm:text-5xl">
            Featured Products
          </h2>
          <p className="text-slate-400 mt-4 font-light">
            Explore our best-selling interior decoration collections, sourced from authorized global brands.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 reveal-on-scroll">

          {products.map((product, index) => (
            <ProductCard
              key={index}
              image={product.image}
              title={product.title}
              description={product.description}
            />
          ))}

        </div>

      </div>

    </section>
  );
};

export default FeaturedProducts;