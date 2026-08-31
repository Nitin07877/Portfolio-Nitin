import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { GlowCard } from "../ui/GlowCard";
import { Container } from "../ui/Container";
import { ProjectCardSkeleton } from "../ui/Skeleton";

export function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/projects`)
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Build a unique, sorted list of every tech tag across all projects, for the filter buttons
  const allTags = useMemo(() => {
    const tagSet = new Set();
    projects.forEach((p) => p.tech_stack?.forEach((t) => tagSet.add(t)));
    return ["All", ...Array.from(tagSet).sort()];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return projects;
    return projects.filter((p) => p.tech_stack?.includes(activeFilter));
  }, [projects, activeFilter]);

  return (
    <section id="projects" className="py-24 sm:py-32">
      <Container>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-8"
        >
          Projects
        </motion.h2>

        {/* Filter buttons */}
        {!loading && (
          <div className="flex flex-wrap gap-2 mb-10">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveFilter(tag)}
                className={`text-sm px-4 py-1.5 rounded-full border transition-colors ${
                  activeFilter === tag
                    ? "bg-accent/20 border-accent text-text-primary"
                    : "border-border text-text-secondary hover:text-text-primary hover:border-border-strong"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <ProjectCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                <GlowCard className="h-full !p-0 overflow-hidden">
                  {project.image && (
                    <Link to={`/projects/${project.id}`}>
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-40 object-cover object-top border-b border-border"
                      />
                    </Link>
                  )}

                  <div className="p-6">
                    <Link to={`/projects/${project.id}`}>
                      <h3 className="text-xl font-semibold hover:text-accent-2 transition-colors">
                        {project.title}
                      </h3>
                    </Link>
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