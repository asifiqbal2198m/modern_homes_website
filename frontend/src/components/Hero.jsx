import { Link } from "react-router-dom";
import WhyChooseUs from "./WhyChooseUs";

const Hero = () => {
  return (
    <section className="bg-gradient-to-r from-slate-900 via-slate-800 to-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left Content */}
          <div>
            <p className="text-blue-400 uppercase tracking-widest font-semibold mb-3">
              Welcome to Modern Homes
            </p>

            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
              Transform Your Home with
              <span className="text-blue-400"> Premium Interior Solutions</span>
            </h1>

            <p className="mt-6 text-gray-300 text-lg leading-8">
              Discover premium wallpapers, blinds, curtains, wooden flooring,
              carpets, artificial grass, PVC flooring, and elegant home décor
              designed to enhance every space.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/products"
                className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition"
              >
                Explore Products
              </Link>

              <Link
                to="/contact"
                className="border border-white hover:bg-white hover:text-black px-6 py-3 rounded-lg font-semibold transition"
              >
                Contact Us
              </Link>
            </div>
          </div>

          {/* Right Content */}
          <div className="flex justify-center">
            <WhyChooseUs compact />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;