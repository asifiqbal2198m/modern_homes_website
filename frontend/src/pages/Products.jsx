import { useEffect, useState } from "react";
import wallpaper from "../assets/images/products/wallpaper.jpg";
import flooring from "../assets/images/products/flooring.jpg";
import curtains from "../assets/images/products/curtains.jpg";
import blinds from "../assets/images/products/blinds.jpg";
import carpets from "../assets/images/products/carpets.jpg";
import grass from "../assets/images/products/grass.jpg";
import PageMeta from "../components/PageMeta";
import { fetchProducts } from "../services/contentApi";

const fallbackProducts = [
  { title: "Premium Wallpapers", description: "Elegant patterns for walls and feature spaces.", image: wallpaper },
  { title: "Wooden Flooring", description: "Warm and durable flooring for modern homes.", image: flooring },
  { title: "Curtains", description: "Stylish curtains in premium fabrics and finishes.", image: curtains },
  { title: "Window Blinds", description: "Functional and decorative blinds for every room.", image: blinds },
  { title: "Luxury Carpets", description: "Soft and sophisticated carpets for comfort and style.", image: carpets },
  { title: "Artificial Grass", description: "Low-maintenance turf for balconies, gardens, and terraces.", image: grass },
];

const Products = () => {
  const [productsList, setProductsList] = useState(fallbackProducts);

  useEffect(() => {
    let isMounted = true;
    fetchProducts()
      .then((data) => {
        if (isMounted && data && data.length) {
          const apiProducts = data.map((item) => ({
            title: item.title || item.name,
            description: item.description,
            image: item.image,
            isDemo: false,
          }));
          setProductsList([...apiProducts, ...fallbackProducts]);
        }
      })
      .catch(() => {
        if (isMounted) {
          setProductsList(fallbackProducts);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="bg-luxury-warm-gray/20 py-24 border-b border-luxury-gold/15 min-h-[75vh]">
      <PageMeta title="Interior Products" description="Explore premium wallpapers, wooden flooring, curtains, blinds, carpets, and artificial grass from Modern Homes Interior Decor in Magam." />
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-luxury-bronze">
            Our Products
          </p>
          <h1 className="font-serif text-4xl font-normal text-luxury-charcoal sm:text-5xl leading-tight">
            Discover premium interiors made for modern living.
          </h1>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {productsList.map((product, index) => (
            <div key={index} className="group overflow-hidden rounded-3xl bg-white border border-luxury-gold/10 luxury-card-glow transition-luxury">
              <div className="h-64 overflow-hidden relative">
                <img src={product.image} alt={product.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-300" />
              </div>
              <div className="p-8">
                <h3 className="text-xl font-bold font-serif text-luxury-charcoal group-hover:text-luxury-bronze transition-colors duration-300">
                  {product.title}
                </h3>
                <p className="mt-3 text-slate-500 text-sm font-light leading-relaxed">
                  {product.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
