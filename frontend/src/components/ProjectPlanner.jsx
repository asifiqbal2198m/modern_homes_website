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
    <section className="bg-luxury-cream py-24 border-b border-luxury-gold/15">
      <div className="mx-auto max-w-7xl px-6">
        <div className="overflow-hidden rounded-[2.5rem] bg-luxury-warm-gray shadow-2xl border border-luxury-gold/15 lg:grid lg:grid-cols-[.9fr_1.1fr] reveal-on-scroll">
          
          {/* Left Panel */}
          <div className="bg-luxury-dark-blue p-8 text-white sm:p-12 flex flex-col justify-between border-r border-luxury-gold/10">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-luxury-gold">Project Planner</p>
              <h2 className="mt-4 font-serif text-4xl font-normal leading-tight text-slate-100">Find your best next step.</h2>
              <p className="mt-5 text-slate-400 font-light leading-relaxed">Share three quick details and send a tailored consultation request to our team in seconds.</p>
            </div>
            <div className="mt-12 space-y-5 border-t border-white/10 pt-8 text-sm font-light text-slate-300">
              <p className="flex items-center"><span className="mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-luxury-gold font-bold text-xs text-luxury-dark-blue">1</span>Tell us what you are planning</p>
              <p className="flex items-center"><span className="mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-luxury-gold font-bold text-xs text-luxury-dark-blue">2</span>Choose the size of your space</p>
              <p className="flex items-center"><span className="mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-luxury-gold font-bold text-xs text-luxury-dark-blue">3</span>Get in touch with the right brief</p>
            </div>
          </div>

          {/* Form */}
          <form className="grid gap-6 p-8 sm:p-12 bg-luxury-warm-gray" onSubmit={(event) => { event.preventDefault(); window.open(whatsappLink, "_blank", "noopener,noreferrer"); }}>
            <label className="grid gap-2 text-xs font-bold uppercase tracking-wider text-slate-300">What are you planning?
              <select value={project} onChange={(event) => setProject(event.target.value)} className="w-full rounded-xl border border-luxury-sand bg-luxury-cream/40 px-4 py-3.5 text-sm font-normal text-slate-200 outline-none focus:border-luxury-gold focus:ring-1 focus:ring-luxury-gold transition duration-300">
                <option className="bg-luxury-warm-gray">Living room refresh</option>
                <option className="bg-luxury-warm-gray">Bedroom makeover</option>
                <option className="bg-luxury-warm-gray">New flooring</option>
                <option className="bg-luxury-warm-gray">Window curtains or blinds</option>
                <option className="bg-luxury-warm-gray">Wallpaper or feature wall</option>
                <option className="bg-luxury-warm-gray">Complete interior project</option>
              </select>
            </label>

            <label className="grid gap-2 text-xs font-bold uppercase tracking-wider text-slate-300">How much space is involved?
              <select value={space} onChange={(event) => setSpace(event.target.value)} className="w-full rounded-xl border border-luxury-sand bg-luxury-cream/40 px-4 py-3.5 text-sm font-normal text-slate-200 outline-none focus:border-luxury-gold focus:ring-1 focus:ring-luxury-gold transition duration-300">
                <option className="bg-luxury-warm-gray">One room</option>
                <option className="bg-luxury-warm-gray">Two to three rooms</option>
                <option className="bg-luxury-warm-gray">Whole home</option>
                <option className="bg-luxury-warm-gray">Office or commercial space</option>
              </select>
            </label>

            <label className="grid gap-2 text-xs font-bold uppercase tracking-wider text-slate-300">Your approximate budget
              <select value={budget} onChange={(event) => setBudget(event.target.value)} className="w-full rounded-xl border border-luxury-sand bg-luxury-cream/40 px-4 py-3.5 text-sm font-normal text-slate-200 outline-none focus:border-luxury-gold focus:ring-1 focus:ring-luxury-gold transition duration-300">
                <option className="bg-luxury-warm-gray">Not sure yet</option>
                <option className="bg-luxury-warm-gray">Under ₹25,000</option>
                <option className="bg-luxury-warm-gray">₹25,000 – ₹75,000</option>
                <option className="bg-luxury-warm-gray">₹25,000 – ₹1,50,000</option>
                <option className="bg-luxury-warm-gray">Above ₹1,50,000</option>
              </select>
            </label>

            <button type="submit" className="mt-2 rounded-full bg-green-600 hover:bg-green-700 text-white px-6 py-4 text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-md hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 cursor-pointer">
              Send tailored brief on WhatsApp
            </button>
            <p className="text-center text-xs text-slate-400 font-light">No commitment—just helpful advice for your project.</p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ProjectPlanner;
