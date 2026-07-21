import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import wallpaper from "../assets/images/products/wallpaper.jpg";
import blinds from "../assets/images/products/blinds.jpg";
import carpets from "../assets/images/products/carpets.jpg";
import curtains from "../assets/images/products/curtains.jpg";
import flooring from "../assets/images/products/flooring.jpg";
import grass from "../assets/images/products/grass.jpg";
import demoLivingRoom from "../assets/images/gallery/demo-living-room.png";
import { fetchGalleryImages } from "../services/contentApi";

const fallbackGalleryItems = [
  { src: wallpaper, alt: "Designer Wallpaper Feature Wall", isDemo: true },
  { src: blinds, alt: "Modern Window Blinds Installation", isDemo: true },
  { src: carpets, alt: "Luxury Carpet Styling", isDemo: true },
  { src: curtains, alt: "Custom Curtains and Fabrics", isDemo: true },
  { src: flooring, alt: "Premium Wooden Flooring", isDemo: true },
  { src: grass, alt: "Outdoor Artificial Grass Design", isDemo: true },
  { src: demoLivingRoom, alt: "Contemporary Living Room Design", isDemo: true },
];

const fallbackVideoItems = [
  { src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4", alt: "Interior Styling Walkthrough", isDemo: true },
  { src: "https://www.w3schools.com/html/mov_bbb.mp4", alt: "Completed Project Showcase", isDemo: true },
];

const GalleryVideo = ({ item }) => {
  const videoRef = useRef(null);
  const [isPlayingWithSound, setIsPlayingWithSound] = useState(false);

  const playWithSound = async () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = false;
    video.volume = 1;
    try {
      await video.play();
      setIsPlayingWithSound(true);
    } catch {
      // Native controls remain available if a browser blocks playback.
    }
  };

  return (
    <div className="overflow-hidden rounded-3xl bg-luxury-warm-gray border border-luxury-gold/10 luxury-card-glow flex flex-col justify-between">
      <div className="relative">
        <video ref={videoRef} className="h-72 w-full bg-luxury-obsidian object-contain" controls playsInline preload="metadata" onPause={() => setIsPlayingWithSound(false)}>
          <source src={item.src} />
          Your browser does not support video playback.
        </video>
        {!isPlayingWithSound && (
          <button 
            type="button" 
            onClick={playWithSound} 
            className="absolute bottom-4 left-4 rounded-full bg-luxury-dark-blue/90 border border-luxury-gold/30 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-luxury-gold shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-luxury-gold hover:text-luxury-dark-blue cursor-pointer"
          >
            ▶ Play with sound
          </button>
        )}
      </div>
      <div className="bg-luxury-warm-gray px-6 py-5 flex-grow flex flex-col justify-center border-t border-luxury-gold/5">
        <p className="font-serif font-bold text-luxury-charcoal text-base">{item.alt}</p>
        <p className="mt-2 text-xs font-light text-slate-400">Tap play or use the controls to hear the walkthrough audio.</p>
        {item.isDemo && <p className="mt-2 text-[9px] font-bold uppercase tracking-widest text-luxury-bronze">Demo video</p>}
      </div>
    </div>
  );
};

const Gallery = ({ title = "Our Gallery", showButton = true }) => {
  const [galleryItems, setGalleryItems] = useState(fallbackGalleryItems);
  const [videoItems, setVideoItems] = useState(fallbackVideoItems);
  const [activeItem, setActiveItem] = useState(null);

  useEffect(() => {
    let isMounted = true;

    fetchGalleryImages()
      .then((data) => {
        if (isMounted) {
          setGalleryItems([
            ...data.filter((item) => item.image || item.image_url).map((item) => ({ src: item.image || item.image_url, alt: item.title, isDemo: false })),
            ...fallbackGalleryItems,
          ]);
          setVideoItems([
            ...data.filter((item) => item.video || item.video_url).map((item) => ({ src: item.video || item.video_url, alt: item.title, isDemo: false })),
            ...fallbackVideoItems,
          ]);
        }
      })
      .catch(() => {
        if (isMounted) {
          setGalleryItems(fallbackGalleryItems);
          setVideoItems(fallbackVideoItems);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="py-24 bg-luxury-warm-gray/10 border-b border-luxury-gold/15">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-luxury-bronze">
            Visual Showcase
          </p>
          <h2 className="font-serif text-4xl font-normal text-luxury-charcoal sm:text-5xl">{title}</h2>
          <p className="mt-4 text-slate-500 font-light">
            Explore recent work, premium materials, and interior ideas for homes and workspaces.
          </p>
        </div>

        <h3 className="mb-6 font-serif text-2xl font-bold text-luxury-charcoal border-b border-luxury-gold/10 pb-2">Image Gallery</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryItems.map((item, index) => (
            <div
              key={index}
              className="group overflow-hidden rounded-3xl bg-luxury-warm-gray border border-luxury-gold/10 luxury-card-glow transition-luxury"
            >
              {item.src ? (
                <button type="button" onClick={() => setActiveItem(item)} className="block w-full overflow-hidden relative cursor-zoom-in" aria-label={`View ${item.alt}`}>
                  <img src={item.src} alt={item.alt} className="h-72 w-full object-cover transition duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-300" />
                </button>
              ) : (
                <div className="flex h-72 items-center justify-center bg-luxury-obsidian px-6 text-center text-lg font-serif font-bold text-white border-b border-luxury-gold/10">
                  {item.alt}
                </div>
              )}
              <div className="bg-luxury-warm-gray px-6 py-5 border-t border-luxury-gold/5">
                <div>
                  <p className="font-serif font-bold text-luxury-charcoal text-base">{item.alt}</p>
                  {item.isDemo && <p className="mt-2 text-[9px] font-bold uppercase tracking-widest text-luxury-bronze">Demo project</p>}
                </div>
              </div>
            </div>
          ))}
        </div>

        <h3 className="mb-6 mt-16 font-serif text-2xl font-bold text-luxury-charcoal border-b border-luxury-gold/10 pb-2">Video Gallery</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {videoItems.map((item, index) => (
            <GalleryVideo key={`${item.src}-${index}`} item={item} />
          ))}
        </div>

        {showButton && (
          <div className="mt-16 text-center">
            <Link
              to="/gallery"
              className="inline-block rounded-full border border-luxury-bronze px-8 py-3.5 text-xs font-bold tracking-widest uppercase text-luxury-bronze transition-all duration-300 hover:bg-luxury-bronze hover:text-white shadow-sm"
            >
              View All Projects
            </Link>
          </div>
        )}
      </div>
      {activeItem && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-luxury-obsidian/95 p-5 transition-opacity duration-300" role="dialog" aria-modal="true" aria-label={activeItem.alt} onClick={() => setActiveItem(null)}>
          <div className="relative max-h-full max-w-5xl animate-fade-up" onClick={(event) => event.stopPropagation()}>
            <img src={activeItem.src} alt={activeItem.alt} className="max-h-[75vh] max-w-full rounded-2xl object-contain shadow-2xl border border-white/10" />
            <div className="mt-4 flex items-center justify-between gap-5 text-white">
              <p className="font-serif text-lg font-bold">{activeItem.alt}</p>
              <button type="button" onClick={() => setActiveItem(null)} className="rounded-full border border-white/30 bg-white/10 px-5 py-2 text-xs font-bold tracking-wider uppercase hover:bg-white hover:text-luxury-dark-blue transition cursor-pointer">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
