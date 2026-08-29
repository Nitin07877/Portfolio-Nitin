import { motion } from "framer-motion";
import { FiMapPin, FiBookOpen, FiCheckCircle } from "react-icons/fi";
import { Button } from "../ui/Button";
import { Container } from "../ui/Container";

const quickFacts = [
  { icon: FiBookOpen, label: "B.Tech CS, Galgotias University" },
  { icon: FiMapPin, label: "Greater Noida, India" },
  { icon: FiCheckCircle, label: "Open to opportunities" },
];

export function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background glow, matching the Hero */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-0 -left-32 w-96 h-96 rounded-full bg-accent/15 blur-[100px]" />
        <div className="absolute bottom-0 -right-32 w-96 h-96 rounded-full bg-accent-2/15 blur-[100px]" />
      </div>

      <Container className="relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-accent-2 font-medium mb-4"
        >
          About me
        </motion.p>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="shrink-0 mx-auto lg:mx-0"
          >
            <div className="w-56 h-56 sm:w-64 sm:h-64 rounded-2xl overflow-hidden border border-border">
              <img
                src="/profile.jpg"
                alt="Nitin Kumar"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Text + facts */}
          <div className="flex-1">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl font-bold tracking-tight mb-6"
            >
              Building things,{" "}
              <span className="bg-gradient-to-r from-accent to-accent-2 bg-clip-text text-transparent">
                one project at a time
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-text-secondary text-lg leading-relaxed mb-4"
            >
              I'm a Computer Science undergraduate at Galgotias University, passionate
              about full-stack web development and building practical, real-world
              applications. I enjoy working across the stack — from designing clean,
              responsive interfaces to building the APIs and databases that power them.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-text-secondary text-lg leading-relaxed mb-8"
            >
              I've built and deployed live projects including an AI-powered career
              coaching platform and an e-commerce site, and I'm always looking to
              sharpen my problem-solving skills through new projects and challenges.
            </motion.p>

            {/* Quick fact chips */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-3 mb-8"
            >
              {quickFacts.map((fact) => (
                <div
                  key={fact.label}
                  className="flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm text-text-secondary"
                >
                  <fact.icon size={15} className="text-accent-2" />
                  {fact.label}
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.35 }}
            >
              <Button variant="primary" href="/resume.pdf" download>
                Download Resume
              </Button>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}