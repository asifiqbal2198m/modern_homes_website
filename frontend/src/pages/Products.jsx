import wallpaper from "../assets/images/products/wallpaper.jpg";
import flooring from "../assets/images/products/flooring.jpg";
import curtains from "../assets/images/products/curtains.jpg";
import blinds from "../assets/images/products/blinds.jpg";
import carpets from "../assets/images/products/carpets.jpg";
import grass from "../assets/images/products/grass.jpg";
import PageMeta from "../components/PageMeta";

const products = [
  { title: "Premium Wallpapers", description: "Elegant patterns for walls and feature spaces.", image: wallpaper },
  { title: "Wooden Flooring", description: "Warm and durable flooring for modern homes.", image: flooring },
  { title: "Curtains", description: "Stylish curtains in premium fabrics and finishes.", image: curtains },
  { title: "Window Blinds", description: "Functional and decorative blinds for every room.", image: blinds },
  { title: "Luxury Carpets", description: "Soft and sophisticated carpets for comfort and style.", image: carpets },
  { title: "Artificial Grass", description: "Low-maintenance turf for balconies, gardens, and terraces.", image: grass },
];

const Products = () => {
  return (
    <section className="bg-slate-50 py-20">
      <PageMeta title="Interior Products" description="Explore premium wallpapers, wooden flooring, curtains, blinds, carpets, and artificial grass from Modern Homes Interior Decor in Magam." />
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">
            Our Products
          </p>
          <h1 className="text-4xl font-bold text-gray-800 sm:text-5xl">
            Discover premium interiors made for modern living.
          </h1>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product, index) => (
            <div key={index} className="overflow-hidden rounded-3xl bg-white shadow-lg">
              <img src={product.image} alt={product.title} className="h-56 w-full object-cover" />
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-gray-800">{product.title}</h3>
                <p className="mt-3 text-gray-600">{product.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
