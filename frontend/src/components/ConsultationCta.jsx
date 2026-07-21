import { Link } from "react-router-dom";

const ConsultationCta = () => (
  <section className="bg-luxury-cream py-16">
    <div className="mx-auto max-w-7xl px-6">
      <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-luxury-charcoal via-luxury-dark-blue to-luxury-obsidian px-7 py-10 text-white shadow-xl sm:px-12 sm:py-12 border border-luxury-gold/15">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-luxury-gold">Start with a conversation</p>
            <h2 className="mt-3 font-serif text-3xl font-normal text-slate-100 sm:text-4xl">Planning a refresh? Book your free consultation.</h2>
            <p className="mt-3 max-w-2xl text-slate-300 font-light">Tell us about your room, style, and budget. We will help you find the right materials and installation solution.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/contact" className="rounded-full bg-luxury-bronze hover:bg-luxury-gold text-white px-7 py-3 text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-md">Request a visit</Link>
            <a href="tel:+919906232020" className="rounded-full border border-white/20 hover:border-luxury-gold hover:bg-white/5 px-7 py-3 text-xs font-bold tracking-widest uppercase transition-all duration-300">Call +91 99062 32020</a>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default ConsultationCta;
