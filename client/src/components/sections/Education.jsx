import { motion } from "framer-motion";
import { GlowCard } from "../ui/GlowCard";
import { Container } from "../ui/Container";

const education = [
  {
    degree: "Bachelor of Technology in Computer Science",
    school: "Galgotias University, Greater Noida",
    period: "2022 – 2026",
    score: "75.9%",
  },
  {
    degree: "Senior Secondary Education (Science)",
    school: "Saraswati Vidya Mandir School, CBSE",
    period: "2021 – 2022",
    score: "87.17%",
  },
  {
    degree: "Secondary Education (Class X)",
    school: "Ingraham English School, CBSE",
    period: "2019 – 2020",
    score: "82.8%",
  },
];

export function Education() {
  return (
    <section id="education" className="py-24 sm:py-32">
      <Container>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-12"
        >
          Education
        </motion.h2>

        <div className="flex flex-col gap-6 max-w-2xl">
          {education.map((edu, i) => (
            <motion.div
              key={edu.degree}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <GlowCard>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <h3 className="text-lg font-semibold">{edu.degree}</h3>
                    <p className="text-text-secondary text-sm mt-1">{edu.school}</p>
                  </div>
                  <div className="text-left sm:text-right shrink-0">
                    <p className="text-sm text-accent-2 font-medium">{edu.period}</p>
                    <p className="text-sm text-text-secondary mt-1">{edu.score}</p>
                  </div>
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}