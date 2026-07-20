import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchHomepageMedia } from "../services/contentApi";

const fallbackVideo = "https://videos.pexels.com/video-files/3129957/3129957-hd_1920_1080_25fps.mp4";

const Hero = () => {
  const [media, setMedia] = useState({ videoUrl: fallbackVideo, poster: null });

  useEffect(() => {
    fetchHomepageMedia().then((settings) => {
      if (settings.videoUrl || settings.poster) {
        setMedia({ videoUrl: settings.videoUrl || fallbackVideo, poster: settings.poster });
      }
    });
  }, []);

  return (
    <section className="relative isolate overflow-hidden bg-slate-950 text-white">
      <video className="absolute inset-0 -z-20 h-full w-full object-cover" src={media.videoUrl} poster={media.poster || undefined} autoPlay muted loop playsInline />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(105deg,rgba(2,6,23,.96)_0%,rgba(2,6,23,.82)_42%,rgba(2,6,23,.38)_100%)]" />
      <div className="absolute -left-24 top-16 -z-10 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl" />
      <div className="mx-auto max-w-7xl px-6 py-28 lg:py-36">
        <div className="max-w-3xl">
          <p className="mb-5 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.25em] text-blue-200">
            <span className="h-px w-8 bg-blue-300" /> Designed for better living
          </p>
          <h1 className="animate-fade-up text-5xl font-bold leading-[1.04] tracking-tight sm:text-6xl lg:text-7xl">
            Interiors that make
            <span className="block text-blue-200"> every day feel exceptional.</span>
          </h1>
          <p className="mt-7 max-w-2xl animate-fade-up text-lg leading-8 text-slate-200 delay-150">
            Discover premium wallpapers, blinds, curtains, wooden flooring, carpets, artificial grass, PVC flooring, and elegant home decor designed to enhance every space.
          </p>
          <div className="mt-10 flex flex-wrap gap-4 animate-fade-up">
            <Link to="/products" className="rounded-full bg-blue-500 px-7 py-3.5 font-semibold shadow-lg shadow-blue-950/30 transition hover:-translate-y-0.5 hover:bg-blue-400">Explore Products</Link>
            <Link to="/contact" className="rounded-full border border-white/50 bg-white/5 px-7 py-3.5 font-semibold backdrop-blur transition hover:bg-white hover:text-slate-950">Book a Free Consultation</Link>
          </div>
        </div>
        <div className="mt-16 flex items-center gap-4 text-sm font-medium text-slate-200">
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-white/10 text-lg">⌁</span>
          Curated materials. Expert fitting. Timeless results.
        </div>
      </div>
    </section>
  );
};

export default Hero;
