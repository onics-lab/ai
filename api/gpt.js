export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
  const { messages } = req.body;
  const apiKey = process.env.OPENAI_API_KEY;
  const systemPrompt = process.env.SYSTEM_PROMPT;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4o", // или "gpt-3.5-turbo" для экономии
      messages: [
        { role: "system", content: systemPrompt },
        ...messages
      ]
    })
  });

  const data = await response.json();
  res.status(200).json(data);
}
