import { motion } from "framer-motion";
import { FiArrowLeft } from "react-icons/fi";
import { Container } from "../components/ui/Container";
import { Button } from "../components/ui/Button";
import { PageTransition } from "../components/ui/PageTransition";

export function NotFound() {
  return (
    <PageTransition>
      <div className="min-h-screen flex items-center justify-center pt-16">
        <Container className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-7xl sm:text-8xl font-bold bg-gradient-to-r from-accent to-accent-2 bg-clip-text text-transparent mb-4">
              404
            </p>
            <h1 className="text-2xl font-semibold mb-3">Page not found</h1>
            <p className="text-text-secondary mb-8 max-w-md mx-auto">
              The page you're looking for doesn't exist or may have been moved.
            </p>
            <Button variant="primary" to="/">
              <FiArrowLeft className="mr-2" /> Back to Home
            </Button>
          </motion.div>
        </Container>
      </div>
    </PageTransition>
  );
}