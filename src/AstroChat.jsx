import React, { useRef, useEffect, useState } from "react";

export default function AstroChat({ selectedProfile }) {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Чат очищен. Готов отвечать на новые вопросы! Установи в профиле дату и время своего рождения и я расскажу тебе о многом...",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Сохраняем предыдущее кол-во сообщений для контроля автоскролла
  const prevMessagesLength = useRef(messages.length);
  useEffect(() => {
    // Прокрутка только если добавилось новое сообщение, не при каждом рендере!
    if (messages.length > prevMessagesLength.current) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
    prevMessagesLength.current = messages.length;
  }, [messages]);

  // Отправка сообщения (пример)
  async function handleSend() {
    if (!input.trim()) return;
    setLoading(true);
    setMessages((msgs) => [
      ...msgs,
      { role: "user", content: input.trim() },
    ]);
    setInput("");
    // Тут запрашивай GPT (и прокидывай профиль если есть)
    // Имитация ответа:
    setTimeout(() => {
      setMessages((msgs) => [
        ...msgs,
        {
          role: "assistant",
          content:
            "Это пример ответа AI. На мобиле теперь всё стильно, текст не уезжает, карточки занимают ширину экрана. Автопрокрутка вниз только при новых сообщениях.",
        },
      ]);
      setLoading(false);
    }, 900);
  }

  // Enter = отправить
  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  // Определяем мобильную ширину
  const isMobile =
    typeof window !== "undefined"
      ? window.innerWidth < 600
      : false;

  const chatWidth = isMobile ? "98vw" : 520;
  const chatPadding = isMobile ? "10vw 0 8vw 0" : "40px 0 26px 0";
  const bubbleMaxWidth = isMobile ? "90vw" : 400;
  const fontSize = isMobile ? 15.5 : 17;

  return (
    <div
      style={{
        width: "100vw",
        minHeight: "72vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: chatPadding,
        background: "none",
      }}
    >
      <div
        style={{
          width: chatWidth,
          maxWidth: "100vw",
          background: "rgba(34,24,52,0.96)",
          borderRadius: 22,
          boxShadow: "0 8px 42px #bb7ffa2e",
          padding: isMobile ? "17px 4px 11px 4px" : "38px 32px 21px 32px",
          marginBottom: isMobile ? 15 : 25,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minHeight: isMobile ? 370 : 430,
          position: "relative",
        }}
      >
        <div
          style={{
            fontWeight: 900,
            fontSize: isMobile ? 21 : 27,
            color: "#bb7ffa",
            letterSpacing: ".5px",
            marginBottom: 12,
            textAlign: "center",
          }}
        >
          Astro AI Chat
          <button
            onClick={() =>
              setMessages([
                {
                  role: "assistant",
                  content:
                    "Чат очищен. Готов отвечать на новые вопросы! Установи в профиле дату и время своего рождения и я расскажу тебе о многом...",
                },
              ])
            }
            style={{
              fontSize: isMobile ? 12 : 14,
              marginLeft: 11,
              color: "#c6b0ffcc",
              background: "none",
              border: "none",
              cursor: "pointer",
              textDecoration: "underline",
              fontWeight: 500,
              padding: 0,
            }}
          >
            Очистить
          </button>
        </div>
        {/* Чат-лента */}
        <div
          style={{
            flex: 1,
            width: "100%",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: isMobile ? 9 : 15,
            minHeight: isMobile ? 180 : 200,
            marginBottom: isMobile ? 13 : 24,
            maxHeight: isMobile ? 350 : 390,
          }}
        >
          {messages.map((msg, idx) => (
            <div
              key={idx}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-end",
                justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                width: "100%",
              }}
            >
              {/* Аватар AI */}
              {msg.role === "assistant" && (
                <div
                  style={{
                    width: isMobile ? 22 : 27,
                    height: isMobile ? 22 : 27,
                    borderRadius: "50%",
                    background: "linear-gradient(145deg,#bb7ffa 65%,#4631b8 100%)",
                    marginRight: 6,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: isMobile ? 15 : 18,
                    color: "#fff",
                  }}
                >
                  ★
                </div>
              )}
              {/* Сообщение */}
              <div
                style={{
                  background:
                    msg.role === "user"
                      ? "linear-gradient(90deg,#bb7ffa 50%,#9176fd 100%)"
                      : "rgba(32,26,56,0.97)",
                  color: msg.role === "user" ? "#191736" : "#f9f7fa",
                  borderRadius: 16,
                  boxShadow:
                    msg.role === "user"
                      ? "0 2px 13px #bb7ffa33"
                      : "0 2px 11px #30297a22",
                  padding: isMobile ? "13px 14px" : "16px 18px",
                  fontSize: fontSize,
                  fontWeight: msg.role === "user" ? 600 : 400,
                  maxWidth: bubbleMaxWidth,
                  marginBottom: 2,
                  wordBreak: "break-word",
                  whiteSpace: "pre-wrap",
                  textAlign: "left",
                }}
              >
                {msg.content}
              </div>
              {/* Пустой div для выравнивания пользователя */}
              {msg.role === "user" && (
                <div style={{ width: isMobile ? 22 : 27, marginLeft: 6 }} />
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        {/* Ввод */}
        <div
          style={{
            width: "100%",
            display: "flex",
            gap: 8,
            marginTop: isMobile ? 3 : 10,
          }}
        >
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Введите ваш вопрос..."
            style={{
              flex: 1,
              borderRadius: 11,
              border: "1.5px solid #bb7ffa77",
              padding: isMobile ? "11px 10px" : "13px 17px",
              fontSize: isMobile ? 15 : 16.5,
              background: "#25193a",
              color: "#fff",
              resize: "none",
              minHeight: isMobile ? 38 : 44,
              maxHeight: 110,
              fontFamily: "inherit",
            }}
            rows={1}
            disabled={loading}
          />
          <button
            onClick={handleSend}
            disabled={loading || !input.trim()}
            style={{
              borderRadius: 11,
              background:
                "linear-gradient(90deg,#bb7ffa 60%,#7c6ff6 100%)",
              color: "#191736",
              fontWeight: 900,
              fontSize: isMobile ? 16 : 17,
              border: "none",
              padding: isMobile ? "11px 16px" : "14px 22px",
              cursor: loading || !input.trim() ? "not-allowed" : "pointer",
              opacity: loading || !input.trim() ? 0.6 : 1,
              boxShadow: "0 2px 8px #bb7ffa2a",
            }}
          >
            {loading ? "..." : "Отправить"}
          </button>
        </div>
      </div>
    </div>
  );
}
