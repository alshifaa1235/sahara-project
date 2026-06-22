import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import PageLoader from "./components/ui/PageLoader";

const Home          = lazy(() => import("./pages/Home"));
const Products      = lazy(() => import("./pages/Products"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const About         = lazy(() => import("./pages/About"));
const Contact       = lazy(() => import("./pages/Contact"));
const NotFound      = lazy(() => import("./pages/NotFound"));

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/"           element={<Home />} />
            <Route path="/products"   element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/about"      element={<About />} />
            <Route path="/contact"    element={<Contact />} />
            <Route path="*"           element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
