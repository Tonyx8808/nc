const express = require("express");
const path = require("path");
const fs = require("fs");

const userAuth = require("../middleware/userAuth");

const router = express.Router();

// Cartelle PRIVATE (non dentro /public) dove vanno caricati i PDF reali.
// Chi non ha un token valido non può raggiungerli in nessun modo.
const DISPENSE_DIR = path.join(__dirname, "..", "private-files", "dispense");
const DOWNLOAD_DIR = path.join(__dirname, "..", "private-files", "download");

/**
 * Invia un file in modo sicuro, impedendo di uscire dalla cartella
 * consentita tramite path traversal (es. "../../etc/passwd").
 */
function safeSend(baseDir, filename, res) {
  const requested = path.basename(filename); // rimuove qualsiasi "../"
  const filePath = path.join(baseDir, requested);

  if (!filePath.startsWith(baseDir)) {
    return res.status(400).json({ error: "Percorso non valido." });
  }

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: "File non trovato." });
  }

  res.download(filePath);
}

/**
 * GET /api/files/dispense/:filename
 * Protetta da userAuth: richiede un token valido ottenuto con un codice.
 */
router.get("/dispense/:filename", userAuth, (req, res) => {
  safeSend(DISPENSE_DIR, req.params.filename, res);
});

/**
 * GET /api/files/download/:filename
 * Protetta da userAuth: richiede un token valido ottenuto con un codice.
 */
router.get("/download/:filename", userAuth, (req, res) => {
  safeSend(DOWNLOAD_DIR, req.params.filename, res);
});

module.exports = router;
