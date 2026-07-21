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
  <section className="bg-luxury-cream py-24 text-white border-t border-luxury-gold/10 relative isolate overflow-hidden">
    <div className="gold-glow-blob -right-48 -top-48 w-96 h-96" />
    <div className="gold-glow-blob -left-48 -bottom-48 w-96 h-96" />

    <div className="mx-auto max-w-7xl px-6 relative z-10">
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between reveal-on-scroll">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-luxury-gold">Made for real homes</p>
          <h2 className="mt-3 font-serif text-4xl font-normal tracking-tight sm:text-5xl leading-tight">See what a considered interior can do.</h2>
          <p className="mt-4 text-base text-slate-400 font-light">From the first material sample to the final fitting, each element is chosen to work beautifully together.</p>
        </div>
        <Link to="/gallery" className="w-fit rounded-full border border-luxury-gold/50 px-6 py-3 text-xs font-bold tracking-widest uppercase transition-all duration-300 hover:border-luxury-gold hover:bg-luxury-gold hover:text-luxury-dark-blue">
          View all projects
        </Link>
      </div>
      
      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3 reveal-on-scroll">
        {projects.map((project) => (
          <article key={project.title} className="group overflow-hidden rounded-3xl bg-luxury-warm-gray border border-luxury-gold/10 transition-luxury hover:border-luxury-gold/30">
            <div className="relative h-80 overflow-hidden">
              <img src={project.image} alt={project.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-luxury-obsidian via-transparent to-transparent" />
              <p className="absolute bottom-5 left-5 rounded-full bg-luxury-dark-blue/80 border border-luxury-gold/20 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-luxury-gold backdrop-blur">
                {project.type}
              </p>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold font-serif text-slate-100 group-hover:text-luxury-gold transition-colors duration-300">
                {project.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-400 font-light font-sans">
                {project.detail}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default ProjectShowcase;
