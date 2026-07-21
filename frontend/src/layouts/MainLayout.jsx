import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FloatingWhatsApp from "../components/FloatingWhatsApp";
import BackToTop from "../components/BackToTop";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="grow">
        <Outlet />
      </main>

      <Footer />
      <FloatingWhatsApp />
      <BackToTop />
    </div>
  );
};

export default MainLayout;