import React, { useState, useRef, useEffect } from "react";

const LS_KEY = "astroai_chat_history";

export default function AstroChat({ selectedProfile }) {
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem(LS_KEY);
    if (saved) return JSON.parse(saved);
    return [
      {
        role: "assistant",
        content:
          "Привет! Меня зовут Тимофей и я докажу тебе, что мы все муравьшки, которые очень подвержены влиянию большой системы под названием \"Космос\". Мы - единое целое. И от движений планет и звезд зависит многое. Установи в профиле дату и время своего рождения и я расскажу тебе о многом...",
      },
    ];
  });

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

import React, { useRef, useEffect, useState } from "react";

export default function AstroChat({ selectedProfile }) {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        'Привет! Меня зовут Тимофей ... (и т.д.)',
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // NEW: Трекаем последнее количество сообщений
  const prevMessagesLength = useRef(messages.length);

  useEffect(() => {
    // Автоскроллим только если реально добавили новое сообщение (но НЕ при монтировании или возврате к разделу)
    if (messages.length > prevMessagesLength.current) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
    prevMessagesLength.current = messages.length;
  }, [messages]);

  // ... остальной твой код чата

  return (
    <div style={{ /* ... */ }}>
      {/* ... */}
      <div style={{ overflowY: "auto", /* ... */ }}>
        {/* сообщения */}
        <div ref={messagesEndRef} />
      </div>
      {/* ... */}
    </div>
  );
}


  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  function handleClearChat() {
    setMessages([
      {
        role: "assistant",
        content:
          "Чат очищен. Готов отвечать на новые вопросы! Установи в профиле дату и время своего рождения и я расскажу тебе о многом...",
      },
    ]);
  }

  async function handleSend(e) {
    e.preventDefault();
    if (!input.trim() || loading) return;
    if (!selectedProfile) {
      setMessages((msgs) => [
        ...msgs,
        {
          role: "assistant",
          content:
            "Пожалуйста, выбери и заполни профиль с датой и временем рождения во вкладке «Мои профили».",
        },
      ]);
      setInput("");
      return;
    }
    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/gpt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.slice(-12),
          profile: selectedProfile,
        }),
      });
      const data = await res.json();
      setMessages((msgs) => [
        ...msgs,
        {
          role: "assistant",
          content:
            data.choices?.[0]?.message?.content ||
            "Ошибка ответа AI. Попробуй ещё раз.",
        },
      ]);
    } catch {
      setMessages((msgs) => [
        ...msgs,
        {
          role: "assistant",
          content: "Ошибка соединения с сервером.",
        },
      ]);
    }
    setLoading(false);
  }

  // Media-query-like style helpers
  const isMobile =
    window.innerWidth <= 600 ||
    /iPhone|Android|Mobile/i.test(navigator.userAgent);

  // Bubble style
  const bubbleStyle = (role) => ({
    alignSelf: role === "user" ? "flex-end" : "flex-start",
    background:
      role === "user"
        ? "linear-gradient(90deg,#7a5cf2,#bb7ffa 85%)"
        : "rgba(22,20,44,0.88)",
    color: role === "user" ? "#fff" : "#e4daff",
    borderRadius:
      role === "user"
        ? "18px 18px 6px 18px"
        : "18px 18px 18px 6px",
    boxShadow:
      role === "user"
        ? "0 4px 16px #bb7ffa50"
        : "0 2px 12px #44336615",
    maxWidth: isMobile ? "98%" : "84%",
    padding: isMobile ? "12px 12px" : "16px 18px",
    fontSize: isMobile ? 15.5 : 17,
    margin: "6px 0",
    whiteSpace: "pre-line",
    wordBreak: "break-word",
    minHeight: 34,
    transition: "all 0.18s",
  });

  return (
    <div
      style={{
        minHeight: isMobile ? "96vh" : "90vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "radial-gradient(circle at 75% 75%, #352666 0%, #181a2f 80%)",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: isMobile ? "99vw" : 600,
          minHeight: isMobile ? "82vh" : 520,
          background: "rgba(28, 24, 50, 0.97)",
          borderRadius: isMobile ? 18 : 28,
          boxShadow: "0 0 28px #a98aff66,0 2px 16px #1a182a33",
          padding: isMobile ? "12px 0 6px 0" : "32px 0 28px 0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: isMobile ? "0 0 0 0" : "40px 0 54px 0",
          border: isMobile ? "1.5px solid #bb7ffa35" : "2.5px solid #bb7ffa50",
          position: "relative",
          backdropFilter: isMobile ? undefined : "blur(2px)",
        }}
      >
        <div
          style={{
            color: "#bb7ffa",
            fontSize: isMobile ? 22 : 28,
            fontWeight: 900,
            marginBottom: isMobile ? 8 : 16,
            letterSpacing: 0.5,
            textShadow: "0 2px 14px #bb7ffa22",
          }}
        >
          Astro AI Chat
        </div>
        <button
          style={{
            position: "absolute",
            top: isMobile ? 8 : 18,
            right: isMobile ? 10 : 28,
            color: "#bb7ffa",
            background: "none",
            border: "none",
            fontWeight: 700,
            fontSize: isMobile ? 12 : 15,
            cursor: "pointer",
            opacity: 0.7,
          }}
          onClick={handleClearChat}
          title="Очистить чат"
        >
          🗑 Очистить
        </button>

        {/* Переписка */}
        <div
          style={{
            width: "95%",
            flex: 1,
            minHeight: isMobile ? 180 : 280,
            maxHeight: isMobile ? "54vh" : 410,
            overflowY: "auto",
            marginBottom: isMobile ? 10 : 18,
            marginTop: isMobile ? 3 : 10,
            display: "flex",
            flexDirection: "column",
            gap: 0,
            scrollbarWidth: "thin",
            borderRadius: 17,
            background: "rgba(38, 30, 68, 0.30)",
            boxShadow: "0 2px 24px #bb7ffa09",
            padding: isMobile ? "5px 1px 5px 3px" : "10px 3px 10px 5px",
            position: "relative",
          }}
        >
          {messages.map((m, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "flex-end",
                marginBottom: 2,
                gap: 8,
                position: "relative",
              }}
            >
              {m.role === "assistant" && (
                <span
                  style={{
                    width: isMobile ? 24 : 32,
                    height: isMobile ? 24 : 32,
                    borderRadius: "50%",
                    background:
                      "radial-gradient(circle at 60% 30%,#bb7ffa 40%,#463689 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: isMobile ? 16 : 20,
                    marginRight: 5,
                    marginLeft: 2,
                  }}
                >
                  <span role="img" aria-label="AI">
                    ⭐
                  </span>
                </span>
              )}
              <div style={bubbleStyle(m.role)}>{m.content}</div>
            </div>
          ))}
          {loading && (
            <div
              style={{
                alignSelf: "flex-start",
                margin: isMobile ? "4px 0 4px 28px" : "6px 0 6px 36px",
                padding: isMobile ? "5px 13px" : "7px 20px",
                color: "#bb7ffa",
                opacity: 0.9,
                fontWeight: 600,
                letterSpacing: 0.6,
                fontSize: isMobile ? 14 : 17,
              }}
            >
              AI пишет ответ…
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        {/* Input */}
        <form
          onSubmit={handleSend}
          style={{
            display: "flex",
            width: isMobile ? "97%" : "88%",
            gap: isMobile ? 6 : 12,
            marginTop: isMobile ? 3 : 4,
            alignItems: "center",
          }}
        >
          <input
            type="text"
            placeholder={
              !selectedProfile
                ? "Сначала выбери профиль!"
                : "Введите ваш вопрос..."
            }
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading || !selectedProfile}
            style={{
              flex: 1,
              padding: isMobile ? "10px 13px" : "15px 19px",
              borderRadius: isMobile ? 8 : 11,
              border: "1.5px solid #664ee7",
              background: "#201d32",
              color: "#f3eaff",
              fontSize: isMobile ? 15 : 18,
              fontWeight: 500,
              outline: "none",
              boxShadow: "0 1px 9px #bb7ffa18",
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                handleSend(e);
              }
            }}
            autoFocus
            autoComplete="off"
            inputMode="text"
          />
          <button
            type="submit"
            disabled={loading || !input.trim() || !selectedProfile}
            style={{
              padding: isMobile ? "9px 18px" : "13px 32px",
              borderRadius: isMobile ? 6 : 10,
              background:
                "linear-gradient(90deg,#bb7ffa 40%,#7a5cf2 120%)",
              color: "#201d32",
              border: "none",
              fontWeight: 800,
              fontSize: isMobile ? 15 : 18,
              cursor: loading || !input.trim() || !selectedProfile ? "not-allowed" : "pointer",
              boxShadow: "0 1px 12px #bb7ffa22",
              transition: "background 0.18s",
            }}
          >
            {loading ? "..." : "Отправить"}
          </button>
        </form>
      </div>
    </div>
  );
}
