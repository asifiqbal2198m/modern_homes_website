import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">

        <div className="grid md:grid-cols-3 gap-10">

          {/* Company */}

          <div>
            <h2 className="text-2xl font-bold mb-4">
              Modern Homes
            </h2>

            <p className="text-gray-400">
              We provide premium wallpapers, flooring,
              blinds, curtains, carpets and interior
              decoration solutions for homes and offices.
            </p>
          </div>

          {/* Quick Links */}

          <div>

            <h3 className="text-xl font-semibold mb-4">
              Quick Links
            </h3>

            <div className="flex flex-col gap-2">

              <Link to="/">Home</Link>

              <Link to="/about">About</Link>

              <Link to="/products">Products</Link>

              <Link to="/services">Services</Link>

              <Link to="/gallery">Gallery</Link>

              <Link to="/contact">Contact</Link>

            </div>

          </div>

          {/* Contact */}

          <div>

            <h3 className="text-xl font-semibold mb-4">
              Contact
            </h3>

            <p>Email: info@modernhomes.com</p>

            <p className="mt-2">
              Phone: +91 9876543210
            </p>

            <p className="mt-2">
              Srinagar, Jammu & Kashmir
            </p>

          </div>

        </div>

        <hr className="my-8 border-gray-700" />

        <div className="text-center text-gray-400">
          © {new Date().getFullYear()} Modern Homes. All Rights Reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;