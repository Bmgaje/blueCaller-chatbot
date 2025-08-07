import { createContext, useContext, useState } from "react";
import api from "../services/api";

const ChatContext = createContext({ messages: [] });

export function ChatProvider({ children }) {
  const [messages, setMessages] = useState([]);
  const [sending, setSending] = useState(false);

  async function sendMessage(text) {
    if (!text.trim() || sending) return;

    const userMsg = { role: "user", content: text };
    setMessages((m) => [...m, userMsg]);
    setSending(true);

    try {
      const { data } = await api.post("/chat", {
        messages: [...messages, userMsg].slice(-8), // send last 8 msgs
      });
      setMessages((m) => [...m, data.assistantMsg]);
    } catch (err) {
      console.error(err);
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "🚨 Sorry, something went wrong." },
      ]);
    } finally {
      setSending(false);
    }
  }

  return (
    <ChatContext.Provider value={{ messages, sendMessage, sending }}>
      {children}
    </ChatContext.Provider>
  );
}

export const useChat = () => useContext(ChatContext);
