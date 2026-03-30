const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// تخزين البيانات
let logs = [];

// استقبال البيانات
app.all("/log", (req, res) => {
  const data = {
    time: new Date().toISOString(),
    method: req.method,
    query: req.query,
    body: req.body,
    headers: req.headers
  };

  logs.push(data);

  console.log("Received:", data);

  res.sendStatus(200);
});

// API لعرض البيانات
app.get("/logs", (req, res) => {
  res.json(logs);
});

// UI بسيطة
app.get("/", (req, res) => {
  res.send(`
    <html>
    <head>
      <title>Logs Dashboard</title>
      <style>
        body { font-family: Arial; background:#111; color:#0f0; }
        .log { border:1px solid #0f0; padding:10px; margin:10px; }
      </style>
    </head>
    <body>
      <h1>📡 Incoming Logs</h1>
      <div id="logs"></div>

      <script>
        async function loadLogs() {
          const res = await fetch('/logs');
          const data = await res.json();

          const container = document.getElementById('logs');
          container.innerHTML = '';

          data.forEach(log => {
            const div = document.createElement('div');
            div.className = 'log';
            div.innerText = JSON.stringify(log, null, 2);
            container.appendChild(div);
          });
        }

        setInterval(loadLogs, 2000);
        loadLogs();
      </script>
    </body>
    </html>
  `);
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});