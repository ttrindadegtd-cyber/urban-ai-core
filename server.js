
const express = require("express");
const app = express();

app.use(express.json());

const agents = [
  {
    id: "DIRECTOR",
    name: "AI Director",
    role: "Coordenador central",
    description: "Organiza tarefas e coordena os agentes."
  },
  {
    id: "RESEARCH",
    name: "Market Research Agent",
    role: "Investigação de mercado",
    description: "Analisa mercados, tendências e concorrentes."
  },
  {
    id: "LEADS",
    name: "Lead Hunter Agent",
    role: "Prospecção comercial",
    description: "Ajuda a identificar potenciais clientes."
  },
  {
    id: "CREATIVE",
    name: "Creative Director",
    role: "Produção criativa",
    description: "Planeia vídeos, anúncios, Reels e campanhas."
  },
  {
    id: "BUSINESS",
    name: "Business Manager",
    role: "Gestão empresarial",
    description: "Ajuda com preços, propostas e estratégia."
  }
];

function chooseAgent(message) {
  const m = message.toLowerCase();

  if (/mercado|concorrente|tendência|pesquisa|análise/.test(m))
    return "RESEARCH";

  if (/cliente|lead|contacto|prospeção|vendas/.test(m))
    return "LEADS";

  if (/vídeo|video|reel|guião|roteiro|prompt|criatividade|anúncio|campanha/.test(m))
    return "CREATIVE";

  if (/preço|preco|orçamento|orcamento|proposta|negócio|empresa|financeiro/.test(m))
    return "BUSINESS";

  return "DIRECTOR";
}

function createReply(agentId, message) {
  const replies = {
    DIRECTOR:
      "Recebi a tua tarefa. Como AI Director, vou organizar o pedido e definir os próximos passos. Primeiro, precisamos de identificar o objetivo, depois dividir o trabalho e acompanhar os resultados.",

    RESEARCH:
      "Tarefa encaminhada para Market Research. A análise deverá identificar o público-alvo, os concorrentes, as tendências e as oportunidades. Nesta versão, ainda não tenho acesso a pesquisa automática na Internet.",

    LEADS:
      "Tarefa encaminhada para Lead Hunter. Vamos estruturar a procura de potenciais clientes, definir o perfil ideal, preparar uma abordagem comercial e organizar os contactos. Ainda não estou ligado a bases de dados externas.",

    CREATIVE:
      "Tarefa encaminhada para Creative Director. Vamos definir o conceito, o público, o guião, a direção visual e o resultado final. Posso ajudar a preparar prompts e planos de produção.",

    BUSINESS:
      "Tarefa encaminhada para Business Manager. Vamos organizar a estratégia, os serviços, os preços, os custos e as propostas comerciais."
  };

  return replies[agentId] +
    "\n\nPedido recebido: " + message +
    "\n\nNota: esta é uma resposta de demonstração. Ainda não existe ligação a um modelo de IA externo.";
}

app.get("/api/health", (req, res) => {
  res.json({
    status: "online",
    system: "URBAN AI CORE",
    version: "2.0.0"
  });
});

app.get("/api/agents", (req, res) => {
  res.json({ agents });
});

app.post("/api/think", (req, res) => {
  const message = req.body.message;

  if (!message || typeof message !== "string" || !message.trim()) {
    return res.status(400).json({
      error: "Escreve uma mensagem primeiro."
    });
  }

  const agentId = chooseAgent(message);
  const agent = agents.find(a => a.id === agentId);

  res.json({
    success: true,
    agent: agent.name,
    role: agent.role,
    response: createReply(agentId, message.trim()),
    mode: "DEMO"
  });
});

