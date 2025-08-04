import React from "react";

const ASTRO_PATHS = [
  { key: "western", label: "Западная астрология", icon: "♆", color: "#5fa6ff" },
  { key: "human", label: "Дизайн человека", icon: "🔱", color: "#e279e4" },
  { key: "chinese", label: "Китайский зодиак", icon: "🐉", color: "#ff7f8e" },
  { key: "vedic", label: "Ведическая астрология", icon: "ॐ", color: "#f2db63" },
  {
    key: "pythagorean",
    label: "Пифагорейская нумерология",
    icon: "⚛️",
    color: "#57dadf",
  },
  {
    key: "chaldean",
    label: "Халдейская нумерология",
    icon: "🔯",
    color: "#a6baff",
  },
];

export default function AstroPathSelector({ onSelect, showWarning }) {
  return (
    <div
      style={{
        minHeight: "70vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h2
        style={{
          fontWeight: 800,
          fontSize: 36,
          color: "#fff",
          letterSpacing: ".5px",
          marginBottom: 8,
        }}
      >
        Выберите свой астрологический путь
      </h2>
      {showWarning && (
        <div
          style={{
            color: "#ff5a76",
            fontWeight: 500,
            fontSize: 16,
            marginBottom: 18,
          }}
        >
          Пожалуйста, добавьте и выберите профиль рождения, чтобы разблокировать
          чаты и анализ.
        </div>
      )}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 28,
          marginTop: 18,
          width: "100%",
          maxWidth: 980,
        }}
      >
        {ASTRO_PATHS.map((path) => (
          <div
            key={path.key}
            onClick={() => onSelect && onSelect(path.key)}
            style={{
              background: "rgba(22,24,44,0.84)",
              border: `2px solid ${path.color}44`,
              borderRadius: 20,
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "54px 0 34px 0",
              boxShadow: "0 4px 36px #19193338, 0 0 0 #fff0",
              transition: "border 0.18s, box-shadow 0.18s",
              position: "relative",
              minHeight: 160,
            }}
          >
            <span
              style={{
                fontSize: 48,
                marginBottom: 16,
                color: path.color,
                filter: `drop-shadow(0 0 16px ${path.color}55)`,
              }}
            >
              {path.icon}
            </span>
            <span
              style={{
                color: "#b8c6e0",
                fontWeight: 600,
                fontSize: 20,
                letterSpacing: ".4px",
              }}
            >
              {path.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
