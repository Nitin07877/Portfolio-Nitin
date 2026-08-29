import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { GlowCard } from "../ui/GlowCard";
import { Container } from "../ui/Container";

export function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/api/projects")
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section id="projects" className="py-24 sm:py-32">
      <Container>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-12"
        >
          Projects
        </motion.h2>

        {loading ? (
          <p className="text-text-secondary">Loading projects...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <GlowCard className="h-full">
                  <h3 className="text-xl font-semibold">{project.title}</h3>
                  <p className="text-text-secondary mt-2 text-sm">
                    {project.description}
                  </p>
                  {project.tech_stack && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {project.tech_stack.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs px-3 py-1 rounded-full bg-surface-hover border border-border text-text-secondary"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="flex gap-4 mt-4">
                    {project.github_link && (
                      <a
                        href={project.github_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-text-secondary text-sm font-medium hover:text-text-primary transition-colors"
                      >
                        GitHub →
                      </a>
                    )}
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent-2 text-sm font-medium hover:underline"
                      >
                        Live Demo →
                      </a>
                    )}
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}