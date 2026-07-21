const QualityIcon = () => (
  <svg className="w-6 h-6 text-luxury-bronze" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
  </svg>
);

const InstallationIcon = () => (
  <svg className="w-6 h-6 text-luxury-bronze" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
  </svg>
);

const PriceIcon = () => (
  <svg className="w-6 h-6 text-luxury-bronze" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
  </svg>
);

const SatisfyIcon = () => (
  <svg className="w-6 h-6 text-luxury-bronze" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
  </svg>
);

const RangeIcon = () => (
  <svg className="w-6 h-6 text-luxury-bronze" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
  </svg>
);

const TrustIcon = () => (
  <svg className="w-6 h-6 text-luxury-bronze" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
  </svg>
);

const features = [
  {
    icon: <QualityIcon />,
    title: "Premium Quality",
    description:
      "We provide only high-quality interior products from trusted brands.",
  },
  {
    icon: <InstallationIcon />,
    title: "Expert Installation",
    description:
      "Professional installation services with attention to every detail.",
  },
  {
    icon: <PriceIcon />,
    title: "Affordable Pricing",
    description:
      "Competitive prices without compromising on quality.",
  },
  {
    icon: <SatisfyIcon />,
    title: "Customer Satisfaction",
    description:
      "Our priority is delivering the best experience to every customer.",
  },
  {
    icon: <RangeIcon />,
    title: "Wide Product Range",
    description:
      "Wallpapers, flooring, curtains, blinds, carpets and much more.",
  },
  {
    icon: <TrustIcon />,
    title: "Trusted Service",
    description:
      "Building long-term relationships through honesty and reliability.",
  },
];

const WhyChooseUs = ({ compact = false }) => {
  if (compact) {
    return (
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-10 w-full max-w-md shadow-xl text-white">
        <h2 className="font-serif text-3xl font-normal mb-6">Why Choose Us?</h2>

        <ul className="space-y-4 text-sm font-light">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-3">
              <span className="text-luxury-gold text-lg">✦</span>
              <span>{feature.title}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <section className="py-24 bg-luxury-warm-gray/20">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-luxury-bronze">
            Our Standards
          </p>
          <h2 className="font-serif text-4xl font-normal text-luxury-charcoal sm:text-5xl">
            Why Choose Modern Homes?
          </h2>
          <p className="mt-4 text-slate-500 font-light">
            We combine premium products, expert craftsmanship, and reliable services to create beautiful, customized interiors.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl border border-luxury-gold/10 p-8 luxury-card-glow"
            >
              <div className="w-12 h-12 rounded-2xl bg-luxury-warm-gray flex items-center justify-center mb-6">
                {feature.icon}
              </div>

              <h3 className="text-xl font-bold font-serif mb-3 text-luxury-charcoal">
                {feature.title}
              </h3>

              <p className="text-slate-500 text-sm font-light leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;