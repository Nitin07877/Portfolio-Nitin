import { motion } from "framer-motion";

// Wraps a full page's content so it fades in on mount and fades out on unmount.
// Used together with AnimatePresence in App.jsx to animate between routes.
export function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}