# SEO local (Fase 1) + blog automático — plan de implementación

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Páginas de área de servicio fuertes para NJ / South Jersey / Bergen / Hamilton / NYC / Philadelphia, datos de Google coherentes, y un workflow n8n que redacta y publica (con aprobación) un blog SEO cada 1–2 semanas.

**Architecture:** Next.js 16 (repo `Xtek-Webisite-backup`, Vercel despliega `main`). Las áreas viven en `content/service-areas.ts` y se pintan con `views/service-areas/ServiceAreaLayout.tsx`; sitemap, llms.txt y la franja de la home ya iteran `serviceAreas`. Los blogs pasan de `translations.ts` a un JSON por post en `content/blog/posts/`, para que n8n publique creando un archivo vía GitHub.

**Tech Stack:** Next 16, TypeScript, n8n API (Easypanel), Supabase Postgres (esquema `crm`), Claude en n8n, Telegram.

**Spec:** `docs/superpowers/specs/2026-11-23-seo-local-y-blog-automatico-design.md`

## Global Constraints
- Sin cifras inventadas (horas, %, "10x", "top-rated", número de clientes).
- Dirección: solo "New Jersey, US". Nunca la del registered agent en la web.
- Nombre de marca "Xtek AI"; "X-Tek AI LLC" (nombre legal) no se toca.
- n8n: un workflow a la vez, respaldo en `XTEK_N8N/tools/backups/`, validar, desactivar/activar.
- Push a `main` solo después de que Lisandro vea localhost y lo apruebe.
- No hay suite de tests en el repo: la verificación es `npm run build` + comprobar el HTML servido (`curl`) + validar JSON-LD.

## Review Focus
- Una URL de área que no existe (`/service-areas/xyz`) debe seguir dando "not found"/redirección, no un error 500.
- Las 3 URLs viejas (hamilton-nj, philadelphia-pa, manhattan-ny) deben seguir respondiendo 200 con el mismo slug.
- Las páginas de área no deben ser casi idénticas: cada una con intro, pueblos y FAQs propios.
- Un post publicado por n8n con un campo faltante (sin imagen, sin tags) no debe romper el build.
- El workflow de blog no debe publicar nada sin el botón "Aprobar".

---

### Task 1: Modelo de áreas + 6 páginas con contenido propio
**Files:** Modify `content/service-areas.ts`, `views/service-areas/ServiceAreaLayout.tsx`, `lib/seo.ts` (`serviceAreaJsonLd`), `app/service-areas/[cityId]/page.tsx` (añadir `faqJsonLd`).
**Produces:** `ServiceArea { id, name, state, kind: 'State'|'Region'|'County'|'City', metaTitle, metaDescription, heroTitle, heroSub, intro: string[], towns: string[], serviceFocus: {slug: ServiceSlug, text: string}[], faqs: {q,a}[], service_keywords: string[] }`. `city` se renombra a `name` (actualizar `ServiceAreasStrip`, `llms.txt`, breadcrumb).
- [ ] Reescribir los 3 existentes y añadir `new-jersey`, `south-jersey`, `bergen-county-nj` con textos únicos basados en las búsquedas del spec.
- [ ] Layout: hero, intro, "Towns we serve", servicios con enlace a `/services/<slug>`, "How we work" (videollamada + visitas presenciales cerca), FAQs, enlaces a otras áreas, CTA. Quitar "10x" y "Top-rated".
- [ ] JSON-LD: `Service` con `areaServed` según `kind` (State / AdministrativeArea / City + towns) y `FAQPage`.
- [ ] Verificar: `npm run build` lista 6 rutas de área; `curl` de cada una devuelve su H1 y su `FAQPage`.

### Task 2: Home y datos globales
**Files:** Modify `app/layout.tsx` (DEFAULT_TITLE/DESCRIPTION), `lib/seo.ts` (`organizationJsonLd.areaServed`), `components/ServiceAreasStrip.tsx` (título), `app/sitemap.ts` (fechas a 2026-11-23).
- [ ] Título: `Xtek AI | AI Automation Agency in New Jersey & Nationwide`.
- [ ] `areaServed`: United States, New Jersey (State), condados y ciudades del perfil de Google, Philadelphia, New York City.
- [ ] Verificar con build + `curl /` (title y JSON-LD).

### Task 3: Revisión en localhost
- [ ] `npm run dev`, capturas de las 6 áreas y la home, enviar a Lisandro. Ajustar lo que pida. Push solo con su OK.

### Task 4: n8n — "X-Tek AI" → "Xtek AI" en el resto de workflows
Orden: Seguimiento Leads → Documentos → Arranque de proyecto → Tekki · Email → Newsletter Borrador → Newsletter Baja → LinkedIn → Contenido → IG comentarios → IG DMs → Herramientas DM → Citas ElevenLabs. Script de rebrand con respaldo, uno por llamada, verificando `active` después de cada uno. Luego borrar el lead de prueba (`crm.leads` + `crm.activity_log` del id de prueba).

### Task 5: Blogs a un archivo por post
**Files:** Create `content/blog/posts/<slug>.json` (3 posts actuales); Modify `lib/blogLoader.ts` para leer esos JSON (import estático vía `content/blog/posts/index.ts` generado o `fs` en build); quitar `posts` de `translations.ts`.
**Produces:** formato de post `{ slug, title, seoTitle?, description, date (YYYY-MM-DD), tags: string[], image?: string, content: string (HTML), faqs?: {q,a}[] }`.
- [ ] Verificar: build lista los mismos 3 slugs; un JSON sin `image`/`tags` compila.

### Task 6: Workflow n8n "XTEK · Blog SEO"
- [ ] Tabla `crm.blog_topics(id, query, title_hint, area_id, service_slug, status, post_slug, created_at)` sembrada con los 8 temas del spec.
- [ ] Workflow: lunes 9 am ET + ajuste de cadencia → siguiente tema `pending` → Claude redacta JSON de post → imagen → Telegram (Aprobar / Cambio / Descartar) → al aprobar: GitHub "create file" `content/blog/posts/<slug>.json` en `main` → fila en `crm.content` → aviso.
- [ ] Requiere token GitHub fine-grained (solo repo `XTekAI/Xtek-Webisite`, permiso Contents: read/write) como credencial n8n.
- [ ] Prueba en modo `dry_run` (no publica) antes de activar.
