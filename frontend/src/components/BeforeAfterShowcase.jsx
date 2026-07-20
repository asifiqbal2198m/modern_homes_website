import { useState } from "react";
import { Link } from "react-router-dom";
import { demoProjects } from "../data/demoProjects";

const BeforeAfterShowcase = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [position, setPosition] = useState(50);
  const project = demoProjects[activeIndex];

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-600">See the difference</p>
          <h2 className="mt-3 text-4xl font-bold tracking-tight text-slate-900">Drag to reveal the transformation.</h2>
          <p className="mt-4 text-lg leading-8 text-slate-600">These demo project visuals show how the right finishes can completely change the feeling of a space.</p>
        </div>
        <div className="mt-10 overflow-hidden rounded-[2rem] bg-slate-950 p-3 shadow-2xl sm:p-5">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] sm:aspect-[16/8]">
            <img src={project.after} alt={`${project.title} after`} className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${position}%` }}>
              <img src={project.before} alt={`${project.title} before`} className="h-full max-w-none object-cover" style={{ width: "100vw", maxWidth: "none" }} />
            </div>
            <div className="pointer-events-none absolute inset-y-0 w-0.5 bg-white shadow-[0_0_16px_rgba(0,0,0,.55)]" style={{ left: `${position}%` }}>
              <span className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-lg font-bold text-slate-950 shadow-lg">↔</span>
            </div>
            <span className="absolute left-4 top-4 rounded-full bg-slate-950/70 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-white">Before</span>
            <span className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-slate-900">After</span>
            <input aria-label="Compare before and after" type="range" min="0" max="100" value={position} onChange={(event) => setPosition(event.target.value)} className="absolute inset-0 z-10 h-full w-full cursor-ew-resize opacity-0" />
          </div>
          <div className="flex flex-col gap-5 px-3 pb-3 pt-6 text-white sm:flex-row sm:items-end sm:justify-between">
            <div><p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-300">{project.type} · Demo concept</p><h3 className="mt-1 text-2xl font-semibold">{project.title}</h3></div>
            <Link to={`/projects/${project.slug}`} className="w-fit rounded-full bg-white px-5 py-3 font-semibold text-slate-950 transition hover:bg-blue-100">Explore project story</Link>
          </div>
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {demoProjects.map((item, index) => <button key={item.slug} type="button" onClick={() => { setActiveIndex(index); setPosition(50); }} className={`rounded-2xl border px-5 py-4 text-left transition ${activeIndex === index ? "border-blue-600 bg-blue-50 text-blue-900" : "border-slate-200 bg-white text-slate-700 hover:border-slate-400"}`}><span className="block text-xs font-semibold uppercase tracking-wider text-blue-600">{item.type}</span><span className="mt-1 block font-semibold">{item.title}</span></button>)}
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterShowcase;
