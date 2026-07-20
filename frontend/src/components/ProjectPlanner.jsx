import { useMemo, useState } from "react";

const ProjectPlanner = () => {
  const [project, setProject] = useState("Living room refresh");
  const [space, setSpace] = useState("One room");
  const [budget, setBudget] = useState("Not sure yet");

  const whatsappLink = useMemo(() => {
    const message = `Hello Modern Homes, I would like help with a ${project.toLowerCase()}. Space: ${space}. Budget: ${budget}. Please contact me for a consultation.`;
    return `https://wa.me/919906232020?text=${encodeURIComponent(message)}`;
  }, [project, space, budget]);

  return (
    <section className="bg-blue-50 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="overflow-hidden rounded-[2rem] bg-white shadow-xl ring-1 ring-blue-100 lg:grid lg:grid-cols-[.85fr_1.15fr]">
          <div className="bg-slate-950 p-8 text-white sm:p-12">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-300">Project planner</p>
            <h2 className="mt-4 text-4xl font-bold tracking-tight">Find your best next step.</h2>
            <p className="mt-5 max-w-md text-lg leading-8 text-slate-300">Share three quick details and send a tailored consultation request to our team in seconds.</p>
            <div className="mt-10 space-y-5 border-t border-white/15 pt-8 text-sm text-slate-300">
              <p><span className="mr-3 inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 font-bold text-white">1</span>Tell us what you are planning</p>
              <p><span className="mr-3 inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 font-bold text-white">2</span>Choose the size of your space</p>
              <p><span className="mr-3 inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 font-bold text-white">3</span>Get in touch with the right brief</p>
            </div>
          </div>
          <form className="grid gap-6 p-8 sm:p-12" onSubmit={(event) => { event.preventDefault(); window.open(whatsappLink, "_blank", "noopener,noreferrer"); }}>
            <label className="grid gap-2 text-sm font-semibold text-slate-800">What are you planning?
              <select value={project} onChange={(event) => setProject(event.target.value)} className="rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-base font-normal outline-none focus:border-blue-600">
                <option>Living room refresh</option><option>Bedroom makeover</option><option>New flooring</option><option>Window curtains or blinds</option><option>Wallpaper or feature wall</option><option>Complete interior project</option>
              </select>
            </label>
            <label className="grid gap-2 text-sm font-semibold text-slate-800">How much space is involved?
              <select value={space} onChange={(event) => setSpace(event.target.value)} className="rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-base font-normal outline-none focus:border-blue-600">
                <option>One room</option><option>Two to three rooms</option><option>Whole home</option><option>Office or commercial space</option>
              </select>
            </label>
            <label className="grid gap-2 text-sm font-semibold text-slate-800">Your approximate budget
              <select value={budget} onChange={(event) => setBudget(event.target.value)} className="rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-base font-normal outline-none focus:border-blue-600">
                <option>Not sure yet</option><option>Under ₹25,000</option><option>₹25,000 – ₹75,000</option><option>₹75,000 – ₹1,50,000</option><option>Above ₹1,50,000</option>
              </select>
            </label>
            <button type="submit" className="mt-2 rounded-xl bg-green-600 px-6 py-4 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-green-700">Get a tailored consultation on WhatsApp</button>
            <p className="text-center text-sm text-slate-500">No commitment—just helpful advice for your project.</p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ProjectPlanner;
