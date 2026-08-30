import { useState, useEffect } from "react";

// Cycles through a list of words, typing and deleting each one, like a typewriter
export function TypewriterText({ words, className = "" }) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    const typingSpeed = deleting ? 40 : 90;

    const timeout = setTimeout(() => {
      if (!deleting) {
        // Still typing the current word forward
        if (text.length < currentWord.length) {
          setText(currentWord.slice(0, text.length + 1));
        } else {
          // Finished typing — pause, then start deleting
          setTimeout(() => setDeleting(true), 1200);
        }
      } else {
        // Deleting backward
        if (text.length > 0) {
          setText(currentWord.slice(0, text.length - 1));
        } else {
          setDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [text, deleting, wordIndex, words]);

  return (
    <span className={className}>
      {text}
      <span className="animate-pulse">|</span>
    </span>
  );
}