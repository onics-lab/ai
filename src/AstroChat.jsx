import React, { useState, useRef, useEffect } from "react";

export default function AstroChat({ astroPath }) {
  const [messages, setMessages] = useState([
    {
      from: "ai",
      text:
        `💬 Добро пожаловать в Astro Chat!\n` +
        (astroPath
          ? `Вы выбрали путь: ${getAstroPathLabel(astroPath)}.`
          : "Выберите астрологический путь для персонального astro-анализа!") +
        "\nНапишите дату рождения (например: 11.07.1994) и свой вопрос.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (chatEndRef.current)
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Парсер даты (для передачи в профили или анализа)
  function parseBirth(text) {
    const match = text.match(/(\d{1,2})[.\/-](\d{1,2})[.\/-](\d{2,4})/);
    if (!match) return null;
    const [_, d, m, y] = match;
    return `${d.padStart(2, "0")}.${m.padStart(2, "0")}.${
      y.length === 2 ? "19" + y : y
    }`;
  }

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages([...messages, { from: "user", text: input.trim() }]);
    setLoading(true);

    // (!) В реальном проекте здесь делаем запрос к backend/GPT
    const birthDate = parseBirth(input.trim());

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          from: "ai",
          text: birthDate
            ? `🗺️ Дата рождения получена: ${birthDate}\n(В будущем — полный astro-разбор!)`
            : `✨ Вопрос принят! В следующих версиях тут будет astro-ответ...`,
        },
      ]);
      setLoading(false);
    }, 1200);

    setInput("");
  };

  return (
    <div
      style={{
        maxWidth: 640,
        margin: "0 auto",
        background: "linear-gradient(115deg,#23263a 80%,#181930 100%)",
        border: "1.5px solid #23263e",
        borderRadius: 22,
        boxShadow: "0 4px 24px #1e184466",
        padding: 28,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          flex: 1,
          marginBottom: 14,
          minHeight: 220,
          maxHeight: 280,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        {messages.map((msg, idx) => (
          <div
            key={idx}
            style={{
              display: "flex",
              justifyContent: msg.from === "user" ? "flex-end" : "flex-start",
            }}
          >
            <span
              style={{
                padding: "12px 22px",
                borderRadius: 16,
                fontSize: 16,
                background:
                  msg.from === "user"
                    ? "linear-gradient(90deg,#a2b6ff 60%,#d6cfff 100%)"
                    : "#252747",
                color: msg.from === "user" ? "#5347c7" : "#d5d1f7",
                fontWeight: msg.from === "user" ? 500 : 400,
                boxShadow:
                  msg.from === "user"
                    ? "0 2px 8px #a3a3e144"
                    : "0 2px 8px #c6bfff44",
                maxWidth: "70%",
                wordBreak: "break-word",
                border:
                  msg.from === "user"
                    ? "1.5px solid #d2ccfa"
                    : "1.5px solid #2c265e",
                whiteSpace: "pre-line",
                transition: "all 0.17s",
              }}
            >
              {msg.text}
            </span>
          </div>
        ))}
        {loading && (
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <span
              style={{
                padding: "10px 22px",
                borderRadius: 16,
                background: "#23263a",
                color: "#816ad2",
                fontWeight: "400",
                fontSize: 16,
              }}
            >
              Astro AI печатает...
            </span>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>
      <form onSubmit={sendMessage} style={{ display: "flex", gap: 12 }}>
        <input
          type="text"
          placeholder="Напишите дату рождения и вопрос..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={loading}
          style={{
            flex: 1,
            borderRadius: 13,
            padding: "14px 22px",
            border: "1.5px solid #353f5a",
            fontSize: 16,
            background: "#23263a",
            color: "#d5d1f7",
            outline: "none",
            fontWeight: 500,
          }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            background: "linear-gradient(90deg,#a991fa 30%,#6247ea 90%)",
            color: "#fff",
            fontWeight: "bold",
            border: "none",
            borderRadius: 13,
            padding: "14px 32px",
            cursor: "pointer",
            fontSize: 16,
            boxShadow: "0 2px 14px #9e91e733",
            opacity: loading ? 0.7 : 1,
            transition: "all 0.18s",
          }}
        >
          {loading ? "..." : "Отправить"}
        </button>
      </form>
    </div>
  );
}

function getAstroPathLabel(key) {
  switch (key) {
    case "western":
      return "Западная астрология";
    case "human":
      return "Дизайн человека";
    case "chinese":
      return "Китайский зодиак";
    case "vedic":
      return "Ведическая астрология";
    case "pythagorean":
      return "Пифагорейская нумерология";
    case "chaldean":
      return "Халдейская нумерология";
    default:
      return "";
  }
}
