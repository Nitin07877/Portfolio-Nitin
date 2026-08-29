import { Hero } from "../components/sections/Hero";
import { Projects } from "../components/sections/Projects";
import { Contact } from "../components/sections/Contact";

export function Home() {
  return (
    <>
      <Hero />
      <Projects />
      <Contact />
    </>
  );
}