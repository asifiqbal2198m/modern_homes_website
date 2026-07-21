import { useState } from "react";
import { Link } from "react-router-dom";
import { demoProjects } from "../data/demoProjects";

const BeforeAfterShowcase = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [position, setPosition] = useState(50);
  const project = demoProjects[activeIndex];

  return (
    <section className="bg-luxury-cream py-24 border-y border-luxury-gold/15 relative isolate overflow-hidden">
      <div className="gold-glow-blob -left-48 -top-48 w-96 h-96" />
      <div className="gold-glow-blob -right-48 -bottom-48 w-96 h-96" />

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <div className="mx-auto max-w-2xl text-center mb-16 reveal-on-scroll">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-luxury-bronze">See the difference</p>
          <h2 className="mt-3 font-serif text-4xl font-normal tracking-tight text-luxury-charcoal sm:text-5xl">Drag to reveal the transformation.</h2>
          <p className="mt-4 text-base text-slate-400 font-light">These demo project visuals show how the right finishes can completely change the feeling of a space.</p>
        </div>

        <div className="mt-10 overflow-hidden rounded-[2.5rem] bg-luxury-warm-gray p-4 shadow-2xl border border-luxury-gold/10 reveal-on-scroll">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] sm:aspect-[16/8]">
            <img src={project.after} alt={`${project.title} after`} className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${position}%` }}>
              <img src={project.before} alt={`${project.title} before`} className="h-full max-w-none object-cover" style={{ width: "100vw", maxWidth: "none" }} />
            </div>
            <div className="pointer-events-none absolute inset-y-0 w-0.5 bg-luxury-gold shadow-[0_0_12px_rgba(197,168,128,0.6)]" style={{ left: `${position}%` }}>
              <span className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-luxury-cream text-luxury-bronze border-2 border-luxury-gold text-xs font-bold shadow-lg">✦</span>
            </div>
            <span className="absolute left-6 top-6 rounded-full bg-luxury-dark-blue/80 border border-white/20 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-sm">Before</span>
            <span className="absolute right-6 top-6 rounded-full bg-luxury-cream/95 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-widest text-luxury-charcoal shadow-sm border border-luxury-gold/20">After</span>
            <input aria-label="Compare before and after" type="range" min="0" max="100" value={position} onChange={(event) => setPosition(event.target.value)} className="absolute inset-0 z-10 h-full w-full cursor-ew-resize opacity-0" />
          </div>
          <div className="flex flex-col gap-6 px-4 pb-4 pt-8 text-white sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-luxury-gold">{project.type} · Demo concept</p>
              <h3 className="mt-2 font-serif text-2xl font-normal text-slate-100">{project.title}</h3>
            </div>
            <Link to={`/projects/${project.slug}`} className="w-fit rounded-full bg-luxury-gold hover:bg-luxury-gold-dark text-luxury-dark-blue px-7 py-3.5 text-xs font-bold tracking-widest uppercase transition duration-300 shadow-md hover:-translate-y-0.5">
              Explore project story
            </Link>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3 reveal-on-scroll">
          {demoProjects.map((item, index) => (
            <button
              key={item.slug}
              type="button"
              onClick={() => { setActiveIndex(index); setPosition(50); }}
              className={`rounded-2xl border p-5 text-left transition duration-300 cursor-pointer ${
                activeIndex === index
                  ? "border-luxury-gold bg-luxury-warm-gray text-luxury-bronze shadow-md"
                  : "border-luxury-sand bg-luxury-cream text-slate-400 hover:border-luxury-gold/50"
              }`}
            >
              <span className="block text-[10px] font-bold uppercase tracking-wider text-luxury-bronze">{item.type}</span>
              <span className="mt-2 block font-serif font-bold text-luxury-charcoal">{item.title}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterShowcase;
