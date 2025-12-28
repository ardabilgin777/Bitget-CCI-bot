const express = require("express");

const app = express();
app.use(express.json({ limit: "1mb" }));

// Railway/Render gibi yerler PORT verir
const PORT = process.env.PORT || 3000;

// Güvenlik: TradingView alert içindeki secret ile eşleştireceğiz
const SECRET = process.env.WEBHOOK_SECRET || "MY_SECRET";

// Sağlık kontrolü
app.get("/", (req, res) => res.send("OK"));

app.post("/webhook", (req, res) => {
  try {
    const body = req.body || {};

    // Secret kontrolü
    if (!body.secret || body.secret !== SECRET) {
      return res.status(401).json({ ok: false, error: "bad_secret" });
    }

    // Şimdilik sadece loglayacağız (bir sonraki adımda Bitget emirlerini bağlayacağız)
    console.log("WEBHOOK OK:", JSON.stringify(body));

    // TradingView hızlı cevap bekler
    return res.json({ ok: true });
  } catch (e) {
    console.error("WEBHOOK ERROR:", e);
    return res.status(500).json({ ok: false });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
