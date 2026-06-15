import { authenticate } from "../shopify.server";
import db from "../db.server";

// GET - listar leads (desde el admin)
export async function loader({ request }) {
  const { session } = await authenticate.admin(request);
  const leads = await db.lead.findMany({
    where: { shop: session.shop },
    orderBy: { creadoEn: "desc" },
  });
  return { leads };
}