const express = require("express");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const Code = require("../models/Code");
const userAuth = require("../middleware/userAuth");
const { sendCodeEmail } = require("../utils/mailer");

const router = express.Router();

/**
 * POST /api/request-code
 * Body: { nome, cognome, email }
 * Genera un nuovo codice, lo salva associato ai dati dello studente,
 * e lo invia via email. Non restituisce mai il codice nella risposta.
 */
router.post("/request-code", async (req, res) => {
  try {
    const { nome, cognome, email } = req.body;

    if (!nome || !cognome || !email) {
      return res.status(400).json({ error: "Nome, cognome ed email sono obbligatori." });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Indirizzo email non valido." });
    }

    const code = crypto.randomBytes(4).toString("hex");

    const newCode = new Code({
      code,
      nome: nome.trim(),
      cognome: cognome.trim(),
      email: email.trim().toLowerCase(),
    });
    await newCode.save();

    await sendCodeEmail({ to: newCode.email, nome: newCode.nome, code });

    res.json({ message: "Codice inviato. Controlla la tua email." });
  } catch (err) {
    console.error("Errore invio codice:", err);
    res.status(500).json({ error: "Errore durante l'invio del codice. Riprova più tardi." });
  }
});

