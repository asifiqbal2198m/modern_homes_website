const trustDetails = [
  {
    title: "Established in 2021",
    detail: "Delivering considered interior solutions for homes and commercial spaces across Kashmir.",
  },
  {
    title: "Authorised Excel distributor",
    detail: "Offering Excel Home Decor’s complete range of premium fabrics, designer wallpapers, and flooring.",
  },
  {
    title: "Trusted product brands",
    detail: "Hardwyn glass hardware, Greenpanel boards, and Everest products for dependable finishes.",
  },
  {
    title: "Convenient showroom hours",
    detail: "Open Monday to Saturday, 9 am to 7 pm. Closed on Sundays.",
  },
];

const TrustDetails = () => (
  <section className="bg-luxury-cream py-24 border-b border-luxury-gold/15">
    <div className="mx-auto max-w-7xl px-6">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-luxury-bronze">Why clients choose us</p>
        <h2 className="mt-3 font-serif text-4xl font-normal text-luxury-charcoal sm:text-5xl">Interior Solutions with Confidence</h2>
        <p className="mt-4 text-slate-500 font-light">
          Personal service, dependable workmanship, and premium materials for every space.
        </p>
      </div>

      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {trustDetails.map((item) => (
          <article key={item.title} className="rounded-3xl border border-luxury-gold/10 bg-white p-8 luxury-card-glow flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold font-serif text-luxury-charcoal">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-500 font-light">{item.detail}</p>
            </div>
          </article>
        ))}
      </div>

      <p className="mt-10 text-center text-sm text-slate-400 font-light">
        Visit our Magam showroom or contact us to arrange a consultation.
      </p>
    </div>
  </section>
);

export default TrustDetails;
