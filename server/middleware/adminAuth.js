const jwt = require("jsonwebtoken");

/**
 * Middleware di protezione per le rotte admin.
 * Si aspetta l'header: Authorization: Bearer <token>
 * Il token deve essere stato generato da POST /api/admin/login
 * e deve contenere role === "admin".
 */
function adminAuth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token mancante. Effettua il login." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "admin") {
      return res.status(403).json({ error: "Accesso negato: privilegi insufficienti." });
    }

    req.admin = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Token non valido o scaduto. Rieffettua il login." });
  }
}

module.exports = adminAuth;
