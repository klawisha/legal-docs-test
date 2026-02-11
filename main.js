const result = document.getElementById("result");
const test = document.getElementById("test");

const name = document.getElementById("name");
const country = document.getElementById("country");
const details = document.getElementById("details");

document.getElementById("gen").onclick = async () => {
  // тестовая генерация текста без OpenAI
  const text = `
От имени: ${name.value}
Страна: ${country.value}
Описание: ${details.value}

[Тестовая жалоба сгенерирована автоматически для проверки PDF.]
`;

  result.textContent = text;

  const token = btoa(unescape(encodeURIComponent(text)));
  localStorage.setItem("doc_token", token);

  test.style.display = "block";
};

test.onclick = () => {
  const token = localStorage.getItem("doc_token");
  window.location.href = "/api/export?token=" + encodeURIComponent(token);
};
