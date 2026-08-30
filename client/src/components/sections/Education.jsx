import { motion } from "framer-motion";
import { FaGraduationCap } from "react-icons/fa6";
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
          className="text-4xl font-bold mb-14"
        >
          Education
        </motion.h2>

        <div className="relative max-w-2xl">
          {/* Connecting vertical line */}
          <div className="absolute left-6 top-2 bottom-2 w-px bg-border" />

          <div className="flex flex-col gap-10">
            {education.map((edu, i) => (
              <motion.div
                key={edu.degree}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="relative flex gap-6"
              >
                {/* Icon marker */}
                <div className="relative z-10 shrink-0 w-12 h-12 rounded-full bg-surface border border-border flex items-center justify-center text-accent-2">
                  <FaGraduationCap size={18} />
                </div>

                {/* Content */}
                <div className="flex-1 pt-1">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-1">
                    <h3 className="text-lg font-semibold">{edu.degree}</h3>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-accent/10 text-accent-2 font-medium">
                      {edu.period}
                    </span>
                  </div>
                  <p className="text-text-secondary text-sm mb-2">{edu.school}</p>
                  <p className="text-sm text-text-primary font-medium">
                    Score: <span className="text-accent-2">{edu.score}</span>
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}