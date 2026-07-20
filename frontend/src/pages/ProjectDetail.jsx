import { Link, useParams } from "react-router-dom";
import PageMeta from "../components/PageMeta";
import { demoProjects } from "../data/demoProjects";

const ProjectDetail = () => {
  const { slug } = useParams();
  const project = demoProjects.find((item) => item.slug === slug);
  if (!project) return <section className="mx-auto max-w-7xl px-6 py-28"><h1 className="text-4xl font-bold">Project not found</h1><Link to="/gallery" className="mt-5 inline-block text-blue-600">Back to gallery</Link></section>;
  return (
    <>
      <PageMeta title={`${project.title} | Modern Homes`} description={project.summary} />
      <section className="bg-slate-950 py-16 text-white sm:py-24"><div className="mx-auto max-w-7xl px-6"><Link to="/gallery" className="text-sm font-semibold text-blue-200 hover:text-white">← Back to gallery</Link><p className="mt-10 text-sm font-semibold uppercase tracking-[0.2em] text-blue-300">{project.type} · Demo project</p><h1 className="mt-3 max-w-3xl text-5xl font-bold tracking-tight sm:text-6xl">{project.title}</h1><p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">{project.summary}</p></div></section>
      <section className="bg-white py-16"><div className="mx-auto max-w-7xl px-6"><div className="grid gap-8 lg:grid-cols-2"><img src={project.before} alt="Before concept" className="h-80 w-full rounded-3xl object-cover shadow-lg" /><img src={project.after} alt="After concept" className="h-80 w-full rounded-3xl object-cover shadow-lg" /></div><div className="mt-14 grid gap-6 rounded-3xl bg-slate-50 p-8 sm:grid-cols-3"><div><p className="text-sm font-semibold uppercase tracking-wider text-slate-500">Timeline</p><p className="mt-2 text-xl font-semibold text-slate-900">{project.duration}</p></div><div className="sm:col-span-2"><p className="text-sm font-semibold uppercase tracking-wider text-slate-500">Suggested materials</p><div className="mt-3 flex flex-wrap gap-2">{project.materials.map((material) => <span key={material} className="rounded-full bg-white px-4 py-2 font-medium text-slate-700 ring-1 ring-slate-200">{material}</span>)}</div></div></div><div className="mt-12 rounded-3xl bg-blue-700 p-8 text-white sm:flex sm:items-center sm:justify-between"><div><h2 className="text-2xl font-semibold">Like this direction for your space?</h2><p className="mt-2 text-blue-100">Book a free consultation and we will help you turn your idea into a plan.</p></div><Link to="/contact" className="mt-5 inline-block rounded-full bg-white px-6 py-3 font-semibold text-blue-700 sm:mt-0">Start your project</Link></div></div></section>
    </>
  );
};

export default ProjectDetail;
