import { useEffect, useRef, useState } from "react";
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
    <div className="overflow-hidden rounded-3xl bg-white shadow-lg">
      <div className="relative">
        <video ref={videoRef} className="h-72 w-full bg-slate-900 object-cover" controls playsInline preload="metadata" onPause={() => setIsPlayingWithSound(false)}>
          <source src={item.src} />
          Your browser does not support video playback.
        </video>
        {!isPlayingWithSound && <button type="button" onClick={playWithSound} className="absolute bottom-4 left-4 rounded-full bg-slate-950/85 px-4 py-2 text-sm font-semibold text-white shadow-lg backdrop-blur transition hover:bg-blue-600">▶ Play with sound</button>}
      </div>
      <div className="bg-white px-5 py-4">
        <p className="font-semibold text-slate-800">{item.alt}</p>
        <p className="mt-1 text-sm text-slate-500">Tap play or use the controls to hear the original video audio.</p>
        {item.isDemo && <p className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-500">Demo video</p>}
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
            ...data.filter((item) => item.image).map((item) => ({ src: item.image, alt: item.title, isDemo: false })),
            ...fallbackGalleryItems,
          ]);
          setVideoItems([
            ...data.filter((item) => item.videoUrl).map((item) => ({ src: item.videoUrl, alt: item.title, isDemo: false })),
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
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800">{title}</h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Explore recent work, premium materials, and interior ideas for homes and workspaces.
          </p>
        </div>

        <h3 className="mb-6 text-2xl font-semibold text-slate-800">Image Gallery</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item, index) => (
            <div
              key={index}
              className="group overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              {item.src ? (
                <button type="button" onClick={() => setActiveItem(item)} className="block w-full overflow-hidden" aria-label={`View ${item.alt}`}>
                  <img src={item.src} alt={item.alt} className="h-72 w-full object-cover transition duration-500 group-hover:scale-105" />
                </button>
              ) : (
                <div className="flex h-72 items-center justify-center bg-slate-800 px-6 text-center text-lg font-semibold text-white">
                  {item.alt}
                </div>
              )}
              <div className="flex items-center justify-between gap-4 bg-white px-5 py-4">
                <div>
                  <p className="font-semibold text-slate-800">{item.alt}</p>
                  {item.isDemo && <p className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-500">Demo project</p>}
                </div>
              </div>
            </div>
          ))}
        </div>

        <h3 className="mb-6 mt-14 text-2xl font-semibold text-slate-800">Video Gallery</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videoItems.map((item, index) => (
            <GalleryVideo key={`${item.src}-${index}`} item={item} />
          ))}
        </div>

        {showButton && (
          <div className="mt-10 text-center">
            <a
              href="/gallery"
              className="inline-block rounded-full border border-blue-600 px-6 py-3 font-semibold text-blue-600 transition hover:bg-blue-600 hover:text-white"
            >
              View All Projects
            </a>
          </div>
        )}
      </div>
      {activeItem && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/90 p-5" role="dialog" aria-modal="true" aria-label={activeItem.alt} onClick={() => setActiveItem(null)}>
          <div className="relative max-h-full max-w-5xl" onClick={(event) => event.stopPropagation()}>
            <img src={activeItem.src} alt={activeItem.alt} className="max-h-[80vh] max-w-full rounded-2xl object-contain shadow-2xl" />
            <div className="mt-3 flex items-center justify-between gap-5 text-white"><p className="font-semibold">{activeItem.alt}</p><button type="button" onClick={() => setActiveItem(null)} className="rounded-full border border-white/40 px-4 py-2 text-sm font-semibold hover:bg-white hover:text-slate-950">Close</button></div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
