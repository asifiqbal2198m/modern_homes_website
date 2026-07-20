const FloatingWhatsApp = () => {
  return (
    <>
      <div className="fixed inset-x-3 bottom-3 z-50 grid grid-cols-2 overflow-hidden rounded-2xl bg-slate-950 p-1 shadow-2xl sm:hidden">
        <a href="tel:+919906232020" className="rounded-xl px-4 py-3 text-center text-sm font-semibold text-white">Call now</a>
        <a href="https://wa.me/919906232020?text=Hello%20Modern%20Homes%2C%20I%20would%20like%20to%20book%20a%20consultation." target="_blank" rel="noreferrer" className="rounded-xl bg-green-500 px-4 py-3 text-center text-sm font-semibold text-white">WhatsApp</a>
      </div>
      <a href="https://wa.me/919906232020?text=Hello%20Modern%20Homes%2C%20I%20would%20like%20to%20book%20a%20consultation." target="_blank" rel="noreferrer" className="fixed bottom-6 right-6 z-50 hidden items-center justify-center rounded-full bg-green-500 p-4 text-white shadow-lg transition hover:scale-110 sm:flex" aria-label="Contact us on WhatsApp">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24"><path d="M12.04 2C6.58 2 2.16 6.42 2.16 11.88c0 2.1.55 4.14 1.58 5.95L2 22l4.35-1.14a9.83 9.83 0 0 0 5.69 1.64c5.46 0 9.88-4.42 9.88-9.88S17.5 2 12.04 2zm0 17.82c-1.8 0-3.57-.49-5.1-1.4l-.36-.21-2.58.68.69-2.52-.23-.38a8.14 8.14 0 0 1-1.27-4.39c0-4.5 3.66-8.16 8.16-8.16 4.5 0 8.16 3.66 8.16 8.16 0 4.5-3.66 8.16-8.16 8.16z" /></svg>
      </a>
    </>
  );
};

export default FloatingWhatsApp;
