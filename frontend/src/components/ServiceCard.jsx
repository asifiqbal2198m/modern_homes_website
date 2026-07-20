const ServiceCard = ({ title, description, image }) => {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">

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