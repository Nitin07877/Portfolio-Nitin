import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Analytics } from "@vercel/analytics/react";
import { ScrollProgress } from "./components/ui/ScrollProgress";
import { ScrollToTop } from "./components/ui/ScrollToTop";
import { BackToTop } from "./components/ui/BackToTop";
import { ChatWidget } from "./components/ui/ChatWidget";
import { Navbar } from "./components/sections/Navbar";
import { Footer } from "./components/sections/Footer";
import { Home } from "./pages/Home";
import { AboutPage } from "./pages/AboutPage";
import { ProjectDetailPage } from "./pages/ProjectDetailPage";
import { NotFound } from "./pages/NotFound";

// Separate component because useLocation() only works inside <BrowserRouter>,
// and App() itself renders BrowserRouter, so this must be a child of it.
function AppContent() {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />
      <ScrollProgress />
      <div className="min-h-screen bg-background text-text-primary">
        <Navbar />
        {/* mode="wait" makes the old page fully fade out before the new one fades in */}
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/projects/:id" element={<ProjectDetailPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
        <Footer />
        <BackToTop />
        <ChatWidget />
      </div>
      <Analytics />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;