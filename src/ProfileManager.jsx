// src/ProfileManager.jsx

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
    <div style={{ display: "flex", gap: 40 }}>
      {/* Список профилей */}
      <div style={{ minWidth: 280 }}>
        <h3>Ваши профили</h3>
        {profiles.length === 0 && (
          <button onClick={() => setEditing(true)}>Добавить первый профиль</button>
        )}
        <ul style={{ listStyle: "none", padding: 0 }}>
          {profiles.map((profile, i) => (
            <li key={i} style={{
              background: selectedProfile === profile ? "#2b2242" : "#222b3a",
              margin: "10px 0",
              padding: 10,
              borderRadius: 12
            }}>
              <div onClick={() => handleSelectProfile(profile)}>
                <b>{profile.name}</b><br />
                {profile.birthDate} {profile.birthTime}<br />
                {profile.birthLocation}
              </div>
              <button onClick={() => handleDeleteProfile(i)} style={{ marginLeft: 10, color: "#d44" }}>Удалить</button>
            </li>
          ))}
        </ul>
      </div>
      {/* Форма нового профиля */}
      <div>
        <h3>{editing ? "Новый профиль" : "Детали профиля"}</h3>
        {editing ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <input
              type="text"
              name="name"
              value={newProfile.name}
              onChange={handleChange}
              placeholder="Имя профиля"
            />
            <input
              type="date"
              name="birthDate"
              value={newProfile.birthDate}
              onChange={handleChange}
              placeholder="Дата рождения"
            />
            <input
              type="time"
              name="birthTime"
              value={newProfile.birthTime}
              onChange={handleChange}
              placeholder="Время рождения"
            />
            <input
              type="text"
              name="birthLocation"
              value={newProfile.birthLocation}
              onChange={handleChange}
              placeholder="Место рождения"
            />
            <input
              type="text"
              name="gender"
              value={newProfile.gender}
              onChange={handleChange}
              placeholder="Пол"
            />
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={handleAddProfile}>Добавить</button>
              <button onClick={() => setEditing(false)}>Отмена</button>
            </div>
          </div>
        ) : selectedProfile ? (
          <div style={{ background: "#1b2130", borderRadius: 12, padding: 14 }}>
            <div><b>Имя:</b> {selectedProfile.name}</div>
            <div><b>Дата:</b> {selectedProfile.birthDate}</div>
            <div><b>Время:</b> {selectedProfile.birthTime}</div>
            <div><b>Место:</b> {selectedProfile.birthLocation}</div>
            <div><b>Пол:</b> {selectedProfile.gender}</div>
            <button style={{ marginTop: 12 }} onClick={() => setEditing(true)}>Редактировать</button>
          </div>
        ) : (
          <div>Профиль не выбран.</div>
        )}
      </div>
    </div>
  );
}
