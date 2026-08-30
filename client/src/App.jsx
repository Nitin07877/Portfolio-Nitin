import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollProgress } from "./components/ui/ScrollProgress";
import { Navbar } from "./components/sections/Navbar";
import { Footer } from "./components/sections/Footer";
import { Home } from "./pages/Home";
import { AboutPage } from "./pages/AboutPage";
import { ProjectDetailPage } from "./pages/ProjectDetailPage";

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
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;