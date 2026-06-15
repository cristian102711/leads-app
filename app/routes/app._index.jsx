import { useLoaderData, useFetcher } from "react-router";
import { authenticate } from "../shopify.server";
import db from "../db.server";
import {
  Page,
  Layout,
  Card,
  DataTable,
  Badge,
  Button,
  EmptyState,
  Text,
} from "@shopify/polaris";

export async function loader({ request }) {
  const { session } = await authenticate.admin(request);
  const leads = await db.lead.findMany({
    where: { shop: session.shop },
    orderBy: { creadoEn: "desc" },
  });
  return { leads };
}

export async function action({ request }) {
  await authenticate.admin(request);
  const formData = await request.formData();
  const id = formData.get("id");
  const estadoActual = formData.get("estado");

  await db.lead.update({
    where: { id },
    data: { estado: estadoActual === "nuevo" ? "revisado" : "nuevo" },
  });

  return { ok: true };
}

export default function Index() {
  const { leads } = useLoaderData();
  const fetcher = useFetcher();

  if (leads.length === 0) {
    return (
      <Page title="Leads">
        <EmptyState
          heading="Aún no hay leads"
          image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
        >
          <Text>Los leads aparecerán aquí cuando alguien complete el formulario en tu tienda.</Text>
        </EmptyState>
      </Page>
    );
  }

  const rows = leads.map((lead) => [
    new Date(lead.creadoEn).toLocaleDateString("es-CL"),
    lead.producto,
    lead.nombre,
    lead.email,
    lead.mensaje || "—",
    <Badge key={`badge-${lead.id}`} tone={lead.estado === "nuevo" ? "attention" : "success"}>
      {lead.estado}
    </Badge>,
    <fetcher.Form key={`form-${lead.id}`} method="post">
      <input type="hidden" name="id" value={lead.id} />
      <input type="hidden" name="estado" value={lead.estado} />
      <Button submit size="slim">
        {lead.estado === "nuevo" ? "Marcar revisado" : "Marcar nuevo"}
      </Button>
    </fetcher.Form>,
  ]);

  return (
    <Page title="Leads capturados">
      <Layout>
        <Layout.Section>
          <Card>
            <DataTable
              columnContentTypes={["text","text","text","text","text","text","text"]}
              headings={["Fecha","Producto","Nombre","Email","Mensaje","Estado","Acción"]}
              rows={rows}
            />
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}