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

  const videoSrc = media.videoUrl && media.videoUrl.includes('cloudinary.com') && !media.videoUrl.endsWith('.mp4')
    ? `${media.videoUrl}.mp4`
    : media.videoUrl;

  return (
    <section className="relative isolate overflow-hidden bg-luxury-dark-blue text-white min-h-[85vh] flex items-center">
      <video key={videoSrc} className="absolute inset-0 -z-20 h-full w-full object-cover" src={videoSrc} poster={media.poster || undefined} autoPlay muted loop playsInline />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-luxury-dark-blue/95 via-luxury-dark-blue/80 to-transparent" />
      <div className="absolute -left-24 top-16 -z-10 h-80 w-80 rounded-full bg-luxury-gold/10 blur-3xl" />
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-32 w-full">
        <div className="max-w-3xl">
          <p className="mb-6 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-luxury-gold">
            <span className="h-[1px] w-8 bg-luxury-gold/50" /> Designed for finer living
          </p>
          <h1 className="animate-fade-up font-serif text-5xl font-normal leading-[1.1] tracking-tight sm:text-6xl lg:text-7xl">
            Interiors that make
            <span className="block text-luxury-gold font-light italic mt-2"> every day exceptional.</span>
          </h1>
          <p className="mt-8 max-w-xl animate-fade-up text-base md:text-lg leading-relaxed text-slate-300 font-light delay-150">
            Discover premium wallpapers, blinds, curtains, wooden flooring, carpets, artificial grass, and elegant turnkey decor designed to elevate every space.
          </p>
          <div className="mt-10 flex flex-wrap gap-4 animate-fade-up">
            <Link to="/products" className="rounded-full bg-luxury-gold hover:bg-luxury-gold-dark text-luxury-dark-blue px-8 py-4 text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-lg hover:-translate-y-0.5">
              Explore Products
            </Link>
            <Link to="/contact" className="rounded-full border border-white/30 bg-white/5 hover:bg-white hover:text-luxury-dark-blue px-8 py-4 text-xs font-bold tracking-widest uppercase backdrop-blur transition-all duration-300 hover:-translate-y-0.5">
              Free Consultation
            </Link>
          </div>
        </div>
        <div className="mt-16 flex items-center gap-4 text-xs font-bold uppercase tracking-wider text-slate-300">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-luxury-gold/20 text-luxury-gold text-sm">✦</span>
          Curated materials. Expert fitting. Timeless results.
        </div>
      </div>
    </section>
  );
};

export default Hero;
