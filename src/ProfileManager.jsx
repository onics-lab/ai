import React, { useState } from "react";

const initialProfile = {
  name: "",
  birthDate: "",
  birthTime: "",
  birthLocation: "",
  gender: "",
};

export default function ProfileManager({ profiles, setProfiles, selectedProfile, setSelectedProfile }) {
  const [newProfile, setNewProfile] = useState(initialProfile);
  const [editing, setEditing] = useState(false);

  const handleChange = (e) => {
    setNewProfile({
      ...newProfile,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddProfile = () => {
    if (!newProfile.name || !newProfile.birthDate || !newProfile.birthTime || !newProfile.birthLocation) {
      alert("Пожалуйста, заполните все поля профиля.");
      return;
    }
    const updatedProfiles = [...profiles, newProfile];
    setProfiles(updatedProfiles);
    setSelectedProfile(newProfile);
    setNewProfile(initialProfile);
    setEditing(false);
  };

  const handleSelectProfile = (profile) => {
    setSelectedProfile(profile);
  };

  const handleDeleteProfile = (index) => {
    const updated = [...profiles];
    updated.splice(index, 1);
    setProfiles(updated);
    setSelectedProfile(null);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        gap: "48px",
        width: "100%",
        maxWidth: 900,
        margin: "0 auto",
        marginTop: 28,
        background: "rgba(25,27,47,0.92)",
        borderRadius: 22,
        padding: "38px 40px 44px 40px",
        boxShadow: "0 12px 44px #0002",
      }}
    >
      {/* Список профилей */}
      <div style={{ minWidth: 290, flex: 1 }}>
        <h2 style={{ fontWeight: 800, fontSize: 22, marginBottom: 24, color: "#bba5e2" }}>Ваши профили</h2>
        {profiles.length === 0 && (
          <button
            style={{
              padding: "12px 14px",
              borderRadius: 10,
              background: "#292c4a",
              color: "#bba5e2",
              border: "none",
              marginBottom: 24,
              fontSize: 16,
              cursor: "pointer",
            }}
            onClick={() => setEditing(true)}
          >
            Добавить первый профиль
          </button>
        )}
        <ul style={{ listStyle: "none", padding: 0 }}>
          {profiles.map((profile, i) => (
            <li
              key={i}
              style={{
                background: selectedProfile === profile ? "#322d54" : "#252842",
                margin: "8px 0",
                padding: 14,
                borderRadius: 14,
                cursor: "pointer",
                boxShadow: selectedProfile === profile ? "0 2px 8px #bb7ffa44" : "none",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              onClick={() => handleSelectProfile(profile)}
            >
              <div>
                <b>{profile.name}</b>
                <div style={{ fontSize: 13, color: "#9e94c7" }}>{profile.birthDate} {profile.birthTime}</div>
                <div style={{ fontSize: 13, color: "#9e94c7" }}>{profile.birthLocation}</div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteProfile(i);
                }}
                style={{
                  marginLeft: 8,
                  color: "#d44",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: 14,
                  padding: 4,
                }}
              >
                ✖
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Форма нового профиля */}
      <div style={{ minWidth: 310, flex: 1 }}>
        <h2 style={{ fontWeight: 800, fontSize: 22, marginBottom: 24, color: "#bba5e2" }}>Новый профиль</h2>
        {editing || profiles.length === 0 ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <input
              type="text"
              name="name"
              value={newProfile.name}
              onChange={handleChange}
              placeholder="Имя профиля"
              style={{
                padding: "10px 12px",
                borderRadius: 8,
                border: "1px solid #353768",
                fontSize: 16,
                background: "#232546",
                color: "#fff",
              }}
            />
            <input
              type="date"
              name="birthDate"
              value={newProfile.birthDate}
              onChange={handleChange}
              placeholder="Дата рождения"
              style={{
                padding: "10px 12px",
                borderRadius: 8,
                border: "1px solid #353768",
                fontSize: 16,
                background: "#232546",
                color: "#fff",
              }}
            />
            <input
              type="time"
              name="birthTime"
              value={newProfile.birthTime}
              onChange={handleChange}
              placeholder="Время рождения"
              style={{
                padding: "10px 12px",
                borderRadius: 8,
                border: "1px solid #353768",
                fontSize: 16,
                background: "#232546",
                color: "#fff",
              }}
            />
            <input
              type="text"
              name="birthLocation"
              value={newProfile.birthLocation}
              onChange={handleChange}
              placeholder="Место рождения"
              style={{
                padding: "10px 12px",
                borderRadius: 8,
                border: "1px solid #353768",
                fontSize: 16,
                background: "#232546",
                color: "#fff",
              }}
            />
            <input
              type="text"
              name="gender"
              value={newProfile.gender}
              onChange={handleChange}
              placeholder="Пол"
              style={{
                padding: "10px 12px",
                borderRadius: 8,
                border: "1px solid #353768",
                fontSize: 16,
                background: "#232546",
                color: "#fff",
              }}
            />
            <div style={{ display: "flex", gap: 10 }}>
              <button
                onClick={handleAddProfile}
                style={{
                  padding: "10px 20px",
                  background: "#bb7ffa",
                  border: "none",
                  borderRadius: 8,
                  color: "#181825",
                  fontWeight: 600,
                  fontSize: 16,
                  cursor: "pointer",
                }}
              >
                Добавить
              </button>
              <button
                onClick={() => setEditing(false)}
                style={{
                  padding: "10px 20px",
                  background: "#353768",
                  border: "none",
                  borderRadius: 8,
                  color: "#fff",
                  fontWeight: 600,
                  fontSize: 16,
                  cursor: "pointer",
                }}
              >
                Отмена
              </button>
            </div>
          </div>
        ) : selectedProfile ? (
          <div style={{ background: "#232546", borderRadius: 12, padding: 18, color: "#fff" }}>
            <div><b>Имя:</b> {selectedProfile.name}</div>
            <div><b>Дата:</b> {selectedProfile.birthDate}</div>
            <div><b>Время:</b> {selectedProfile.birthTime}</div>
            <div><b>Место:</b> {selectedProfile.birthLocation}</div>
            <div><b>Пол:</b> {selectedProfile.gender}</div>
            <button
              style={{
                marginTop: 18,
                background: "#353768",
                border: "none",
                borderRadius: 8,
                color: "#fff",
                fontWeight: 600,
                fontSize: 16,
                padding: "10px 22px",
                cursor: "pointer",
              }}
              onClick={() => setEditing(true)}
            >
              Редактировать
            </button>
          </div>
        ) : (
          <div>Профиль не выбран.</div>
        )}
      </div>
    </div>
  );
}
