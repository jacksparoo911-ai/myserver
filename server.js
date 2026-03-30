const express = require("express");
const app = express();

// عشان يقرأ body لو POST
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 🔥 catch-all (أي route)
app.use((req, res) => {
  console.log("=== Incoming Request ===");

  console.log("URL:", req.url);
  console.log("Method:", req.method);

  console.log("Query:", req.query);
  console.log("Body:", req.body);

  console.log("Headers:", req.headers);

  console.log("========================\n");

  res.sendStatus(200);
});

app.listen(3000, () => {
  console.log("Attacker server running...");
});