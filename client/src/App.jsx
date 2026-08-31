import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { ScrollProgress } from "./components/ui/ScrollProgress";
import { BackToTop } from "./components/ui/BackToTop";
import { Navbar } from "./components/sections/Navbar";
import { Footer } from "./components/sections/Footer";
import { Home } from "./pages/Home";
import { AboutPage } from "./pages/AboutPage";
import { ProjectDetailPage } from "./pages/ProjectDetailPage";
import { NotFound } from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <ScrollProgress />
      <div className="min-h-screen bg-background text-text-primary">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/projects/:id" element={<ProjectDetailPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        <BackToTop />
      </div>
      <Analytics />
    </BrowserRouter>
  );
}

export default App;