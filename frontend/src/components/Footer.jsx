import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-luxury-dark-blue text-white mt-20 border-t border-luxury-gold/20">
      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid md:grid-cols-3 gap-12">

          {/* Company */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold font-serif tracking-widest text-luxury-gold">
              MODERN HOMES
            </h2>
            <p className="text-slate-400 leading-7 text-sm font-light">
              We provide premium wallpapers, flooring, blinds, curtains, carpets, and turnkey interior decoration solutions. Authorized Excel partner, dedicated to excellence in Kashmir.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-bold tracking-widest text-luxury-gold uppercase mb-6">
              Quick Links
            </h3>
            <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm font-light text-slate-300">
              <Link to="/" className="hover:text-luxury-gold transition-colors duration-200">Home</Link>
              <Link to="/about" className="hover:text-luxury-gold transition-colors duration-200">About</Link>
              <Link to="/products" className="hover:text-luxury-gold transition-colors duration-200">Products</Link>
              <Link to="/services" className="hover:text-luxury-gold transition-colors duration-200">Services</Link>
              <Link to="/gallery" className="hover:text-luxury-gold transition-colors duration-200">Gallery</Link>
              <Link to="/contact" className="hover:text-luxury-gold transition-colors duration-200">Contact</Link>
              <Link to="/posts" className="hover:text-luxury-gold transition-colors duration-200">Posts</Link>
              <Link to="/admin" className="hover:text-luxury-gold transition-colors duration-200">Admin</Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-bold tracking-widest text-luxury-gold uppercase mb-6">
              Contact & Hours
            </h3>
            <div className="space-y-3 text-sm font-light text-slate-300">
              <p>Email: <a href="mailto:info@modernhomes.com" className="hover:text-luxury-gold transition-colors">info@modernhomes.com</a></p>
              <p>Phone: <a href="tel:+919906232020" className="font-semibold text-luxury-gold hover:text-white transition-colors">+91 99062 32020</a></p>
              <p>
                <a 
                  href="https://wa.me/919906232020" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase text-green-400 hover:text-green-300 transition-colors"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" /> WhatsApp Chat
                </a>
              </p>
              <p className="leading-6">
                Matto Complex, Gulmarg Road, Magam, Jammu & Kashmir 193401
              </p>
              <p className="text-xs text-slate-400 mt-2">
                Mon–Sat: 9 am–7 pm · Sun: Closed
              </p>
            </div>
          </div>

        </div>

        <hr className="my-10 border-luxury-gold/10" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500 font-light">
          <div>
            © {new Date().getFullYear()} Modern Homes. All Rights Reserved.
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-300">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
