import { Link } from "react-router-dom";

const ProductCard = ({ image, title, description }) => {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">

      {/* Image */}
      <div className="h-64 flex items-center justify-center bg-gray-100">
        <img
          src={image}
          alt={title}
          className="max-h-full max-w-full object-contain p-3 transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-6">

        <h3 className="text-2xl font-bold text-gray-800 mb-3">
          {title}
        </h3>

        <p className="text-gray-600 mb-6">
          {description}
        </p>

        <Link
          to="/products"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
        >
          View Details
        </Link>

      </div>
    </div>
  );
};

export default ProductCard;