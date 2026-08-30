import { FiMail, FiLinkedin, FiGithub } from "react-icons/fi";
import { Container } from "../ui/Container";

const socials = [
  { icon: FiMail, href: "mailto:nitinchaudhary12334@gmail.com", label: "Email" },
  { icon: FiLinkedin, href: "https://www.linkedin.com/in/nitin-kumar0787/", label: "LinkedIn" },
  { icon: FiGithub, href: "https://github.com/Nitin07877", label: "GitHub" },
];

export function Footer() {
  return (
    <footer className="border-t border-border py-8">
      <Container className="flex flex-col items-center gap-4">
        <h3 className="text-lg font-semibold">Connect With Me</h3>

        <div className="flex items-center gap-3">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target={social.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              aria-label={social.label}
              className="w-11 h-11 rounded-lg bg-gradient-to-br from-accent/20 to-accent-2/20 border border-border flex items-center justify-center text-text-primary hover:from-accent/40 hover:to-accent-2/40 hover:-translate-y-1 transition-all"
            >
              <social.icon size={18} />
            </a>
          ))}
        </div>

        <p className="text-text-secondary text-sm">
          © {new Date().getFullYear()} Nitin Kumar. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}