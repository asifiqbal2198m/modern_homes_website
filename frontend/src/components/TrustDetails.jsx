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
  <section className="bg-white py-20">
    <div className="mx-auto max-w-7xl px-6">
      <div className="mx-auto max-w-3xl text-center">
        <p className="font-semibold uppercase tracking-[0.2em] text-blue-600">Why clients choose us</p>
        <h2 className="mt-3 text-4xl font-bold text-slate-900">Interior solutions with confidence</h2>
        <p className="mt-4 text-slate-600">
          Personal service, dependable workmanship, and premium materials for every space.
        </p>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {trustDetails.map((item) => (
          <article key={item.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
            <p className="mt-2 leading-7 text-slate-600">{item.detail}</p>
          </article>
        ))}
      </div>

      <p className="mt-8 text-center text-sm text-slate-500">
        Visit our Magam showroom or contact us to arrange a consultation.
      </p>
    </div>
  </section>
);

export default TrustDetails;
