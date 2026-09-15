const express = require("express");
const jwt = require("jsonwebtoken");

const Richiesta = require("../models/Richiesta");
const Settings = require("../models/Settings");
const userAuth = require("../middleware/userAuth");

const router = express.Router();

/**
 * POST /api/richieste
 * Body: { nome, cognome, email }
 * Crea una richiesta di accesso in attesa. NON invia nessuna email:
 * l'admin controlla manualmente (sul cartaceo) se lo studente è
 * davvero iscritto, poi decide se inviare la password dalla dashboard.
 */
router.post("/richieste", async (req, res) => {
  try {
    const { nome, cognome, email } = req.body;

    if (!nome || !cognome || !email) {
      return res.status(400).json({ error: "Nome, cognome ed email sono obbligatori." });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Indirizzo email non valido." });
    }

    const richiesta = new Richiesta({
      nome: nome.trim(),
      cognome: cognome.trim(),
      email: email.trim().toLowerCase(),
    });
    await richiesta.save();

    res.json({
      message:
        "Richiesta ricevuta. Se risulti iscritto presso la nostra sede, riceverai la password di accesso via email.",
    });
  } catch (err) {
    console.error("Errore creazione richiesta:", err);
    res.status(500).json({ error: "Errore del server. Riprova più tardi." });
  }
});

/**
 * POST /api/login
 * Body: { password }
 * Verifica la password unica di accesso (condivisa tra tutti gli
 * studenti abilitati). Non è monouso: resta valida finché l'admin
 * non la cambia dalla dashboard.
 * Risposta: { token }
 */
router.post("/login", async (req, res) => {
  try {
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ error: "Password mancante." });
    }

    const settings = await Settings.findOne();
    if (!settings) {
      return res.status(500).json({ error: "Password di accesso non ancora configurata. Contatta l'amministratore." });
    }

    if (password.trim() !== settings.accessPassword) {
      return res.status(401).json({ error: "Password non valida." });
    }

    const token = jwt.sign({ role: "user" }, process.env.JWT_SECRET, {
      expiresIn: "12h",
    });

    res.json({ token });
  } catch (err) {
    console.error("Errore login utente:", err);
    res.status(500).json({ error: "Errore del server." });
  }
});

/**
 * GET /api/protected
 * Esempio di rotta protetta da userAuth.
 */
router.get("/protected", userAuth, async (req, res) => {
  res.json({ message: "Accesso consentito." });
});

module.exports = router;
