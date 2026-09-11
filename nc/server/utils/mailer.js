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
 * Invia il codice di accesso via email allo studente.
 */
async function sendCodeEmail({ to, nome, code }) {
  const fromAddress = process.env.MAIL_FROM || process.env.SMTP_USER;

  await transporter.sendMail({
    from: `"ES.A.AR.CO." <${fromAddress}>`,
    to,
    subject: "Il tuo codice di accesso ES.A.AR.CO.",
    text: `Ciao ${nome || ""},\n\nEcco il tuo codice di accesso per scaricare dispense e documenti dal sito ES.A.AR.CO.:\n\n${code}\n\nInseriscilo nella pagina di accesso per continuare.\n\nIl codice è monouso: una volta utilizzato non sarà più valido.\n\nES.A.AR.CO. Confederazione`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto;">
        <h2 style="color: #1B2740;">Il tuo codice di accesso</h2>
        <p>Ciao ${nome || ""},</p>
        <p>Ecco il tuo codice per scaricare dispense e documenti dal sito ES.A.AR.CO.:</p>
        <p style="font-size: 28px; font-weight: bold; letter-spacing: 4px; background: #FAFAF8; border: 1px dashed #29A9E1; padding: 16px; text-align: center; color: #1B2740;">
          ${code}
        </p>
        <p style="font-size: 13px; color: #616B7D;">Il codice è monouso: una volta utilizzato non sarà più valido.</p>
        <p style="font-size: 13px; color: #616B7D;">ES.A.AR.CO. Confederazione</p>
      </div>
    `,
  });
}

module.exports = { sendCodeEmail };