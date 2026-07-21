import { Link, useParams } from "react-router-dom";
import PageMeta from "../components/PageMeta";
import { demoProjects } from "../data/demoProjects";

const ProjectDetail = () => {
  const { slug } = useParams();
  const project = demoProjects.find((item) => item.slug === slug);

  if (!project) {
    return (
      <section className="mx-auto max-w-7xl px-6 py-28 bg-luxury-cream min-h-screen text-center">
        <h1 className="text-4xl font-serif font-bold text-luxury-charcoal">Project not found</h1>
        <Link to="/gallery" className="mt-5 inline-block text-luxury-bronze hover:text-luxury-gold font-bold">
          Back to gallery
        </Link>
      </section>
    );
  }

  return (
    <>
      <PageMeta title={`${project.title} | Modern Homes`} description={project.summary} />
      
      {/* Header section with Obsidian Gradient */}
      <section className="bg-gradient-to-br from-luxury-charcoal via-luxury-dark-blue to-luxury-obsidian py-20 text-white sm:py-28 border-b border-luxury-gold/15">
        <div className="mx-auto max-w-7xl px-6">
          <Link to="/gallery" className="text-xs font-bold uppercase tracking-wider text-luxury-gold hover:text-white transition duration-300">
            ← Back to gallery
          </Link>
          <p className="mt-10 text-xs font-bold uppercase tracking-[0.25em] text-luxury-gold">
            {project.type} · Demo project
          </p>
          <h1 className="mt-4 max-w-3xl font-serif text-4xl font-normal text-slate-100 sm:text-6xl tracking-tight">
            {project.title}
          </h1>
          <p className="mt-6 max-w-2xl text-base text-slate-300 font-light leading-relaxed">
            {project.summary}
          </p>
        </div>
      </section>

      {/* Details Showcase */}
      <section className="bg-luxury-cream py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-luxury-bronze">Before Concept</span>
              <img src={project.before} alt="Before concept" className="h-80 w-full rounded-3xl object-cover shadow-xl border border-luxury-gold/10" />
            </div>
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-luxury-gold">After Concept</span>
              <img src={project.after} alt="After concept" className="h-80 w-full rounded-3xl object-cover shadow-xl border border-luxury-gold/15" />
            </div>
          </div>

          <div className="mt-16 grid gap-8 rounded-3xl bg-white p-8 border border-luxury-gold/10 shadow-md sm:grid-cols-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Timeline</p>
              <p className="mt-3 text-xl font-bold font-serif text-luxury-charcoal">{project.duration}</p>
            </div>
            <div className="sm:col-span-2">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Suggested materials</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.materials.map((material) => (
                  <span key={material} className="rounded-full bg-luxury-warm-gray px-4 py-2 text-xs font-bold uppercase tracking-wider text-luxury-bronze border border-luxury-gold/10">
                    {material}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* CTA Banner Card */}
          <div className="mt-16 rounded-[2rem] bg-gradient-to-br from-luxury-charcoal to-luxury-obsidian p-8 sm:p-12 text-white sm:flex sm:items-center sm:justify-between border border-luxury-gold/15 shadow-xl">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-serif text-slate-100 font-normal">Like this direction for your space?</h2>
              <p className="mt-2 text-sm text-slate-300 font-light">Book a free consultation and we will help you turn your idea into a plan.</p>
            </div>
            <Link to="/contact" className="mt-6 inline-block rounded-full bg-luxury-bronze hover:bg-luxury-gold text-white px-8 py-3 text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-md sm:mt-0">
              Start your project
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProjectDetail;
