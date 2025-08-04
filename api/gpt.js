export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
  const { messages } = req.body;
  const apiKey = process.env.OPENAI_API_KEY;
  const systemPrompt = process.env.SYSTEM_PROMPT;

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

    // Если у OpenAI ошибка, вернем её явно
    if (data.error) {
      res.status(200).json({ choices: [{ message: { content: `AI Error: ${data.error.message}` } }] });
      return;
    }

    res.status(200).json(data);
  } catch (e) {
    res.status(200).json({ choices: [{ message: { content: "Серверная ошибка AI." } }] });
  }
}
