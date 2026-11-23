# SEO local (Fase 1) + blog automático — diseño

Fecha: 2026-11-23 · Aprobación pendiente de Lisandro

## Por qué
Search Console (22 may – 21 nov 2026): 14,128 impresiones, 27 clics, posición media ~41. New Jersey es donde XTEK está más cerca de la página 1 (posición media 28; "ai automation agency nj" en 11). Las búsquedas "near me" (2,800 impresiones) dependen del perfil de Google, ya convertido a negocio de área de servicio con 20 áreas. Objetivo: primero dominar lo local (NJ, South Jersey, NYC, Philadelphia) y después expandirse a nivel nacional (Fase 2: páginas por industria).

## Objetivos
1. Subir las búsquedas locales de NJ / South Jersey / NYC / Philadelphia a la página 1–2.
2. Que web, perfil de Google y n8n digan lo mismo (nombre "Xtek AI", áreas, servicios, correo tekmanager@xtekai.com).
3. Publicar un blog útil cada 1–2 semanas sin trabajo manual, salvo aprobar.

## No-objetivos (Fase 1)
- Páginas por industria a nivel nacional (Fase 2).
- Panel/CRM propio (proyecto aparte).
- Rediseño visual.

## Anti-objetivos (sería un fracaso aunque funcione)
- Páginas de ciudad casi iguales con el nombre cambiado ("doorway pages"): Google las castiga.
- Cifras inventadas (horas ahorradas, % de crecimiento, número de clientes). Regla de marca.
- Publicar la dirección física. Solo "New Jersey, US".
- Blogs que publiquen solos sin que Lisandro los apruebe.

## Enfoques considerados
- A. Solo local · B. Solo nacional · **C. Por fases (elegido por Lisandro)**: Fase 1 local + arreglos técnicos + limpieza de blogs; Fase 2 industrias + blogs continuos.

## Ya hecho (2026-11-23, sin publicar todavía)
- 8 blogs fuera de tema eliminados + redirecciones 301 a /blog o al servicio más cercano; blogs en español (no se mostraban) eliminados.
- "reclaim 15+ hours" (cifra inventada) quitado de las 3 páginas de área.
- n8n "Registrar Lead": "X-Tek AI" → "Xtek AI" en los emails.

## Fase 1 — qué se construye

### 1. Páginas de área de servicio
Estructura actual: `content/service-areas.ts` + `app/service-areas/[cityId]`. Se mantienen las 3 URLs que ya tienen impresiones y se agregan 3:

| URL | Búsquedas objetivo (de Search Console) |
|---|---|
| `/service-areas/new-jersey` (nueva, página central) | ai automation agency nj / new jersey, ai automation services new jersey, ai consulting for business nj, marketing automation new jersey, digital marketing new jersey |
| `/service-areas/south-jersey` (nueva) | ai automation south jersey, … cherry hill / marlton / voorhees / evesham / medford / haddon township, business automation south jersey |
| `/service-areas/bergen-county-nj` (nueva) | ai automation agency in bergen county nj |
| `/service-areas/hamilton-nj` (reescribir) | ai automation for local businesses hamilton, trenton / princeton / mercer |
| `/service-areas/manhattan-ny` (reescribir, cubre NYC) | ai agency new york, ai automation agency for small business new york, marketing automation agency new york |
| `/service-areas/philadelphia-pa` (reescribir) | ai automation agency philadelphia, ai seo / ai strategy philadelphia |

Cada página con contenido propio (no plantilla con el nombre cambiado): cómo trabajamos en esa zona (videollamada + visitas presenciales cuando queda cerca), pueblos que cubre, servicios con enlace a cada `/services/<slug>`, preguntas frecuentes locales escritas como respuesta directa (sirven para Google y para buscadores con IA), proyectos reales de la zona solo si Lisandro los confirma (p. ej. Inked City en Trenton). Datos estructurados `Service` + `areaServed` por página.

### 2. Home y datos globales
- Título de la home: `Xtek AI | AI Automation Agency in New Jersey & Nationwide` (hoy dice "…USA").
- `areaServed` de la organización en `lib/seo.ts`: Estados Unidos + New Jersey + las áreas del perfil de Google.
- Enlaces internos: footer y página de servicios enlazan a las 6 páginas de área; las de área enlazan entre sí y a los blogs locales.
- Sitemap: incluir las nuevas URLs.

### 3. Arreglos técnicos
- Vercel: `xtekai.com` → `www` con 308 permanente (hoy 307). Lo cambia Lisandro en el panel (la conexión de Vercel no expone ese ajuste).
- n8n: terminar "X-Tek AI" → "Xtek AI" en los demás workflows, uno por uno, con respaldo. "X-Tek AI LLC" (nombre legal) no se toca hasta confirmar.

## Flujo de blog automático (n8n)

**Workflow nuevo "XTEK · Blog SEO"** (mismo patrón que "LinkedIn: Post diario": borrador → aprobación por Telegram → publicar).

1. **Disparador:** cada lunes 9 am ET. Un ajuste `cadencia` (semanal / quincenal) decide si toca esta semana. Empezamos semanal 4 semanas, luego quincenal 4 semanas, y comparamos en Search Console.
2. **Tema:** toma el siguiente de una cola de temas sacados de Search Console (tabla en Supabase, p. ej. `crm.blog_topics`: búsqueda objetivo, ciudad, servicio a enlazar, estado). Cola inicial:
   1. What is the best AI automation agency in New Jersey? (cómo elegir)
   2. AI automation for insurance agencies in New Jersey
   3. AI automation for medical practices in New Jersey
   4. Where to hire an AI agent developer in New Jersey
   5. AI marketing for service businesses
   6. AI automation for small businesses in New York
   7. Marketing automation agency in NJ: what it does and what it costs to wait
   8. AI automation in South Jersey: Cherry Hill, Marlton and Voorhees
3. **Redacción:** Claude escribe en inglés (~1,200–1,800 palabras): respuesta directa en el primer párrafo, H2 en forma de pregunta, FAQ al final, 2–3 enlaces internos (servicio + área), CTA al formulario. Prohibido inventar cifras, clientes o testimonios; las fuentes externas solo si se citan con enlace.
4. **Imagen:** con el workflow existente "XTEK · Imagen IA" o una imagen de stock.
5. **Aprobación:** Telegram con vista previa y botones Aprobar / Pedir cambio / Descartar (como LinkedIn).
6. **Publicar:** al aprobar, crea el archivo del post en el repo de GitHub (`content/blog/<slug>.json` o `.md`) → Vercel despliega solo.
   - Requiere mover los blogs de `translations.ts` a un archivo por post (cambio en `lib/blogLoader.ts`), para que n8n pueda agregar posts sin tocar código.
   - Requiere una credencial de GitHub en n8n con permiso solo sobre el repo `XTekAI/Xtek-Webisite` (token fine-grained que crea Lisandro).
7. **Registro:** fila en `crm.content` (plataforma "Blog") y aviso a Tekki cuando quede publicado.

## Restricciones
- n8n: cambios de a uno, con respaldo en `XTEK_N8N/tools/backups/`, validar y desactivar/activar después (errores.md #4). No tirar muchas llamadas seguidas.
- Vercel Hobby cerca del límite de transformaciones de imagen: las imágenes nuevas del blog van optimizadas/servidas sin depender de más transformaciones cuando se pueda.
- Push a `main` = producción: solo con permiso explícito de Lisandro.

## Lo que queda a criterio del constructor
Redacción exacta de cada página (revisada por Lisandro antes de publicar), formato del archivo de post, diseño del mensaje de Telegram, nombres de nodos.
