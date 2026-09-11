import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import jwt from "jsonwebtoken";
export async function GET(
  req: Request,
  { params }: { params: Promise<{ file: string }> }
) {
  try {
    const { file } = await params;

        const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return new NextResponse("Accesso non autorizzato", { status: 401 });
    }
    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { role?: string };
      if (decoded.role !== "user") {
        return new NextResponse("Accesso negato", { status: 403 });
      }
    } catch {
      return new NextResponse("Sessione scaduta o non valida", { status: 401 });
    }
    const ROOT = process.cwd();

    const filePath = path.join(
      ROOT,
      "server",
      "private-files",
      "dispense-sicurezza",
      file
    );

    if (!fs.existsSync(filePath)) {
      return new NextResponse("File non trovato", { status: 404 });
    }

    const fileBuffer = fs.readFileSync(filePath);

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/octet-stream",
        "Content-Disposition": `attachment; filename="${file}"`,
      },
    });
  } catch (err) {
    console.error("Errore API dispense-sicurezza:", err);
    return new NextResponse("Errore server", { status: 500 });
  }
}