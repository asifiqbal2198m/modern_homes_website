import PageMeta from "../components/PageMeta";

const Services = () => {
  return (
    <section className="bg-white py-20">
      <PageMeta title="Interior Services" description="Modern Homes Interior Decor offers design consultation, installation support, after-sales care, and turnkey interior services in Kashmir." />
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">
            Our Services
          </p>
          <h1 className="text-4xl font-bold text-gray-800 sm:text-5xl">
            Complete interior solutions from consultation to installation.
          </h1>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="rounded-3xl bg-slate-100 p-8 shadow-md">
            <h3 className="text-2xl font-semibold text-gray-800">Design Consultation</h3>
            <p className="mt-4 text-gray-600">We help you select the right materials, colors, and style for your space.</p>
          </div>
          <div className="rounded-3xl bg-slate-100 p-8 shadow-md">
            <h3 className="text-2xl font-semibold text-gray-800">Installation Support</h3>
            <p className="mt-4 text-gray-600">Our team ensures every product is installed with care and precision.</p>
          </div>
          <div className="rounded-3xl bg-slate-100 p-8 shadow-md">
            <h3 className="text-2xl font-semibold text-gray-800">After-Sales Care</h3>
            <p className="mt-4 text-gray-600">We remain available for support and guidance even after your project is complete.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
