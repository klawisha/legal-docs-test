import OpenAI from "openai";

export default async function handler(req, res) {
  try {
    if (req.method !== "POST")
      return res.status(405).json({ error: "Method not allowed" });

    // --- parse body manually ---
    const chunks = [];
    for await (const chunk of req) {
      chunks.push(chunk);
    }
    const rawBody = Buffer.concat(chunks).toString();
    const { name, country, details } = JSON.parse(rawBody);

    if (!name || !country || !details)
      return res.status(400).json({ error: "missing fields" });

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const prompt = `
Ты юрист в стране ${country}.
Напиши официальную жалобу на соседей за ночной шум.

От имени: ${name}
Описание: ${details}

Формальный стиль.
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [{ role: "user", content: prompt }]
    });

    res.status(200).json({ text: completion.choices[0].message.content });
  } catch (e) {
    console.error("API generate error:", e);
    res.status(500).json({ error: e.message });
  }
}
