import { useEffect, useState } from "react";
import { fetchReviews } from "../services/contentApi";

const fallbackTestimonials = [
  {
    name: "Aisha Khan",
    role: "Homeowner",
    quote:
      "The team transformed our living space beautifully. Every detail was handled with professionalism and care.",
    rating: 5,
  },
  {
    name: "Rohan Mehta",
    role: "Office Client",
    quote:
      "From selection to installation, the experience was smooth and the results exceeded our expectations.",
    rating: 5,
  },
  {
    name: "Nadia Yusuf",
    role: "Interior Designer",
    quote:
      "Modern Homes delivered premium quality products with outstanding customer service.",
    rating: 5,
  },
];

const Testimonials = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    let isMounted = true;
    fetchReviews()
      .then((data) => {
        if (isMounted) {
          if (data && data.length > 0) {
            setReviews(data);
          } else {
            setReviews(fallbackTestimonials);
          }
        }
      })
      .catch(() => {
        if (isMounted) {
          setReviews(fallbackTestimonials);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="bg-luxury-cream py-24 border-b border-luxury-gold/15 relative isolate overflow-hidden">
      <div className="gold-glow-blob -left-48 -top-48 w-96 h-96" />
      <div className="gold-glow-blob -right-48 -bottom-48 w-96 h-96" />

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <div className="mb-16 text-center max-w-3xl mx-auto reveal-on-scroll">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-luxury-bronze">
            Client Stories
          </p>
          <h2 className="font-serif text-4xl font-normal text-luxury-charcoal sm:text-5xl">What Our Clients Say</h2>
          <p className="mx-auto mt-4 text-slate-400 font-light">
            Trusted by homeowners and designers across Srinagar and other districts of Kashmir to deliver beautiful interiors.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 reveal-on-scroll">
          {reviews.map((review, index) => {
            const name = review.author_name || review.name;
            const text = review.text || review.quote;
            const label = review.relative_time_description || review.role || "Client Review";
            const rating = review.rating || 5;
            const photo = review.profile_photo_url;

            return (
              <div
                key={review.id || index}
                className="rounded-3xl bg-luxury-warm-gray p-10 border border-luxury-gold/10 luxury-card-glow relative flex flex-col justify-between"
              >
                <span className="absolute top-6 right-8 font-serif text-6xl text-luxury-gold/25 select-none font-light">“</span>
                
                <div>
                  {/* Rating Stars */}
                  <div className="flex gap-1 mb-6">
                    {[...Array(rating)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-luxury-gold fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  <p className="text-base leading-relaxed text-slate-300 font-light italic relative z-10">
                    “{text}”
                  </p>
                </div>

                <div>
                  <hr className="my-6 border-slate-800" />
                  <div className="flex items-center gap-4">
                    {photo ? (
                      <img src={photo} alt={name} className="h-10 w-10 rounded-full object-cover border border-luxury-gold/20" />
                    ) : (
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-luxury-cream text-luxury-bronze font-serif font-bold text-sm border border-luxury-gold/15">
                        {name ? name.charAt(0).toUpperCase() : "C"}
                      </div>
                    )}
                    <div>
                      <h3 className="text-base font-bold font-serif text-luxury-charcoal leading-none">{name}</h3>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-luxury-bronze mt-1.5 leading-none">{label}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
