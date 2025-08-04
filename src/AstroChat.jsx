import React, { useState, useRef, useEffect } from "react";

const LS_KEY = "astroai_chat_history";

export default function AstroChat({ selectedProfile }) {
  // Грузим историю из LocalStorage при маунте
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

  // Сохраняем историю в LocalStorage при каждом изменении
  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(messages));
  }, [messages]);

  // Автоскролл вниз при добавлении сообщения
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Очистить чат
  function handleClearChat() {
    setMessages([
      {
        role: "assistant",
        content:
          "Чат очищен. Готов отвечать на новые вопросы! Установи в профиле дату и время своего рождения и я расскажу тебе о многом...",
      },
    ]);
  }

  // Отправка сообщения
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
          messages: newMessages.slice(-12), // последние 12 сообщений
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

  // Стиль облака для сообщений
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
    maxWidth: "84%",
    padding: "16px 18px",
    fontSize: 17,
    margin: "6px 0",
    whiteSpace: "pre-line",
    wordBreak: "break-word",
    position: "relative",
    minHeight: 38,
    transition: "all 0.18s",
  });

  return (
    <div
      style={{
        minHeight: "90vh",
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
          maxWidth: 600,
          minHeight: 520,
          background: "rgba(28, 24, 50, 0.97)",
          borderRadius: 28,
          boxShadow: "0 0 48px #a98aff77,0 2px 18px #1a182a55",
          padding: "32px 0 28px 0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: "40px 0 54px 0",
          border: "2.5px solid #bb7ffa50",
          position: "relative",
          backdropFilter: "blur(2px)",
        }}
      >
        <div
          style={{
            color: "#bb7ffa",
            fontSize: 28,
            fontWeight: 900,
            marginBottom: 16,
            letterSpacing: 0.5,
            textShadow: "0 2px 14px #bb7ffa22",
          }}
        >
          Astro AI Chat
        </div>
        {/* Кнопка очистки */}
        <button
          style={{
            position: "absolute",
            top: 18,
            right: 28,
            color: "#bb7ffa",
            background: "none",
            border: "none",
            fontWeight: 700,
            fontSize: 15,
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
            width: "90%",
            flex: 1,
            minHeight: 280,
            maxHeight: 410,
            overflowY: "auto",
            marginBottom: 18,
            marginTop: 10,
            display: "flex",
            flexDirection: "column",
            gap: 0,
            scrollbarWidth: "thin",
            borderRadius: 17,
            background: "rgba(38, 30, 68, 0.30)",
            boxShadow: "0 2px 24px #bb7ffa09",
            padding: "10px 3px 10px 5px",
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
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    background:
                      "radial-gradient(circle at 60% 30%,#bb7ffa 40%,#463689 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 20,
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
                margin: "6px 0 6px 36px",
                padding: "7px 20px",
                color: "#bb7ffa",
                opacity: 0.9,
                fontWeight: 600,
                letterSpacing: 0.6,
              }}
            >
              <span className="dot-flashing" />
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
            width: "88%",
            gap: 12,
            marginTop: 4,
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
              padding: "15px 19px",
              borderRadius: 11,
              border: "1.5px solid #664ee7",
              background: "#201d32",
              color: "#f3eaff",
              fontSize: 18,
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
          />
          <button
            type="submit"
            disabled={loading || !input.trim() || !selectedProfile}
            style={{
              padding: "13px 32px",
              borderRadius: 10,
              background:
                "linear-gradient(90deg,#bb7ffa 40%,#7a5cf2 120%)",
              color: "#201d32",
              border: "none",
              fontWeight: 800,
              fontSize: 18,
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
