import { useState, useRef, useEffect } from "react";
import { useChat } from "../context/ChatContext";
import { Send } from "lucide-react";
import { callOpenAI } from "../services/api";

export default function ChatbotWidget() {
  const { messages, setMessages } = useChat();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const listRef = useRef(null);

  // Scroll to latest message when open or messages change
  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, open]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    const newMessages = [...messages, userMessage];

    setMessages(newMessages);
    setInput("");
    setSending(true);

    try {
      const reply = await callOpenAI(newMessages);
      if (reply?.choices?.[0]?.message?.content) {
        const aiMessage = reply.choices[0].message;
        setMessages((prev) => [...prev, aiMessage]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: "Sorry, I didn't understand that." },
        ]);
      }
    } catch (err) {
      console.error("OpenAI error:", err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Something went wrong. Try again later.",
        },
      ]);
    } finally {
      setSending(false);
    }
  };

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

  return (
    <div className="fixed bottom-6 right-6 flex h-[550px] w-80 flex-col overflow-hidden rounded-2xl bg-white shadow-2xl border border-gray-300">
      <header className="flex items-center justify-between bg-blue-600 p-3 text-white">
        <span>Ask BlueCaller AI</span>
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
