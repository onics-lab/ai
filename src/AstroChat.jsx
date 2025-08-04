// src/AstroChat.jsx

import React, { useState } from "react";

export default function AstroChat() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Привет! Меня зовут Тимофей и я докажу тебе, что мы все муравьшки, которые очень подвержены влиянию большой системы под названием \"Космос\". Мы - единое целое. И от движений планет и звезд зависит многое. Установи в профиле дату и время своего рождения и я расскажу тебе о многом..." }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessageToGPT(msgs) {
    const response = await fetch("/api/gpt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: msgs }),
    });
    const data = await response.json();
    return data.choices?.[0]?.message?.content || "Ошибка ответа AI.";
  }

  async function handleSend(e) {
    e.preventDefault();
    if (!input.trim()) return;
    const userMessage = { role: "user", content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const aiReply = await sendMessageToGPT(newMessages);
      setMessages([...newMessages, { role: "assistant", content: aiReply }]);
    } catch (err) {
      setMessages([...newMessages, { role: "assistant", content: "Ошибка AI." }]);
    }
    setLoading(false);
  }

  return (
    <div style={{ maxWidth: 600, margin: "40px auto", background: "#222b3a", borderRadius: 16, boxShadow: "0 8px 32px #110a30", padding: 24 }}>
      <h2 style={{ textAlign: "center" }}>Astro AI Chat</h2>
      <div style={{ minHeight: 280, marginBottom: 16 }}>
        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              background: m.role === "user" ? "#3a3450" : "#232a40",
              color: m.role === "user" ? "#aac" : "#fff",
              margin: "8px 0",
              borderRadius: 12,
              padding: 10,
              alignSelf: m.role === "user" ? "flex-end" : "flex-start",
              maxWidth: "95%",
              whiteSpace: "pre-line",
            }}
          >
            <b>{m.role === "user" ? "Вы:" : "Astro AI:"}</b> {m.content}
          </div>
        ))}
        {loading && (
          <div style={{
            color: "#fff",
            opacity: 0.6,
            fontStyle: "italic",
            margin: "8px 0",
            paddingLeft: 4
          }}>Astro AI печатает...</div>
        )}
      </div>
      <form onSubmit={handleSend} style={{ display: "flex", gap: 8 }}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Введите ваш вопрос..."
          style={{ flex: 1, borderRadius: 8, border: "none", padding: 12, fontSize: 16, background: "#181c2b", color: "#fff" }}
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          style={{
            background: "#6e44ff",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "0 22px",
            fontSize: 16,
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.5 : 1
          }}
        >
          {loading ? "..." : "Отправить"}
        </button>
      </form>
    </div>
  );
}
