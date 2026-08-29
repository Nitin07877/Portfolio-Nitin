import { useState } from "react";
import { motion } from "framer-motion";
import { FiUser, FiMail, FiMessageSquare, FiSend, FiMapPin } from "react-icons/fi";
import { GlowCard } from "../ui/GlowCard";
import { Button } from "../ui/Button";
import { Container } from "../ui/Container";

export function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("https://portfolio-nitin-pi-ten.vercel.app/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Failed to send");
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background glow, matching the Hero */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 -right-32 w-96 h-96 rounded-full bg-accent/15 blur-[100px]" />
        <div className="absolute bottom-0 -left-32 w-96 h-96 rounded-full bg-accent-2/15 blur-[100px]" />
      </div>

      <Container className="relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-4"
        >
          Get in Touch
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="text-text-secondary mb-14 max-w-lg"
        >
          Have a project in mind or just want to say hi? I'd love to hear from you.
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Left: contact info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2 flex flex-col gap-6"
          >
            <div className="flex items-start gap-4">
              <div className="shrink-0 w-11 h-11 rounded-xl bg-surface border border-border flex items-center justify-center text-accent-2">
                <FiMail size={18} />
              </div>
              <div>
                <p className="text-sm text-text-secondary">Email</p>
                <a
                  href="mailto:nitinchaudhary12334@gmail.com"
                  className="text-text-primary font-medium hover:text-accent-2 transition-colors"
                >
                  nitinchaudhary12334@gmail.com
                </a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="shrink-0 w-11 h-11 rounded-xl bg-surface border border-border flex items-center justify-center text-accent-2">
                <FiMapPin size={18} />
              </div>
              <div>
                <p className="text-sm text-text-secondary">Location</p>
                <p className="text-text-primary font-medium">Greater Noida, India</p>
              </div>
            </div>
            <div className="mt-4 pt-6 border-t border-border">
              <p className="text-sm text-text-secondary leading-relaxed">
                Currently looking for full-stack developer opportunities. I typically respond within a day.
              </p>
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-3"
          >
            <GlowCard>
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="relative">
                  <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" size={16} />
                  <input
                    type="text"
                    name="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg bg-surface-hover border border-border pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors"
                  />
                </div>

                <div className="relative">
                  <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" size={16} />
                  <input
                    type="email"
                    name="email"
                    placeholder="Your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg bg-surface-hover border border-border pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors"
                  />
                </div>

                <div className="relative">
                  <FiMessageSquare className="absolute left-4 top-4 text-text-secondary" size={16} />
                  <textarea
                    name="message"
                    placeholder="Your message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full rounded-lg bg-surface-hover border border-border pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors resize-none"
                  />
                </div>

                <Button type="submit" variant="primary" className="mt-1 gap-2">
                  {status === "sending" ? "Sending..." : "Send Message"}
                  {status !== "sending" && <FiSend size={15} />}
                </Button>

                {status === "success" && (
                  <p className="text-accent-2 text-sm">Message sent! I'll get back to you soon.</p>
                )}
                {status === "error" && (
                  <p className="text-red-400 text-sm">Something went wrong. Please try again.</p>
                )}
              </form>
            </GlowCard>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}