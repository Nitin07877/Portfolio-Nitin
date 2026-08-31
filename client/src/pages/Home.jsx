import { Hero } from "../components/sections/Hero";
import { Projects } from "../components/sections/Projects";
import { Contact } from "../components/sections/Contact";
import { PageTransition } from "../components/ui/PageTransition";

export function Home() {
  return (
    <PageTransition>
      <Hero />
      <Projects />
      <Contact />
    </PageTransition>
  );
}