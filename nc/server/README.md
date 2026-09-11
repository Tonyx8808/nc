# Sistema di accesso tramite codici — ESAARCO

Backend Node.js + Express + MongoDB con pannello admin per generare/gestire
codici di accesso monouso, e pagina utente per accedere con un codice.

## Struttura del progetto

```
/server.js
/config/db.js
/models/Admin.js
/models/Code.js
/routes/admin.js
/routes/user.js
/middleware/adminAuth.js
/middleware/userAuth.js
/scripts/createAdmin.js
/public/admin/login.html
/public/admin/dashboard.html
/public/login.html
/.env.example
```

## 1. Installazione

Assicurati di avere Node.js (18+) e un'istanza MongoDB raggiungibile
(locale o Atlas).

```bash
npm install
```

## 2. Configurazione

Copia il file d'esempio e compila i valori:

```bash
cp .env.example .env
```

Apri `.env` e imposta:

- `MONGO_URI` — stringa di connessione al tuo MongoDB
  - locale: `mongodb://localhost:27017/esaarco-auth`
  - Atlas: `mongodb+srv://<user>:<password>@<cluster>.mongodb.net/esaarco-auth`
- `JWT_SECRET` — una stringa lunga e casuale (es. generata con
  `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`)
- `PORT` — porta del server (default 3001)

## 3. Creazione dell'admin iniziale

Prima di poter usare il pannello admin, crea il primo utente admin nel
database:

```bash
npm run create-admin -- admin LaTuaPasswordSicura
```

Sostituisci `admin` e `LaTuaPasswordSicura` con le credenziali che vuoi
usare. La password viene salvata nel database già hashata con bcrypt,
mai in chiaro.

Puoi rilanciare questo comando in futuro per creare admin aggiuntivi con
username diversi (lo script rifiuta username già esistenti).

## 4. Avvio del server

Sviluppo (riavvio automatico ad ogni modifica, richiede `nodemon` già
incluso nelle devDependencies):

```bash
npm run dev
```

Produzione:

```bash
npm start
```

Il server si avvia su `http://localhost:3001` (o sulla porta impostata
in `.env`). In console vedrai anche i link diretti alle pagine.

## 5. Come usarlo

- **Pannello admin**: apri `http://localhost:3001/admin/login.html`,
  accedi con le credenziali create al punto 3. Dalla dashboard puoi
  generare nuovi codici (bottone "+ Genera codice") e vedere l'elenco
  di tutti i codici con il loro stato (Disponibile / Usato).
- **Pagina utente**: apri `http://localhost:3001/login.html`, inserisci
  uno dei codici generati dall'admin. Se valido e non ancora usato,
  l'utente riceve un token salvato in `localStorage` (`userToken`) e
  il codice viene marcato come usato (non riutilizzabile).

## 6. API disponibili

| Metodo | Endpoint                  | Protezione   | Descrizione                                  |
|--------|----------------------------|--------------|-----------------------------------------------|
| POST   | `/api/admin/login`         | pubblica     | Login admin, restituisce un JWT               |
| POST   | `/api/admin/generate-code` | `adminAuth`  | Genera un nuovo codice hex da 8 caratteri     |
| GET    | `/api/admin/list-codes`    | `adminAuth`  | Elenco di tutti i codici generati             |
| POST   | `/api/login`               | pubblica     | Login utente tramite codice                   |
| GET    | `/api/protected`           | `userAuth`   | Esempio di rotta protetta per utenti loggati  |

Le rotte protette richiedono l'header:

```
Authorization: Bearer <token>
```

## 7. Testare le API manualmente (curl)

**Login admin:**

```bash
curl -X POST http://localhost:3001/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"user":"admin","pass":"LaTuaPasswordSicura"}'
```

Copia il `token` restituito e usalo nelle chiamate successive.

**Genera un codice:**

```bash
curl -X POST http://localhost:3001/api/admin/generate-code \
  -H "Authorization: Bearer <TOKEN_ADMIN>"
```

**Lista codici:**

```bash
curl http://localhost:3001/api/admin/list-codes \
  -H "Authorization: Bearer <TOKEN_ADMIN>"
```

**Login utente con codice:**

```bash
curl -X POST http://localhost:3001/api/login \
  -H "Content-Type: application/json" \
  -d '{"code":"a1b2c3d4"}'
```

**Rotta protetta utente (esempio):**

```bash
curl http://localhost:3001/api/protected \
  -H "Authorization: Bearer <TOKEN_UTENTE>"
```

## 8. Come collegarlo a pagine reali da proteggere (es. dispense, download, CCNL)

Questo backend è generico e indipendente dal frontend Next.js. Per
proteggere i tuoi contenuti reali (PDF, elenco dispense, ecc.):

1. Fai girare questo backend su un server con Node sempre attivo
   (Render, Railway, VPS, ecc.) — non un hosting statico.
2. Dal frontend Next.js, dopo il login utente, salva `userToken`.
3. Prima di mostrare la pagina Dispense/Download/CCNL, il frontend
   chiama una tua API protetta da `userAuth` (puoi aggiungerne di
   nuove seguendo l'esempio di `/api/protected`) per verificare che
   il token sia ancora valido.
4. Se valido, mostra i contenuti; se no, reindirizza a `/login.html`.

## Note di sicurezza

- Cambia sempre `JWT_SECRET` con un valore lungo e casuale prima di
  andare in produzione — non lasciare mai quello di esempio.
- I codici sono monouso: una volta usati (`used: true`) non possono
  essere riutilizzati.
- Le password admin sono sempre hashate con bcrypt, mai salvate in
  chiaro.
- In produzione, servi il sito solo via HTTPS.
