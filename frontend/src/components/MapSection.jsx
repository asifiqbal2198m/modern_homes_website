const MapSection = () => {
  return (
    <section className="bg-slate-100 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-bold text-gray-800">Visit Our Studio</h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Visit our Magam showroom for consultations, product selection, and project planning.
          </p>
        </div>

        <div className="overflow-hidden rounded-3xl shadow-xl">
          <iframe
            title="Modern Homes Location"
            src="https://www.google.com/maps?q=Modern%20Homes%20Interior%20Decor%2C%20Magam%2C%20Jammu%20and%20Kashmir%20193401&z=13&output=embed"
            className="h-[400px] w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default MapSection;
