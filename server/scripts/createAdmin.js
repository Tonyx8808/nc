/**
 * Script per creare il primo admin nel database.
 * Uso: npm run create-admin -- <username> <password>
 * Esempio: npm run create-admin -- admin SuperPassword123
 */
require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("../models/Admin");

const args = process.argv.slice(2);
const [user, pass] = args;

if (!user || !pass) {
  console.log("❌ Uso corretto: npm run create-admin -- <username> <password>");
  process.exit(1);
}

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const existing = await Admin.findOne({ user });
    if (existing) {
      console.log(`❌ Esiste già un admin con username "${user}".`);
      process.exit(1);
    }

    const hash = await bcrypt.hash(pass, 10);
    const admin = new Admin({ user, pass: hash });
    await admin.save();

    console.log(`✅ Admin creato con successo: ${user}`);
    process.exit(0);
  } catch (err) {
    console.error("Errore nella creazione dell'admin:", err.message);
    process.exit(1);
  }
})();
