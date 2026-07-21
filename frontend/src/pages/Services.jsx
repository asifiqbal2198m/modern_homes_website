import PageMeta from "../components/PageMeta";

const Services = () => {
  return (
    <section className="bg-luxury-warm-gray/20 py-24 border-b border-luxury-gold/15 min-h-[75vh]">
      <PageMeta title="Interior Services" description="Modern Homes Interior Decor offers design consultation, installation support, after-sales care, and turnkey interior services in Kashmir." />
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-luxury-bronze">
            Our Services
          </p>
          <h1 className="font-serif text-4xl font-normal text-luxury-charcoal sm:text-5xl leading-tight">
            Complete interior solutions from consultation to installation.
          </h1>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="rounded-[2rem] bg-white p-10 border border-luxury-gold/10 luxury-card-glow">
            <span className="text-[10px] font-bold uppercase tracking-widest text-luxury-gold mb-4 block">Phase 01</span>
            <h3 className="text-xl font-bold font-serif text-luxury-charcoal mb-3">Design Consultation</h3>
            <p className="text-slate-500 text-sm font-light leading-relaxed">We help you select the right materials, colors, and style for your space.</p>
          </div>
          <div className="rounded-[2rem] bg-white p-10 border border-luxury-gold/10 luxury-card-glow">
            <span className="text-[10px] font-bold uppercase tracking-widest text-luxury-gold mb-4 block">Phase 02</span>
            <h3 className="text-xl font-bold font-serif text-luxury-charcoal mb-3">Installation Support</h3>
            <p className="text-slate-500 text-sm font-light leading-relaxed">Our team ensures every product is installed with care and precision.</p>
          </div>
          <div className="rounded-[2rem] bg-white p-10 border border-luxury-gold/10 luxury-card-glow">
            <span className="text-[10px] font-bold uppercase tracking-widest text-luxury-gold mb-4 block">Phase 03</span>
            <h3 className="text-xl font-bold font-serif text-luxury-charcoal mb-3">After-Sales Care</h3>
            <p className="text-slate-500 text-sm font-light leading-relaxed">We remain available for support and guidance even after your project is complete.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
