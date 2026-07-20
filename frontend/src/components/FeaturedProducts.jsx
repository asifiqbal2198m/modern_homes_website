import ProductCard from "./ProductCard";

import wallpaper from "../assets/images/products/wallpaper.jpg";
import flooring from "../assets/images/products/flooring.jpg";
import curtains from "../assets/images/products/curtains.jpg";

const products = [
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
  return (
    <section className="py-20 bg-white">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-14">

          <h2 className="text-4xl font-bold">
            Featured Products
          </h2>

          <p className="text-gray-600 mt-4">
            Explore our best-selling interior decoration products.
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

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