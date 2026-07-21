import { Link } from "react-router-dom";

const ProductCard = ({ image, title, description }) => {
  return (
    <div className="group bg-luxury-warm-gray rounded-3xl overflow-hidden border border-luxury-gold/10 luxury-card-glow transition-luxury flex flex-col justify-between">

      {/* Image */}
      <div className="h-64 overflow-hidden bg-luxury-cream relative">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/15 group-hover:bg-black/0 transition-colors duration-300" />
      </div>

      {/* Content */}
      <div className="p-8 flex-grow flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-bold font-serif text-luxury-charcoal mb-3 group-hover:text-luxury-bronze transition-colors duration-300">
            {title}
          </h3>

          <p className="text-slate-400 text-sm font-light leading-relaxed mb-6">
            {description}
          </p>
        </div>

        <Link
          to="/products"
          className="inline-block rounded-full bg-luxury-bronze hover:bg-luxury-gold text-white px-6 py-2.5 text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-md w-fit"
        >
          View Details
        </Link>

      </div>
    </div>
  );
};

export default ProductCard;