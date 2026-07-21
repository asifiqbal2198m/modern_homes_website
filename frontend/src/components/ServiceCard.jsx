const ServiceCard = ({ title, description, image }) => {
  return (
    <div className="group overflow-hidden rounded-3xl bg-luxury-warm-gray border border-luxury-gold/10 luxury-card-glow flex flex-col justify-between">

      {/* Image Section */}
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
          <h3 className="text-xl font-bold font-serif mb-3 text-luxury-charcoal group-hover:text-luxury-bronze transition-colors duration-300">
            {title}
          </h3>

          <p className="text-slate-400 leading-relaxed text-sm font-light">
            {description}
          </p>
        </div>

        <div className="mt-6 flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-luxury-bronze">
          <span>Explore details</span>
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </div>
      </div>

    </div>
  );
};

export default ServiceCard;