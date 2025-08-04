import React, { useState } from "react";
import AstroChat from "./AstroChat";

const sections = [
  { key: "chat", label: "AI Chat", emoji: "💬" },
  { key: "birth", label: "Birth Chart", emoji: "🗺️" },
  { key: "forecasts", label: "Forecasts", emoji: "🔮" },
  { key: "compatibility", label: "Compatibility", emoji: "🤝" },
  { key: "settings", label: "Settings", emoji: "⚙️" },
];

const dailyQuotes = [
  "✨ The cosmos is within you.",
  "🌌 Every day is a new cosmic journey.",
  "🌙 Trust the energy of the stars.",
  "☀️ Shine bright — your astro journey starts here.",
  "🌟 Explore your path among the stars.",
];

export default function DashboardPage() {
  const [userName] = useState("Cosmic Explorer");
  const [activeTab, setActiveTab] = useState("chat");
  const [birthData, setBirthData] = useState(null);
  const [dailyQuote] = useState(
    dailyQuotes[Math.floor(Math.random() * dailyQuotes.length)]
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(115deg,#f6f8fc 60%,#ece6fa 100%)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header с лого и меню */}
      <header
        style={{
          padding: "26px 0 8px 0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          background: "transparent",
          borderBottom: "1px solid #eee",
        }}
      >
        {/* Лого и название */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span
            style={{
              fontSize: 38,
              fontWeight: 700,
              color: "#6347f7",
              letterSpacing: ".5px",
            }}
          >
            <span style={{ marginRight: 5 }}>🌠</span> Astro AI
          </span>
          <span
            style={{
              fontSize: 16,
              color: "#bfbfe5",
              marginLeft: 12,
              fontWeight: 500,
            }}
          >
            beta
          </span>
        </div>
        {/* Меню */}
        <nav
          style={{
            display: "flex",
            gap: 8,
            marginTop: 18,
            marginBottom: 6,
            justifyContent: "center",
          }}
        >
          {sections.map((tab) => (
            <MenuTab
              key={tab.key}
              label={tab.label}
              emoji={tab.emoji}
              active={activeTab === tab.key}
              onClick={() => setActiveTab(tab.key)}
            />
          ))}
        </nav>
      </header>

      {/* Приветствие, цитата дня */}
      <div
        style={{
          margin: "18px auto 0 auto",
          width: "100%",
          maxWidth: 580,
          background: "linear-gradient(95deg,#f6f0ff 60%,#e7f1fa 120%)",
          borderRadius: 26,
          boxShadow: "0 4px 32px #dfdbff33",
          border: "1px solid #eee",
          padding: "30px 30px 22px 30px",
        }}
      >
        <div
          style={{
            fontSize: 25,
            fontWeight: "bold",
            color: "#6247ea",
            marginBottom: 6,
            letterSpacing: ".5px",
          }}
        >
          Добро пожаловать, {userName}! 🚀
        </div>
        <div
          style={{
            color: "#816ad2",
            fontSize: 17,
            fontStyle: "italic",
            marginBottom: 4,
            letterSpacing: ".2px",
          }}
        >
          {dailyQuote}
        </div>
      </div>

      {/* Контент выбранного раздела */}
      <main
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          padding: "30px 12px 40px 12px",
        }}
      >
        {activeTab === "chat" && (
          <div style={{ width: "100%", maxWidth: 640 }}>
            <AstroChat
              userName={userName}
              onBirthData={(bd) => setBirthData(bd)}
            />
          </div>
        )}

        {activeTab === "birth" && (
          <div
            style={{
              width: "100%",
              maxWidth: 580,
              background: "#f7f5fc",
              borderRadius: 22,
              padding: "36px 22px",
              boxShadow: "0 2px 16px #dddbe544",
              border: "1.5px solid #ece3fd",
              marginTop: 14,
              color: "#6347f7",
            }}
          >
            <h2
              style={{
                fontSize: 24,
                fontWeight: 700,
                marginBottom: 12,
                color: "#6347f7",
              }}
            >
              🗺️ Моя натальная карта
            </h2>
            {birthData ? (
              <>
                <div style={{ fontSize: 17, marginBottom: 12 }}>
                  <b>Дата рождения:</b> {birthData}
                </div>
                <div
                  style={{
                    fontSize: 16,
                    background: "#f3ebfc",
                    borderRadius: 12,
                    padding: "16px 20px",
                    margin: "6px 0",
                  }}
                >
                  <b>Ваш астрологический разбор появится здесь.</b>
                  <div style={{ fontSize: 14, color: "#937dce", marginTop: 7 }}>
                    В следующих версиях — анализ вашей astro-карты, планет и
                    аспектов на основе указанной даты!
                  </div>
                </div>
              </>
            ) : (
              <div style={{ fontSize: 16, color: "#816ad2" }}>
                Чтобы построить натальную карту, отправьте дату рождения в чат
                (“AI Chat”).
              </div>
            )}
          </div>
        )}

        {activeTab === "forecasts" && (
          <div
            style={{
              width: "100%",
              maxWidth: 560,
              background: "#f4f7fc",
              borderRadius: 20,
              padding: "32px 20px",
              boxShadow: "0 2px 12px #e7e2ff33",
              border: "1.5px solid #eee",
              color: "#6247ea",
            }}
          >
            <h2 style={{ fontSize: 23, fontWeight: 700, marginBottom: 10 }}>
              🔮 Персональные прогнозы
            </h2>
            <div style={{ fontSize: 16 }}>
              Здесь появятся ежедневные, недельные и годовые прогнозы,
              основанные на вашей дате рождения и вопросах.
              <br />
              <span style={{ fontSize: 15, color: "#a89ec9" }}>
                (В разработке)
              </span>
            </div>
          </div>
        )}

        {activeTab === "compatibility" && (
          <div
            style={{
              width: "100%",
              maxWidth: 560,
              background: "#f4f7fc",
              borderRadius: 20,
              padding: "32px 20px",
              boxShadow: "0 2px 12px #e7e2ff33",
              border: "1.5px solid #eee",
              color: "#6247ea",
            }}
          >
            <h2 style={{ fontSize: 23, fontWeight: 700, marginBottom: 10 }}>
              🤝 Анализ совместимости
            </h2>
            <div style={{ fontSize: 16 }}>
              Узнайте свою совместимость с другими пользователями и получите
              советы по отношениям и коммуникации.
              <br />
              <span style={{ fontSize: 15, color: "#a89ec9" }}>
                (Скоро появится)
              </span>
            </div>
          </div>
        )}

        {activeTab === "settings" && (
          <div
            style={{
              width: "100%",
              maxWidth: 560,
              background: "#f4f7fc",
              borderRadius: 20,
              padding: "32px 20px",
              boxShadow: "0 2px 12px #e7e2ff33",
              border: "1.5px solid #eee",
              color: "#6247ea",
            }}
          >
            <h2 style={{ fontSize: 23, fontWeight: 700, marginBottom: 10 }}>
              ⚙️ Настройки
            </h2>
            <div style={{ fontSize: 16 }}>
              Здесь появятся настройки профиля, приватности и уведомлений.
              <br />
              <span style={{ fontSize: 15, color: "#a89ec9" }}>
                (В разработке)
              </span>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer
        style={{
          textAlign: "center",
          color: "#ab93e6",
          fontSize: 14,
          letterSpacing: "1px",
          padding: 14,
          opacity: 0.85,
          borderTop: "1px solid #eee",
        }}
      >
        © 2024 Astro AI — Astro guidance made personal. 🌠
      </footer>
    </div>
  );
}

function MenuTab({ label, emoji, active, onClick }) {
  return (
    <button
      style={{
        background: active
          ? "linear-gradient(90deg,#ebe6ff 80%,#f1f5ff 100%)"
          : "transparent",
        border: active ? "1.8px solid #a89ec9" : "1.8px solid transparent",
        color: active ? "#6247ea" : "#a89ec9",
        fontWeight: active ? "bold" : "500",
        fontSize: 18,
        letterSpacing: ".5px",
        borderRadius: 16,
        padding: "8px 22px",
        margin: "0 2px",
        boxShadow: active ? "0 2px 10px #dfdbff33" : "none",
        cursor: "pointer",
        transition: "all 0.17s",
      }}
      onClick={onClick}
    >
      <span style={{ marginRight: 7 }}>{emoji}</span>
      {label}
    </button>
  );
}
