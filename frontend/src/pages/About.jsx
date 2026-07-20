import PageMeta from "../components/PageMeta";

const About = () => {
  return (
    <section className="bg-white py-20">
      <PageMeta title="About Us" description="Learn about Modern Homes Interior Decor, an established Magam-based provider of premium surfaces, decor, glass, and turnkey interior solutions." />
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">
              About Us
            </p>
            <h1 className="text-4xl font-bold text-gray-800 sm:text-5xl">
              We create beautiful interiors with premium quality and care.
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Established in 2021, Modern Homes Interior Decor is a Magam-based company serving Srinagar and districts across Kashmir. We provide high-quality interior products and professional installation services for residential and commercial spaces.
            </p>
          </div>

          <div className="rounded-3xl bg-slate-100 p-8 shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800">Why clients trust us</h2>
            <ul className="mt-6 space-y-4 text-gray-700">
              <li>• Premium wallpaper, curtains, upholstery, flooring, and glass solutions</li>
              <li>• Skilled installation with attention to every detail</li>
              <li>• Personalized recommendations for homes, offices, and commercial spaces</li>
              <li>• Turnkey coordination from consultation through completion</li>
            </ul>
            <div className="mt-6 rounded-2xl border border-blue-100 bg-white p-5 text-gray-700">
              <p className="font-semibold text-slate-900">Authorised brands and reliable materials</p>
              <p className="mt-2 leading-7">
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
