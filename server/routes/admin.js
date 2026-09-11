const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const Admin = require("../models/Admin");
const Code = require("../models/Code");
const adminAuth = require("../middleware/adminAuth");

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
 * POST /api/admin/generate-code
 * Protetta da adminAuth. Genera un codice hex random di 8 caratteri.
 * Risposta: { code, createdAt }
 */
router.post("/generate-code", adminAuth, async (req, res) => {
  try {
    // 4 byte = 8 caratteri hex, univoco per uso pratico
    const code = crypto.randomBytes(4).toString("hex");

    const newCode = new Code({ code });
    await newCode.save();

    res.status(201).json({ code: newCode.code, createdAt: newCode.createdAt });
  } catch (err) {
    console.error("Errore generazione codice:", err);
    res.status(500).json({ error: "Errore nella generazione del codice." });
  }
});

/**
 * GET /api/admin/list-codes
 * Protetta da adminAuth. Restituisce tutti i codici, più recenti prima.
 */
router.get("/list-codes", adminAuth, async (req, res) => {
  try {
    const codes = await Code.find().sort({ createdAt: -1 });
    res.json(codes);
  } catch (err) {
    console.error("Errore recupero codici:", err);
    res.status(500).json({ error: "Errore nel recupero dei codici." });
  }
});

module.exports = router;
