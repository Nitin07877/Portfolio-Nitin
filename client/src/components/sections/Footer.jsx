import { Container } from "../ui/Container";

const socials = [
  { label: "GitHub", href: "https://github.com/Nitin07877" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/nitin-kumar0787/" },
  { label: "Email", href: "mailto:nitinchaudhary12334@gmail.com" },
];

export function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <Container className="flex flex-col sm:flex-row items-center justify-between gap-6">
        <p className="text-text-secondary text-sm">
          © {new Date().getFullYear()} Nitin Kumar. All rights reserved.
        </p>
        <div className="flex items-center gap-6">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-text-secondary hover:text-text-primary transition-colors"
            >
              {social.label}
            </a>
          ))}
        </div>
      </Container>
    </footer>
  );
}