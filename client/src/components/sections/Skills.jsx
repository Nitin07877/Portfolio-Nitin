import { motion } from "framer-motion";
import {
  SiOpenjdk,
  SiPostgresql,
  SiJavascript,
  SiHtml5,
  SiCss,
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiGit,
  SiGithub,
  SiFigma,
} from "react-icons/si";
import { Container } from "../ui/Container";

const skills = [
  { name: "Java", Icon: SiOpenjdk, color: "#f97316" },
  { name: "PostgreSQL", Icon: SiPostgresql, color: "#0ea5e9" },
  { name: "JavaScript", Icon: SiJavascript, color: "#eab308" },
  { name: "HTML5", Icon: SiHtml5, color: "#f97316" },
  { name: "CSS3", Icon: SiCss, color: "#3b82f6" },
  { name: "React", Icon: SiReact, color: "#06b6d4" },
  { name: "Node.js", Icon: SiNodedotjs, color: "#22c55e" },
  { name: "Express", Icon: SiExpress, color: "#e5e5e5" },
  { name: "MongoDB", Icon: SiMongodb, color: "#22c55e" },
  { name: "Git", Icon: SiGit, color: "#f97316" },
  { name: "GitHub", Icon: SiGithub, color: "#e5e5e5" },
  { name: "Figma", Icon: SiFigma, color: "#ec4899" },
];

export function Skills() {
  return (
    <section id="skills" className="py-24 sm:py-32">
      <Container>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-12"
        >
          Skills
        </motion.h2>

        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              whileHover={{ y: -4 }}
              className="flex flex-col items-center gap-3 rounded-xl border border-border bg-surface p-5 hover:bg-surface-hover hover:border-border-strong transition-colors"
            >
              <skill.Icon size={32} color={skill.color} />
              <span className="text-xs text-text-secondary text-center">
                {skill.name}
              </span>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}