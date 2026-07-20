const steps = [
  { number: "01", title: "Tell us your vision", text: "Share your room, requirements, style preferences, and budget in a free consultation." },
  { number: "02", title: "Choose with confidence", text: "Explore curated materials and receive practical guidance on colours, textures, and finishes." },
  { number: "03", title: "Expert installation", text: "Our team plans the details and installs every element with care and precision." },
  { number: "04", title: "Enjoy the result", text: "Walk into a finished space that feels personal, practical, and built for everyday life." },
];

const ProcessSection = () => (
  <section className="bg-slate-50 py-20">
    <div className="mx-auto max-w-7xl px-6">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-600">A simple process</p>
        <h2 className="mt-3 text-4xl font-bold tracking-tight text-slate-900">From inspiration to installation.</h2>
        <p className="mt-4 text-lg leading-8 text-slate-600">Clear guidance at every stage—so creating your space feels as enjoyable as living in it.</p>
      </div>
      <ol className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((step) => (
          <li key={step.number} className="relative rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
            <span className="text-5xl font-bold tracking-tight text-blue-100">{step.number}</span>
            <h3 className="mt-6 text-xl font-semibold text-slate-900">{step.title}</h3>
            <p className="mt-3 leading-7 text-slate-600">{step.text}</p>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

export default ProcessSection;
