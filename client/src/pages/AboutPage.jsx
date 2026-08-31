import { About } from "../components/sections/About";
import { Education } from "../components/sections/Education";
import { Skills } from "../components/sections/Skills";
import { Certifications } from "../components/sections/Certifications";

import { PageTransition } from "../components/ui/PageTransition";

export function AboutPage() {
  return (
    <PageTransition>
      <div className="pt-16">
        <About />
        <Education />
        <Skills />
        <Certifications />
        
      </div>
    </PageTransition>
  );
}