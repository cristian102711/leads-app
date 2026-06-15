import { authenticate } from "../shopify.server";
import db from "../db.server";

export async function action({ request }) {
  try {
    const { session } = await authenticate.public.appProxy(request);
    const body = await request.json();

    const { nombre, email, mensaje, producto } = body;

    if (!nombre || !email || !producto) {
      return new Response(JSON.stringify({ error: "Faltan campos obligatorios" }), { status: 400 });
    }

    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailValido) {
      return new Response(JSON.stringify({ error: "Email inválido" }), { status: 400 });
    }

    const lead = await db.lead.create({
      data: {
        shop: session.shop,
        nombre,
        email,
        mensaje: mensaje || "",
        producto,
        estado: "nuevo",
      },
    });

    return new Response(JSON.stringify({ success: true, lead }), { status: 200 });
  } catch (error) {
    console.error("Error creando lead:", error);
    return new Response(JSON.stringify({ error: "Error interno" }), { status: 500 });
  }
}