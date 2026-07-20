import { Link } from "react-router-dom";

const ConsultationCta = () => (
  <section className="bg-white py-16">
    <div className="mx-auto max-w-7xl px-6">
      <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-blue-700 via-blue-600 to-slate-900 px-7 py-10 text-white shadow-xl sm:px-12 sm:py-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-100">Start with a conversation</p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Planning a refresh? Book your free consultation.</h2>
            <p className="mt-3 max-w-2xl text-lg leading-8 text-blue-50">Tell us about your room, style, and budget. We will help you find the right materials and installation solution.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/contact" className="rounded-full bg-white px-6 py-3 font-semibold text-blue-700 transition hover:bg-blue-50">Request a visit</Link>
            <a href="tel:+919906232020" className="rounded-full border border-white/50 px-6 py-3 font-semibold transition hover:bg-white/10">Call +91 99062 32020</a>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default ConsultationCta;
