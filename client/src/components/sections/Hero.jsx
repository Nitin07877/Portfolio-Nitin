import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "../ui/Button";
import { Container } from "../ui/Container";

export function Hero() {
  // Tracks raw pixel scroll position of the whole page
  const { scrollY } = useScroll();
  // Maps the first 1200px of scroll to a 0–360 degree rotation
  const rotateY = useTransform(scrollY, [0, 1200], [0, 360]);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
      {/* Rotating background image, driven by scroll position */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden flex items-center justify-center"
        style={{ perspective: "1200px" }}
      >
        <motion.img
          src="/hero-bg.jpg"
          alt=""
          style={{ rotateY }}
          className="w-[70%] max-w-2xl rounded-2xl opacity-60"
        />
        {/* Light overlay on top so hero text stays readable over the image */}
        <div className="absolute inset-0 bg-background/35" />
      </div>

      <Container className="relative z-10">
        <div className="flex flex-col-reverse md:flex-row items-center gap-12">
          {/* Text content */}
          <div className="flex-1">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-accent-2 font-medium mb-4"
            >
              Hi, I'm Nitin Kumar
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl sm:text-7xl font-bold tracking-tight"
            >
              Full-Stack{" "}
              <span className="bg-gradient-to-r from-accent to-accent-2 bg-clip-text text-transparent">
                Developer
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-text-secondary text-lg mt-6 max-w-xl"
            >
              I'm a Full-Stack Developer focused on building responsive, user-friendly web applications. I enjoy working with modern web technologies, developing practical projects, and continuously improving my problem-solving and development skills.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex gap-4 mt-10"
            >
              <Button variant="primary" to="/about">
                About Me
              </Button>
              <Button variant="secondary" href="#contact">
                Get in Touch
              </Button>
            </motion.div>
          </div>

          {/* Profile photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="shrink-0"
          >
            <div className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-2xl overflow-hidden border border-border bg-surface">
              <img
                src="/profile.jpg"
                alt="Nitin Kumar"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}