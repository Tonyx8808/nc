const express = require("express");
const jwt = require("jsonwebtoken");

const Code = require("../models/Code");
const userAuth = require("../middleware/userAuth");

const router = express.Router();

/**
 * POST /api/login
 * Body: { code }
 * Se il codice esiste e non è ancora stato usato: lo marca used=true
 * e restituisce un token JWT utente valido 2 ore.
 * Risposta: { token }
 */
router.post("/login", async (req, res) => {
  try {
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({ error: "Codice mancante." });
    }

    const normalized = code.trim().toLowerCase();
    const foundCode = await Code.findOne({ code: normalized });

    if (!foundCode) {
      return res.status(401).json({ error: "Codice non valido." });
    }

    if (foundCode.used) {
      return res.status(401).json({ error: "Codice già utilizzato." });
    }

    foundCode.used = true;
    await foundCode.save();

    const token = jwt.sign({ code: foundCode.code, role: "user" }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });

    res.json({ token });
  } catch (err) {
    console.error("Errore login utente:", err);
    res.status(500).json({ error: "Errore del server." });
  }
});

/**
 * GET /api/protected
 * Esempio di rotta protetta da userAuth: qui puoi restituire
 * la vera lista di file/dispense scaricabili una volta autenticati.
 * Non richiesta esplicitamente nelle specifiche, ma utile come
 * dimostrazione di come usare il middleware userAuth sulle API reali.
 */
router.get("/protected", userAuth, async (req, res) => {
  res.json({
    message: "Accesso consentito.",
    code: req.user.code,
  });
});

module.exports = router;
