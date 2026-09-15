import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

/**
 * POST /api/login
 * Body: { password }
 *
 * Verifica la password fissa (consegnata di persona dopo l'iscrizione)
 * confrontandola con ACCESS_PASSWORD nel .env.local. Se corretta,
 * restituisce un token JWT valido 12 ore, da usare per scaricare i
 * file protetti (dispense, download, ccnl, dispense-sicurezza).
 */
export async function POST(req: Request) {
  try {
    const { password } = await req.json();

    if (!password) {
      return NextResponse.json({ error: "Password mancante." }, { status: 400 });
    }

    const validPassword = process.env.ACCESS_PASSWORD;

    if (!validPassword) {
      console.error("ACCESS_PASSWORD non impostata in .env.local");
      return NextResponse.json({ error: "Configurazione mancante lato server." }, { status: 500 });
    }

    if (password.trim() !== validPassword) {
      return NextResponse.json({ error: "Password non valida." }, { status: 401 });
    }

    const token = jwt.sign({ role: "user" }, process.env.JWT_SECRET!, {
      expiresIn: "12h",
    });

    return NextResponse.json({ token });
  } catch (err) {
    console.error("Errore login:", err);
    return NextResponse.json({ error: "Errore del server." }, { status: 500 });
  }
}