# Sistema di accesso con password unica — ESAARCO

Backend Node.js + Express + MongoDB. Gli studenti compilano un form
(nome, cognome, email) per richiedere l'accesso. L'admin controlla
manualmente sul cartaceo chi è davvero iscritto, poi invia dalla
dashboard la password di accesso — la stessa per tutti, non monouso.

## Flusso

1. Studente compila il form → si crea una "richiesta" in attesa (nessuna email parte)
2. Admin vede le richieste in dashboard, verifica sul cartaceo
3. Se confermato: admin clicca "Invia password" → l'email con la password unica parte
4. Studente inserisce la password → accede e scarica dispense/documenti

## Password di accesso iniziale

**`Esaarco12`** — impostata automaticamente al primo avvio del server
(se non esiste già una password in database). L'admin può cambiarla in
qualsiasi momento dalla dashboard, sezione "Password di accesso unica".

## Struttura del progetto

```
/server.js
/config/db.js
/models/Admin.js
/models/Richiesta.js
/models/Settings.js
/routes/admin.js
/routes/user.js
/routes/files.js
/middleware/adminAuth.js
/middleware/userAuth.js
/utils/mailer.js
/scripts/createAdmin.js
/private-files/dispense/
/private-files/download/
/public/admin/login.html
/public/admin/dashboard.html
/public/login.html
/.env.example
```

## 1. Installazione

```bash
npm install
```

## 2. Configurazione

```bash
cp .env.example .env
```

Compila in `.env`:
- `MONGO_URI` — stringa di connessione MongoDB
- `JWT_SECRET` — stringa lunga e casuale (genera con
  `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`)
- `PORT` — porta del server (default 3001)
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `MAIL_FROM` —
  credenziali email per l'invio della password (vedi guida separata
  per ottenerle da ESAARCO o testare con Gmail)

## 3. Creazione dell'admin

```bash
npm run create-admin -- admin LaTuaPasswordSicura
```

## 4. Avvio

```bash
npm run dev    # sviluppo, con riavvio automatico
npm start      # produzione
```

Al primo avvio, se non esiste ancora una password di accesso nel
database, viene creata automaticamente con il valore `Esaarco12`.

## 5. Come usarlo

- **Pannello admin**: `http://localhost:3001/admin/login.html`
  - Sezione "Password di accesso unica": vedi/cambia la password
  - Sezione "Richieste di accesso": elenco richieste, bottone "Invia
    password" per ciascuna (da usare solo dopo la verifica sul cartaceo)
- **Pagina utente**: `http://localhost:3001/login.html` — inserisce la
  password ricevuta via email

## 6. API disponibili

| Metodo | Endpoint                          | Protezione  | Descrizione                                    |
|--------|------------------------------------|-------------|-------------------------------------------------|
| POST   | `/api/richieste`                   | pubblica    | Crea una richiesta di accesso (nome/cognome/email) |
| POST   | `/api/login`                       | pubblica    | Login con la password unica, restituisce un JWT |
| GET    | `/api/protected`                   | `userAuth`  | Esempio di rotta protetta per utenti loggati     |
| POST   | `/api/admin/login`                 | pubblica    | Login admin, restituisce un JWT                  |
| GET    | `/api/admin/richieste`             | `adminAuth` | Elenco di tutte le richieste di accesso          |
| POST   | `/api/admin/richieste/:id/invia`   | `adminAuth` | Invia la password allo studente, marca "inviata" |
| GET    | `/api/admin/password`              | `adminAuth` | Password di accesso attuale                      |
| POST   | `/api/admin/password`              | `adminAuth` | Cambia la password di accesso                    |
| GET    | `/api/files/dispense/:filename`    | `userAuth`  | Scarica un PDF protetto dalla cartella dispense  |
| GET    | `/api/files/download/:filename`    | `userAuth`  | Scarica un PDF protetto dalla cartella download  |

## Note di sicurezza

- La password è **condivisa tra tutti gli studenti abilitati** e non
  monouso — scelta consapevole per semplicità di gestione. La
  protezione reale sta nel controllo manuale dell'admin (cartaceo)
  prima di inviarla via email.
- Cambia sempre `JWT_SECRET` con un valore lungo e casuale prima di
  andare in produzione.
- In produzione, servi il sito solo via HTTPS.
- Cambia la password `Esaarco12` di default con una scelta da voi non
  appena il sistema è operativo, per evitare che resti quella
  pubblicata in questa guida.
