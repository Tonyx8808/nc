const mongoose = require("mongoose");

/**
 * Una richiesta di accesso: lo studente compila nome, cognome, email.
 * L'admin controlla manualmente sul cartaceo se è davvero iscritto,
 * poi (se sì) invia la password di accesso dalla dashboard.
 */
const RichiestaSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    trim: true,
  },
  cognome: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  inviata: {
    type: Boolean,
    default: false,
  },
  inviataIl: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Richiesta", RichiestaSchema);
