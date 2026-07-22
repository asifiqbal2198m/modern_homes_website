import { Link, NavLink } from "react-router-dom";
import { useState } from "react";

import logo from "../assets/images/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinkClass = ({ isActive }) =>
    `text-sm font-bold tracking-wider uppercase transition-all duration-300 pb-1 border-b-2 ${
      isActive
        ? "text-luxury-bronze border-luxury-gold font-semibold"
        : "text-slate-600 hover:text-luxury-bronze border-transparent hover:border-luxury-gold/40"
    }`;

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-luxury-cream/85 border-b border-luxury-gold/15 shadow-sm transition-luxury">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-20">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img src={logo} alt="Modern Homes Magam Logo" className="h-11 w-11 object-contain rounded-full shadow-sm group-hover:scale-105 transition-transform duration-300" />
            <div className="flex flex-col">
              <span className="text-lg md:text-xl font-bold font-serif tracking-widest text-luxury-bronze leading-none">MODERN HOMES</span>
              <span className="text-[10px] font-bold tracking-[0.25em] text-luxury-gold uppercase mt-0.5">MAGAM</span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">

            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>

            <NavLink to="/about" className={navLinkClass}>
              About
            </NavLink>

            <NavLink to="/products" className={navLinkClass}>
              Products
            </NavLink>

            <NavLink to="/services" className={navLinkClass}>
              Services
            </NavLink>

            <NavLink to="/gallery" className={navLinkClass}>
              Gallery
            </NavLink>

            <NavLink to="/posts" className={navLinkClass}>
              Posts
            </NavLink>

            <NavLink to="/contact" className={navLinkClass}>
              Contact
            </NavLink>

            <NavLink to="/admin" className={navLinkClass}>
              Admin
            </NavLink>

            <Link
              to="/contact"
              className="rounded-full bg-luxury-bronze hover:bg-luxury-gold text-white px-6 py-2.5 text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              Free Consultation
            </Link>

          </div>

          {/* Mobile Button */}
          <button
            className="md:hidden text-2xl text-luxury-bronze p-2 hover:bg-luxury-warm-gray rounded-xl transition"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Navigation"
          >
            {isOpen ? "✕" : "☰"}
          </button>

        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden flex flex-col gap-5 border-t border-luxury-gold/10 py-6 animate-fade-up">

            <NavLink to="/" className={navLinkClass} onClick={() => setIsOpen(false)}>
              Home
            </NavLink>

            <NavLink to="/about" className={navLinkClass} onClick={() => setIsOpen(false)}>
              About
            </NavLink>

            <NavLink to="/products" className={navLinkClass} onClick={() => setIsOpen(false)}>
              Products
            </NavLink>

            <NavLink to="/services" className={navLinkClass} onClick={() => setIsOpen(false)}>
              Services
            </NavLink>

            <NavLink to="/gallery" className={navLinkClass} onClick={() => setIsOpen(false)}>
              Gallery
            </NavLink>

            <NavLink to="/posts" className={navLinkClass} onClick={() => setIsOpen(false)}>
              Posts
            </NavLink>

            <NavLink to="/contact" className={navLinkClass} onClick={() => setIsOpen(false)}>
              Contact
            </NavLink>

            <NavLink to="/admin" className={navLinkClass} onClick={() => setIsOpen(false)}>
              Admin
            </NavLink>

            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className="rounded-full bg-luxury-bronze hover:bg-luxury-gold text-white px-6 py-3 text-center text-xs font-bold tracking-widest uppercase transition shadow-md"
            >
              Free Consultation
            </Link>

          </div>
        )}

      </div>
    </nav>
  );
};

export default Navbar;
