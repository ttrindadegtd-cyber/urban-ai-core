
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const agents = [
  { id: "CORE", name: "AI Core", status: "online" },
  { id: "THINK", name: "Thinking Agent", status: "ready" },
  { id: "MEMORY", name: "Memory Agent", status: "ready" },
  { id: "ATLAS", name: "Research Agent", status: "ready" },
  { id: "ENGINEER", name: "Engineering Agent", status: "ready" },
  { id: "GUARDIAN", name: "Security Agent", status: "ready" }
];

app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="pt">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>URBAN AI CORE 1.0</title>
      <style>
        body {
          background: #101018;
          color: white;
          font-family: Arial, sans-serif;
          padding: 25px;
        }
        h1 { color: #b58aff; }
        .panel {
          background: #20202c;
          padding: 18px;
          margin: 12px 0;
          border-radius: 12px;
        }
        button {
          background: #8655e8;
          color: white;
          border: 0;
          padding: 12px 20px;
          border-radius: 8px;
        }
      </style>
    </head>
    <body>
      <h1>URBAN AI CORE 1.0</h1>
      <p>Central Intelligence Platform</p>
      <div class="panel">
        <h2>System Status</h2>
        <p>CORE: ONLINE</p>
        <p>GPT: Awaiting API configuration</p>
        <p>CLAUDE: Awaiting API configuration</p>
        <p>Mode: SIMULATION</p>
      </div>
      <div class="panel">
        <h2>AI Agents</h2>
        <div id="agents">Loading...</div>
      </div>
      <button onclick="location.reload()">Refresh System</button>
      <script>
        fetch('/api/agents')
          .then(r => r.json())
          .then(data => {
            document.getElementById('agents').innerHTML =
              data.map(a => '<p>' + a.name + ' — ' + a.status + '</p>').join('');
          });
      </script>
    </body>
    </html>
  `);
});

app.get("/api/health", (req, res) => {
  res.json({ status: "online", mode: "simulation" });
});

app.get("/api/agents", (req, res) => {
  res.json(agents);
});

app.post("/api/think", (req, res) => {
  const task = req.body.task;

  if (!task || typeof task !== "string") {
    return res.status(400).json({ error: "Task is required." });
  }

  res.json({
    system: "URBAN AI CORE",
    mode: "simulation",
    task: task,
    response: "Task received. AI orchestration is being prepared.",
    agents: agents.map(a => a.id)
  });
});

app.listen(PORT, () => {
  console.log(`URBAN AI CORE running on port ${PORT}`);
});
