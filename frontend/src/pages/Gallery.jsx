import GallerySection from "../components/Gallery";
import PageMeta from "../components/PageMeta";

const Gallery = () => {
  return (
    <div className="py-10">
      <PageMeta title="Featured Interior Projects" description="Browse Modern Homes Interior Decor’s gallery of wallpapers, flooring, curtains, blinds, glass solutions, and completed interior projects." />
      <GallerySection title="Featured Interior Projects" showButton={false} />
    </div>
  );
};

export default Gallery;
