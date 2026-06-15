📋 Leads App — Shopify App Challenge

Aplicación Shopify fullstack que captura leads desde la tienda online y los muestra en el panel de administración.


🚀 ¿Qué hace esta app?


Agrega un bloque "Formulario de leads" a cualquier página de producto mediante una Theme App Extension
El cliente llena nombre, email y mensaje → se guarda en base de datos
El merchant ve todos los leads en el panel admin de la app, con estado nuevo / revisado
El merchant puede marcar leads como revisados con un click



🛠️ Stack técnico

CapaTecnologíaFrameworkShopify App React Router templateFrontend adminReact + Shopify PolarisFrontend storefrontLiquid + Vanilla JS (Theme App Extension)Base de datosSQLite (dev) via PrismaAuthShopify OAuth (session tokens)Proxy storefrontShopify App Proxy


📁 Estructura relevante

leads-app/
├── app/
│   ├── routes/
│   │   ├── app._index.jsx          # Panel admin — lista de leads
│   │   ├── app.leads.jsx           # Loader de leads para el admin
│   │   ├── apps.leads-app.leads.jsx # Endpoint del App Proxy (recibe POST del storefront)
│   │   └── app.jsx                 # Layout autenticado con Polaris + App Bridge
│   └── db.server.js                # Cliente Prisma
├── extensions/
│   └── lead-form/                  # Theme App Extension
│       └── blocks/
│           └── lead-form.liquid    # Bloque del formulario en la tienda
├── prisma/
│   └── schema.prisma               # Modelo Lead
└── shopify.app.toml                # Config del proxy y extensiones


⚙️ Cómo correr el proyecto localmente

Prerequisitos


Node.js 18+
Cuenta de Shopify Partners
Shopify CLI instalado (npm install -g @shopify/cli)
Una dev store creada en Partners


Pasos

bash# 1. Clonar el repositorio
git clone https://github.com/cristian102711/leads-app.git
cd leads-app

# 2. Instalar dependencias
npm install

# 3. Configurar la base de datos
npx prisma migrate dev --name init

# 4. Correr en modo desarrollo
shopify app dev

El CLI abrirá un túnel y te dará la URL para instalar la app en tu dev store.

Variables de entorno

El CLI de Shopify maneja automáticamente las variables en desarrollo. Para producción necesitarás:

envSHOPIFY_API_KEY=tu_api_key
SHOPIFY_API_SECRET=tu_api_secret
DATABASE_URL="file:./dev.db"


🔄 Flujo completo

Cliente en la tienda
        │
        ▼
[Formulario "Solicitar información"] ← Theme App Extension (lead-form.liquid)
        │
        │  POST /apps/leads-app/leads
        ▼
[App Proxy de Shopify]
        │
        │  Reescribe a tu servidor
        ▼
[apps.leads-app.leads.jsx] → Valida datos → Guarda en DB (Prisma)
        │
        ▼
[Panel admin — app._index.jsx] ← Merchant ve el lead con estado "nuevo"
        │
        ▼
[Botón "Marcar revisado"] → Cambia estado a "revisado"


✅ Features implementadas


 Theme App Extension con formulario Liquid
 Captura de leads vía App Proxy (POST autenticado)
 Validación de email y campos obligatorios
 Persistencia en SQLite via Prisma
 Panel admin con tabla de leads (Polaris)
 Estado nuevo / revisado con badge visual
 Botón "Marcar revisado" funcional



🚧 Lo que se haría con más tiempo


Filtro por estado en el admin (nuevo / revisado)
Exportar leads a CSV
Notificación por email al merchant cuando llega un lead nuevo
Tests automatizados del endpoint del proxy
Deploy a producción con base de datos persistente (ej. PlanetScale)



👨‍💻 Autor

Cristian — @cristian102711

Desafío técnico completado para proceso de selección Fullstack Shopify.