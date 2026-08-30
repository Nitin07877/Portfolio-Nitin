import { motion } from "framer-motion";
import { FiAward } from "react-icons/fi";
import { Container } from "../ui/Container";
import { GlowCard } from "../ui/GlowCard";

const certifications = [
  { title: "Front-End Development", issuer: "Simplilearn", year: "2025" },
  { title: "Java Fundamentals", issuer: "Oracle Academy", year: "2024" },
  { title: "Database Programming with SQL", issuer: "Oracle Academy", year: "2024" },
];

export function Certifications() {
  return (
    <section id="certifications" className="py-24 sm:py-32">
      <Container>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-12"
        >
          Certifications
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <GlowCard className="h-full">
                <div className="w-11 h-11 rounded-xl bg-surface-hover border border-border flex items-center justify-center text-accent-2 mb-4">
                  <FiAward size={18} />
                </div>
                <h3 className="font-semibold mb-1">{cert.title}</h3>
                <p className="text-text-secondary text-sm">{cert.issuer}</p>
                <p className="text-text-secondary text-xs mt-2">{cert.year}</p>
              </GlowCard>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}