import { motion } from "framer-motion";

export function GlowCard({ children, className = "", ...props }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`group relative rounded-2xl border border-border bg-surface p-6 overflow-hidden ${className}`}
      {...props}
    >
      {/* Gradient glow that appears on hover */}
      <div className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(400px_circle_at_var(--x,50%)_var(--y,50%),rgba(139,92,246,0.15),transparent_70%)]" />
      
      {/* Content sits above the glow */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}