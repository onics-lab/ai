import React, { useState, useEffect } from "react";

const initialProfile = {
  name: "",
  birthDate: "",
  birthTime: "",
  birthLocation: "",
  gender: "",
};

const LS_KEY = "astroai_profiles_v1";

export default function ProfileManager({
  profiles,
  setProfiles,
  selectedProfile,
  setSelectedProfile,
}) {
  const [newProfile, setNewProfile] = useState(initialProfile);
  const [editing, setEditing] = useState(profiles.length === 0);
  const [editingIndex, setEditingIndex] = useState(null);
  const [error, setError] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(null);

  // Загрузка из localStorage при инициализации
  useEffect(() => {
    const saved = localStorage.getItem(LS_KEY);
    if (saved) {
      try {
        const arr = JSON.parse(saved);
        setProfiles(arr);
        if (arr.length > 0) setSelectedProfile(arr[0]);
      } catch {
        // ignore
      }
    }
    // eslint-disable-next-line
  }, []);

  // Сохранение в localStorage при каждом изменении профилей
  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(profiles));
  }, [profiles]);

  // Сбросить форму
  const resetForm = () => {
    setNewProfile(initialProfile);
    setEditing(false);
    setEditingIndex(null);
    setError("");
  };

  // Проверить обязательные поля
  function validate(profile) {
    if (
      !profile.name.trim() ||
      !profile.birthDate.trim() ||
      !profile.birthTime.trim() ||
      !profile.birthLocation.trim() ||
      !profile.gender.trim()
    ) {
      return "Заполни все поля профиля!";
    }
    // Примитивная проверка дат, времени и символов можно добавить по желанию
    return "";
  }

  // Добавить/редактировать профиль
  const handleSaveProfile = () => {
    const validation = validate(newProfile);
    if (validation) {
      setError(validation);
      return;
    }
    let newArr = [...profiles];
    if (editingIndex !== null) {
      newArr[editingIndex] = newProfile;
    } else {
      newArr.push(newProfile);
    }
    setProfiles(newArr);
    setSelectedProfile(newProfile);
    resetForm();
  };

  // Выбор профиля
  const handleSelectProfile = (profile) => {
    setSelectedProfile(profile);
    resetForm();
  };

  // Удаление профиля (через подтверждение)
  const handleDeleteProfile = (index) => {
    setConfirmDelete(index);
  };

  // Подтвердить удаление
  const doDeleteProfile = (index) => {
    const newArr = [...profiles];
    newArr.splice(index, 1);
    setProfiles(newArr);
    if (selectedProfile === profiles[index]) {
      setSelectedProfile(newArr[0] || null);
    }
    setConfirmDelete(null);
    resetForm();
  };

  // Начать редактирование
  const startEdit = (profile, idx) => {
    setNewProfile(profile);
    setEditing(true);
    setEditingIndex(idx);
    setError("");
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
        minHeight: 420,
        position: "relative",
      }}
    >
      {/* Список профилей */}
      <div style={{ minWidth: 290, flex: 1 }}>
        <h2
          style={{
            fontWeight: 800,
            fontSize: 22,
            marginBottom: 24,
            color: "#bba5e2",
          }}
        >
          Ваши профили
        </h2>
        {profiles.length === 0 && !editing && (
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
                background:
                  selectedProfile === profile ? "#392d64" : "#2d2942",
                margin: "8px 0",
                padding: 14,
                borderRadius: 14,
                cursor: "pointer",
                boxShadow:
                  selectedProfile === profile
                    ? "0 2px 12px #bb7ffa44"
                    : "none",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                border:
                  selectedProfile === profile
                    ? "2px solid #bb7ffa"
                    : "1.5px solid #3e3461",
                transition: "all 0.18s",
              }}
              onClick={() => handleSelectProfile(profile)}
            >
              <div>
                <b>{profile.name}</b>
                <div style={{ fontSize: 13, color: "#9e94c7" }}>
                  {profile.birthDate} {profile.birthTime}
                </div>
                <div style={{ fontSize: 13, color: "#9e94c7" }}>
                  {profile.birthLocation}
                </div>
                <div style={{ fontSize: 13, color: "#9e94c7" }}>
                  {profile.gender}
                </div>
              </div>
              <span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    startEdit(profile, i);
                  }}
                  style={{
                    marginLeft: 5,
                    marginRight: 2,
                    color: "#bb7ffa",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: 17,
                    padding: 3,
                  }}
                  title="Редактировать"
                >
                  ✎
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteProfile(i);
                  }}
                  style={{
                    marginLeft: 4,
                    color: "#d44",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: 17,
                    padding: 3,
                  }}
                  title="Удалить"
                >
                  ✖
                </button>
              </span>
            </li>
          ))}
        </ul>
        {/* Кнопка "Добавить новый профиль" */}
        {profiles.length > 0 && !editing && (
          <button
            style={{
              marginTop: 18,
              padding: "10px 15px",
              background: "#bb7ffa",
              color: "#181825",
              border: "none",
              borderRadius: 10,
              fontWeight: 700,
              fontSize: 16,
              cursor: "pointer",
              width: "100%",
              boxShadow: "0 0 10px #bb7ffa44",
            }}
            onClick={() => {
              setNewProfile(initialProfile);
              setEditing(true);
              setEditingIndex(null);
              setError("");
            }}
          >
            Добавить новый профиль
          </button>
        )}
      </div>

      {/* Форма нового профиля или просмотр профиля */}
      <div style={{ minWidth: 310, flex: 1 }}>
        <h2
          style={{
            fontWeight: 800,
            fontSize: 22,
            marginBottom: 24,
            color: "#bba5e2",
          }}
        >
          {editingIndex !== null ? "Редактировать профиль" : "Новый профиль"}
        </h2>
        {editing ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
            <input
              type="text"
              name="name"
              value={newProfile.name}
              onChange={(e) =>
                setNewProfile({ ...newProfile, name: e.target.value })
              }
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
              onChange={(e) =>
                setNewProfile({ ...newProfile, birthDate: e.target.value })
              }
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
              onChange={(e) =>
                setNewProfile({ ...newProfile, birthTime: e.target.value })
              }
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
              onChange={(e) =>
                setNewProfile({ ...newProfile, birthLocation: e.target.value })
              }
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
            <select
              name="gender"
              value={newProfile.gender}
              onChange={(e) =>
                setNewProfile({ ...newProfile, gender: e.target.value })
              }
              style={{
                padding: "10px 12px",
                borderRadius: 8,
                border: "1px solid #353768",
                fontSize: 16,
                background: "#232546",
                color: "#fff",
              }}
            >
              <option value="">Пол</option>
              <option value="Мужской">Мужской</option>
              <option value="Женский">Женский</option>
            </select>
            {error && (
              <div
                style={{
                  color: "#ff6262",
                  fontWeight: 600,
                  marginTop: 3,
                  fontSize: 15,
                }}
              >
                {error}
              </div>
            )}
            <div style={{ display: "flex", gap: 10, marginTop: 3 }}>
              <button
                onClick={handleSaveProfile}
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
                {editingIndex !== null ? "Сохранить" : "Добавить"}
              </button>
              <button
                onClick={resetForm}
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
          <div
            style={{
              background: "#2d2942",
              borderRadius: 12,
              padding: 18,
              color: "#fff",
              fontSize: 17,
            }}
          >
            <div>
              <b>Имя:</b> {selectedProfile.name}
            </div>
            <div>
              <b>Дата:</b> {selectedProfile.birthDate}
            </div>
            <div>
              <b>Время:</b> {selectedProfile.birthTime}
            </div>
            <div>
              <b>Место:</b> {selectedProfile.birthLocation}
            </div>
            <div>
              <b>Пол:</b> {selectedProfile.gender}
            </div>
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
              onClick={() => {
                setEditing(true);
                setEditingIndex(
                  profiles.findIndex((p) => p === selectedProfile)
                );
                setNewProfile(selectedProfile);
              }}
            >
              Редактировать
            </button>
          </div>
        ) : (
          <div
            style={{
              background: "#2d2942",
              borderRadius: 12,
              padding: 18,
              color: "#bbb",
              fontSize: 16,
            }}
          >
            Профиль не выбран.
          </div>
        )}
      </div>

      {/* Диалог подтверждения удаления */}
      {confirmDelete !== null && (
        <div
          style={{
            position: "fixed",
            left: 0,
            top: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(18,18,32,0.62)",
            zIndex: 22,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "inherit",
          }}
        >
          <div
            style={{
              background: "#232546",
              borderRadius: 16,
              padding: 36,
              minWidth: 330,
              color: "#fff",
              fontSize: 18,
              boxShadow: "0 6px 40px #0005",
              border: "2px solid #bb7ffa33",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div style={{ marginBottom: 18 }}>
              <b>Удалить профиль?</b>
            </div>
            <div style={{ color: "#bbb", fontSize: 15, marginBottom: 22 }}>
              Действие необратимо. Профиль будет удалён.
            </div>
            <div style={{ display: "flex", gap: 18 }}>
              <button
                style={{
                  padding: "9px 22px",
                  background: "#bb7ffa",
                  color: "#181825",
                  border: "none",
                  borderRadius: 9,
                  fontWeight: 700,
                  fontSize: 15,
                  cursor: "pointer",
                }}
                onClick={() => doDeleteProfile(confirmDelete)}
              >
                Удалить
              </button>
              <button
                style={{
                  padding: "9px 22px",
                  background: "#353768",
                  color: "#fff",
                  border: "none",
                  borderRadius: 9,
                  fontWeight: 700,
                  fontSize: 15,
                  cursor: "pointer",
                }}
                onClick={() => setConfirmDelete(null)}
              >
                Отмена
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
