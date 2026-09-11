require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const connectDB = require("./config/db");
const adminRoutes = require("./routes/admin");
const userRoutes = require("./routes/user");
const filesRoutes = require("./routes/files");

const app = express();

// Connessione al database
connectDB();

// Middleware globali
app.use(cors());
app.use(express.json());

// Rotte API
app.use("/api/admin", adminRoutes);
app.use("/api", userRoutes);
app.use("/api/files", filesRoutes);

// File statici del pannello admin e della pagina di login utente
app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`🚀 Server in ascolto su http://localhost:${PORT}`);
  console.log(`   Pannello admin:  http://localhost:${PORT}/admin/login.html`);
  console.log(`   Login utente:    http://localhost:${PORT}/login.html`);
});
