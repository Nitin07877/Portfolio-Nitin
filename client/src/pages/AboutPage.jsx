import { About } from "../components/sections/About";
import { Education } from "../components/sections/Education";
import { Skills } from "../components/sections/Skills";
import { Certifications } from "../components/sections/Certifications";

export function AboutPage() {
  return (
    <div className="pt-16">
      <About />
      <Education />
      <Skills />
      <Certifications />
    </div>
  );
}