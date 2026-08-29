import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "../ui/Button";

const links = [
  { label: "About", to: "/about" },
  { label: "Projects", to: "/#projects" },
  { label: "Contact", to: "/#contact" },
];

export function Navbar() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/70 backdrop-blur-md"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="font-bold text-lg tracking-tight">
          Nitin<span className="text-accent">.</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) =>
            link.to === "/about" ? (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm text-text-secondary hover:text-text-primary transition-colors"
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.to}
                href={link.to}
                className="text-sm text-text-secondary hover:text-text-primary transition-colors"
              >
                {link.label}
              </a>
            )
          )}
        </nav>
        <Button
          variant="primary"
          href="/resume.pdf"
          download
          className="!px-4 !py-2 text-xs"
        >
          Download Resume
        </Button>
      </div>
    </motion.header>
  );
}