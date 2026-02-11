// api/generate.js
export default async function handler(req, res) {
  const { name, country, details } = JSON.parse(await getRawBody(req));

  // временно генерация текста без OpenAI
  const text = `
От имени: ${name}
Страна: ${country}
Описание: ${details}

[Тестовая жалоба сгенерирована автоматически для проверки PDF.]
`;

  res.status(200).json({ text });
}

// вспомогательная функция для чтения тела
async function getRawBody(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  return Buffer.concat(chunks).toString();
}
