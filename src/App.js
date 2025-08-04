import React, { useState } from "react";
import AstroPathSelector from "./AstroPathSelector";
import ProfileManager from "./ProfileManager";
import AstroChat from "./AstroChat";

const NAV_TABS = [
  { key: "home", label: "Главная" },
  { key: "chat", label: "Astro Chat" },
  { key: "profiles", label: "Мои профили" },
];

export default function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [selectedPath, setSelectedPath] = useState(null);

  // ДОБАВИЛИ хранилище профилей и текущий выбранный профиль
  const [profiles, setProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(115deg,#1c223a 80%,#31235a 100%)",
        fontFamily: "Inter, Arial, sans-serif",
      }}
    >
      {/* Header */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "28px 36px 16px 36px",
          background: "rgba(18,20,32,0.98)",
          borderBottom: "1.5px solid #23263e",
        }}
      >
        <div
          style={{
            fontSize: 32,
            fontWeight: 900,
            color: "#bb7ffa",
            letterSpacing: ".8px",
          }}
        >
          <span style={{ marginRight: 8 }}>🌠</span> Astro AI
        </div>
        <nav style={{ display: "flex", gap: 20 }}>
          {NAV_TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                background: "none",
                border: "none",
                color: activeTab === tab.key ? "#fff" : "#b6a9e6",
                fontWeight: activeTab === tab.key ? 700 : 500,
                fontSize: 18,
                padding: "5px 0",
                borderBottom:
                  activeTab === tab.key ? "3px solid #bb7ffa" : "none",
                cursor: "pointer",
                transition: "color 0.18s",
              }}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </header>

      {/* Main content */}
      <main style={{ minHeight: "76vh", padding: "38px 8px 38px 8px" }}>
        {activeTab === "home" && (
          <AstroPathSelector
            onSelect={(path) => {
              setSelectedPath(path);
              setActiveTab("chat");
            }}
            showWarning={false}
          />
        )}
        {activeTab === "chat" && <AstroChat astroPath={selectedPath} />}
        {activeTab === "profiles" && (
          <ProfileManager
            profiles={profiles}
            setProfiles={setProfiles}
            selectedProfile={selectedProfile}
            setSelectedProfile={setSelectedProfile}
          />
        )}
      </main>

      {/* Footer */}
      <footer
        style={{
          textAlign: "center",
          color: "#bba5e2",
          fontSize: 14,
          padding: 18,
          borderTop: "1.5px solid #23263e",
        }}
      >
        © 2024 Astro AI — Персональное астрогидство. 🌠
      </footer>
    </div>
  );
}
