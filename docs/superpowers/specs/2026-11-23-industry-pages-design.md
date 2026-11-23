# Fase 2 — Páginas por industria (diseño)

Fecha: 2026-11-23 · Pedido por Lisandro: "una página similar a Service Areas y una página individual por industria".

## Por qué
La Fase 1 cubrió lo local. Para crecer a nivel nacional, Google necesita páginas que respondan búsquedas por tipo de negocio ("AI automation for dental practices", "booking automation for barbershops", "CRM for cleaning companies"). Search Console ya muestra búsquedas así (medical practices, service businesses). Son además industrias donde XTEK ya tiene experiencia real.

## Industrias (9 páginas)
| Slug | Industria | Búsquedas objetivo |
|---|---|---|
| `tattoo-studios` | Tattoo & piercing studios | tattoo shop booking software, AI for tattoo studios, deposits automation |
| `barbershops-salons` | Barbershops & beauty salons | barbershop booking automation, AI receptionist salon, no-show reminders |
| `auto-repair-shops` | Auto repair shops | auto repair shop automation, AI phone answering mechanic |
| `cleaning-companies` | Cleaning companies | cleaning business automation, quotes and scheduling |
| `construction-remodeling` | Construction & remodeling contractors | contractor lead follow-up, estimate automation |
| `paving-driveway-contractors` | Paving, driveway & sidewalk contractors | paving company marketing, driveway sealing leads |
| `plumbing-companies` | Plumbing companies | plumber answering service AI, plumbing CRM automation |
| `dental-practices` | Dental practices | AI receptionist dental office, dental appointment reminders |
| `eye-care-practices` | Optometrists & eye care practices | optometry practice automation, eye doctor appointment reminders |

## Estructura
- `/industries` (índice): tarjetas liquid glass, una por industria, + formulario de contacto.
- `/industries/<slug>`: hero con CTA → intro (2 párrafos propios) → "Where time and leads slip away" (4–5 problemas típicos) → "What we automate for <industria>" (4 soluciones, cada una enlaza a su servicio) → "How a typical project works" (4 pasos) → FAQ (3–4, con FAQPage) → otras industrias + zonas → formulario.
- Datos en `content/industries.ts`; layout en `views/industries/IndustryLayout.tsx`; misma estética (liquid glass, hover coral).
- Schema: `Service` con `audience` (BusinessAudience) + `areaServed` US/NJ, `FAQPage`, `BreadcrumbList`, `CollectionPage` en el índice. Sitemap y llms.txt.
- Enlaces internos: menú "More → All industries", tira en la home, bloque "Industries we serve" en cada página de zona, footer.

## Reglas de contenido
- Texto único por industria (nada de plantilla con el nombre cambiado).
- Sin cifras inventadas, sin nombres de clientes (solo "we've built systems for studios/shops like yours").
- Salud (dental, eye care): no prometer cumplimiento HIPAA; decir que la información de pacientes solo va a herramientas aprobadas para eso y que se trabaja con el sistema de la práctica.
- Inglés (mercado US). Marca "Xtek AI".

## Fuera de alcance
Industrias en las que XTEK no ha trabajado (seguros, legal) — se pueden sumar después si Lisandro quiere.
