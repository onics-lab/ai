import React, { useState } from "react";

// Helper
const cardShadow = "0 6px 32px #bb7ffa19, 0 2px 10px #0002";

export default function ProfileManager({
  profiles,
  setProfiles,
  selectedProfile,
  setSelectedProfile,
}) {
  const [form, setForm] = useState({
    name: "",
    birthDate: "",
    birthTime: "",
    birthLocation: "",
    gender: "",
  });
  const [editingIndex, setEditingIndex] = useState(null);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(profiles.length === 0);

  // Responsive detector
  const isMobile =
    typeof window !== "undefined" &&
    (window.innerWidth < 560 ||
      /iPhone|Android|Mobile/i.test(navigator.userAgent));

  // Main card max-width
  const maxWidth = isMobile ? "99vw" : 480;

  // Handlers
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (
      !form.name.trim() ||
      !form.birthDate ||
      !form.birthTime ||
      !form.birthLocation.trim() ||
      !form.gender
    ) {
      setError("Заполните все поля");
      return;
    }
    let newProfiles;
    if (editingIndex !== null) {
      newProfiles = profiles.map((p, i) =>
        i === editingIndex ? { ...form } : p
      );
    } else {
      newProfiles = [...profiles, { ...form }];
    }
    setProfiles(newProfiles);
    setSelectedProfile({ ...form });
    setForm({
      name: "",
      birthDate: "",
      birthTime: "",
      birthLocation: "",
      gender: "",
    });
    setEditingIndex(null);
    setShowForm(false);
    setError("");
  }
  function handleEdit(idx) {
    setForm({ ...profiles[idx] });
    setEditingIndex(idx);
    setShowForm(true);
    setError("");
  }
  function handleDelete(idx) {
    const newProfiles = profiles.filter((_, i) => i !== idx);
    setProfiles(newProfiles);
    if (selectedProfile === profiles[idx]) setSelectedProfile(null);
    setShowForm(false);
  }
  function handleSetActive(idx) {
    setSelectedProfile(profiles[idx]);
  }
  function handleNewProfile() {
    setShowForm(true);
    setForm({
      name: "",
      birthDate: "",
      birthTime: "",
      birthLocation: "",
      gender: "",
    });
    setEditingIndex(null);
    setError("");
  }
  function handleCancel() {
    setShowForm(false);
    setEditingIndex(null);
    setError("");
    setForm({
      name: "",
      birthDate: "",
      birthTime: "",
      birthLocation: "",
      gender: "",
    });
  }

  return (
    <div
      style={{
        minHeight: "70vh",
        width: "100vw",
        background: "none",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: isMobile ? "11vw 0 10vw 0" : "40px 0 30px 0",
      }}
    >
      {/* Main Card */}
      <div
        style={{
          width: "100%",
          maxWidth,
          background: "rgba(28, 24, 50, 0.98)",
          borderRadius: 22,
          boxShadow: cardShadow,
          padding: isMobile ? "15px 7px 22px 7px" : "30px 35px 32px 35px",
          display: "flex",
          flexDirection: "column",
          gap: isMobile ? 18 : 22,
          marginBottom: 12,
        }}
      >
        <div
          style={{
            color: "#bb7ffa",
            fontWeight: 800,
            fontSize: isMobile ? 21 : 24,
            marginBottom: 5,
            letterSpacing: ".4px",
          }}
        >
          Ваши профили
        </div>
        {/* Список профилей */}
        <div
          style={{
            maxHeight: isMobile ? 212 : 256,
            overflowY: "auto",
            marginBottom: profiles.length ? 10 : 2,
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          {profiles.length === 0 ? (
            <button
              style={{
                width: "100%",
                padding: isMobile ? "16px 0" : "15px 0",
                background: "linear-gradient(90deg,#bb7ffa55 40%,#48328522 100%)",
                borderRadius: 13,
                border: "none",
                color: "#bb7ffa",
                fontWeight: 700,
                fontSize: isMobile ? 16.5 : 18,
                boxShadow: "0 3px 12px #bb7ffa18",
                cursor: "pointer",
                transition: ".16s",
              }}
              onClick={handleNewProfile}
            >
              Добавить первый профиль
            </button>
          ) : (
            profiles.map((p, i) => (
              <div
                key={i}
                style={{
                  background:
                    selectedProfile === p
                      ? "linear-gradient(95deg,#8e6bff44 0%,#bb7ffa15 100%)"
                      : "rgba(44,33,68,0.98)",
                  color: "#f5f0ff",
                  border: selectedProfile === p ? "2px solid #bb7ffa" : "1.5px solid #322a55",
                  borderRadius: 13,
                  padding: isMobile ? "13px 10px" : "15px 17px",
                  boxShadow:
                    selectedProfile === p
                      ? "0 2px 10px #bb7ffa33"
                      : "0 1px 7px #24164913",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  cursor: "pointer",
                  transition: ".17s",
                  gap: isMobile ? 8 : 16,
                }}
                onClick={() => handleSetActive(i)}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: isMobile ? 16 : 17.5 }}>
                    {p.name}{" "}
                    {selectedProfile === p && (
                      <span
                        style={{
                          fontSize: 13,
                          color: "#f7eaffaa",
                          marginLeft: 6,
                        }}
                      >
                        (активный)
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: isMobile ? 13.5 : 14.5, opacity: 0.85 }}>
                    {p.birthDate} {p.birthTime}
                  </div>
                  <div style={{ fontSize: isMobile ? 12.5 : 13.5, opacity: 0.7 }}>
                    {p.birthLocation} | {p.gender}
                  </div>
                </div>
                <div style={{ display: "flex", gap: 7 }}>
                  <button
                    style={{
                      background: "#23173a",
                      border: "none",
                      color: "#bb7ffa",
                      borderRadius: 7,
                      fontSize: isMobile ? 13 : 14,
                      fontWeight: 700,
                      padding: isMobile ? "5px 12px" : "7px 16px",
                      cursor: "pointer",
                      marginRight: 1,
                    }}
                    onClick={e => {
                      e.stopPropagation();
                      handleEdit(i);
                    }}
                  >
                    ✏️
                  </button>
                  <button
                    style={{
                      background: "#21122a",
                      border: "none",
                      color: "#e65a7b",
                      borderRadius: 7,
                      fontSize: isMobile ? 13 : 14,
                      fontWeight: 700,
                      padding: isMobile ? "5px 12px" : "7px 16px",
                      cursor: "pointer",
                    }}
                    onClick={e => {
                      e.stopPropagation();
                      handleDelete(i);
                    }}
                  >
                    🗑
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        {/* Кнопка "Добавить профиль" */}
        {profiles.length > 0 && !showForm && (
          <button
            style={{
              width: "100%",
              padding: isMobile ? "13px 0" : "12px 0",
              background: "linear-gradient(90deg,#bb7ffa44 40%,#48328511 100%)",
              borderRadius: 10,
              border: "none",
              color: "#bb7ffa",
              fontWeight: 700,
              fontSize: isMobile ? 16 : 17,
              cursor: "pointer",
              marginTop: 3,
              boxShadow: "0 2px 8px #bb7ffa13",
            }}
            onClick={handleNewProfile}
          >
            + Добавить профиль
          </button>
        )}
      </div>
      {/* Форма */}
      {showForm && (
        <div
          style={{
            width: "100%",
            maxWidth,
            background: "rgba(26, 23, 46, 0.99)",
            borderRadius: 20,
            boxShadow: cardShadow,
            padding: isMobile ? "18px 11px 12px 11px" : "32px 30px 22px 30px",
            marginTop: 12,
            marginBottom: 4,
            display: "flex",
            flexDirection: "column",
            gap: isMobile ? 10 : 14,
            alignItems: "stretch",
          }}
        >
          <div
            style={{
              color: "#bb7ffa",
              fontWeight: 800,
              fontSize: isMobile ? 19 : 21,
              marginBottom: 2,
              letterSpacing: ".3px",
            }}
          >
            {editingIndex !== null ? "Редактировать профиль" : "Новый профиль"}
          </div>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <input
              name="name"
              type="text"
              placeholder="Имя профиля"
              value={form.name}
              onChange={handleChange}
              style={{
                padding: isMobile ? "13px 9px" : "14px 16px",
                borderRadius: 9,
                fontSize: isMobile ? 15.5 : 17,
                border: "1.5px solid #bb7ffa55",
                background: "#2e2641",
                color: "#fff",
                fontWeight: 500,
                outline: "none",
                marginBottom: 2,
              }}
              maxLength={24}
              autoFocus
            />
            <input
              name="birthDate"
              type="date"
              placeholder="Дата рождения"
              value={form.birthDate}
              onChange={handleChange}
              style={{
                padding: isMobile ? "13px 9px" : "14px 16px",
                borderRadius: 9,
                fontSize: isMobile ? 15.5 : 17,
                border: "1.5px solid #bb7ffa55",
                background: "#2e2641",
                color: "#fff",
                fontWeight: 500,
                outline: "none",
                marginBottom: 2,
              }}
              max={new Date().toISOString().slice(0, 10)}
            />
            <input
              name="birthTime"
              type="time"
              placeholder="Время рождения"
              value={form.birthTime}
              onChange={handleChange}
              style={{
                padding: isMobile ? "13px 9px" : "14px 16px",
                borderRadius: 9,
                fontSize: isMobile ? 15.5 : 17,
                border: "1.5px solid #bb7ffa55",
                background: "#2e2641",
                color: "#fff",
                fontWeight: 500,
                outline: "none",
                marginBottom: 2,
              }}
            />
            <input
              name="birthLocation"
              type="text"
              placeholder="Место рождения"
              value={form.birthLocation}
              onChange={handleChange}
              style={{
                padding: isMobile ? "13px 9px" : "14px 16px",
                borderRadius: 9,
                fontSize: isMobile ? 15.5 : 17,
                border: "1.5px solid #bb7ffa55",
                background: "#2e2641",
                color: "#fff",
                fontWeight: 500,
                outline: "none",
                marginBottom: 2,
              }}
              maxLength={38}
            />
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              style={{
                padding: isMobile ? "13px 9px" : "14px 16px",
                borderRadius: 9,
                fontSize: isMobile ? 15.5 : 17,
                border: "1.5px solid #bb7ffa55",
                background: "#2e2641",
                color: "#fff",
                fontWeight: 500,
                outline: "none",
                marginBottom: 2,
              }}
            >
              <option value="">Пол</option>
              <option value="Мужской">Мужской</option>
              <option value="Женский">Женский</option>
              <option value="Не указан">Не указан</option>
            </select>
            {error && (
              <div style={{ color: "#ea9f7b", fontSize: isMobile ? 14 : 15 }}>
                {error}
              </div>
            )}
            <div style={{ display: "flex", gap: 10, marginTop: isMobile ? 5 : 11 }}>
              <button
                type="submit"
                style={{
                  background:
                    "linear-gradient(90deg,#bb7ffa 40%,#7a5cf2 120%)",
                  color: "#191736",
                  fontWeight: 800,
                  fontSize: isMobile ? 16 : 17,
                  border: "none",
                  borderRadius: 8,
                  padding: isMobile ? "11px 19px" : "13px 28px",
                  cursor: "pointer",
                  boxShadow: "0 1px 8px #bb7ffa26",
                }}
              >
                {editingIndex !== null ? "Сохранить" : "Добавить"}
              </button>
              <button
                type="button"
                style={{
                  background: "#21193b",
                  color: "#bb7ffa",
                  fontWeight: 700,
                  fontSize: isMobile ? 16 : 17,
                  border: "none",
                  borderRadius: 8,
                  padding: isMobile ? "11px 19px" : "13px 28px",
                  cursor: "pointer",
                }}
                onClick={handleCancel}
              >
                Отмена
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
