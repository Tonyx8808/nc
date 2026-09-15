const mongoose = require("mongoose");

/**
 * Documento singolo che contiene la password di accesso condivisa,
 * usata da tutti gli studenti per scaricare dispense e documenti.
 * Non è monouso: resta valida finché l'admin non la cambia.
 */
const SettingsSchema = new mongoose.Schema({
  accessPassword: {
    type: String,
    required: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Settings", SettingsSchema);
