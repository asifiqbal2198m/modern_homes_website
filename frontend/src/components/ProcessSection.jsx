const steps = [
  { number: "01", title: "Tell us your vision", text: "Share your room, requirements, style preferences, and budget in a free consultation." },
  { number: "02", title: "Choose with confidence", text: "Explore curated materials and receive practical guidance on colours, textures, and finishes." },
  { number: "03", title: "Expert installation", text: "Our team plans the details and installs every element with care and precision." },
  { number: "04", title: "Enjoy the result", text: "Walk into a finished space that feels personal, practical, and built for everyday life." },
];

const ProcessSection = () => (
  <section className="bg-luxury-warm-gray/25 py-24 border-b border-luxury-gold/15">
    <div className="mx-auto max-w-7xl px-6">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-luxury-bronze">A simple process</p>
        <h2 className="mt-3 font-serif text-4xl font-normal text-luxury-charcoal sm:text-5xl">From Inspiration to Installation</h2>
        <p className="mt-4 text-slate-500 font-light">Clear guidance at every stage—so creating your space feels as enjoyable as living in it.</p>
      </div>
      <ol className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((step) => (
          <li key={step.number} className="relative rounded-3xl border border-luxury-gold/10 bg-white p-8 luxury-card-glow flex flex-col justify-between">
            <div>
              <span className="text-5xl font-bold font-serif tracking-tight text-luxury-gold/25 select-none">{step.number}</span>
              <h3 className="mt-6 text-xl font-bold font-serif text-luxury-charcoal">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-500 font-light">{step.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

export default ProcessSection;
