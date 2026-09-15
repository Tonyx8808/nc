const mongoose = require("mongoose");
const Settings = require("../models/Settings");

const DEFAULT_PASSWORD = "Esaarco12";

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connesso correttamente");

    // Se non esiste ancora una password di accesso, la crea con il
    // valore di default. L'admin può cambiarla in qualsiasi momento
    // dalla dashboard.
    const existing = await Settings.findOne();
    if (!existing) {
      await Settings.create({ accessPassword: DEFAULT_PASSWORD });
      console.log(`✅ Password di accesso iniziale impostata: ${DEFAULT_PASSWORD}`);
    }
  } catch (err) {
    console.error("❌ Errore di connessione a MongoDB:", err.message);
    process.exit(1);
  }
}

module.exports = connectDB;
