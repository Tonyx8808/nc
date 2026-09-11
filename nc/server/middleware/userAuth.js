const jwt = require("jsonwebtoken");

/**
 * Middleware di protezione per contenuti riservati agli utenti loggati
 * tramite codice (es. API che restituisce l'elenco dei file scaricabili).
 * Si aspetta l'header: Authorization: Bearer <token>
 * Il token deve essere stato generato da POST /api/login dopo un codice
 * valido, e deve contenere role === "user".
 */
function userAuth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ error: "Accesso non autorizzato. Inserisci un codice valido per accedere." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "user") {
      return res.status(403).json({ error: "Accesso negato." });
    }

    req.user = decoded;
    next();
  } catch (err) {
    return res
      .status(401)
      .json({ error: "Sessione scaduta o non valida. Effettua di nuovo l'accesso con un codice." });
  }
}

module.exports = userAuth;