app.get("/", (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="pt">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>URBAN AI CORE</title>
<style>
*{box-sizing:border-box}
body{
 margin:0;background:#080b12;color:#f4f5f8;
 font-family:Arial,sans-serif;padding:18px
}
header{
 padding:20px 0;border-bottom:1px solid #252b38;
 margin-bottom:22px
}
.logo{font-size:25px;font-weight:900;letter-spacing:2px}
.logo span{color:#a855f7}
.status{color:#48df9a;font-size:12px;margin-top:8px}
h2{font-size:17px;margin:22px 0 12px}
.grid{
 display:grid;grid-template-columns:repeat(auto-fit,minmax(145px,1fr));
 gap:10px
}
.agent{
 background:#111725;border:1px solid #273047;
 padding:14px;border-radius:12px;min-height:105px
}
.agent strong{display:block;font-size:13px;margin-bottom:8px}
.agent p{font-size:11px;color:#aeb8ca;margin:0;line-height:1.5}
.panel{
 background:#111725;border:1px solid #273047;
 border-radius:14px;padding:14px;margin-top:18px
}
#chat{
 height:280px;overflow-y:auto;
 display:flex;flex-direction:column;gap:12px;
 padding:8px 0
}
.msg{
 white-space:pre-wrap;padding:12px;border-radius:10px;
 font-size:13px;line-height:1.5;max-width:95%
}
.user{background:#38215c;align-self:flex-end}
.bot{background:#202a3b;align-self:flex-start}
small{color:#aeb8ca}
textarea{
 width:100%;background:#080d18;color:white;
 border:1px solid #35415a;border-radius:10px;
 padding:13px;font-size:14px;resize:vertical
}
button{
 width:100%;padding:14px;margin-top:10px;
 border:0;border-radius:10px;background:#a855f7;
 color:white;font-weight:bold;font-size:14px
}
button:disabled{opacity:.5}
.note{font-size:11px;color:#aeb8ca;line-height:1.5}
footer{margin-top:25px;color:#78859b;font-size:11px;text-align:center}
</style>
</head>
<body>

<header>
 <div class="logo">URBAN <span>AI</span> CORE</div>
 <div class="status">● SISTEMA ONLINE</div>
 <p class="note">Central de operações do Urban Digital Studio</p>
</header>

<h2>AGENTES ESPECIALIZADOS</h2>
<div class="grid" id="agents">
 <div class="agent"><strong>AI Director</strong><p>Coordenador central</p></div>
 <div class="agent"><strong>Market Research</strong><p>Investigação de mercado</p></div>
 <div class="agent"><strong>Lead Hunter</strong><p>Prospecção comercial</p></div>
 <div class="agent"><strong>Creative Director</strong><p>Produção criativa</p></div>
 <div class="agent"><strong>Business Manager</strong><p>Gestão empresarial</p></div>
</div>

<div class="panel">
 <h2>URBAN AI — CHAT CENTRAL</h2>
 <div id="chat">
  <div class="msg bot">
   Bem-vindo ao URBAN AI CORE.
   Sou o teu sistema central. Escreve uma tarefa e vou encaminhá-la para o agente adequado.
  </div>
 </div>

 <textarea id="message" rows="3"
 placeholder="Escreve aqui a tua tarefa..."></textarea>
 <button id="send" onclick="sendMessage()">ENVIAR TAREFA</button>
 <p class="note">Modo demonstração: os agentes ainda não estão ligados a uma IA externa.</p>
</div>

<footer>URBAN DIGITAL STUDIO · URBAN AI CORE · V2.0</footer>

<script>
const chat = document.getElementById("chat");
const input = document.getElementById("message");
const send = document.getElementById("send");

function addMessage(text, type) {
 const el = document.createElement("div");
 el.className = "msg " + type;
 el.textContent = text;
 chat.appendChild(el);
 chat.scrollTop = chat.scrollHeight;
}

async function sendMessage() {
 const message = input.value.trim();
 if (!message) return;

 addMessage(message, "user");
 input.value = "";
 send.disabled = true;
 send.textContent = "A PROCESSAR...";

 try {
  const response = await fetch("/api/think", {
   method: "POST",
   headers: {"Content-Type":"application/json"},
   body: JSON.stringify({message})
  });

  const data = await response.json();

  if (!response.ok) throw new Error(data.error || "Erro no pedido.");

  addMessage(
   "AGENTE: " + data.agent +
   "\\nFUNÇÃO: " + data.role +
   "\\n\\n" + data.response,
   "bot"
  );
 } catch (error) {
  addMessage("Não foi possível processar: " + error.message, "bot");
 } finally {
  send.disabled = false;
  send.textContent = "ENVIAR TAREFA";
 }
}

input.addEventListener("keydown", function(event) {
 if (event.key === "Enter" && !event.shiftKey) {
  event.preventDefault();
  sendMessage();
 }
});

fetch("/api/agents")
 .then(r => r.json())
 .then(data => {
  document.getElementById("agents").innerHTML = "";
  data.agents.forEach(agent => {
   const card = document.createElement("div");
   card.className = "agent";

   const title = document.createElement("strong");
   title.textContent = agent.name;

   const description = document.createElement("p");
   description.textContent = agent.description;

   card.appendChild(title);
   card.appendChild(description);
   document.getElementById("agents").appendChild(card);
  });
 })
 .catch(() => {});
</script>
</body>
</html>`);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("URBAN AI CORE online na porta " + PORT);
});
