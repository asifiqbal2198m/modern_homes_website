import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home";
import About from "../pages/About";
import Products from "../pages/Products";
import Services from "../pages/Services";
import Gallery from "../pages/Gallery";
import Contact from "../pages/Contact";
import ContactMessages from "../pages/ContactMessages";
import AdminLogin from "../pages/AdminLogin";
import AdminDashboard from "../pages/AdminDashboard";
import Posts from "../pages/Posts";
import PostDetail from "../pages/PostDetail";
import NotFound from "../pages/NotFound";
import ProjectDetail from "../pages/ProjectDetail";

const AppRoutes = ({ adminToken, onLogin, onLogout }) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/services" element={<Services />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/messages"
            element={adminToken ? <ContactMessages /> : <Navigate replace to="/admin/login" />}
          />
          <Route
            path="/admin"
            element={
              adminToken ? (
                <AdminDashboard token={adminToken} onLogout={onLogout} />
              ) : (
                <Navigate replace to="/admin/login" />
              )
            }
          />
          <Route path="/admin/login" element={<AdminLogin onLogin={onLogin} />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/posts/:id" element={<PostDetail />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
