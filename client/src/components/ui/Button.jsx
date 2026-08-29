import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const variants = {
  primary: "bg-gradient-to-r from-accent to-accent-2 text-white",
  secondary: "border border-border bg-surface text-text-primary hover:bg-surface-hover",
  ghost: "text-text-secondary hover:text-text-primary",
};

export function Button({ variant = "primary", href, to, children, className = "", ...props }) {
  const classes = `inline-flex items-center justify-center rounded-full px-6 py-3 font-medium text-sm transition-colors ${variants[variant]} ${className}`;

  // "to" = internal route (React Router), "href" = plain link/anchor, neither = button
  if (to) {
    const MotionLink = motion(Link);
    return (
      <MotionLink
        to={to}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        className={classes}
        {...props}
      >
        {children}
      </MotionLink>
    );
  }

  const MotionTag = href ? motion.a : motion.button;

  return (
    <MotionTag
      href={href}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={classes}
      {...props}
    >
      {children}
    </MotionTag>
  );
}