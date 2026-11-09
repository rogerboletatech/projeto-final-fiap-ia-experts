(function () {
  const form = document.getElementById("form");
  const msg = document.getElementById("msg");
  const botao = document.getElementById("enviar");
  const resposta = document.getElementById("resposta");

  if (!Conexao.ler().webhookUrl) document.getElementById("aviso-config").hidden = false;

  async function perguntar(texto) {
    texto = texto.trim();
    if (!texto) return;
    botao.disabled = true;
    resposta.className = "resposta carregando";
    resposta.textContent = "Calculando…";
    try {
      const r = await Conexao.enviar(texto);
      resposta.className = "resposta";
      resposta.textContent = r || "(resposta vazia)";
    } catch (e) {
      resposta.className = "resposta erro";
      resposta.textContent = e.message;
    } finally {
      botao.disabled = false;
    }
  }

  form.addEventListener("submit", (e) => { e.preventDefault(); perguntar(msg.value); });
  msg.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); perguntar(msg.value); }
  });
  document.querySelectorAll("[data-texto]").forEach((b) =>
    b.addEventListener("click", () => { msg.value = b.dataset.texto; perguntar(b.dataset.texto); }));
})();
