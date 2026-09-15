const nodemailer = require("nodemailer");

/**
 * Trasportatore SMTP generico: funziona con Gmail, un dominio cPanel,
 * Resend, o qualsiasi provider che dia host/porta/utente/password SMTP.
 *
 * Variabili richieste nel .env:
 *   SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, MAIL_FROM
 */
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: Number(process.env.SMTP_PORT) === 465, // true solo per la porta 465
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

/**
 * Invia la password di accesso allo studente, dopo che l'admin ha
 * verificato manualmente che risulta iscritto.
 */
async function sendAccessPasswordEmail({ to, nome, password }) {
  const fromAddress = process.env.MAIL_FROM || process.env.SMTP_USER;

  await transporter.sendMail({
    from: `"ES.A.AR.CO." <${fromAddress}>`,
    to,
    subject: "La tua password di accesso ES.A.AR.CO.",
    text: `Ciao ${nome || ""},\n\nAbbiamo verificato la tua iscrizione. Ecco la password per accedere all'area riservata e scaricare dispense e documenti dal sito ES.A.AR.CO.:\n\n${password}\n\nInseriscila nella pagina di accesso per continuare.\n\nES.A.AR.CO. Confederazione`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto;">
        <h2 style="color: #1B2740;">La tua password di accesso</h2>
        <p>Ciao ${nome || ""},</p>
        <p>Abbiamo verificato la tua iscrizione. Ecco la password per accedere all'area riservata e scaricare dispense e documenti dal sito ES.A.AR.CO.:</p>
        <p style="font-size: 28px; font-weight: bold; letter-spacing: 4px; background: #FAFAF8; border: 1px dashed #29A9E1; padding: 16px; text-align: center; color: #1B2740;">
          ${password}
        </p>
        <p style="font-size: 13px; color: #616B7D;">ES.A.AR.CO. Confederazione</p>
      </div>
    `,
  });
}

module.exports = { sendAccessPasswordEmail };
