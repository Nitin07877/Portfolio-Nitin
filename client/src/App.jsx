import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/sections/Navbar";
import { Footer } from "./components/sections/Footer";
import { Home } from "./pages/Home";
import { AboutPage } from "./pages/AboutPage";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background text-text-primary">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;