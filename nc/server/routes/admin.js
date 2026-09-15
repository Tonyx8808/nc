const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Admin = require("../models/Admin");
const Richiesta = require("../models/Richiesta");
const Settings = require("../models/Settings");
const adminAuth = require("../middleware/adminAuth");
const { sendAccessPasswordEmail } = require("../utils/mailer");

const router = express.Router();

/**
 * POST /api/admin/login
 * Body: { user, pass }
 * Risposta: { token }
 */
router.post("/login", async (req, res) => {
  try {
    const { user, pass } = req.body;

    if (!user || !pass) {
      return res.status(400).json({ error: "Utente e password sono obbligatori." });
    }

    const admin = await Admin.findOne({ user });
    if (!admin) {
      return res.status(401).json({ error: "Credenziali non valide." });
    }

    const isMatch = await bcrypt.compare(pass, admin.pass);
    if (!isMatch) {
      return res.status(401).json({ error: "Credenziali non valide." });
    }

    const token = jwt.sign(
      { id: admin._id, user: admin.user, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    res.json({ token });
  } catch (err) {
    console.error("Errore login admin:", err);
    res.status(500).json({ error: "Errore del server." });
  }
});

/**
 * GET /api/admin/richieste
 * Protetta. Elenco di tutte le richieste di accesso, più recenti prima.
 */
router.get("/richieste", adminAuth, async (req, res) => {
  try {
    const richieste = await Richiesta.find().sort({ createdAt: -1 });
    res.json(richieste);
  } catch (err) {
    console.error("Errore recupero richieste:", err);
    res.status(500).json({ error: "Errore nel recupero delle richieste." });
  }
});

/**
 * POST /api/admin/richieste/:id/invia
 * Protetta. Da chiamare SOLO dopo aver verificato manualmente (sul
 * cartaceo) che lo studente è iscritto. Invia la password di accesso
 * corrente via email e marca la richiesta come "inviata".
 */
router.post("/richieste/:id/invia", adminAuth, async (req, res) => {
  try {
    const richiesta = await Richiesta.findById(req.params.id);
    if (!richiesta) {
      return res.status(404).json({ error: "Richiesta non trovata." });
    }

    const settings = await Settings.findOne();
    if (!settings) {
      return res.status(500).json({ error: "Password di accesso non ancora configurata." });
    }

    await sendAccessPasswordEmail({
      to: richiesta.email,
      nome: richiesta.nome,
      password: settings.accessPassword,
    });

    richiesta.inviata = true;
    richiesta.inviataIl = new Date();
    await richiesta.save();

    res.json({ message: "Password inviata.", richiesta });
  } catch (err) {
    console.error("Errore invio password:", err);
    res.status(500).json({ error: "Errore durante l'invio dell'email." });
  }
});

/**
 * GET /api/admin/password
 * Protetta. Restituisce la password di accesso attuale.
 */
router.get("/password", adminAuth, async (req, res) => {
  try {
    const settings = await Settings.findOne();
    res.json({ accessPassword: settings ? settings.accessPassword : null });
  } catch (err) {
    console.error("Errore recupero password:", err);
    res.status(500).json({ error: "Errore del server." });
  }
});

/**
 * POST /api/admin/password
 * Protetta. Body: { password }
 * Imposta/cambia la password di accesso unica per tutti gli studenti.
 */
router.post("/password", adminAuth, async (req, res) => {
  try {
    const { password } = req.body;
    if (!password || password.trim().length < 4) {
      return res.status(400).json({ error: "La password deve avere almeno 4 caratteri." });
    }

    let settings = await Settings.findOne();
    if (!settings) {
      settings = new Settings({ accessPassword: password.trim() });
    } else {
      settings.accessPassword = password.trim();
      settings.updatedAt = new Date();
    }
    await settings.save();

    res.json({ message: "Password aggiornata.", accessPassword: settings.accessPassword });
  } catch (err) {
    console.error("Errore aggiornamento password:", err);
    res.status(500).json({ error: "Errore del server." });
  }
});

module.exports = router;
