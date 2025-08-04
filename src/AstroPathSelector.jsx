import React from "react";

const ASTRO_PATHS = [
  { key: "western", label: "Западная астрология", icon: "♆", color: "#5fa6ff" },
  { key: "human", label: "Дизайн человека", icon: "🔱", color: "#e279e4" },
  { key: "chinese", label: "Китайский зодиак", icon: "🐉", color: "#ff7f8e" },
  { key: "vedic", label: "Ведическая астрология", icon: "ॐ", color: "#f2db63" },
  { key: "pythagorean", label: "Пифагорейская нумерология", icon: "⚛️", color: "#57dadf" },
  { key: "chaldean", label: "Халдейская нумерология", icon: "🔯", color: "#a6baff" },
];

export default function AstroPathSelector({ onSelect, showWarning }) {
  // Media queries (грубая версия на inline style)
  const [width, setWidth] = React.useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );
  React.useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  let columns = 3;
  if (width < 900) columns = 2;
  if (width < 600) columns = 1;

  const titleFontSize = width < 600 ? 23 : width < 900 ? 28 : 36;
  const cardFontSize = width < 600 ? 15 : width < 900 ? 18 : 20;
  const iconFontSize = width < 600 ? 35 : width < 900 ? 38 : 48;
  const cardPadding = width < 600 ? "28px 0 18px 0" : width < 900 ? "34px 0 25px 0" : "54px 0 34px 0";
  const cardMinHeight = width < 600 ? 90 : 140;
  const gridGap = width < 600 ? 15 : 28;
  const cardRadius = width < 600 ? 16 : 20;
  const maxGridWidth = width < 600 ? "96vw" : width < 900 ? 550 : 980;

  return (
    <div
      style={{
        minHeight: "70vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100vw",
        boxSizing: "border-box",
        padding: width < 600 ? "30px 0 14px 0" : "64px 0 24px 0",
      }}
    >
      <h2
        style={{
          fontWeight: 900,
          fontSize: titleFontSize,
          color: "#fff",
          letterSpacing: ".5px",
          marginBottom: width < 600 ? 10 : 8,
          textAlign: "center",
          lineHeight: 1.16,
        }}
      >
        Выберите свой <br style={{ display: width < 600 ? "block" : "none" }} />
        астрологический путь
      </h2>
      {showWarning && (
        <div
          style={{
            color: "#ff5a76",
            fontWeight: 500,
            fontSize: width < 600 ? 14 : 16,
            marginBottom: 18,
            textAlign: "center",
            maxWidth: 370,
          }}
        >
          Пожалуйста, добавьте и выберите профиль рождения,<br />
          чтобы разблокировать чаты и анализ.
        </div>
      )}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap: gridGap,
          marginTop: 18,
          width: "100%",
          maxWidth: maxGridWidth,
          justifyContent: "center",
        }}
      >
        {ASTRO_PATHS.map((path) => (
          <button
            key={path.key}
            onClick={() => onSelect && onSelect(path.key)}
            style={{
              background: "rgba(22,24,44,0.90)",
              border: `2px solid ${path.color}55`,
              borderRadius: cardRadius,
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: cardPadding,
              boxShadow: "0 4px 36px #19193326, 0 0 0 #fff0",
              transition: "border 0.18s, box-shadow 0.18s, transform 0.14s",
              minHeight: cardMinHeight,
              outline: "none",
              position: "relative",
              willChange: "transform",
              fontFamily: "inherit",
            }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = `0 4px 42px ${path.color}38, 0 0 0 #fff0`}
            onMouseLeave={e => e.currentTarget.style.boxShadow = "0 4px 36px #19193326, 0 0 0 #fff0"}
            onTouchStart={e => e.currentTarget.style.boxShadow = `0 2px 18px ${path.color}88, 0 0 0 #fff0`}
            onTouchEnd={e => e.currentTarget.style.boxShadow = "0 4px 36px #19193326, 0 0 0 #fff0"}
          >
            <span
              style={{
                fontSize: iconFontSize,
                marginBottom: width < 600 ? 7 : 16,
                color: path.color,
                filter: `drop-shadow(0 0 11px ${path.color}55)`,
                transition: "filter 0.17s",
                userSelect: "none",
              }}
            >
              {path.icon}
            </span>
            <span
              style={{
                color: "#b8c6e0",
                fontWeight: 700,
                fontSize: cardFontSize,
                letterSpacing: ".2px",
                textAlign: "center",
                wordBreak: "break-word",
                maxWidth: "90%",
              }}
            >
              {path.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
