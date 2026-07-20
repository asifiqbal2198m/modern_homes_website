import { useState } from "react";
import { Link } from "react-router-dom";

const faqs = [
  ["Do you offer a free consultation?", "Yes. Tell us about your space and requirements, and we will help you choose the right materials and services before you commit."],
  ["Can you help with both products and installation?", "Yes. We supply selected interior products and offer professional installation for services including flooring, blinds, curtains, wallpapers, and more."],
  ["Which areas do you serve?", "We welcome customers at our Magam showroom and serve homes and commercial spaces across Kashmir. Contact us for availability at your location."],
  ["How do I choose the right material?", "We will guide you through practical factors such as durability, maintenance, lighting, budget, and the overall look you want to create."],
];

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(0);
  return (
    <section className="bg-white py-20">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[.8fr_1.2fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-600">Helpful answers</p>
          <h2 className="mt-3 text-4xl font-bold tracking-tight text-slate-900">Questions, answered.</h2>
          <p className="mt-4 max-w-md text-lg leading-8 text-slate-600">Everything you need to know before starting your next interior project.</p>
          <Link to="/contact" className="mt-7 inline-flex rounded-full bg-slate-900 px-5 py-3 font-semibold text-white transition hover:bg-blue-700">Ask a question</Link>
        </div>
        <div className="divide-y divide-slate-200 rounded-3xl border border-slate-200 px-6">
          {faqs.map(([question, answer], index) => {
            const isOpen = openIndex === index;
            return (
              <div key={question}>
                <button type="button" onClick={() => setOpenIndex(isOpen ? -1 : index)} className="flex w-full items-center justify-between gap-5 py-6 text-left text-lg font-semibold text-slate-900" aria-expanded={isOpen}>
                  {question}<span className="text-2xl font-normal text-blue-600">{isOpen ? "−" : "+"}</span>
                </button>
                {isOpen && <p className="max-w-2xl pb-6 leading-7 text-slate-600">{answer}</p>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
