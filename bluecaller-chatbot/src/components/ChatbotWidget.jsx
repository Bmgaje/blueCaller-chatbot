import { useState, useRef, useEffect } from "react";
import { useChat } from "../context/ChatContext";
import { Send } from "lucide-react";

export default function ChatbotWidget() {
  const { messages, sendMessage, sending } = useChat();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const listRef = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, open]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage(input);
    setInput("");
  };

  // Closed state: Floating chat button
  if (!open)
    return (
      <button
        className="fixed bottom-6 right-6 rounded-full bg-blue-600 p-4 text-white shadow-lg hover:bg-blue-700"
        onClick={() => setOpen(true)}
        aria-label="Open chat"
      >
        💬
      </button>
    );

  // Open state: Chat UI
  return (
    <div className="fixed bottom-6 right-6 flex h-[550px] w-80 flex-col overflow-hidden rounded-2xl bg-white shadow-2xl border border-gray-300">
      <header className="flex items-center justify-between bg-blue-600 p-3 text-white">
        <span>Ask BlueCaller AI</span>
        <button onClick={() => setOpen(false)} aria-label="Close chat">
          ✕
        </button>
      </header>

      <div ref={listRef} className="flex-1 space-y-2 overflow-y-auto p-3">
        {messages.map((m, i) => (
          <div
            key={i}
            className={m.role === "user" ? "text-right" : "text-left"}
          >
            <span
              className={`inline-block max-w-[80%] rounded-xl px-3 py-2 text-sm ${
                m.role === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-900"
              }`}
            >
              {m.content}
            </span>
          </div>
        ))}
        {sending && (
          <p className="text-center text-xs text-gray-500">Thinking…</p>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex border-t p-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 rounded-lg border px-2 py-1 text-sm outline-none"
          placeholder="Ask me anything…"
        />
        <button
          type="submit"
          disabled={sending}
          className="ml-2 rounded-lg bg-blue-600 p-2 text-white hover:bg-blue-700 disabled:opacity-50"
        >
          <Send size={16} />
        </button>
      </form>
    </div>
  );
}
