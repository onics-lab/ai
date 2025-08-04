export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { messages, profile } = req.body; // ← добавили profile
  const apiKey = process.env.OPENAI_API_KEY;
  let systemPrompt = process.env.SYSTEM_PROMPT;

  // Если профиль есть — добавим его в systemPrompt
  if (profile && profile.name && profile.birthDate) {
    systemPrompt =
      `Профиль пользователя:\n` +
      `Имя: ${profile.name}\n` +
      `Дата рождения: ${profile.birthDate}\n` +
      `Время рождения: ${profile.birthTime || "не указано"}\n` +
      `Место рождения: ${profile.birthLocation || "не указано"}\n` +
      `Пол: ${profile.gender || "не указан"}\n\n` +
      (systemPrompt || "");
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages
        ]
      })
    });

    const data = await response.json();

    if (data.error) {
      res.status(200).json({ choices: [{ message: { content: `AI Error: ${data.error.message}` } }] });
      return;
    }

    res.status(200).json(data);
  } catch (e) {
    res.status(200).json({ choices: [{ message: { content: "Серверная ошибка AI." } }] });
  }
}
