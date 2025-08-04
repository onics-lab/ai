// src/AstroChat.jsx

import React, { useState, useRef, useEffect } from "react";

// Можно заменить svg на любую астрологическую иконку
const astroIcon = (
  <span
    style={{
      background: "linear-gradient(135deg, #bb7ffa 60%, #6e44ff 100%)",
      borderRadius: "50%",
      width: 40,
      height: 40,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      marginRight: 12,
      fontSize: 26,
      boxShadow: "0 0 18px #bb7ffa55",
    }}
  >
    ⭐
  </span>
);

export default function AstroChat({ astroPath, selectedProfile }) {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Привет! Меня зовут Тимофей и я докажу тебе, что мы все муравьшки, которые очень подвержены влиянию большой системы под названием \"Космос\". Мы - единое целое. И от движений планет и звезд зависит многое. Установи в профиле дату и время своего рождения и я расскажу тебе о многом...",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Прокрутка вниз после нового сообщения
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

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
    <div
      style={{
        minHeight: "72vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "radial-gradient(ellipse 60% 70% at 70% 80%, #bb7ffa11 0%, #181c2b 90%)",
      }}
    >
      <div
        style={{
          width: 480,
          maxWidth: "95vw",
          background: "rgba(25,27,47,0.97)",
          borderRadius: 24,
          boxShadow:
            "0 2px 64px 0 #7e4dea45, 0 0 0 4px #bb7ffa22 inset, 0 1.5px 8px #221e35",
          border: "1.5px solid #322d54",
          padding: "38px 38px 28px 38px",
          position: "relative",
          animation: "fadein 0.9s",
          zIndex: 1,
        }}
      >
        <h2
          style={{
            textAlign: "center",
            fontWeight: 900,
            letterSpacing: ".4px",
            marginBottom: 24,
            color: "#bb7ffa",
            fontSize: 28,
            textShadow: "0 2px 14px #7e4dea33",
          }}
        >
          Astro AI Chat
        </h2>
        <div
          style={{
            minHeight: 220,
            maxHeight: 350,
            overflowY: "auto",
            marginBottom: 18,
            paddingRight: 3,
            scrollbarWidth: "thin",
          }}
        >
          {messages.map((m, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "flex-start",
                marginBottom: 14,
                animation: "fadein .7s",
                opacity: 1,
              }}
            >
              {m.role === "assistant" ? astroIcon : null}
              <div
                style={{
                  background:
                    m.role === "user"
                      ? "linear-gradient(100deg, #191c2d 60%, #31235a 100%)"
                      : "linear-gradient(120deg, #231c38 80%, #2a1944 100%)",
                  color: m.role === "user" ? "#ececff" : "#fff",
                  fontSize: 16.7,
                  fontWeight: 500,
                  borderRadius: 14,
                  padding: m.role === "user" ? "11px 16px 10px 18px" : "13px 19px 13px 15px",
                  boxShadow: m.role === "assistant" ? "0 3px 16px #bb7ffa23" : "none",
                  marginLeft: m.role === "user" ? "auto" : 0,
                  marginRight: m.role === "user" ? 0 : 8,
                  maxWidth: "88%",
                  whiteSpace: "pre-line",
                  lineHeight: 1.55,
                  border:
                    m.role === "assistant"
                      ? "1.2px solid #b18cf7"
                      : "1.2px solid #3e3461",
                }}
              >
                {m.role === "user" ? <b style={{ color: "#bb7ffa" }}>Вы: </b> : <b style={{ color: "#bb7ffa" }}>Astro AI: </b>}
                {m.content}
              </div>
            </div>
          ))}
          {loading && (
            <div
              style={{
                color: "#bb7ffa",
                opacity: 0.7,
                fontStyle: "italic",
                margin: "9px 0 6px 4px",
              }}
            >
              Astro AI печатает...
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <form
          onSubmit={handleSend}
          style={{ display: "flex", gap: 10, marginTop: 14 }}
        >
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Введите ваш вопрос..."
            style={{
              flex: 1,
              borderRadius: 10,
              border: "1.3px solid #39297c",
              padding: "13px 14px",
              fontSize: 17,
              background: "#181c2b",
              color: "#fff",
              outline: "none",
              transition: "border 0.17s, box-shadow 0.17s",
              boxShadow: "0 1.5px 4px #181c2b1a",
            }}
            disabled={loading}
            autoFocus
            autoComplete="off"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            style={{
              background: "linear-gradient(100deg,#bb7ffa 60%,#6e44ff 100%)",
              color: "#181825",
              border: "none",
              borderRadius: 10,
              padding: "0 25px",
              fontSize: 17,
              fontWeight: 700,
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.55 : 1,
              transition: "background 0.2s, color 0.2s",
              boxShadow: "0 0 10px #bb7ffa55",
            }}
          >
            {loading ? "..." : "Отправить"}
          </button>
        </form>
      </div>
      {/* Можно добавить "небо" или animated-stars css-бэкграунд для большего вау-эффекта */}
      <style>
        {`
        @keyframes fadein { from { opacity: 0; transform: translateY(22px); } to { opacity: 1; transform: none; } }
        `}
      </style>
    </div>
  );
}
