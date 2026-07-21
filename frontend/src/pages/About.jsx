import PageMeta from "../components/PageMeta";

const About = () => {
  return (
    <section className="bg-luxury-warm-gray/20 py-24 border-b border-luxury-gold/15 min-h-[75vh]">
      <PageMeta title="About Us" description="Learn about Modern Homes Interior Decor, an established Magam-based provider of premium surfaces, decor, glass, and turnkey interior solutions." />
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-luxury-bronze">
              About Us
            </p>
            <h1 className="font-serif text-4xl font-normal text-luxury-charcoal sm:text-5xl leading-tight">
              We create beautiful interiors with premium quality and care.
            </h1>
            <p className="mt-6 text-base text-slate-500 font-light leading-relaxed">
              Established in 2021, Modern Homes Interior Decor is a Magam-based company serving Srinagar and districts across Kashmir. We provide high-quality interior products and professional installation services for residential and commercial spaces.
            </p>
          </div>

          <div className="rounded-[2.5rem] border border-luxury-gold/15 bg-white p-8 sm:p-10 shadow-xl shadow-luxury-gold/5">
            <h2 className="font-serif text-2xl font-normal text-luxury-charcoal mb-6">Why clients trust us</h2>
            <ul className="space-y-4 text-sm font-light text-slate-600">
              <li className="flex items-start gap-2.5">
                <span className="text-luxury-gold mt-1">✦</span>
                <span>Premium wallpaper, curtains, upholstery, flooring, and glass solutions</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-luxury-gold mt-1">✦</span>
                <span>Skilled installation with attention to every detail</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-luxury-gold mt-1">✦</span>
                <span>Personalized recommendations for homes, offices, and commercial spaces</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-luxury-gold mt-1">✦</span>
                <span>Turnkey coordination from consultation through completion</span>
              </li>
            </ul>
            <div className="mt-8 rounded-2xl border border-luxury-gold/20 bg-luxury-warm-gray/30 p-6 text-slate-700">
              <p className="font-serif font-bold text-luxury-bronze mb-2">Authorised brands and reliable materials</p>
              <p className="text-sm font-light leading-relaxed text-slate-600">
                We are authorised distributors of Excel Home Decor for premium fabrics, designer wallpapers, and flooring. Our range also includes Hardwyn toughened-glass hardware, Greenpanel boards, and Everest products.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
