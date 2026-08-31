import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMessageCircle, FiX, FiSend } from "react-icons/fi";

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "model", text: "Hi! Ask me anything about Nitin's background, skills, or projects." },
  ]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const scrollRef = useRef(null);

  // Auto-scroll to the latest message whenever messages change
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  async function handleSend(e) {
    e.preventDefault();
    if (!input.trim() || sending) return;

    const userMessage = { role: "user", text: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setSending(true);

    // Add an empty placeholder message that we'll fill in as chunks arrive
    setMessages((prev) => [...prev, { role: "model", text: "" }]);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage.text,
          history: newMessages.slice(1),
        }),
      });

      if (!res.ok || !res.body) throw new Error("Request failed");

      // Read the response as a stream, appending each chunk to the last message as it arrives
      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunkText = decoder.decode(value, { stream: true });

        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            ...updated[updated.length - 1],
            text: updated[updated.length - 1].text + chunkText,
          };
          return updated;
        });
      }
    } catch {
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = { role: "model", text: "Sorry, something went wrong. Please try again." };
        return updated;
      });
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      {/* Floating toggle button */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Chat about Nitin"
        className="fixed bottom-6 left-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-accent to-accent-2 text-white flex items-center justify-center shadow-lg"
      >
        {open ? <FiX size={22} /> : <FiMessageCircle size={22} />}
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 left-6 z-50 w-[90vw] max-w-sm h-[28rem] rounded-2xl border border-border bg-surface shadow-2xl flex flex-col overflow-hidden"
          >
            <div className="px-4 py-3 border-b border-border">
              <p className="font-semibold text-sm">Ask about Nitin</p>
              <p className="text-xs text-text-secondary">AI-powered — answers based on his real background</p>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-3">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`max-w-[85%] px-3 py-2 rounded-xl text-sm leading-relaxed ${
                    m.role === "user"
                      ? "self-end bg-accent/20 text-text-primary"
                      : "self-start bg-surface-hover text-text-secondary"
                  }`}
                >
                  {m.text}
                </div>
              ))}
              {sending && (
                <div className="self-start bg-surface-hover text-text-secondary px-3 py-2 rounded-xl text-sm">
                  Typing...
                </div>
              )}
            </div>

            <form onSubmit={handleSend} className="p-3 border-t border-border flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question..."
                className="flex-1 rounded-lg bg-surface-hover border border-border px-3 py-2 text-sm focus:outline-none focus:border-accent"
              />
              <button
                type="submit"
                disabled={sending}
                className="w-9 h-9 shrink-0 rounded-lg bg-gradient-to-r from-accent to-accent-2 text-white flex items-center justify-center disabled:opacity-50"
              >
                <FiSend size={15} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}