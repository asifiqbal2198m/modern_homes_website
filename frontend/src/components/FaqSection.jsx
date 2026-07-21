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
    <section className="bg-luxury-cream py-24 border-b border-luxury-gold/15 relative isolate overflow-hidden">
      <div className="gold-glow-blob -right-48 -top-48 w-96 h-96" />
      <div className="gold-glow-blob -left-48 -bottom-48 w-96 h-96" />

      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[.8fr_1.2fr] relative z-10">
        <div className="flex flex-col justify-center reveal-on-scroll">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-luxury-bronze">Helpful answers</p>
          <h2 className="mt-3 font-serif text-4xl font-normal tracking-tight text-luxury-charcoal sm:text-5xl leading-tight">Questions, Answered.</h2>
          <p className="mt-4 max-w-md text-base text-slate-400 font-light leading-relaxed">Everything you need to know before starting your next interior decoration project.</p>
          <Link to="/contact" className="mt-8 w-fit rounded-full bg-luxury-bronze hover:bg-luxury-gold text-white px-7 py-3.5 text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-md">
            Ask a question
          </Link>
        </div>
        <div className="divide-y divide-luxury-gold/10 rounded-[2rem] border border-luxury-gold/15 px-8 bg-luxury-warm-gray shadow-xl reveal-on-scroll">
          {faqs.map(([question, answer], index) => {
            const isOpen = openIndex === index;
            return (
              <div key={question} className="overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="flex w-full items-center justify-between gap-5 py-6 text-left font-serif text-lg font-bold text-luxury-charcoal hover:text-luxury-bronze transition-colors duration-200"
                  aria-expanded={isOpen}
                >
                  <span>{question}</span>
                  <span className={`text-sm text-luxury-gold transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}>
                    ✦
                  </span>
                </button>
                <div
                  className={`transition-all duration-300 ${
                    isOpen ? "max-h-40 pb-6 opacity-100" : "max-h-0 opacity-0 pointer-events-none"
                  }`}
                >
                  <p className="max-w-2xl text-sm leading-relaxed text-slate-400 font-light">
                    {answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
