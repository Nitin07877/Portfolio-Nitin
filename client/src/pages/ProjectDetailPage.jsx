import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowLeft, FiGithub, FiExternalLink, FiCheck } from "react-icons/fi";
import { Container } from "../components/ui/Container";
import { Button } from "../components/ui/Button";
import { GlowCard } from "../components/ui/GlowCard";

// Extra "key features" per project, keyed by title — extends what's stored in the database.
const projectHighlights = {
  "Sensai – AI Career Coach": [
    "Built a resume builder module that generates structured, job-ready resumes tailored to user profiles",
    "Integrated industry growth analysis to surface trending career domains and future job opportunities",
    "Designed mock quizzes to evaluate user knowledge and support interview preparation",
  ],
  "Currency Converter": [
    "Fetches real-time exchange rates from a public REST API",
    "Simple, intuitive interface for quick conversions between currencies",
    "Handles API errors gracefully with clear user feedback",
  ],
  "Rock Paper Scissor Game": [
    "Interactive browser-based gameplay against the computer",
    "Dynamic result display with live score tracking",
    "Clean, responsive UI built with vanilla JavaScript",
  ],
  "LeetCode Metric": [
    "Pulls a user's problem-solving stats directly from the LeetCode API",
    "Visualizes progress to make it easy to track improvement over time",
    "Built entirely with vanilla JS — no framework overhead",
  ],
  "Countdown Timer": [
    "Lets users set a target date/event and see live remaining time",
    "Clean, distraction-free interface",
    "Fully responsive across devices",
  ],
  "StudySync UI Design": [
    "Modern, structured layout for presenting educational content",
    "Focus on clean typography and readability",
    "Fully responsive design built with HTML/CSS",
  ],
};

export function ProjectDetailPage() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/projects`)
      .then((res) => res.json())
      .then((data) => {
        const match = data.find((p) => String(p.id) === id);
        if (!match) {
          setNotFound(true);
        } else {
          setProject(match);
        }
        setLoading(false);
      })
      .catch(() => {
        setNotFound(true);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="pt-32 pb-24">
        <Container>
          <p className="text-text-secondary">Loading project...</p>
        </Container>
      </div>
    );
  }

  if (notFound || !project) {
    return (
      <div className="pt-32 pb-24">
        <Container>
          <p className="text-text-secondary mb-4">Project not found.</p>
          <Button variant="secondary" to="/">
            <FiArrowLeft className="mr-2" /> Back to Home
          </Button>
        </Container>
      </div>
    );
  }

  const highlights = projectHighlights[project.title] || [];

  return (
    <div className="pt-32 pb-24">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            to="/#projects"
            className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary text-sm mb-8 transition-colors"
          >
            <FiArrowLeft size={15} /> Back to Projects
          </Link>

          {/* Image on the right, content on the left, on large screens */}
          <div className="flex flex-col lg:flex-row-reverse gap-10 lg:gap-14 items-start">
            {project.image && (
              <div className="w-full lg:w-1/2 shrink-0 rounded-2xl overflow-hidden border border-border">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full object-cover object-top"
                />
              </div>
            )}

            <div className="flex-1">
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
                {project.title}
              </h1>

              {project.tech_stack && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech_stack.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-3 py-1.5 rounded-full bg-surface-hover border border-border text-text-secondary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}

              <GlowCard className="mb-6">
                <h2 className="text-sm font-semibold text-accent-2 uppercase tracking-wide mb-3">
                  Overview
                </h2>
                <p className="text-text-secondary leading-relaxed">
                  {project.description}
                </p>
              </GlowCard>

              {highlights.length > 0 && (
                <GlowCard className="mb-8">
                  <h2 className="text-sm font-semibold text-accent-2 uppercase tracking-wide mb-3">
                    Key Features
                  </h2>
                  <ul className="flex flex-col gap-2.5">
                    {highlights.map((point) => (
                      <li key={point} className="flex items-start gap-2.5">
                        <FiCheck className="text-accent-2 mt-0.5 shrink-0" size={16} />
                        <span className="text-text-secondary text-sm leading-relaxed">
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>
                </GlowCard>
              )}

              <div className="flex gap-4">
                {project.github_link && (
                  <Button variant="secondary" href={project.github_link}>
                    <FiGithub className="mr-2" /> View Code
                  </Button>
                )}
                {project.link && (
                  <Button variant="primary" href={project.link}>
                    <FiExternalLink className="mr-2" /> Live Demo
                  </Button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </div>
  );
}