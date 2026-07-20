import { Link } from "react-router-dom";
import curtains from "../assets/images/products/curtains.jpg";
import flooring from "../assets/images/products/flooring.jpg";
import wallpaper from "../assets/images/products/wallpaper.jpg";

const projects = [
  { image: curtains, type: "Living spaces", title: "Soft layers, tailored light", detail: "Custom curtains and window styling that make a room feel finished." },
  { image: flooring, type: "Flooring", title: "A foundation built to last", detail: "Warm, durable flooring selected to complement everyday living." },
  { image: wallpaper, type: "Feature walls", title: "Personality in every detail", detail: "Designer wallcoverings that give a space an unmistakable point of view." },
];

const ProjectShowcase = () => (
  <section className="bg-slate-950 py-20 text-white">
    <div className="mx-auto max-w-7xl px-6">
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-300">Made for real homes</p>
          <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">See what a considered interior can do.</h2>
          <p className="mt-4 text-lg leading-8 text-slate-300">From the first material sample to the final fitting, each element is chosen to work beautifully together.</p>
        </div>
        <Link to="/gallery" className="w-fit rounded-full border border-white/30 px-5 py-3 font-semibold transition hover:border-white hover:bg-white hover:text-slate-950">View all projects</Link>
      </div>
      <div className="mt-12 grid gap-5 lg:grid-cols-3">
        {projects.map((project) => (
          <article key={project.title} className="group overflow-hidden rounded-3xl bg-white/10 ring-1 ring-white/10">
            <div className="relative h-80 overflow-hidden">
              <img src={project.image} alt={project.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent" />
              <p className="absolute bottom-5 left-5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] backdrop-blur">{project.type}</p>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-semibold">{project.title}</h3>
              <p className="mt-3 leading-7 text-slate-300">{project.detail}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default ProjectShowcase;
