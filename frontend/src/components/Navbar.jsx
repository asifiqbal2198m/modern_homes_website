import { Link, NavLink } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-blue-600 font-semibold"
      : "text-gray-700 hover:text-blue-600 transition";

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-blue-600">
            Modern Homes
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
              className="rounded-full bg-blue-600 px-5 py-2 font-semibold text-white transition hover:bg-blue-700"
            >
              Free Consultation
            </Link>

          </div>

          {/* Mobile Button */}
          <button
            className="md:hidden text-3xl"
            onClick={() => setIsOpen(!isOpen)}
          >
            ☰
          </button>

        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden flex flex-col gap-4 border-t border-slate-200 py-4">

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

          </div>
        )}

      </div>
    </nav>
  );
};

export default Navbar;
