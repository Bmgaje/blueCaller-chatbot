// src/context/ChatContext.jsx

import { createContext, useContext, useState } from "react";
import { callOpenAI } from "../services/api"; // named import

const ChatContext = createContext({ messages: [] });

export function ChatProvider({ children }) {
  const [messages, setMessages] = useState([]);
  const [sending, setSending] = useState(false);

  async function sendMessage(text) {
    if (!text.trim() || sending) return;

    // Add user message to state
    const userMsg = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setSending(true);

    try {
      // Send the last 8 messages to the backend
      const data = await callOpenAI([...messages, userMsg].slice(-8));

      if (data?.assistantMsg) {
        setMessages((prev) => [...prev, data.assistantMsg]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: "🤖 I couldn't get a response." },
        ]);
      }
    } catch (err) {
      console.error("Chat API Error:", err);
      setMessages((prev) => [
        ...prev,
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
