import React, { useState } from "react";

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

  // Mobile detector (можно вынести отдельно)
  const isMobile =
    typeof window !== "undefined" &&
    (window.innerWidth < 650 ||
      /iPhone|Android|Mobile/i.test(navigator.userAgent));

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

  return (
    <div
      style={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        gap: isMobile ? 28 : 48,
        padding: isMobile ? "16px 4vw" : "38px 40px 30px 40px",
        width: "100%",
        minHeight: 390,
        justifyContent: isMobile ? "flex-start" : "center",
        alignItems: isMobile ? "stretch" : "flex-start",
      }}
    >
      {/* Профили слева */}
      <div
        style={{
          flex: 1,
          background: "rgba(24, 26, 47, 0.98)",
          borderRadius: 20,
          boxShadow: "0 4px 20px #3a277b17",
          padding: isMobile ? "18px 9px" : "28px 32px",
          minWidth: isMobile ? "99%" : 310,
          marginBottom: isMobile ? 12 : 0,
        }}
      >
        <div
          style={{
            fontSize: isMobile ? 20 : 22,
            color: "#bb7ffa",
            fontWeight: 700,
            marginBottom: 10,
            letterSpacing: 0.5,
          }}
        >
          Ваши профили
        </div>
        {/* Карточки профилей */}
        {profiles.length === 0 && (
          <button
            style={{
              width: "100%",
              padding: isMobile ? "14px 0" : "12px 0",
              background: "linear-gradient(90deg,#bb7ffa55 30%,#48328522 100%)",
              borderRadius: 11,
              border: "none",
              color: "#bb7ffa",
              fontWeight: 700,
              fontSize: isMobile ? 17 : 18,
              marginBottom: 8,
              cursor: "pointer",
            }}
            onClick={() => setShowForm(true)}
          >
            Добавить первый профиль
          </button>
        )}
        {profiles.map((p, i) => (
          <div
            key={i}
            style={{
              background:
                selectedProfile === p
                  ? "linear-gradient(92deg,#6e52c6 0%,#bb7ffa33 100%)"
                  : "rgba(44,33,68,0.92)",
              color: selectedProfile === p ? "#fff" : "#e6d8ff",
              border: selectedProfile === p ? "2.5px solid #bb7ffa88" : "none",
              borderRadius: 12,
              marginBottom: 8,
              boxShadow:
                selectedProfile === p
                  ? "0 3px 16px #bb7ffa22"
                  : "0 1px 10px #2416490c",
              padding: isMobile ? "14px 13px 14px 15px" : "15px 17px 14px 19px",
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              justifyContent: "space-between",
              alignItems: isMobile ? "flex-start" : "center",
              gap: 8,
              cursor: "pointer",
              position: "relative",
              transition: "all 0.14s",
            }}
            onClick={() => handleSetActive(i)}
          >
            <div>
              <div style={{ fontWeight: 700, fontSize: isMobile ? 17 : 18 }}>
                {p.name}{" "}
                {selectedProfile === p && (
                  <span
                    style={{
                      fontSize: 13,
                      color: "#f7eaffaa",
                      marginLeft: 5,
                    }}
                  >
                    (Active)
                  </span>
                )}
              </div>
              <div style={{ fontSize: isMobile ? 14.5 : 15, opacity: 0.85 }}>
                {p.birthDate} {p.birthTime}
              </div>
              <div style={{ fontSize: isMobile ? 13.5 : 14, opacity: 0.7 }}>
                {p.birthLocation} | {p.gender}
              </div>
            </div>
            <div style={{ display: "flex", gap: 5, marginTop: isMobile ? 7 : 0 }}>
              <button
                style={{
                  background: "rgba(180,140,255,0.15)",
                  border: "none",
                  color: "#bb7ffa",
                  borderRadius: 7,
                  fontSize: isMobile ? 13 : 14,
                  fontWeight: 700,
                  padding: isMobile ? "5px 11px" : "7px 14px",
                  cursor: "pointer",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleEdit(i);
                }}
              >
                Редактировать
              </button>
              <button
                style={{
                  background: "rgba(244,80,80,0.14)",
                  border: "none",
                  color: "#e47c8b",
                  borderRadius: 7,
                  fontSize: isMobile ? 13 : 14,
                  fontWeight: 700,
                  padding: isMobile ? "5px 11px" : "7px 14px",
                  marginLeft: 3,
                  cursor: "pointer",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(i);
                }}
              >
                Удалить
              </button>
            </div>
          </div>
        ))}
        {/* Кнопка добавить */}
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
              marginTop: 10,
              cursor: "pointer",
            }}
            onClick={() => {
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
            }}
          >
            Добавить новый профиль
          </button>
        )}
      </div>

      {/* Форма профиля */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          style={{
            flex: 2,
            background: "rgba(24, 24, 49, 0.97)",
            borderRadius: 20,
            boxShadow: "0 4px 18px #bb7ffa11",
            padding: isMobile ? "19px 10px 14px 10px" : "32px 28px 26px 28px",
            minWidth: isMobile ? "99%" : 330,
            marginTop: isMobile ? 13 : 0,
            marginBottom: isMobile ? 3 : 0,
            display: "flex",
            flexDirection: "column",
            gap: isMobile ? 11 : 17,
          }}
        >
          <div
            style={{
              color: "#bb7ffa",
              fontWeight: 700,
              fontSize: isMobile ? 19 : 21,
              marginBottom: isMobile ? 3 : 10,
            }}
          >
            {editingIndex !== null ? "Редактировать профиль" : "Новый профиль"}
          </div>
          <input
            name="name"
            type="text"
            placeholder="Имя профиля"
            value={form.name}
            onChange={handleChange}
            style={{
              padding: isMobile ? "12px 9px" : "14px 15px",
              borderRadius: 9,
              fontSize: isMobile ? 16 : 17,
              border: "1.5px solid #bb7ffa55",
              background: "#221b2c",
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
              padding: isMobile ? "12px 9px" : "14px 15px",
              borderRadius: 9,
              fontSize: isMobile ? 16 : 17,
              border: "1.5px solid #bb7ffa55",
              background: "#221b2c",
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
              padding: isMobile ? "12px 9px" : "14px 15px",
              borderRadius: 9,
              fontSize: isMobile ? 16 : 17,
              border: "1.5px solid #bb7ffa55",
              background: "#221b2c",
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
              padding: isMobile ? "12px 9px" : "14px 15px",
              borderRadius: 9,
              fontSize: isMobile ? 16 : 17,
              border: "1.5px solid #bb7ffa55",
              background: "#221b2c",
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
              padding: isMobile ? "12px 9px" : "14px 15px",
              borderRadius: 9,
              fontSize: isMobile ? 16 : 17,
              border: "1.5px solid #bb7ffa55",
              background: "#221b2c",
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
          <div style={{ display: "flex", gap: 10, marginTop: isMobile ? 9 : 13 }}>
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
              onClick={() => {
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
              }}
            >
              Отмена
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
