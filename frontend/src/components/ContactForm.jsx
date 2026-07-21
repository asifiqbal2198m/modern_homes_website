import { useState } from "react";
import { sendContactMessage } from "../services/contentApi";

const ContactForm = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  const validate = () => {
    const errors = {};
    if (!form.name.trim()) errors.name = "Name is required.";
    if (!form.email.trim()) {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      errors.email = "Email address is invalid.";
    }
    if (!form.message.trim()) errors.message = "Message is required.";
    return errors;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("");
    setError("");
    setFieldErrors({});

    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setIsSubmitting(true);

    try {
      await sendContactMessage(form);
      setStatus("Thank you! Your inquiry was sent successfully. We will get in touch soon.");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      setError(err.message || "Something went wrong. Please check your credentials or try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-luxury-cream py-24 border-y border-luxury-gold/15">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2">
        <div className="flex flex-col justify-center reveal-on-scroll">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-luxury-bronze">
            Get In Touch
          </p>
          <h2 className="font-serif text-4xl font-normal text-luxury-charcoal sm:text-5xl leading-tight">
            Let’s Create Your Dream Interior
          </h2>
          <p className="mt-6 text-base text-slate-400 font-light leading-relaxed">
            Reach out for product inquiries, showroom visits, installation support, or a free design consultation for your home or office.
          </p>

          <div className="mt-10 space-y-6 text-sm font-light text-slate-400">
            <div className="border-l-2 border-luxury-gold pl-4 space-y-2">
              <p className="font-serif text-lg font-bold text-luxury-charcoal">Modern Homes Interior Decor</p>
              <p className="text-xs uppercase tracking-wider font-bold text-luxury-bronze">Established 2021 · Authorized Excel Distributor</p>
            </div>
            
            <div className="space-y-2">
              <p>Matto Complex, Gulmarg Road, Magam, Jammu & Kashmir 193401</p>
              <p><strong>Hours:</strong> Mon–Sat, 9 am–7 pm · Sunday, Closed</p>
              <p>
                <strong>Call:</strong>{" "}
                <a href="tel:+919906232020" className="font-semibold text-luxury-gold hover:underline">+91 99062 32020</a>
              </p>
              <p><strong>Email:</strong> info@modernhomes.com</p>
            </div>

            <a
              href="https://wa.me/919906232020?text=Hello%20Modern%20Homes%2C%20I%20would%20like%20to%20book%20a%20consultation."
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-green-600 px-8 py-3.5 text-xs font-bold tracking-widest uppercase text-white transition hover:bg-green-700 shadow-md hover:-translate-y-0.5 cursor-pointer"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="rounded-[2.5rem] border border-luxury-gold/15 bg-luxury-warm-gray p-8 sm:p-10 shadow-xl reveal-on-scroll">
          <div className="mb-5">
            <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-300">Your Name</label>
            <input
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full rounded-xl border border-luxury-sand bg-luxury-cream/40 px-4 py-3.5 text-sm font-normal text-slate-200 placeholder:text-slate-500 outline-none focus:border-luxury-gold focus:ring-1 focus:ring-luxury-gold transition duration-300"
              required
            />
            {fieldErrors.name && <p className="mt-2 text-xs text-red-400 font-medium">{fieldErrors.name}</p>}
          </div>

          <div className="mb-5">
            <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-300">Email Address</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full rounded-xl border border-luxury-sand bg-luxury-cream/40 px-4 py-3.5 text-sm font-normal text-slate-200 placeholder:text-slate-500 outline-none focus:border-luxury-gold focus:ring-1 focus:ring-luxury-gold transition duration-300"
              required
            />
            {fieldErrors.email && <p className="mt-2 text-xs text-red-400 font-medium">{fieldErrors.email}</p>}
          </div>

          <div className="mb-5">
            <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-300">Phone Number</label>
            <input
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              className="w-full rounded-xl border border-luxury-sand bg-luxury-cream/40 px-4 py-3.5 text-sm font-normal text-slate-200 placeholder:text-slate-500 outline-none focus:border-luxury-gold focus:ring-1 focus:ring-luxury-gold transition duration-300"
            />
          </div>

          <div className="mb-5">
            <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-300">Your Message</label>
            <textarea
              name="message"
              rows="4"
              value={form.message}
              onChange={handleChange}
              placeholder="Tell us about your project"
              className="w-full rounded-xl border border-luxury-sand bg-luxury-cream/40 px-4 py-3.5 text-sm font-normal text-slate-200 placeholder:text-slate-500 outline-none focus:border-luxury-gold focus:ring-1 focus:ring-luxury-gold transition duration-300"
              required
            />
            {fieldErrors.message && <p className="mt-2 text-xs text-red-400 font-medium">{fieldErrors.message}</p>}
          </div>

          {status && <p role="status" className="mb-5 rounded-xl bg-green-950/40 border border-green-500/30 px-4 py-3 text-sm text-green-400 font-light">{status}</p>}
          {error && <p role="alert" className="mb-5 rounded-xl bg-red-950/40 border border-red-500/30 px-4 py-3 text-sm text-red-400 font-light">{error}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-full bg-luxury-bronze hover:bg-luxury-gold text-white px-6 py-4 text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-md hover:-translate-y-0.5 active:translate-y-0 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:translate-y-0 cursor-pointer text-center"
          >
            {isSubmitting ? 'Sending...' : 'Request a Free Consultation'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
