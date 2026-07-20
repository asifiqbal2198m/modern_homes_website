import { useState } from 'react';
import { sendContactMessage } from '../services/contentApi';

const ContactForm = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const nextErrors = {};

    if (!form.name.trim()) {
      nextErrors.name = 'Please enter your name.';
    }

    if (!form.email.trim()) {
      nextErrors.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      nextErrors.email = 'Please enter a valid email address.';
    }

    if (!form.message.trim()) {
      nextErrors.message = 'Please enter your message.';
    }

    return nextErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setStatus('');
    const nextFieldErrors = validateForm();

    if (Object.keys(nextFieldErrors).length > 0) {
      setFieldErrors(nextFieldErrors);
      return;
    }

    setFieldErrors({});
    setIsSubmitting(true);

    try {
      await sendContactMessage(form);
      setStatus('Thank you—your consultation request has been received. Our team will contact you soon.');
      setForm({ name: '', email: '', phone: '', message: '' });
    } catch (submitError) {
      setError(submitError.message || 'Unable to send your message right now.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-white py-20">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-2">
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">
            Contact Us
          </p>
          <h2 className="text-4xl font-bold text-gray-800">
            Let’s Create Your Dream Interior
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            Reach out for product inquiries, installation support, or a free consultation for your home or office.
          </p>

          <div className="mt-8 space-y-4 text-gray-700">
            <p className="text-xl font-semibold text-gray-800">Modern Homes Interior Decor</p>
            <p className="text-blue-600">Established in 2021 · Interior solutions for Kashmir</p>
            <p>Matto Complex, Gulmarg Road, Magam, Jammu & Kashmir 193401</p>
            <p><strong>Hours:</strong> Monday–Saturday, 9 am–7 pm · Sunday, closed</p>
            <p>
              <strong>Call:</strong>{" "}
              <a href="tel:+919906232020" className="font-semibold text-blue-600 hover:underline">+91 99062 32020</a>
            </p>
            <p><strong>Email:</strong> info@modernhomes.com</p>
            <a
              href="https://wa.me/919906232020?text=Hello%20Modern%20Homes%2C%20I%20would%20like%20to%20book%20a%20consultation."
              target="_blank"
              rel="noreferrer"
              className="inline-flex rounded-xl bg-green-600 px-5 py-3 font-semibold text-white transition hover:bg-green-700"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-lg">
          <div className="mb-5">
            <label className="mb-2 block font-semibold text-gray-700">Your Name</label>
            <input
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
              required
            />
            {fieldErrors.name && <p className="mt-2 text-sm text-red-600">{fieldErrors.name}</p>}
          </div>

          <div className="mb-5">
            <label className="mb-2 block font-semibold text-gray-700">Email Address</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
              required
            />
            {fieldErrors.email && <p className="mt-2 text-sm text-red-600">{fieldErrors.email}</p>}
          </div>

          <div className="mb-5">
            <label className="mb-2 block font-semibold text-gray-700">Phone Number</label>
            <input
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-5">
            <label className="mb-2 block font-semibold text-gray-700">Your Message</label>
            <textarea
              name="message"
              rows="5"
              value={form.message}
              onChange={handleChange}
              placeholder="Tell us about your project"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
              required
            />
            {fieldErrors.message && <p className="mt-2 text-sm text-red-600">{fieldErrors.message}</p>}
          </div>

          {status && <p role="status" className="mb-4 rounded-xl bg-green-100 px-4 py-3 text-green-800">{status}</p>}
          {error && <p role="alert" className="mb-4 rounded-xl bg-red-100 px-4 py-3 text-red-800">{error}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            {isSubmitting ? 'Sending...' : 'Request a Free Consultation'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
