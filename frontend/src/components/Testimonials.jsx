const testimonials = [
  {
    name: "Aisha Khan",
    role: "Homeowner",
    quote:
      "The team transformed our living space beautifully. Every detail was handled with professionalism and care.",
  },
  {
    name: "Rohan Mehta",
    role: "Office Client",
    quote:
      "From selection to installation, the experience was smooth and the results exceeded our expectations.",
  },
  {
    name: "Nadia Yusuf",
    role: "Interior Designer",
    quote:
      "Modern Homes delivered premium quality products with outstanding customer service.",
  },
];

const Testimonials = () => {
  return (
    <section className="bg-slate-100 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold text-gray-800">What Our Clients Say</h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Trusted by homeowners and businesses for creating elegant, functional, and modern interiors.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="rounded-3xl bg-white p-8 shadow-lg transition hover:-translate-y-1 hover:shadow-2xl"
            >
              <p className="text-lg leading-8 text-gray-700">“{testimonial.quote}”</p>
              <div className="mt-6">
                <h3 className="text-xl font-semibold text-gray-800">{testimonial.name}</h3>
                <p className="text-blue-600">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
