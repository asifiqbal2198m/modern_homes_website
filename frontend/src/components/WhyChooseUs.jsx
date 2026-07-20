const features = [
  {
    icon: "🏆",
    title: "Premium Quality",
    description:
      "We provide only high-quality interior products from trusted brands.",
  },
  {
    icon: "🛠️",
    title: "Expert Installation",
    description:
      "Professional installation services with attention to every detail.",
  },
  {
    icon: "💰",
    title: "Affordable Pricing",
    description:
      "Competitive prices without compromising on quality.",
  },
  {
    icon: "😊",
    title: "Customer Satisfaction",
    description:
      "Our priority is delivering the best experience to every customer.",
  },
  {
    icon: "🏠",
    title: "Wide Product Range",
    description:
      "Wallpapers, flooring, curtains, blinds, carpets and much more.",
  },
  {
    icon: "🤝",
    title: "Trusted Service",
    description:
      "Building long-term relationships through honesty and reliability.",
  },
];

const WhyChooseUs = ({ compact = false }) => {
  if (compact) {
    return (
      <div className="bg-white/10 backdrop-blur-md rounded-3xl p-10 w-full max-w-md shadow-xl">
        <h2 className="text-3xl font-bold mb-6">Why Choose Us?</h2>

        <ul className="space-y-4 text-lg">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3">
              <span className="text-blue-400">✔</span>
              <span>{feature.title}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <section className="py-20 bg-slate-100">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-gray-800">
            Why Choose Modern Homes?
          </h2>

          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            We combine premium products, expert craftsmanship and excellent
            customer service to create beautiful interiors.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-8 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
            >
              <div className="text-5xl mb-5">
                {feature.icon}
              </div>

              <h3 className="text-2xl font-semibold mb-3">
                {feature.title}
              </h3>

              <p className="text-gray-600 leading-7">
                {feature.description}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;