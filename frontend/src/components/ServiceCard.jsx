const ServiceCard = ({ title, description, image }) => {
  return (
    <div className="group animate-fade-up overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">

      {/* Image Section */}
      <div className="h-64 flex items-center justify-center bg-gray-100">
        <img
          src={image}
          alt={title}
          className="max-h-full max-w-full object-contain p-3 transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-3 text-gray-800">
          {title}
        </h3>

        <p className="text-gray-600 leading-7">
          {description}
        </p>
      </div>

    </div>
  );
};

export default ServiceCard;